# 1:1 Processes — Downward (Team) & Upward (Arden)

Two complete loops, end to end.

- **Downward (biweekly):** Nathaniel as the leader. Two reports — **Lindy Wood** (Tue 2:30pm CT) and **Andrew McIntosh** (Thu 1:30pm CT). Skills: `/1on1-prep`, `/1on1-final`, `/1on1-debrief`.
- **Upward:** Nathaniel as the team member. One leader — **Arden Bevere** (VP of Discipleship). Skills: `/1on1-prep-arden`, `/1on1-final-arden`, `/1on1-debrief-arden`.

Tools used across both: Claude Code skills, Asana, Granola (when recordings exist).

Grounded in *Developing Messengers — The Weekly 1:1* (saved in this folder). Core philosophy:

> **The team member owns and drives the agenda.** They bring priorities, progress, challenges, feedback.
>
> **The leader sets the context.** Team and department objectives, vision and direction, current priorities, how the team member's role aligns with their giftings and the mission.
>
> *"The goal is development, not direction. Ask more, tell less."*

In the downward 1:1, **Lindy/Andrew drive the agenda and Nathaniel brings context.** In the upward 1:1, **Nathaniel drives the agenda and Arden brings context.** Same framework, different seat.

---

## Universal rule — read and adjust the prep before the glance sheet

The prep doc (`/1on1-prep` or `/1on1-prep-arden`) is a **draft**, not a finished artifact. Always open it, read it, and edit it before running the day-of glance sheet skill (`/1on1-final` or `/1on1-final-arden`). Cut what doesn't belong. Sharpen what does. Add anything that surfaced after the prep was generated. The glance sheet is built from the **adjusted** prep, not the original — that's what makes it feel like yours when you walk into the room.

This step applies equally to Lindy, Andrew, and Arden 1:1s.

---

## Downward — The full loop (Lindy & Andrew)

### Phase 1 — Between meetings (the 2 weeks)
Whenever you notice something about Lindy or Andrew, capture it with `/note`:

> `/note for Lindy: she nailed the AACC pilot edit pacing today`

The `/note` skill writes to `notes/inbox.md` *and* (because it detected "Lindy") to `work/messenger-intl/video-team/1on1s/lindy-wood/running-notes.md`. Same for Andrew.

This fixes the recency-bias problem — observations get captured the moment they happen, not dredged from the last transcript.

### Phase 2 — Their prep (3 weekdays before the 1:1)
They have a recurring Asana task in their growth plan project: **"1:1 Agenda — Fill out before our 1:1"**.

- **Lindy's task** is due Fridays at 2:30pm CT (3 weekdays before Tue 2:30pm).
- **Andrew's task** is due Mondays at 1:30pm CT (3 weekdays before Thu 1:30pm).

The template prompts them for: top 3 priorities, progress since last 1:1, biggest challenge, questions they want to discuss, feedback / what they need from you, wins.

They fill it out and complete the task. The next biweekly instance auto-creates (recurrence is configured in the Asana UI).

### Phase 3 — Your prep (2 days before the 1:1)
You run `/1on1-prep Lindy` (or Andrew).

The skill pulls:
- Their filled-out Asana agenda
- Your mid-week running notes (`running-notes.md`)
- Open action items from the last cycle (your + their My Tasks)
- The most recent meeting summary (from the last debrief)
- Their growth plan milestones

It writes a prep doc with: how they're doing, their agenda (verbatim), your mid-week observations, open action items, a "Context to Share" section for you to fill in (vision/priorities/role alignment), growth plan compass check, questions to leave space for, and a quick diagnostics self-check from the Messenger guide.

### Phase 3.5 — Read and adjust the prep
Open the prep doc, read it, edit it. This is the most important step. (See the universal rule above.) The glance sheet you run in the next phase will be built from the adjusted prep, not the original.

### Phase 4 — Day-of glance sheet (morning of the 1:1)
You run `/1on1-final Lindy`. It reads the **adjusted** prep doc, asks you what you want to make sure lands, and produces a tight one-page glance sheet for the meeting.

### Phase 5 — The 1:1 itself
- **They drive the agenda.**
- **You bring context** — vision, priorities, role alignment, news from leadership.
- People-first: care → clarity → direction.
- Ask more, tell less.
- End with clear action items, at minimum one per person.
- Granola records the transcript.

