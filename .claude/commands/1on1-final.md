Sharpen the most recent 1:1 prep into a final glance sheet Nathaniel can use during the actual meeting. This is a two-step conversation: first, present the prep and gather Nathaniel's thoughts; then produce a tight, scannable one-pager he can reference in the room.

## Trigger
Use this command whenever Nathaniel asks to "finalize the 1:1", "make a glance sheet", "prep the final doc", or "get ready to go into the 1:1" with Andrew or Lindy. Also trigger after `/1on1-prep` if he asks to sharpen or finalize the output.

## Known File Locations

### Lindy Wood
- Prep files: `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/lindy-wood/`
- Final file destination: same folder, named `1on1-final-YYYY-MM-DD.md`

### Andrew McIntosh
- Prep files: `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/andrew-mcintosh/`
- Final file destination: same folder, named `1on1-final-YYYY-MM-DD.md`

---

## Steps

### Step 1 — Find and read the most recent prep file
List files in the person's 1:1 folder and find the most recent `1on1-prep-YYYY-MM-DD.md`. Read its full contents.

### Step 2 — Present the prep and ask for Nathaniel's input
Surface the key sections of the prep doc in a clean summary — don't just dump the whole thing. Then ask:

> "Here's what I've got from the prep. Before I build the glance sheet — what do you want to make sure lands in this 1:1? What's the most important thing you want to say or ask? Anything you want to drop or de-emphasize?"

Wait for his response. This is the most important step — the glance sheet should reflect *his* thinking, not just the prep doc.

If he gives short or sparse input, ask one follow-up to draw out his intent:
> "Is there anything you want to say to them that isn't in the prep — something you've been sitting with?"

### Step 3 — Generate the glance sheet
Combine what's in the prep doc with Nathaniel's input to produce the final glance sheet. The goal is a document he can hold in his head (or glance at) during the meeting. It should be short enough to scan in 30 seconds.

Use today's date for the filename.

---

## Glance Sheet Format

```
# 1:1 — [Name] — [Date]

## Open with
[1-2 warm, specific check-in questions. Not generic. Based on what's actually going on with them.]

## Hit these
- [ ] [Most important item to address — with a one-line note on his direction/intent]
- [ ] [Second item]
- [ ] [Third item — max 4-5 total]

## Wins to name
- [Specific, real win. One line each. Max 2-3.]

## Their space
- [Key question to leave open for them to fill — not a yes/no]

## If time
- [Lower priority item — nice to get to but not critical]
```

### Principles for the glance sheet
- **Short beats complete.** If something from the prep doesn't need to be in the room, cut it.
- **His words, not the prep's words.** If Nathaniel gave you direction in Step 2, use his phrasing — it'll feel more natural when he says it.
- **Checkboxes are tactile.** He can check things off as the conversation moves. Keep the list tight so each box matters.
- **Leave space.** The "Their space" section exists to remind him to stop talking and listen. It should be a real open question, not a prompt with an obvious answer.

---

## Step 4 — Save, commit, and push
- Save the glance sheet to the person's 1:1 folder as `1on1-final-YYYY-MM-DD.md`
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "Add 1:1 final glance sheet for [Name] — YYYY-MM-DD"`
- Push to GitHub

Then output the glance sheet directly in the conversation so Nathaniel sees it immediately.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
