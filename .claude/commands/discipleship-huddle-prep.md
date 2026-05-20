Prep a one-page debrief for Nathaniel to bring to the **Discipleship Team Touch Base Huddle** (Mondays, 11:00 – 11:30 AM, organized by Arden Bevere). Pulls the most recent Granola transcript for this meeting, today's inbox notes mentioning discipleship, and current state of active video team work, then synthesizes what's pertinent for Arden, Adrian, Chris, and Lindy to hear from the **Capture** lane.

## Trigger
Run when Nathaniel asks to "prep discipleship huddle", "prep for the discipleship meeting", or invokes `/discipleship-huddle-prep`. Designed to be run Monday morning before the 11:00 AM huddle.

## Philosophy

The Discipleship Team operates on the **3 C's** — Coordinate, Create, Capture. Each lead is expected to come with the high-level items from their lane that are pertinent for the rest of the team. This is not an exhaustive status meeting — it's a curated share so the team stays aligned without becoming silos.

Nathaniel represents **Capture** (the Video Team). His job in this meeting is to:
- Share what the video team is shooting / in post on that touches discipleship content
- Flag upcoming captures the others need to be aware of
- Make asks of Coordinate (Arden/Adrian) or Create (Chris) where needed
- Reinforce video team role clarity when relevant — Arden's note in the original invite was explicit: "I want to make sure that these teams never become their own silos."

**This is a one-page glance sheet, not a deep status report.** Tight bullets. The kind of thing Nathaniel scans in the parking lot before walking in.

## Known Context

- **Meeting time:** Mondays, 11:00 – 11:30 AM (US Central)
- **Attendees:** Arden Bevere (organizer, Discipleship VP), Adrian Livingston (assistant to John & Lisa Bevere), Chris Pace (Director of Content), Lindy Wood (Video Team), Nathaniel Lehrer (Video Team Director)
- **Output folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/discipleship-team/`
- **Folder context:** `work/messenger-intl/discipleship-team/CONTEXT.md`

## Steps

### Step 1 — Resolve the next meeting date

Get today's date. The next huddle is the **next upcoming Monday** (today if today is Monday and it's before 11:00 AM; otherwise next Monday). Use this date in the filename and header.

### Step 2 — Pull the most recent Granola transcript for this meeting (if any)

Use `list_meetings` with `time_range: last_30_days` and scan titles for any meeting whose title contains "Discipleship Team Touch Base Huddle" (case-insensitive). Take the most recent one.

If found: call `get_meeting_transcript` (or `get_meetings` for the summary) and extract:
- Key topics covered
- Decisions made or directions set
- Anything still open or carried forward
- What each of the 3 C's brought to the table

If none found: note in the prep that there's no prior transcript yet (this is a newly-cadenced meeting).

### Step 3 — Pull today's and recent discipleship-relevant inbox notes

Read `/Users/nlehrer/Desktop/life-os/notes/inbox.md`. Scan for any entries where the content mentions "discipleship", "discipleship team", "huddle", or related terms. Pull verbatim — these are Nathaniel's recent captures he wants to surface.

Also read `notes/running-notes.md` if it exists and pull anything discipleship-relevant there.

### Step 4 — Scan active work for Capture-lane items the team should know

Walk `/Users/nlehrer/Desktop/life-os/work/messenger-intl/` recursively. Read every `STATUS.md` and `CONTEXT.md` you find. Pull out items that are:
- Currently in production / capture
- Coming up in the next 1–2 weeks (shoots, captures, edits with hard dates)
- Blocked on something from Coordinate or Create
- Cross-team in nature (anyone outside the video team should know about it)

Specifically check:
- `work/messenger-intl/2026-projects/2026-mcup/STATUS.md` and `CONTEXT.md` — MCUP opener production
- `work/messenger-intl/video-team/` — anything ongoing
- Any other active project folders

Skip items that are purely internal to the video team's day-to-day (those belong in Get REC'D, not here).

### Step 5 — Pull recent significant work meetings (last 7 days)

Use `list_meetings` for `last_week` time range. Identify meetings that produced decisions or directions relevant to discipleship content production. Examples: pre-vis presentations, creative direction meetings with Lisa/John, content packaging meetings, anything cross-team. Don't list every meeting — only ones whose outcomes the discipleship team should know.

### Step 6 — Write the prep doc

Save to `/Users/nlehrer/Desktop/life-os/work/messenger-intl/discipleship-team/prep-YYYY-MM-DD.md` (Monday's date).

**Template:**

```markdown
# Discipleship Team Huddle — Prep — [Day, Month DD, YYYY]
_Mondays, 11:00 – 11:30 AM • Capture lane (Nathaniel)_

---

## 🎯 Top thing to land

[The single most important thing Nathaniel wants the team to walk away knowing from his lane this week. One sentence. If nothing rises to "top thing," write: "Nothing rises above the rest this week — share the bullets below as updates."]

---

## 🎬 Capture — What the video team is on right now

_What's in production or post that touches discipleship content or that the rest of the team should know about._

- [Bullet — what / where / when]
- [Bullet]

---

## 📅 Coming up — Captures in the next 1–2 weeks

_Shoots, captures, edits with hard dates the team should be aware of._

- **[Date]** — [What] — [Anyone outside video team affected?]
- **[Date]** — [What]

[If nothing notable, write: "Nothing notable in the next two weeks."]

---

## 🤝 Asks / Needs

_What Capture needs from Coordinate or Create this week. Be specific about who and what._

- **From Coordinate (Arden / Adrian):** [Ask, or "Nothing this week"]
- **From Create (Chris):** [Ask, or "Nothing this week"]

---

## 🧭 Role / Lane Clarity

_Use this section when there's a reason to re-anchor what the Video Team's role actually is at Messenger — surfaced from inbox notes or recent moments where role confusion came up. Skip the section entirely if nothing surfaced this cycle._

[Brief, specific point. Not a manifesto — a sentence or two that resets shared understanding.]

---

## 📌 Worth sharing from recent work

_Anything from recent meetings or project state that the discipleship team should know — cross-team decisions, creative direction shifts, big-picture context._

- [Bullet — what / source]
- [Bullet]

---

## 🗂 Prior huddle — carry-over

_From the most recent Discipleship Team Touch Base Huddle on [date]. What was still open?_

- [Carried-over item, or "First huddle on this cadence — no prior carry-over."]

---

## Inbox captures pulled in

_Notes from `notes/inbox.md` that fed this prep. Verbatim._

> [Verbatim quote from inbox entry]

[Or "No inbox captures this cycle."]
```

### Step 7 — Save, commit, push

- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "Discipleship huddle prep — YYYY-MM-DD"`
- Push to GitHub

Also output the prep doc in the conversation so Nathaniel can scan it immediately.

---

## Important

- **One page. Tight bullets.** This is a glance sheet, not a status report.
- **Never fabricate.** If a section has nothing, say so plainly. Empty is honest.
- **Capture lane only.** Don't try to prep what Arden, Adrian, or Chris should bring — they own their lanes. Nathaniel walks in with Capture-side items.
- **Cross-team filter.** Items that are purely internal to the video team (Get REC'D material) don't belong here. The test: does anyone outside the video team need to know this? If no, drop it.
- **Reinforce role clarity carefully.** Only include the Role/Lane Clarity section when there's a real reason — a recent moment of confusion, a new initiative that touches lane boundaries, etc. Skip it otherwise.
- Write all files to `/Users/nlehrer/Desktop/life-os/` so Obsidian sees them immediately.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
