#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

apt-get update
apt-get upgrade -y
apt-get install -y git gnupg ca-certificates

# apt-get install -y --no-install-recommends git gnupg ca-certificates

npm ci

# npm cache clear --force
# npm cache clean --force
# npm cache verify

# rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

chmod +x /index.js
