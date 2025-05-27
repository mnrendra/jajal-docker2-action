#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
echo '------import-gpg------1'
export GPG_TTY="$(tty)"
echo "$GPG_TTY"

add_unique_line() {
  local line="$1"
  local file="$2"
  grep -qxF "$line" "$file" || echo "$line" >> "$file"
}

echo '------import-gpg------2'
mkdir -p ~/.gnupg

echo '------import-gpg------3'
add_unique_line "use-agent" ~/.gnupg/gpg.conf
add_unique_line "pinentry-mode loopback" ~/.gnupg/gpg.conf
add_unique_line "allow-loopback-pinentry" ~/.gnupg/gpg-agent.conf

echo '------import-gpg------4'
chmod 600 ~/.gnupg/*

echo '------import-gpg------5'
gpgconf --kill gpg-agent
gpgconf --launch gpg-agent

echo '------import-gpg------6'
echo "$GPG_PRIVATE_KEY" > private.key

echo '------import-gpg------7'
if [ -n "$GPG_PASSPHRASE" ]; then
  echo '------import-gpg------8'
  echo "$GPG_PASSPHRASE" | gpg --batch --yes --passphrase-fd 0 --pinentry-mode loopback --import private.key
else
  echo '------import-gpg------9'
  gpg --batch --yes --import private.key
fi
echo '------import-gpg------10'
rm -f private.key
echo '------import-gpg------11'
KEY_ID=$(gpg --list-keys --with-colons | grep '^pub' | cut -d: -f5 | head -n1)
echo '------import-gpg------12'
echo -e "5\ny\n" | gpg --command-fd 0 --edit-key "$KEY_ID" trust quit

echo '------import-gpg------13'
export GPG_KEY_ID="$KEY_ID"
echo "$GPG_KEY_ID"

echo '------import-gpg------14'
DEFAULT_GIT_AUTHOR_NAME="GitOps Release"
DEFAULT_GIT_AUTHOR_EMAIL="gitops-release@users.noreply.github.com"

echo '------import-gpg------15'
git config --global user.name "${GIT_AUTHOR_NAME:-$DEFAULT_GIT_AUTHOR_NAME}"
git config --global user.email "${GIT_AUTHOR_EMAIL:-$DEFAULT_GIT_AUTHOR_EMAIL}"
git config --global user.signingkey "$KEY_ID"
# git config --global gpg.program gpg
git config --global gpg.program /gpg-wrapper.sh
