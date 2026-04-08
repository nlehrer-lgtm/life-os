#!/bin/bash
# Auto-commit and push to master after Claude makes file changes.
# Called by Claude Code's PostToolUse hook.

REPO="/Users/nlehrer/Desktop/life-os"
cd "$REPO" || exit 0

# Bail if nothing changed
git diff --quiet && git diff --cached --quiet && exit 0

# Stage everything
git add -A

# Bail again if nothing staged
git diff --cached --quiet && exit 0

# Get the changed file name from hook stdin for the commit message
FILE=$(cat /tmp/claude-hook-input.txt 2>/dev/null | jq -r '.tool_input.file_path // ""' 2>/dev/null || echo "")
if [ -n "$FILE" ]; then
  MSG="Auto-save: $(basename "$FILE")"
else
  MSG="Auto-save changes"
fi

git commit -m "$MSG

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>" --quiet

# Changes are committed locally. Say "push" in chat to push to GitHub.
