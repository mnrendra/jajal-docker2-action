#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
exec gpg --pinentry-mode loopback "$@"
