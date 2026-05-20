Sharpen Nathaniel's adjusted Arden 1:1 prep into a tight, scannable glance sheet he can carry into the meeting. Two-step conversation: present the prep, gather what Nathaniel most wants to land; then produce the one-pager.

## Trigger
Use this command whenever Nathaniel asks to "finalize the Arden 1:1", "make a glance sheet for Arden", "Arden glance sheet", "get ready to walk into the Arden 1:1", or after `/1on1-prep-arden` when he asks to sharpen the output.

## Known File Locations
- Prep files: `/Users/nlehrer/Desktop/life-os/work/messenger-intl/leadership/arden/1on1-prep-*.md`
- Final file destination: same folder, named `1on1-final-YYYY-MM-DD.md`

---

## Steps

### Step 1 — Find and read the most recent prep file
List files in `work/messenger-intl/leadership/arden/` and read the most recent `1on1-prep-*.md`. **Important:** Nathaniel is expected to have manually edited the prep doc between running `/1on1-prep-arden` and running this. Read the current state of the file — do NOT regenerate it.

### Step 2 — Present the prep and ask for Nathaniel's input
Summarize the prep doc cleanly — don't dump the whole thing. Then ask:

> "Here's where the prep landed after your edits. Before I build the glance sheet — what do you most want to make sure you bring to Arden today? What's the single most important thing to say or ask? Anything to drop or de-emphasize?"

Wait for his response. This step matters more than the formatting; the glance sheet reflects his thinking, not the prep doc.

If he gives short or sparse input, ask one follow-up:
> "Is there a question you've been sitting with for Arden — something not in the prep — that you want to ask while you're in the room?"

### Step 3 — Generate the glance sheet
Combine the (edited) prep with his input to produce the final glance sheet. Goal: 30-second scan. He should be able to hold it in his head OR glance once and stay on track.

Use today's date for the filename.

---

## Glance Sheet Format

```
# 1:1 — Arden — [Date]

## Open with
[1-2 lines on how you're actually doing — energy, bandwidth, what's heavy. Personal first, work second. The framework: care → clarity → direction.]

## Bring these
- [ ] [Top priority 1 — one line with your direction/intent]
- [ ] [Top priority 2]
- [ ] [Top priority 3 — max 3-4 total]

## Wins to name
- [Specific win 1 — one line]
- [Specific win 2 — max 2-3]

## Ask Arden (in priority order)
- [Most important strategic question — the one that changes your next 30 days if answered]
- [Second question]
- [Third — max 3]

## If time
- [Lower priority item or follow-up question]
```

### Principles for the glance sheet
- **Short beats complete.** If something from the prep doesn't need to be in the room, cut it.
- **His phrasing, not the prep's.** If Nathaniel gave direction in Step 2, use his words — it'll feel natural when he says it.
- **Order the questions.** Most important first. He may not get to all of them; make sure the top one always lands.
- **Checkboxes are tactile.** He can check things off as they get covered. Keep the list tight enough that each box matters.
- **Leave room for Arden to set context.** The 1:1 isn't just Nathaniel's agenda — Arden brings vision and direction. Don't pack the glance sheet so full there's no air for that.

---

## Step 4 — Save, commit, push
- Save to `work/messenger-intl/leadership/arden/1on1-final-YYYY-MM-DD.md`
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "Add 1:1 final glance sheet for Arden — YYYY-MM-DD"`
- Push to GitHub

Then output the glance sheet inline in the conversation so Nathaniel sees it immediately.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
