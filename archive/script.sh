#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
ACTION_FILE="action.yml"
BRANCH="main"
GHA_IGNORE_FILE=".ghaignore"
GIT_IGNORE_FILE=".gitignore"
isvalid() {
  local path="$1"
  if [[ "$path" =~ ^([^[:cntrl:]]|/)+$ ]] && [[ "$path" != *".."* ]]; then
    return 0
  else
    return 1
  fi
}
trim() {
  local value="$1"
  local trimmed
  trimmed="${value#"${value%%[![:space:]]*}"}"
  trimmed="${trimmed%"${trimmed##*[![:space:]]}"}"
  echo "$trimmed"
}
parse() {
  local file="$1"
  local line trimmed
  local result=()
  if [ -f "$file" ]; then
    while IFS= read -r line || [[ -n "$line" ]]; do
      trimmed="$(trim "$line")"
      trimmed="${trimmed%%#*}"
      trimmed="$(trim "$trimmed")"
      [[ -z "$trimmed" || "$trimmed" == \#* ]] && continue
      isvalid "$trimmed" || continue
      if ! printf "%s\n" "${result[@]}" | grep -qxF -- "$trimmed"; then
        result+=("$trimmed")
      fi
    done < "$file"
  fi
  printf '%s\n' "${result[@]}"
}
backup() {
  if [ -f "$GIT_IGNORE_FILE" ] && [ -f "$GHA_IGNORE_FILE" ]; then
    cp -- "$GIT_IGNORE_FILE" "$GIT_IGNORE_FILE.backup"
    rm -f -- "$GIT_IGNORE_FILE"
  fi
}
remove() {
  local target="$1"
  echo "[INFO] removing $target from git index"
  if [[ "$target" == */ ]]; then
    git rm --cached --ignore-unmatch -r -- "$target" 2>/dev/null || true
  else
    git rm --cached --ignore-unmatch -- "$target" 2>/dev/null || true
  fi
}
generate() {
  local parsed_gha_ignore="$1"
  local line target
  local gha_ignores=()
  while IFS= read -r line || [[ -n "$line" ]]; do gha_ignores+=("$line"); done <<< "$parsed_gha_ignore"
  for target in "${gha_ignores[@]}"; do
    echo "$target" >> "$GIT_IGNORE_FILE"
  done
}
sedi() {
  local file="$1"
  local sed_expr="$2"
  if sed -i -E "$sed_expr" "$file" 2>/dev/null; then
    :
  else
    sed -i '' -E "$sed_expr" "$file"
  fi
}
escape() {
  local str="$1"
  str="${str//\'/''}"
  echo "$str"
}
update() {
  local file="$1"
  local version="$(escape "$(printf "%s" "$2" | sed "s/'/'\"'\"'/g")")"
  if [ -f "$file" ]; then
    if grep -q '^version:' "$file"; then
      sedi "$file" "s/^version:.*/version: '$version'/"
    elif grep -q '^name:' "$file"; then
      sedi "$file" "/^name:/a version: '$version'"
    else
      sedi "$file" "1i version: '$version'"
    fi
  fi
}
sync() {
  local src_ignore="$1"
  local dst_ignore="$2"
  local src_line dst_line
  local src_list=()
  local dst_list=()
  while IFS= read -r src_line || [[ -n "$src_line" ]]; do src_list+=("$src_line"); done <<< "$src_ignore"
  while IFS= read -r dst_line || [[ -n "$dst_line" ]]; do dst_list+=("$dst_line"); done <<< "$dst_ignore"
  git add .
  for target in "${dst_list[@]}"; do
    if ! printf "%s\n" "${src_list[@]}" | grep -qxF -- "$target"; then
      if isvalid "$target"; then
        remove "$target"
      fi
    fi
  done
  for target in "${src_list[@]}"; do
    if ! printf "%s\n" "${dst_list[@]}" | grep -qxF -- "$target"; then
      if [ -e "$target" ] && isvalid "$target"; then
        echo "[INFO] Adding $target to git index"
        git add --force -- "$target" 2>/dev/null || true
      fi
    fi
  done
}
hasgpgkey() {
  if git config user.signingkey >/dev/null 2>&1; then
    return 0
  fi
  return 1
}
push() {
  local branch="$1"
  local message="$2"
  local tag="${3:-""}"
  if hasgpgkey; then
    git commit -S --allow-empty -m "$message"
  else
    git commit --allow-empty -m "$message"
  fi
  git push origin "$branch"
  if [ -n "$tag" ]; then
    git tag -d "$tag" 2>/dev/null || true
    git push origin -d tag "$tag"
    if hasgpgkey; then
      git tag -s "$tag" -m "$message"
    else
      git tag "$tag" -m "$message"
    fi
    git push origin "$tag"
  fi
}
restore() {
  local file="$GIT_IGNORE_FILE"
  local backup_file="$file.backup"
  if [ -f "$file" ]; then
    rm -f -- "$file"
  fi
  if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
    cp -- "$backup_file" "$file"
    rm -f -- "$backup_file"
  fi
}
main() {
  local version="$1"
  local notes="${2:-""}"
  local branch="${3:-"$BRANCH"}"
  local action_file="${4:-"$ACTION_FILE"}"
  local tag="${5:-"v$version"}"
  local release_message="${6:-"release: $tag"$'\n\n'"$notes"}"
  local latest_message="${7:-"latest: $tag"}"
  local parsed_gha_ignore
  local parsed_git_ignore
  if [ -n "${version:-}" ] && [ -n "${branch:-}" ]; then
    parsed_gha_ignore="$(parse "$GHA_IGNORE_FILE")"
    parsed_git_ignore="$(parse "$GIT_IGNORE_FILE")"
    echo "[INFO] Backing up $GIT_IGNORE_FILE"
    backup
    echo "[INFO] ✅ $GIT_IGNORE_FILE was successfully backed up"
    echo "[INFO] Generating new $GIT_IGNORE_FILE from $GHA_IGNORE_FILE"
    generate "$parsed_gha_ignore"
    echo "[INFO] ✅ New $GIT_IGNORE_FILE was successfully generated"
    echo "[INFO] Updating version in $action_file"
    update "$action_file" "$version"
    echo "[INFO] ✅ $action_file was successfully updated"
    echo "[INFO] Syncing ignore patterns from $GIT_IGNORE_FILE to $GHA_IGNORE_FILE"
    sync "$parsed_git_ignore" "$parsed_gha_ignore"
    echo "[INFO] ✅ Ignore patterns were successfully synced"
    echo "[INFO] Releasing tag $tag"
    push "$branch" "$release_message" "$tag"
    echo "[INFO] ✅ Tag $tag was successfully released"
    echo "[INFO] Restoring $GIT_IGNORE_FILE"
    restore
    echo "[INFO] ✅ $GIT_IGNORE_FILE was successfully restored"
    echo "[INFO] Syncing ignore patterns from $GHA_IGNORE_FILE to $GIT_IGNORE_FILE"
    sync "$parsed_gha_ignore" "$parsed_git_ignore"
    echo "[INFO] ✅ Ignore patterns were successfully synced"
    echo "[INFO] Pushing latest commit $tag on branch '$branch'"
    push "$branch" "$latest_message"
    echo "[INFO] ✅ Branch '$branch' was successfully updated with the latest commit $tag"
  fi
}
main "$@"
