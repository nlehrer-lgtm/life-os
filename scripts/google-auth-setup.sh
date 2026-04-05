#!/bin/bash
# One-time Google OAuth setup — run this to get a refresh token

CLIENT_ID=$(security find-generic-password -s "lifeos-google-client-id" -a "lifeos" -w)
CLIENT_SECRET=$(security find-generic-password -s "lifeos-google-client-secret" -a "lifeos" -w)

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "Error: credentials not found in Keychain."
  exit 1
fi

SCOPE="https://www.googleapis.com/auth/gmail.readonly+https://www.googleapis.com/auth/calendar.readonly"
REDIRECT="http://localhost"

echo ""
echo "Open this URL in your browser and authorize access:"
echo ""
echo "https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code&scope=${SCOPE}&access_type=offline&prompt=consent"
echo ""
read -p "Paste the authorization code here: " AUTH_CODE

RESPONSE=$(curl -s -X POST https://oauth2.googleapis.com/token \
  -d "code=${AUTH_CODE}" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "redirect_uri=${REDIRECT}" \
  -d "grant_type=authorization_code")

REFRESH_TOKEN=$(echo "$RESPONSE" | grep -o '"refresh_token": *"[^"]*"' | sed 's/.*": *"//;s/"//')

if [ -z "$REFRESH_TOKEN" ]; then
  echo "Error getting refresh token. Response:"
  echo "$RESPONSE"
  exit 1
fi

security add-generic-password -U -s "lifeos-google-refresh-token" -a "lifeos" -w "$REFRESH_TOKEN"
echo ""
echo "Done! Refresh token stored in Keychain."
