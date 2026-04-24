# Home Base — Setup Guide

## Quick Start

```bash
cd ~/Desktop/life-os/work/home-base
npm install
# Fill in .env (see below)
# Save your background photo as public/bg.jpg
node server.js
# Open http://localhost:3000
```

---

## Step 1 — Google (Gmail + Calendar)

Your Google credentials are already in macOS Keychain. Run this to extract them into `.env`:

```bash
echo "GOOGLE_CLIENT_ID=$(security find-generic-password -s 'lifeos-google-client-id' -a 'lifeos' -w)" >> .env
echo "GOOGLE_CLIENT_SECRET=$(security find-generic-password -s 'lifeos-google-client-secret' -a 'lifeos' -w)" >> .env
echo "GOOGLE_REFRESH_TOKEN=$(security find-generic-password -s 'lifeos-google-refresh-token' -a 'lifeos' -w)" >> .env
```

If any of those fail, you'll need to re-run the Life OS Google auth setup from `scripts/`.

---

## Step 2 — Slack

1. Go to https://api.slack.com/apps → **Create New App** → **From scratch**
2. Name: `Home Base`, Workspace: Messenger International
3. Go to **OAuth & Permissions** → add these Bot Token Scopes:
   - `channels:read`
   - `channels:history`
   - `groups:read`
   - `groups:history`
   - `im:read`
   - `im:history`
   - `users:read`
4. Click **Install to Workspace** → copy the **Bot User OAuth Token** (starts with `xoxb-`)
5. Add `.env` values:
   ```
   SLACK_BOT_TOKEN=xoxb-...
   ```
6. Find channel IDs: In Slack, right-click a channel → **Copy link** — the ID is the last segment (starts with `C`)
7. Add `.env` values:
   ```
   SLACK_VIDEO_CHANNEL_ID=C...
   SLACK_ALLSTAFF_CHANNEL_ID=C...
   ```
8. Invite the bot to those channels: `/invite @Home Base`

---

## Step 3 — Asana

1. Go to https://app.asana.com/0/my-profile-settings → **Apps** → **Manage Developer Apps** → **New access token**
2. Name it `Home Base`, copy the token
3. Get your workspace GID:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" https://app.asana.com/api/1.0/workspaces
   ```
4. Add `.env` values:
   ```
   ASANA_PAT=1/...
   ASANA_WORKSPACE_GID=...
   ```

---

## Step 4 — Anthropic API Key

```bash
echo "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY" >> .env
```

(Your key is already in `~/.zshrc` — this copies it to `.env`.)

---

## Step 5 — Background Image

Save your Italian hillside photo as:
```
work/home-base/public/bg.jpg
```

---

## Complete `.env` reference

```
# Google (Gmail + Calendar)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

# Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_VIDEO_CHANNEL_ID=C...
SLACK_ALLSTAFF_CHANNEL_ID=C...

# Asana
ASANA_PAT=1/...
ASANA_WORKSPACE_GID=...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Server settings
PORT=3000
REFRESH_INTERVAL_MINUTES=5
```

---

## Auto-Start on Login (optional)

To have the server start automatically when your Mac boots:

```bash
cp com.nathaniel.homebase.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.nathaniel.homebase.plist
```

To stop it:
```bash
launchctl unload ~/Library/LaunchAgents/com.nathaniel.homebase.plist
```

---

## Adding Timeline Milestones

Edit `milestones.json` — no code changes needed:

```json
{
  "milestones": [
    {
      "id": "messenger-cup",
      "label": "Messenger Cup",
      "date": "2026-07-22",
      "color": "#e8b96a"
    },
    {
      "id": "my-event",
      "label": "Event Name",
      "date": "2026-03-15",
      "color": "#f4a261"
    }
  ]
}
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Gmail/Calendar returns 401 | Token expired | Re-run Google auth setup |
| Slack returns `invalid_auth` | Wrong bot token | Re-check `SLACK_BOT_TOKEN` |
| Slack returns `not_in_channel` | Bot not invited | `/invite @Home Base` in that channel |
| Asana returns 401 | Bad PAT | Regenerate at asana.com |
| Claude chat shows error | Missing API key | Check `ANTHROPIC_API_KEY` in `.env` |
| Background is black | Missing bg.jpg | Save photo to `public/bg.jpg` |
