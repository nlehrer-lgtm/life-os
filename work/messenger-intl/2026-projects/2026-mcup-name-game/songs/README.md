---
project: 2026 M-Cup Name Game
artifact: AI song prompts for memorization
created: 2026-06-11
---

# Name Game Songs — Gemini Music Prompts

Seven ~60-second AI-generated songs to help [[Nathaniel]] and the [[Video Team]] memorize all 131 cards for [[Messenger Cup]] 2026. Each song covers a slice of the alphabet by last name, every individual first + last name is sung, and every track is a different genre so the songs don't blur together in memory.

## Songs

| # | Range | Individuals | Genre |
|---|-------|------------:|-------|
| 1 | [Allen → Birkbeck](song-01-A-to-B.md) | 27 | 90s boy band pop |
| 2 | [Capehart → Foltz](song-02-C-to-F.md) | 28 | Country-folk |
| 3 | [Gates → Johnson](song-03-G-to-J.md) | 23 | Motown / soul |
| 4 | [Kelly → Mitchella](song-04-K-to-M-early.md) | 29 | Hip-hop / rap |
| 5 | [Moore → Pasch](song-05-M-late-to-Pa.md) | 24 | Reggae |
| 6 | [Peregrin → Slavens](song-06-Pe-to-Sl.md) | 21 | 80s synth-pop |
| 7 | [Spell → Zwanziger](song-07-Sp-to-Z.md) | 30 | Bluegrass / Americana |
| | **Total** | **182** | |

> Total individuals (182) ≈ 131 cards expanded by couples being two people each.

## How to use

1. Open Google Gemini's music creation tool.
2. For each song, copy the **Style prompt** block into the style/description field and the **Lyrics** block into the lyrics field.
3. Generate. If a name comes out garbled, regenerate that single name on its own line per the Tips section in each song file.
4. Save the resulting audio to a single playlist (Apple Music / Spotify / phone Files app) and loop it during commutes, workouts, and morning routine in the lead-up to [[Messenger Cup]].

## Source data

- Cards come from [`cards.json`](https://mcup-name-game.up.railway.app/cards.json) — same source as the lock-screen wallpaper system. See the project [CONTEXT.md](../CONTEXT.md) for the full pipeline.

## If the card list changes

When Slack `#mcup-2026-psa` pushes an update:
1. Re-pull `cards.json`.
2. Diff against the names listed in each song file.
3. Insert added names in the appropriate song's lyrics; remove dropped names. Keep groupings stable so re-memorization is minimal.
4. Re-generate just the affected songs in Gemini.

## Related

- [Name Game project CONTEXT](../CONTEXT.md)
- [Name Game project STATUS](../STATUS.md)
- [[Messenger Cup]] — parent event
- [[Video Team]] — beneficiaries of the memorization
