#!/bin/bash
cd ~/Desktop/life-os || exit 1

# Only commit if there are changes
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  git add -A
  git commit -m "backup: $(date '+%Y-%m-%d %H:%M')"
  git push origin main
fi
