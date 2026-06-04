Debrief a 1:1 right after it happens (1–3 days post-meeting is fine). Pull the meeting transcript from Granola, extract action items + key moments into a structured summary file, archive the running notes, and show the action items inline so Nathaniel can decide which ones to schedule as Asana tasks.

## Trigger
Use this command whenever Nathaniel asks to "debrief the 1:1", "1:1 debrief", "process the 1:1", or "wrap up the 1:1" with Andrew or Lindy.

## Philosophy
Per the *Developing Messengers — The Weekly 1:1* guide (see `work/messenger-intl/director-of-video-production/developing-messengers-weekly-1on1.pdf`):

> *"End each meeting by naming one specific action item per person. Open the next meeting by reviewing what was committed to. Progress requires accountability."*
>
> *"Take brief notes during every meeting. Track action items in Asana. Follow-through is a leadership skill — it signals that what was said actually mattered."*

This skill exists so 1:1s stop revisiting the same topics week after week. Action items go into Asana with clear ownership; what was discussed gets archived so the next prep can build on it.

## Known People & Resources

### Andrew McIntosh
- **Granola title pattern:** `1:1 | Andrew & Nathaniel` (match case-insensitively; also accept `1:1 | Nathaniel & Andrew` and any variant containing both "1:1" and "Andrew")
- **Granola folder ID (fallback only):** `922bfeb5-829e-4842-b7a0-db436e289aaf`
- **Asana user GID:** `1209716385781630`
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/andrew-mcintosh/`
- **1:1 documents subfolder:** `one-on-one-documents/` inside the 1:1 folder — all prep, final, summary, and running-notes files live here
- **Running notes file:** `one-on-one-documents/running-notes.md`

### Lindy Wood
- **Granola title pattern:** `1:1 | Lindy & Nathaniel` (match case-insensitively; also accept `1:1 | Nathaniel & Lindy` and any variant containing both "1:1" and "Lindy")
- **Granola folder ID (fallback only):** `5184fb61-141f-42e4-a52f-263f39c9ab6b`
- **Asana user GID:** `1209634024000757`
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/lindy-wood/`
- **1:1 documents subfolder:** `one-on-one-documents/` inside the 1:1 folder — all prep, final, summary, and running-notes files live here
- **Running notes file:** `one-on-one-documents/running-notes.md`

### Nathaniel
- Use `"me"` as the assignee identifier when creating tasks.
- **Asana workspace:** `1208467900542489`

## Steps

### Step 1 — Identify who the 1:1 was with
Resolve Andrew or Lindy from Nathaniel's prompt. If ambiguous, ask once.

### Step 2 — Pull the most recent 1:1 transcript from Granola

**IMPORTANT:** 1:1 meetings are NOT reliably filed into the per-person Granola folders. Search by title pattern across recent meetings instead — the folder ID is only a fallback if title search fails.

1. Call `list_meetings` with `time_range: "this_week"` (NO `folder_id`).
2. From the results, find the most recent meeting whose title matches the person's **Granola title pattern** above — case-insensitive, must contain both "1:1" and the person's first name (e.g. "1:1 | Lindy & Nathaniel"). Do NOT accept project meetings, pre-week meetings, or touch-base meetings — only the actual 1:1.
3. If no match in `this_week`, retry with `time_range: "last_30_days"`.
4. If still no match, retry with `list_meetings` using the person's **Granola folder ID** as a final fallback.
5. If all of the above fail, use `query_granola_meetings` with a search like `"most recent 1:1 with [Name] — title contains '1:1 | [Name]'"` and parse the meeting ID from the response.
6. Once the meeting is identified, call `get_meeting_transcript` with that meeting ID.

Confirm with Nathaniel before proceeding if the most recent matching meeting is older than 5 days — that probably means the meeting he's asking about isn't recorded yet.

### Step 3 — Read the running notes
Read the person's `running-notes.md`. These were the mid-week observations that fed into the prep.

### Step 4 — Extract from the transcript
Build a structured pass over the transcript and capture:

- **Action items** — bullet each one with:
  - Owner: Nathaniel OR [Name]
  - The commitment in clear, specific language
  - Due date if mentioned (otherwise leave blank)
