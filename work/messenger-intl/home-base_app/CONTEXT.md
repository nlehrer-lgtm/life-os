---
aliases:
  - Home Base
  - Home Base App
  - HomeBase
---

# [[Home Base]] — Project Context

## What This Is

[[Home Base]] is a local web dashboard that aggregates Nathaniel's daily inputs — Gmail, Google Calendar, Slack, Asana, and a Claude chat — into a single landing page running at `http://localhost:3000`. It's the "morning glance" surface for the Life OS: open a browser tab, see everything that matters today, then dispatch into deeper work.

Built as a Node/Express app (`server.js`) with a static frontend in `public/`. Optionally auto-starts on Mac boot via a LaunchAgent (`com.nathaniel.homebase.plist`).

## Current Phase

Active personal use. Foundation is in place — Gmail, Calendar, Slack, Asana, and Claude integrations all wired through `.env` credentials. Ongoing iteration on UI polish and milestone timeline content.

Open work: see `STATUS.md`.

## Key Files

| File | Role |
|------|------|
| `server.js` | Express server — handles all API calls + serves the frontend |
| `public/` | Static frontend (HTML/CSS/JS, background image at `bg.jpg`) |
| `package.json` / `package-lock.json` | Node dependencies |
| `milestones.json` | Timeline milestones rendered in the UI (e.g., [[Messenger Cup]] date) — edit JSON, no code changes |
| `quotes.js` | Quote rotation logic |
| `setup.md` | **Full setup guide** — credentials, Slack scopes, Asana PAT, auto-start instructions |
| `com.nathaniel.homebase.plist` | LaunchAgent for auto-start on Mac boot |
| `start.sh` | Manual start script |

## Connections (live data sources)

| Source | Auth | Used for |
|--------|------|----------|
| Google (Gmail + Calendar) | OAuth refresh token in Keychain → `.env` | Unread mail + today's events |
| Slack (Messenger International workspace) | Bot User OAuth Token (`xoxb-...`) | Read channel + DM history; specific channel IDs in `.env` |
| Asana | Personal Access Token | Task/project data |
| Anthropic API | `ANTHROPIC_API_KEY` from `.env` | Inline Claude chat in the dashboard |

## How to Run

```bash
cd work/messenger-intl/home-base_app
node server.js
# or
./start.sh
```

Open `http://localhost:3000`. Full credential setup and troubleshooting in `setup.md`.

## Related

- [[Life OS]] — the broader markdown second brain that Home Base reads from / writes to
- `setup.md` — installation and credential setup (don't duplicate here)
