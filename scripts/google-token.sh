#!/bin/bash
# Get a fresh access token using the stored refresh token

CLIENT_ID=$(security find-generic-password -s "lifeos-google-client-id" -a "lifeos" -w)
CLIENT_SECRET=$(security find-generic-password -s "lifeos-google-client-secret" -a "lifeos" -w)
REFRESH_TOKEN=$(security find-generic-password -s "lifeos-google-refresh-token" -a "lifeos" -w)

if [ -z "$REFRESH_TOKEN" ]; then
  echo "No refresh token found. Run scripts/google-auth-setup.sh first." >&2
  exit 1
fi

RESPONSE=$(curl -s -X POST https://oauth2.googleapis.com/token \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "refresh_token=${REFRESH_TOKEN}" \
  -d "grant_type=refresh_token")

echo "$RESPONSE" | grep -o '"access_token": *"[^"]*"' | sed 's/.*": *"//;s/"//'