- **Key topics discussed** — short bullets of what got real airtime
- **Decisions made** — anything that was settled
- **Wins / things to celebrate** — moments of progress, growth, or strong work
- **Open questions / parking lot** — things raised but not resolved
- **Connection moments** — anything personal or growth-oriented worth remembering (energy, mood, life context, signs of development)

Never fabricate. If something didn't come up in the transcript, leave the section empty rather than padding it.

### Step 5 — Save the meeting summary
Save to the person's `one-on-one-documents/` subfolder as `1on1-summary-YYYY-MM-DD.md` using **the meeting date** (not today's date — the summary belongs to the meeting it describes).

**Format:**

```markdown
# 1:1 Summary — [Name] — [Meeting Date]
_Transcript source: Granola (meeting ID `...`) • Debriefed on [today's date]_

---

## Action Items

**Nathaniel's items:**
- [ ] [Commitment] — _due: [date or blank]_

**[Name]'s items:**
- [ ] [Commitment] — _due: [date or blank]_

---

## Key Topics Discussed
- [Bullet per topic]

## Decisions Made
- [Bullet per decision, or "None" if none]

## Wins to Remember
- [Bullet per win]

## Open Questions / Parking Lot
- [Things raised but not resolved]

## Connection Moments
- [Anything worth remembering about how they're doing as a person]

---

## Mid-Week Observations (archived from running notes)
[Verbatim contents of the running-notes.md leading up to this meeting, preserved with their timestamps. If the file was empty, write "No mid-week notes captured."]
```

### Step 6 — Reset the running notes
After archiving the running notes into the summary, reset the file back to its empty template:

```markdown
# [Full Name] — Running 1:1 Notes

_Observations, moments, and items captured between 1:1s. These feed into the next 1:1 prep. Cleared after each meeting (archived into that meeting's summary)._

---
```

### Step 7 — Output the summary and action items inline
Show Nathaniel the full structured summary in the conversation so he can read it without opening the file. Lead with the action items front and center, then topics / decisions / wins / parking lot / connection moments below.

Use clear numbering on action items so he can reference them by number:

```
ACTION ITEMS — review these

For you (Nathaniel):
  N1. [Commitment] — due [date]
  N2. ...

For [Name]:
  L1. [Commitment] — due [date]
  L2. ...
```

(Use `A1, A2...` for Andrew and `L1, L2...` for Lindy so the prefix is unambiguous.)

### Step 8 — Ask which items to schedule
After surfacing the summary, ask:

> "Which of these should I schedule as Asana tasks? Tell me by number (e.g. 'N1, L2, L3') or just say 'all' / 'none'. You can also edit, add, or rephrase any item in your reply — I'll use your version."

Wait for Nathaniel's response. Do not create any tasks until he names which ones.

### Step 9 — Create the selected tasks
When Nathaniel responds:
- If he says "none" — confirm and stop.
- Otherwise, take the items he selected (and any edits / additions he made), and create them in Asana via `create_tasks`.

**Two separate `create_tasks` calls** if both groups have items:

**Call A — Nathaniel's items** (his go to his My Tasks, no project):
- Top-level: `default_assignee: "me"`. Omit `default_project`.
- Each task: `name`, `due_on` (if specified), `notes: "From 1:1 with [Name] on [meeting date]."`

**Call B — [Name]'s items** (theirs go to their My Tasks, no project):
- Top-level: `default_assignee: "<their GID>"`. Omit `default_project`.
- Each task: `name`, `due_on` (if specified), `notes: "From 1:1 with Nathaniel on [meeting date]."`, `followers: "me"`.

If `create_tasks` errors because workspace is required when no project is set, retry adding `workspace: "1208467900542489"` to each task object.

Confirm with a short line: `Scheduled [N] tasks. [X] in your My Tasks, [Y] in [Name]'s.`

### Step 10 — Save, commit, push
- Write the summary file and updated running-notes.md to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "1:1 debrief for [Name] — YYYY-MM-DD"`
- Push to GitHub

## Important
- **Never create Asana tasks for action items before Nathaniel selects which ones.** The conversational selection IS the gate.
- Never fabricate action items or topics. If the transcript is thin, the summary is thin — that's fine.
- Use the **meeting date** for the summary filename, not today's date.
- Surface the full summary inline so Nathaniel can review without opening the file.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
