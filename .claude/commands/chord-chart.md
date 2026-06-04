Interactively build a chord chart for a song. Walks through song name, album, key, tempo, time signature, and sections (with bar counts and chord progressions), then saves the chart to the music library.

Usage: `/chord-chart [optional song name]`

## Steps

1. **Get the song name.** If provided in the prompt, use it. Otherwise ask: "What's the song called?"

2. **Get the album name.** Ask: "What album does this song belong to?" Slugify both song and album names (lowercase, spaces → dashes, strip apostrophes and special characters; numbers are fine) for folder/file paths.

3. **Check for an existing chart.** Build the target path: `/Users/nlehrer/Desktop/life-os/work/personal-projects/music/{album-slug}/{song-slug}/chord-charts/{song-slug}.md`. If the file already exists, stop and tell the user: "A chord chart for {song name} already exists at {path}. Is this the same song? If so, I won't overwrite it — let me know how you want to proceed." Wait for their answer before continuing. Do not overwrite without explicit confirmation.

4. **Get the basics in one batch.** Ask: "What's the key, tempo, and time signature?" Parse freely (e.g. "E major, 128 BPM, 4/4").

5. **Walk through sections bit by bit.** Let the user describe sections in whatever order they want — intro, verses, choruses, builds, bridges, outros, etc. For each section, capture:
   - Section name (e.g., `INTRO`, `VERSE`, `CHORUS 1 (Instrumental)`, `BUILD`, `BRIDGE`, `BRIDGE PART 2`, `FINAL CHORUS`)
   - Chord progression (one chord per bar; for chords held multiple bars, repeat the chord in consecutive bars — e.g. `| E | E |` for 2 bars of E)
   - Total bar count for the section
   - Bar range (e.g. bars 1–20) for sanity-checking against the running total
   - Whether the progression loops (in which case use `×N` notation) or runs once

6. **Sanity-check the bar math.** Keep a running bar total as the user describes sections. If the math doesn't add up (e.g., user says a section is 8 bars but describes a progression that totals 6, or claims bar 53 starts a section but the running total is at bar 51), stop and ask a clarifying question. Don't guess.

7. **Confirm before writing.** Once all sections are described, show the user a full preview of the chart in the exact format below and ask: "Look right? I'll save it to `{relative path from life-os/}`." Wait for confirmation before writing.

8. **Write the file** at `/Users/nlehrer/Desktop/life-os/work/personal-projects/music/{album-slug}/{song-slug}/chord-charts/{song-slug}.md`. Create any missing parent folders. Use this exact format:

   ````markdown
   # {Song Name} — Chord Chart

   **Key:** {key}  |  **Tempo:** {tempo} BPM  |  **Time:** {time sig}  |  **Length:** {total bars} bars

   ---

   ```
   SECTION NAME                                       X bars
   | Chord | Chord | Chord | Chord |   ×N

   SECTION NAME                                       X bars
   | Chord | Chord | Chord | Chord | Chord | Chord | Chord | Chord |
   ```
   ````

   Formatting rules:
   - Section name in ALL CAPS on the left, bar count right-aligned. Pad with spaces so all bar counts in the chart line up visually (target column ~52 for the start of "X bars").
   - One chord per bar, separated by `|`. For a chord held N bars, repeat it N times (`| E | E |` for 2 bars of E). Never write `E(2)` or `E×2` — keep it one chord per `|`.
   - If the section loops a short progression, end the line with `   ×N` (number of cycles).
   - If the section runs once with a non-repeating progression, omit the `×N`.
   - Blank line between sections inside the code block.

9. **Push to GitHub** after writing: `cd /Users/nlehrer/Desktop/life-os && git push origin master`. The auto-save hook will commit; you just need to push.

10. **Confirm** with one short line:
    - `Saved. ✓ {Song Name} → work/personal-projects/music/{album-slug}/{song-slug}/chord-charts/{song-slug}.md`

## Format reference (mirror this exactly)

```
INTRO                                              20 bars
| C#m | G#m | A | E |   ×5

CHORUS 1 (Instrumental)                            16 bars
| C#m | G#m | A | E |   ×4

BRIDGE                                              8 bars
| C#m | A | E | E |   ×2

BRIDGE PART 2                                       8 bars
| C#m | A | B | G#m | A | A | B | B |
```

## Important

- Auto-slugify song and album names: lowercase, spaces → dashes, strip apostrophes and special chars.
- Always write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path) so Obsidian sees changes immediately.
- Never overwrite an existing chord chart without explicit user confirmation.
- Confirm before writing the file — show a full preview.
- The user will add lyrics later — do not include a lyrics section, notes section, or anything else beyond the chord chart.
- If the user's bar math doesn't add up, ask a clarifying question rather than guessing.
- Match the 4K reference format exactly.
