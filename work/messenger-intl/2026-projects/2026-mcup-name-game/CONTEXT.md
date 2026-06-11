---
aliases: [Name Game, MCUP Name Game, M-Cup Name Game]
project: 2026 M-Cup Name Game
status: active
created: 2026-06-11
---

# 2026 M-Cup Name Game

## What it is

A study tool the [[Messenger Cup]] coordination team built to help staff, volunteers, and leadership learn the names and faces of every guest, family, and attendee in advance of the event. Lives at `https://mcup-name-game.up.railway.app/`. It loads a JSON manifest of cards (`cards.json`) — each card has a name and a photo URL — and presents a flashcard/quiz interface (list view, preview, flashcard mode, practice mode, results). Updates are pushed by the coordination team via the `#mcup-2026-psa` Slack channel as people are added, photos get refreshed, or card structures change (e.g. spouse splits, family merges).

Knowing names cold by [[Messenger Cup]] week is the goal — it shapes how [[Nathaniel]] shows up as the Director of Video Production: greeting families by name on Broadmoor grounds, directing the video team's coverage of specific people, and being present rather than fumbling for introductions.

## Current phase

**Personal study system built.** Nathaniel's strategy is to use his iPhone lock screen wallpaper as a passive memorization loop — every time he opens his phone, he glances at a chunk of names + faces. A Python pipeline now generates iPhone 14 lock-screen wallpapers (1170×2532) from `cards.json`, with face-aware cropping so no head ever gets cut off.

## Key people

- **Coordinator (source of updates):** posts in `#mcup-2026-psa` Slack channel. Updates so far: card replacements (Eric & Candace Johnson → Eric Johnson, Doug + Joanne Mahaffey → combined card), 34 net-new people added.
- **Nathaniel:** primary user of the wallpaper system. Also relevant for the rest of the [[Video Team]] if they want the same setup.

## Wallpaper system — what's built

**Output:** 18 PNG wallpapers covering all **131 people**, sitting in `~/Desktop/mcup-wallpapers/` (`mcup-01.png` through `mcup-18.png`).

**Specs:**
- Canvas 1170 × 2532 (iPhone 14 native)
- Safe zones tuned to a real lock-screen screenshot: top 680px clear for clock, bottom 452px clear for flashlight/camera buttons
- 2-column × 4-row grid, 6–8 people per wallpaper
- 270×270 **square** photo cells (this was the key fix — guarantees face bboxes always fit, no heads cut off)
- Names in bold below each photo, auto-sized to fit (2-line wrap for long names like "Pastors Josh & Shannon Marocco")
- White background, clean polaroid-style look

**Face detection:** OpenCV **YuNet** (ONNX model at `/tmp/yunet.onnx`). Earlier iteration used Haar cascades — failed on sunglasses + hat brims (Amanda Foltz) and threw false positives (Alec & Maddie Bevere). YuNet solved both. Background faces (<35% of largest face's area) are filtered so a bystander doesn't pull the crop off the main subject.

**Crop logic:** target face bbox = ~55% of crop height + ~70% of crop width; centered on face centroid with slight upward bias to keep hair/forehead in frame.

## Grouping strategy

Families kept together where possible; alphabetical by last name across wallpapers.

- **W1–W13:** original 98 people (kept stable so memorization doesn't reset on update). W7 had Eric & Candace → Eric Johnson swap. W8 had Doug + Joanne → combined Doug & Joanne Mahaffey (went from 8→7 cards).
- **W14–W18:** 34 net-new people from the 2026-06 update.

**Known tradeoffs in current grouping:**
- Stamps family split across W17 (Bradley, Ivy) and W18 (Mia, Molly) due to alphabetical boundary.
- Extended families on different wallpapers: New Kemper kids (Kinley, Koa on W14–15) are separate from parents (Jordan & Kristen on W7). Same for new OLeary kids (W16) vs. parents (W9). This is a deliberate tradeoff — preserved existing layouts over family clustering so memorization isn't reset.

## Wheel of Doom — Video Team preliminary quiz penalty

To push the [[Video Team]] to take the name game seriously, [[Nathaniel]] is running a preliminary quiz one week before the official MI-wide quiz (target: ~2026-06-23, one week before the 2026-06-30 official date). MI's standing incentives apply on quiz day: $50 gift card for 100%, $25 gift card for 90–98%. Nathaniel layered a Video-Team-only penalty on top: anyone who scores below **80%** on the preliminary quiz must spin the **Wheel of Doom**.

The wheel is a single-file static site (`wheel-of-doom/index.html`) — Creepster/Cinzel doom theme, 12 HR-approved-but-embarrassing penalties, click-tick spin audio, dramatic gong on result. Opens in any browser. Nathaniel runs it live during the preliminary quiz debrief.

**Penalty list (12 slices):** pie in face · PJs + "I FAILED THE NAME GAME" sticker · donuts for the team · solo worship song at huddle · coffee runner for a workday · sunglasses + cowboy hat all day · 60-sec dramatic video apology · Slack "Stay frosty 🥶" all day · "Hi my name is ___" sticker on your BACK (team writes it) · two mismatched shoes · buy lunch for one teammate · Messenger Cup team picks your Slack profile photo for a week.

Slack announcement already sent to the [[Video Team]] (`#easymoney #100percentclub #wewillbethebestteam`).

## Open decisions

See `STATUS.md`.

## Where to find things

- **Pipeline source:** `/tmp/make_wallpapers.py` (regenerate whenever the source updates)
- **Source data cache:** `/tmp/cards.json` (131 cards as of 2026-06-11)
- **Downloaded photos:** `/tmp/mcup-photos/` (all 131)
- **Output wallpapers:** `~/Desktop/mcup-wallpapers/` (synced from `/tmp/mcup-wallpapers/`)
- **Live name-game app:** https://mcup-name-game.up.railway.app/
- **Wheel of Doom:** [`wheel-of-doom/index.html`](wheel-of-doom/index.html) — open in any browser to spin
- **Slack updates channel:** `#mcup-2026-psa`

## How to refresh after a Slack update

1. Re-pull `cards.json` (cache-bust with `?nocache=$(date +%s)`)
2. Re-download all photos to `/tmp/mcup-photos/` (Slack often notes photo refreshes)
3. Diff old vs. new names — identify added/removed/replaced
4. Update `GROUPS` array in `/tmp/make_wallpapers.py` (keep W1–W13 stable if possible; add new wallpapers at the end)
5. Run `python3 /tmp/make_wallpapers.py`
6. Verify every source ID is covered exactly once
7. `cp /tmp/mcup-wallpapers/*.png ~/Desktop/mcup-wallpapers/`
8. AirDrop the folder to iPhone, set wallpapers from Photos

## Related

- [[Messenger Cup]] — parent event
- [[Video Team]] — team that benefits when Nathaniel knows everyone on sight
- [[Messenger International]] — host org
