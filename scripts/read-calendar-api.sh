#!/bin/bash
# Fetch today's and tomorrow's calendar events

ACCESS_TOKEN=$(bash "$(dirname "$0")/google-token.sh")

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Could not get access token." >&2
  exit 1
fi

# Get today and tomorrow in RFC3339
TODAY=$(date -u +"%Y-%m-%dT00:00:00Z")
IN_TWO_DAYS=$(date -u -v+2d +"%Y-%m-%dT00:00:00Z" 2>/dev/null || date -u -d "+2 days" +"%Y-%m-%dT00:00:00Z")

RESPONSE=$(curl -s "https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${TODAY}&timeMax=${IN_TWO_DAYS}&singleEvents=true&orderBy=startTime" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

echo "$RESPONSE" | python3 -c "
import json, sys
data = json.load(sys.stdin)
events = data.get('items', [])
if not events:
    print('No events today or tomorrow.')
else:
    for e in events:
        start = e.get('start', {}).get('dateTime', e.get('start', {}).get('date', ''))
        print(f\"{start}: {e.get('summary', '(no title)')}\")
" 2>/dev/null || echo "$RESPONSE"
