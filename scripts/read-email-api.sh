#!/bin/bash
# Fetch recent unread emails (last 10)

ACCESS_TOKEN=$(bash "$(dirname "$0")/google-token.sh")

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Could not get access token." >&2
  exit 1
fi

# Get list of unread message IDs
LIST=$(curl -s "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=is:unread" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

MESSAGE_IDS=$(echo "$LIST" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for m in data.get('messages', []):
    print(m['id'])
" 2>/dev/null)

if [ -z "$MESSAGE_IDS" ]; then
  echo "No unread emails."
  exit 0
fi

echo "Recent unread emails:"
echo ""

while IFS= read -r MSG_ID; do
  MSG=$(curl -s "https://gmail.googleapis.com/gmail/v1/users/me/messages/${MSG_ID}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date" \
    -H "Authorization: Bearer ${ACCESS_TOKEN}")

  echo "$MSG" | python3 -c "
import json, sys
data = json.load(sys.stdin)
headers = {h['name']: h['value'] for h in data.get('payload', {}).get('headers', [])}
print(f\"From: {headers.get('From', '?')}\")
print(f\"Subject: {headers.get('Subject', '(no subject)')}\")
print(f\"Date: {headers.get('Date', '?')}\")
print()
" 2>/dev/null
done <<< "$MESSAGE_IDS"
