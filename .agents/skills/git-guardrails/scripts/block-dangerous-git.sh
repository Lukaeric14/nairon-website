#!/usr/bin/env bash

set -euo pipefail

INPUT="$(cat)"

COMMAND="$(
  printf '%s' "$INPUT" | python3 - <<'PY'
import json
import sys

try:
    data = json.load(sys.stdin)
except Exception:
    print("")
    raise SystemExit(0)

tool_input = data.get("tool_input", {})
command = tool_input.get("command", "")
print(command)
PY
)"

DANGEROUS_PATTERNS=(
  "git push"
  "git reset --hard"
  "git clean -fd"
  "git clean -f"
  "git branch -D"
  "git checkout \."
  "git restore \."
  "push --force"
  "reset --hard"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if printf '%s' "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches dangerous pattern '$pattern'." >&2
    exit 2
  fi
done

exit 0