### Phase 6 — Debrief (1–3 days after the 1:1)
An Asana recurring biweekly reminder in your **Leadership OS – 2026** project tells you to do this:

- **"Run /1on1-debrief Lindy"** — due Wed (day after Tue 1:1)
- **"Run /1on1-debrief Andrew"** — due Fri (day after Thu 1:1)

You run `/1on1-debrief Lindy` (or Andrew). The skill:
- Pulls the most recent Granola transcript
- Extracts action items, topics, decisions, wins, parking lot items, connection moments
- Saves a summary to `1on1-summary-YYYY-MM-DD.md` in their folder (filename uses **meeting date**, not today)
- Archives the running notes into that summary and resets `running-notes.md`
- **Surfaces the full summary inline in chat** — action items are numbered (`N1, N2...` for yours, `L1, L2...` or `A1, A2...` for theirs)
- Asks: *"Which of these should I schedule as Asana tasks?"*

You reply with the numbers you want (or "all" or "none"), and you can edit, rephrase, or add items in your reply. Claude creates only the items you select:
- **Yours** → assigned to you, no project → land in your My Tasks
- **Theirs** → assigned to them, no project, you as follower → land in their My Tasks

### Phase 7 — Cycle repeats
Two weeks later, the recurring agenda task is due again. The loop continues.

---

## Skill map

| When | Tool | Where output lives |
|---|---|---|
| Between meetings | `/note` | `notes/inbox.md` + their `running-notes.md` (if Lindy or Andrew named) |
| 3 weekdays before | Asana agenda task they fill out | their growth plan project |
| 2 days before | `/1on1-prep [Name]` | `work/.../1on1s/[person]/1on1-prep-YYYY-MM-DD.md` |
| Morning of | `/1on1-final [Name]` | `work/.../1on1s/[person]/1on1-final-YYYY-MM-DD.md` |
| 1–3 days after | `/1on1-debrief [Name]` (Asana reminder fires) | Summary file + inline action items; tasks created on request |

## Project / folder map

- **Lindy's growth plan (Asana):** `Lindy W - Growth Plan` — recurring agenda task lives here
- **Andrew's growth plan (Asana):** `Andrew M - Growth Plan` — recurring agenda task lives here
- **Your Asana hub:** `Leadership OS – 2026` — biweekly debrief reminders live here
- **Action items (Asana):** `My Tasks` for whoever owns them; no project attachment
- **Life OS markdown:** `work/messenger-intl/video-team/1on1s/{lindy-wood,andrew-mcintosh}/` — prep, final, summary, running notes

## Why this works

- **No more recency bias.** Mid-week notes are captured the moment they happen, not dredged from the last transcript.
- **They own the agenda.** Their Asana task forces them to come prepared with their priorities, not yours.
- **Action items are real.** Every commitment you select becomes a task in someone's My Tasks with a due date. The "we keep talking about the same things" problem dies here.
- **You decide what's worth tasking.** The debrief surfaces a draft; you triage in chat; only what matters gets scheduled.
- **Philosophy enforced.** The Developing Messengers framing — leader brings context, team member drives agenda, people-first, ask more / tell less — is baked into the prep skill itself.

## Quick reference — what to say to Claude (downward 1:1s)

- **Capture a mid-week note:** `/note for Lindy: <observation>` or `/note <thing about Andrew>`
- **Two days before 1:1:** `/1on1-prep Lindy` (or `Andrew`)
- **Read and adjust the prep before running the next step.**
- **Morning of 1:1:** `/1on1-final Lindy`
- **1–3 days after 1:1:** `/1on1-debrief Lindy` — then reply with the action item numbers you want scheduled (e.g., `N1, L2, L3` or `all` or `none`)

---

## Upward — The full loop (Arden)

