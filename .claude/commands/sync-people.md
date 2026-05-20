Sync people and relationships from communications into `people/` markdown files.

## Steps

1. **Get today's date.**

2. **Read existing people files** — glob `people/*.md` to understand what's already tracked. Note each person's name, relationship, and last contact date.

3. **Determine search window**:
   - If `people/` is empty (first run): search the **last 30 days** to seed initial files.
   - If people files exist: search the **last 24 hours** only.

4. **Pull data from all available sources** in parallel:

   - **Gmail**: Search `in:inbox after:YYYY/M/D` and `in:sent after:YYYY/M/D` for personal and professional emails. Look for external contacts (not automated/newsletter senders). Read email content for context, not just subject lines.
   - **Google Calendar**: Pull today's events from all calendars. Note who you're meeting with.
   - **Beeper**: Search for conversations across all connected platforms. Paginate through all pages. Skip gracefully if unavailable.
   - **Today's digest**: Read `digests/YYYY-MM-DD.md` if it exists. Extract any people mentions.

   If a source isn't connected or returns an error, skip it gracefully.

5. **Identify people** — from all sources, build a list of contacts. Recognize:
   - **Family**: from CLAUDE.md context
   - **Friends**: personal conversations, social plans, catch-ups
   - **Colleagues**: professional interactions
   - **New Connections**: recent introductions, first-time contacts
   - Skip: automated emails, newsletters, services, bots

6. **For each identified person**, create or update `people/{first-last}.md`:

   - **File naming**: kebab-case first-last (e.g., `people/john-doe.md`)
   - **New files**: use the template below
   - **Existing files**: only append new information. Update "Last Contact". **Never delete or overwrite previous entries.**

### Template for people files

```markdown
# {Full Name}

**Relationship:** Friend | Family | Colleague | Mentor | New Connection
**Email:** email or "Unknown"
**Company/Role:** where they work or "Unknown"
**How We Met:** context or "Unknown"
**Location:** city if known or "Unknown"

## About
One-liner on who they are.

## Shared Interests
- Topics, activities in common

## History
- [Date] What happened, key context

## Last Contact
[Date] — [Channel] — [Brief summary]
```

7. **Verify sources checked** — before finishing, list every source and confirm it was checked:
   - Gmail (inbox + sent): checked / nothing new / skipped (reason)
   - Beeper: checked / nothing new / skipped (reason)
   - Google Calendar: checked / nothing new / skipped (reason)
   - Today's digest: checked / doesn't exist

   **If any source was not checked, go back and check it before proceeding.**

8. **Summary** — show:
   - Sources checked (with verification)
   - New people files created
   - Existing people files updated (what changed)
   - Any contacts that were ambiguous or skipped

## Important

- **Never fabricate information.** If you can't determine how you know someone, use "Unknown" rather than guessing.
- **Never delete previous entries** in existing people files. Only append and update.
- **Family members are recognized** from CLAUDE.md. Set their relationship to "Family" automatically.
- **If Beeper MCP is unavailable**, skip it and note it was skipped. Don't fail the whole sync.
- **Keep it tight** — bullet points, not paragraphs. Facts, not commentary.
- **Focus on real relationships** — skip one-off transactional contacts (support agents, delivery notifications, etc.).


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
