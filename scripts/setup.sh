#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# Install: ca-certificates gnupg git wget coreutils
apt-get update -qq
apt-get install -y --no-install-recommends -qq ca-certificates gnupg git wget coreutils

# Install: gh
mkdir -p -m 755 /etc/apt/keyrings
out=$(mktemp)
trap 'rm -f "$out"' EXIT
wget -nv -O "$out" https://cli.github.com/packages/githubcli-archive-keyring.gpg
tee /etc/apt/keyrings/githubcli-archive-keyring.gpg < "$out" > /dev/null
chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null
apt-get update -qq
apt-get install -y --no-install-recommends -qq gh

# Install npm dependencies
npm ci --production --silent

# Remove cache
npm cache clean --force --silent
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ~/.npm/_cacache
