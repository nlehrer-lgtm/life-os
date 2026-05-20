Prepare a briefing for an upcoming or current meeting so you walk in informed and sharp.

## Steps

1. **Identify the meeting.** Pull today's events from Google Calendar. Find the next upcoming meeting (or the current one). If there are multiple meetings soon, pick the nearest one unless specified otherwise.

2. **Extract context from the meeting:**
   - Meeting title, time, and location
   - Attendees (names and emails)
   - Any description or agenda in the invite

3. **Identify who's in the meeting.** For each attendee:
   - Check if they match a known person in `people/`
   - Determine the relationship: colleague, client, friend, new contact, etc.
   - Note their company/role if available from the invite or prior context

4. **Pull recent activity from all relevant sources in parallel:**

   - **Email**: Search Gmail for recent threads with these attendees (last 7 days). Read full threads for context, not just subject lines.
   - **Beeper**: Search for recent messages in group chats or DMs related to these people (last 3-5 days). Paginate through all pages. Skip gracefully if unavailable.
   - **Google Calendar**: Check for previous meetings with the same attendees (last 30 days).
   - **Recent digests**: Read the last 2-3 digests for context on recent activity and open loops related to these people.
   - **People files**: Read their files in `people/` if they exist.

5. **Write the briefing:**

```
## Meeting Prep: [Meeting Title]
**Time:** [time]
**With:** [attendee names and roles/companies]

### What you need to know
- [Key context: what's been happening with this person recently]
- [Any decisions pending or recently made]
- [Anything they've asked for or are waiting on from you]

### Open items to discuss
- [Promises you've made that are still open]
- [Blockers or issues surfaced in recent conversations]
- [Questions you need answered]

### Small talk / rapport
- [Recent things they've mentioned in chat: personal wins, interests, travel, etc.]
- [Anything notable from recent messages that shows you're paying attention]
- [Shared context: events you both attended, mutual connections, etc.]

### Watch out for
- [Anything that might come up that you're not prepared for]
- [Dropped balls or delayed deliverables they might ask about]
```

6. **Show the briefing directly** — don't save to a file.

## Important
- Don't fabricate anything. If you can't find recent activity with someone, say so.
- Keep it scannable — bullet points, not paragraphs.
- The "small talk" section is key — pull real details from recent messages so you sound plugged in without having to read everything yourself.
- If the meeting is a recurring check-in, focus on what's changed since the last one.
- For new contacts or first meetings, note what you know about them and suggest an opening angle.
- Prioritize actionable info: what should you bring up, what should you avoid, what decisions need to be made.
- **If Beeper MCP is unavailable**, skip it and note it was skipped. Don't fail the whole briefing.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
