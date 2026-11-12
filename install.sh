#!/usr/bin/env bash
# Compatibility entry point for previously shared install commands.
set -euo pipefail
umask 077
work="$(mktemp -d "${TMPDIR:-/tmp}/arc-legacy-bootstrap.XXXXXXXX")"
trap 'rm -rf "$work"' EXIT
curl -q --fail --silent --show-error --location --proto '=https' --proto-redir '=https' --tlsv1.2 \
  'https://pumkin4534.github.io/install.sh' --output "$work/install.sh"
/bin/bash "$work/install.sh"
