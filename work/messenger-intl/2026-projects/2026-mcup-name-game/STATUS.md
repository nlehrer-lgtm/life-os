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
- **Wheel of Doom built** ([`wheel-of-doom/index.html`](wheel-of-doom/index.html)) — 12 HR-approved penalties for [[Video Team]] preliminary quiz (sub-80% spinners). Single static file, opens in any browser.

## Open decisions

- [ ] **Stamps family split** — Bradley/Ivy on W17, Mia/Molly on W18. Decide whether to re-cluster all four onto one wallpaper at the cost of disrupting alphabetical flow.
- [ ] **Extended family clustering** — New Kemper kids (Kinley, Koa) and new OLeary kids (Kyle&Bailey, Ryan&Kayla) sit on separate wallpapers from their parents. Reshuffle to put related people together, or leave alphabetical?
- [ ] **Auto-rotation** — iOS doesn't natively cycle lock screens. Consider an iOS Shortcut to rotate `mcup-XX.png` on a schedule. Decide if worth setting up.
- [ ] **Share with the team?** — Could spin this up as a tool for the rest of the [[Video Team]] / wider [[Messenger International]] staff. Worth offering?
- [ ] **Songs — generate + audition** — Run the 7 prompts through Gemini, pick the takes that nail pronunciation, build a playlist, decide whether to share the audio with the rest of the [[Video Team]].
- [ ] **Preliminary [[Video Team]] quiz date** — Lock the date (~one week before 2026-06-30 MI-wide quiz). Confirm logistics: who hosts, where, how the quiz is administered, who tracks scores against the 80% threshold.
- [ ] **Wheel of Doom enforcement** — Confirm with [[Video Team]] who's the witness/enforcer for each penalty. Pie-in-face, costume days, and "sticker on your back" all need a buddy to make it real.

## Blockers

None.

## Recent activity

- **2026-06-11** — Initial pipeline built. 13 wallpapers from 98 cards.
- **2026-06-11** — Switched from Haar cascades to YuNet face detection after audit revealed face crop issues (Amanda Foltz's face missed entirely, Alec & Maddie Bevere false positive).
- **2026-06-11** — Redesigned cell from 522×250 wide rectangle to 270×270 square to guarantee no face gets cut off (37 of 98 face bboxes wouldn't fit in the wide aspect).
- **2026-06-11** — Tightened safe zones after first lock-screen test showed clock overlapping the top photo row and camera/flashlight buttons obscuring the bottom row.
- **2026-06-11** — Source data updated via `#mcup-2026-psa` Slack: Eric & Candace → Eric Johnson, Doug + Joanne Mahaffey combined, 34 net-new people. Re-pulled all photos, added W14–W18.
- **2026-06-11** — Drafted 7 Gemini music prompts covering all 131 cards (182 individuals). One genre per song: 90s boy band, country-folk, Motown, hip-hop, reggae, 80s synth-pop, bluegrass. Lives in `songs/`.
- **2026-06-11** — Built [`wheel-of-doom/index.html`](wheel-of-doom/index.html) — doom-themed static spinner with 12 HR-approved penalties for [[Video Team]] members who score below 80% on the preliminary quiz. Slack announcement already sent to the team.