A separate loop, with the same skill family but the roles flipped. Cadence: weekly-ish (TBD; today's prep is the first run of this system).

In this loop, **Nathaniel is the team member.** Arden is the leader. Per the framework, Nathaniel owns the agenda; Arden brings context (vision, direction, content/discipleship strategy, role alignment).

### Phase 1 — Between meetings
Whenever something surfaces that you want to raise with Arden, capture it. Two ways:

- Edit `work/messenger-intl/leadership/arden/running-notes.md` directly with a quick bullet
- Or use `/note for Arden: <thing>` (once `/note` is updated to route Arden mentions there — currently it doesn't)

### Phase 2 — Your prep (a couple days before the 1:1)
You run `/1on1-prep-arden`.

The skill pulls:
- Your running notes for Arden
- "Arden" mentions in `notes/inbox.md`
- Video team CONTEXT.md / STATUS.md (and discipleship team equivalents when those exist)
- Latest Lindy and Andrew 1:1 summaries — so you can report up on how the team is doing
- Recent journal entries and digests (last 7 days)
- The most recent prior Arden 1:1 prep + summary (for continuity)
- Granola transcript if a folder ID is configured (currently not — to be added when you start recording)

It writes a prep doc with: personal check-in, top priorities to bring, progress since last 1:1, current challenges, wins to name, **strategic questions for Arden** (vision & direction, video team state, discipleship team state, leadership / coaching), open items from last cycle, and ad-hoc notes verbatim.

### Phase 2.5 — Read and adjust the prep
Same universal rule. Read it. Cut what doesn't belong. Sharpen what does. The glance sheet builds from your edits.

### Phase 3 — Day-of glance sheet
You run `/1on1-final-arden`. It reads the adjusted prep, asks what you most want to land, and produces a one-page glance sheet structured around what YOU will bring: open with (personal), bring these (priorities), wins to name, ask Arden (questions in priority order), if time.

### Phase 4 — The 1:1 itself
- **You drive the agenda.**
- **Arden brings context** — vision, content/discipleship strategy, priority calls, role alignment.
- People-first: care → clarity → direction.
- Ask the strategic questions. Listen more than you talk.
- Take light notes (drop them into `running-notes.md` after the meeting if useful).
- Granola records the transcript (when you start recording).

### Phase 5 — Debrief
You run `/1on1-debrief-arden`. The skill:
- Pulls the Granola transcript if available, otherwise asks you for a verbal recap
- Extracts: direction Arden set, action items (yours and his), decisions, parking lot, connection moments
- Saves a summary to `work/messenger-intl/leadership/arden/1on1-summary-YYYY-MM-DD.md` (uses the **meeting date**, not today)
- Archives running notes into the summary and resets `running-notes.md`
- Surfaces the full summary inline — action items numbered `N1, N2...` (yours) and `Ar1, Ar2...` (Arden's)
- Asks: *"Which of these should I schedule as Asana tasks?"*

You reply with numbers (or `all` / `none`). Your items land in your My Tasks; Arden's items become `[Follow up with Arden]` reminders in your My Tasks (until a different Asana pattern is configured for him).

### Phase 6 — Cycle repeats

---

## Skill map (upward)

| When | Tool | Where output lives |
|---|---|---|
| Between meetings | manual edits to `running-notes.md` (or future `/note for Arden`) | `work/messenger-intl/leadership/arden/running-notes.md` |
| A couple days before | `/1on1-prep-arden` | `work/messenger-intl/leadership/arden/1on1-prep-YYYY-MM-DD.md` |
| Morning of | `/1on1-final-arden` | `work/messenger-intl/leadership/arden/1on1-final-YYYY-MM-DD.md` |
| 1–3 days after | `/1on1-debrief-arden` | Summary file + inline action items; tasks created on request |

## Quick reference — what to say to Claude (upward 1:1)

- **Capture a note:** edit `work/messenger-intl/leadership/arden/running-notes.md` directly (or `/note for Arden: <thing>` once routing is added)
- **A couple days before 1:1:** `/1on1-prep-arden`
- **Read and adjust the prep before running the next step.**
- **Day of 1:1:** `/1on1-final-arden`
- **1–3 days after 1:1:** `/1on1-debrief-arden` — then reply with the action item numbers you want scheduled (e.g., `N1, Ar1` or `all` or `none`)

---

## Standing big-ticket topics for Arden 1:1s

Recurring context — these don't go away. The prep skill treats them as default surfaces unless something else takes priority:

- **2030 vision** — 30 podcast shows by 2030. Video team capacity is the constraint.
- **Studio rental / for-profit plan** — using the LED wall to generate revenue (hire contractors, get contracted by outside productions). Approved conceptually; rental policy / contract framework still vague.
- **Leadership development on the video team** — pulling the gold out of Lindy and Andrew; creating new leaders. This is the most consistent through-line of conversations with Arden.
