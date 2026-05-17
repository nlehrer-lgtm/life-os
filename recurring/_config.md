# Recurring System — Config

Settings used by `/sync-recurring`, `/done`, and `/add-recurring`. Edit by hand if you want to change defaults — the skills parse this file on every run.

---

## Calendar

- **Target calendar ID:** _pending — populated after personal calendar is shared to work account_
- **Target calendar account:** `nlehrer@gmail.com` (personal)
- **MCP-connected account:** `nlehrer@messengerinternational.org` (work) — events written to the personal calendar via the share that grants the work account "Make changes to events" permission.

## Email

- **Prep packets sent TO:** `nlehrer@gmail.com` (personal inbox)
- **Sent FROM:** `nlehrer@messengerinternational.org` (work — Gmail MCP is connected there)

## Default prep leads by category

When a task doesn't specify its own `**Prep lead:**`, these defaults apply:

| Category | Prep lead |
|---|---|
| Spouse anniversary | 30 days |
| Spouse birthday | 21 days |
| Valentine's Day / Christmas / Mother's Day / Father's Day | 21 days |
| Kids' birthdays | 14 days |
| Parents and siblings birthdays | 10 days |
| Friends and colleagues birthdays | 7 days |
| Date nights | 7 days |
| Big chores (tires, HVAC service, registration, inspection) | 14 days |
| Standard chores (filters, oil change) | 7 days |
| Routine chores (trash, lawn) | 1 day |

## Relationship → prep-lead mapping

When pulling birthdays/anniversaries from `people/*.md`, the skill uses the person's `**Relationship:**` field to pick a default:

- Contains "wife" / "husband" / "spouse" → **Spouse birthday** / **Spouse anniversary**
- Contains "son" / "daughter" / "kid" → **Kids' birthdays**
- Contains "mom" / "dad" / "father" / "mother" / "stepmom" / "stepdad" / "parent" → **Parents and siblings birthdays**
- Contains "brother" / "sister" / "sibling" → **Parents and siblings birthdays**
- Anything else (friend, colleague, mentor, mentee, new connection) → **Friends and colleagues birthdays**

## Loose-ends cleanup nudge

- **Cadence:** weekly
- **Day:** Sunday
- **Delivery:** email to personal account
- **Detection rule:** task whose `Next due` has passed by ≥ 1 day, with no `Last done` date on or after that `Next due`. (Meaning: the calendar event fired, but the task wasn't marked done.)
- **Email format:** one short email listing all loose ends from the past week, with quick reply syntax (`/done <task>`).
