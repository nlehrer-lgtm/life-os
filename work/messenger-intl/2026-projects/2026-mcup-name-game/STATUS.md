---
project: 2026 M-Cup Name Game
last_updated: 2026-06-11
---

# Status — 2026 M-Cup Name Game

## Live state

- **131 people** to memorize (was 98 at first cut, +33 net in 2026-06 Slack update)
- **18 lock-screen wallpapers** generated and synced to `~/Desktop/mcup-wallpapers/`
- Pipeline (`/tmp/make_wallpapers.py`) is stable and re-runnable on future updates
- **7 Gemini music prompts** drafted in [`songs/`](songs/README.md) — one per alphabetical slice, each a different genre, ~60s target

## Open decisions

- [ ] **Stamps family split** — Bradley/Ivy on W17, Mia/Molly on W18. Decide whether to re-cluster all four onto one wallpaper at the cost of disrupting alphabetical flow.
- [ ] **Extended family clustering** — New Kemper kids (Kinley, Koa) and new OLeary kids (Kyle&Bailey, Ryan&Kayla) sit on separate wallpapers from their parents. Reshuffle to put related people together, or leave alphabetical?
- [ ] **Auto-rotation** — iOS doesn't natively cycle lock screens. Consider an iOS Shortcut to rotate `mcup-XX.png` on a schedule. Decide if worth setting up.
- [ ] **Share with the team?** — Could spin this up as a tool for the rest of the [[Video Team]] / wider [[Messenger International]] staff. Worth offering?
- [ ] **Songs — generate + audition** — Run the 7 prompts through Gemini, pick the takes that nail pronunciation, build a playlist, decide whether to share the audio with the rest of the [[Video Team]].

## Blockers

None.

## Recent activity

- **2026-06-11** — Initial pipeline built. 13 wallpapers from 98 cards.
- **2026-06-11** — Switched from Haar cascades to YuNet face detection after audit revealed face crop issues (Amanda Foltz's face missed entirely, Alec & Maddie Bevere false positive).
- **2026-06-11** — Redesigned cell from 522×250 wide rectangle to 270×270 square to guarantee no face gets cut off (37 of 98 face bboxes wouldn't fit in the wide aspect).
- **2026-06-11** — Tightened safe zones after first lock-screen test showed clock overlapping the top photo row and camera/flashlight buttons obscuring the bottom row.
- **2026-06-11** — Source data updated via `#mcup-2026-psa` Slack: Eric & Candace → Eric Johnson, Doug + Joanne Mahaffey combined, 34 net-new people. Re-pulled all photos, added W14–W18.
