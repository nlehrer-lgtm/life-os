# Jobsite Social — Design System

A complete brand system for **Jobsite Social**, a Middle Tennessee social media management company that shoots on-site content for blue-collar trades — HVAC, plumbing, electrical, landscaping, roofing, welding, auto repair.

> **The brand in one line:** Industrial grit meets modern marketing. Black + gold, all-caps display type, sharp corners, real photography. We speak the language of the trades — no jargon, no fluff.

## Sources

This system was generated from a single written brand spec plus one logo asset:

- `uploads/Jobsite-Social-Logo.png` — primary wordmark (PNG, 8309×4835, transparent BG with crop borders)

No codebase, Figma file, or screenshots were provided. Everything in this folder is derived from the spec and the logo. If you have additional materials (a website mock, real jobsite photography, voice samples, a pricing PDF), drop them in `uploads/` and re-run.

## Index

| File / folder | What it is |
|---|---|
| `README.md` | This file — brand context, content fundamentals, visual foundations, iconography |
| `SKILL.md` | Cross-compatible Agent Skill manifest |
| `colors_and_type.css` | All design tokens as CSS variables — colors, type, spacing, radii, shadows, motion |
| `assets/` | Logos (light + dark + raw upload) |
| `preview/` | Per-token preview cards (Design System tab pulls from here) |
| `ui_kits/website/` | Hi-fi React recreation of the marketing site |

---

## CONTENT FUNDAMENTALS

### Voice

The brand voice is a tradesperson, not a marketer. Short sentences. Short paragraphs. Active voice. Second person. Confident but never cocky.

**Pronouns:** `you` and `your` for the client. `we` for Jobsite Social. Never `our team` (corporate distance); always `we`.

**Casing:** Headlines are ALL CAPS — non-negotiable. Body copy is sentence case. Section labels and CTAs are ALL CAPS with wide tracking (0.08em+). Buttons are ALL CAPS.

**Punctuation:** Periods at the end of headlines for impact ("ON-SITE CONTENT. CONSISTENT POSTING."). Em dashes for asides. Avoid exclamation marks — confidence doesn't yell.

**Numerals:** Spell out one through nine in body copy. Use numerals for stats and pricing — always. Use the `+` sign liberally for stats ("50+ businesses served").

### Emoji

**Never.** Emoji is off-brand. Use Lucide icons (stroke 2.5) when an icon is needed.

### Vibe

- **Direct.** "We show up. We shoot. We post."
- **Tradesperson-respectful.** Trades are skilled labor. Talk to them like a peer, not like a customer.
- **No-BS.** No buzzwords (`leverage`, `synergy`, `elevate`, `unlock`), no agency-speak.
- **Local.** Reference Franklin, Spring Hill, Middle Tennessee, specific trades by name.

### Example headlines

- "ON-SITE CONTENT. CONSISTENT POSTING."
- "WE SHOW UP. WE SHOOT. WE POST."
- "YOUR SHOP. YOUR CREW. YOUR CONTENT."
- "GET BACK TO WORK. WE'LL HANDLE THE FEED."
- "REAL WORK. REAL CONTENT."
- "BUILT FOR BUSINESSES THAT BUILD."

### Example body

> We handle social media for blue-collar businesses. We show up to your shop, capture real photos and videos of your team at work, and keep your accounts active with regular posts. No hassle. No learning curves. Just hand it off and get back to work.

### Tone, do and don't

| Do | Don't |
|---|---|
| "We show up and shoot." | "Content will be captured by our team." |
| "Hand it off and get back to work." | "Leverage our turnkey content solution." |
| "Your shop. Your crew. Your content." | "We'll partner with you on your journey." |
| "We post 3 times a week. Every week." | "We'll help you maintain a consistent posting cadence." |

---

## VISUAL FOUNDATIONS

### Palette

Two brand colors do the heavy lifting. Everything else is a neutral.

- **Jobsite Black** `#221E1F` — primary text, headlines, nav, footer. Slightly warm vs true black.
- **Jobsite Gold** `#F4C046` — accent. CTAs, pricing callouts, eyebrows, section accents, stat numerals. **Never** a large-area background.
- **True Black** `#000000` for dominant dark sections (hero, footer, contact). Distinct from Jobsite Black — used as a deep canvas, not as text.
- **Drywall** `#F2F2F0` for light canvas (slightly warm). Alternates with white and true black for vertical rhythm.

Imagery has a **warm, golden-hour** cast. Tennessee sunlight. Shop incandescents. No cool grading, no over-saturation.

### Type

Three families, each with one job. No serifs anywhere. No script. No decorative faces.

- **Bebas Neue** — display. H1, stat numerals, pricing numbers. All caps, tight tracking (-0.01em). Industrial weight. Never for body.
- **Oswald** — headings, navigation, buttons. Condensed sans, 500/600/700. The workhorse.
- **Source Sans 3** — body, captions, form labels. The only humanist face — provides readability without softening the system.

### Spacing & layout

- 4px base scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 100 · 120.
- Section padding: **80–100px vertical** on desktop. Generous vertical rhythm, dense horizontal content within sections.
- Max content width: 1200px, 12-column grid, 20px gutters.

### Backgrounds & surfaces

- **No gradients, no patterns, no textures.** Solid colors only. The signature pattern is rhythm: dark / light / dark / light sections.
- Hero, footer, and conversion sections use **true black**. Mid sections alternate white and Drywall.
- **Photography is full-bleed** with dark overlays (50–70% black) when text sits on top.

### Corner radii

**0px by default.** 2px or 4px max for special cases. Anything rounder than 4px reads as off-brand. Sharp corners are part of the identity.

### Borders

- 1px `#D4D4D4` (Wire) for hairline dividers and light-section card outlines.
- 2px `#221E1F` for secondary buttons on light surfaces.
- 2px `#FFFFFF` for secondary buttons on dark surfaces.
- 4px gold left accent on Do/Don't callouts (single-color, never paired with rounded corners).

### Shadows

Flat-leaning. Industrial brands don't float.

- `none` — default for everything.
- `0 1px 0 rgba(0,0,0,0.04)` — barely-there separator.
- `0 2px 8px rgba(0,0,0,0.06)` — soft card lift on light surfaces.
- `0 8px 24px rgba(0,0,0,0.10)` — modals only.

No inner shadows on inputs. No glow effects ever.

### Transparency & blur

- **Used sparingly.** The only transparent overlay is a 50–70% black scrim on hero photography to keep text legible.
- No frosted glass / backdrop-filter blur. The brand is solid, not ethereal.

### Hover states

Color shifts. No transforms.

- **Gold buttons** lighten to `#F7CE6A` on hover, darken to `#D9A52E` on press.
- **Dark buttons** lighten from `#221E1F` to `#333333`.
- **Secondary buttons** invert: transparent → filled with the border color.
- **Nav links** flip white → gold.
- No scale (`transform: scale(1.05)`). No drop-shadow growth. No bounce.

### Press / active states

Color darkens one step. No size change.

### Motion

- 200–300ms ease-out for color and border transitions.
- Scroll reveals: simple opacity + 16px translateY. No parallax, no slide-from-side, no spring.
- Hero demo video can autoplay muted on desktop — provide pause control.
- **Movement is functional, not decorative.** If a transition doesn't communicate state change, don't add it.

### Cards

- **On light surfaces:** white background, 1px Wire border, 0px or 2px radius, optional `shadow-card`.
- **On dark surfaces:** Asphalt `#1A1A1A` background, no border, no shadow.
- Internal padding: 24–32px.
- Gold accent strip on the top edge for stepped/numbered cards (1px–3px tall).

### Imagery vibe

- **Real jobsites, real people, real work.** Hands on tools, sparks flying, pipe being fitted.
- **Warm white balance, golden-hour bias.** Lean into Tennessee sunlight and shop incandescents.
- **High contrast** — deep shadows, bright highlights. Not flat, not over-graded.
- **Hands over faces.** Focus on the craft. Wide environmental shots for context (shop, truck, jobsite).
- **No stock photography. Ever.**

---

## ICONOGRAPHY

**System:** [Lucide](https://lucide.dev/) at stroke-width **2.5**, default 22–24px in UI, 26–32px in cards. Bold and geometric — never thin or wispy.

**Why Lucide:** Open source, MIT, large coverage, the heavier stroke pairs naturally with Oswald and Bebas. Loaded from CDN: `https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js`.

**Color rules:**
- White on dark backgrounds.
- Jobsite Black on light backgrounds.
- Jobsite Gold for emphasis and interactive states.
- Never multi-color or gradient icons.

**Sizing:**
- Inline body icons: 16–18px, stroke 2.5.
- Button icons: 18px, stroke 2.5.
- Standalone icons in cards/process steps: 26–32px in a 48–56px solid square (black or gold).

**Other glyphs:**
- **Emoji:** never.
- **Unicode chars as icons:** never — we have Lucide.
- **Custom SVG:** acceptable when a Lucide icon doesn't exist (e.g. a specific trade tool). Match the 2.5px stroke and geometric construction.
- **The corner brackets** from the logo (`⌐` top-left gold, `¬` bottom-right black) are a brand motif — reuse them as framing elements around photography, video thumbnails, and CTAs.

**Substitution note:** No project-native icon set was provided. If the user introduces a custom icon library later, swap Lucide out here and update `ui_kits/website/components-core.jsx`.

---

## Font substitution flag ⚠️

No `.ttf`/`.woff2` files were provided for Bebas Neue, Oswald, or Source Sans 3. The system pulls all three from **Google Fonts** at runtime (see `colors_and_type.css`). All three faces are available there:

- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (weight 400)
- [Oswald](https://fonts.google.com/specimen/Oswald) (weights 400, 500, 600, 700)
- [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) (weights 400, 600, 700)

**If you license web fonts elsewhere** (Adobe, Hoefler, foundry direct), drop the files into `fonts/` and replace the `@import` at the top of `colors_and_type.css` with `@font-face` declarations.

---

## UI Kits

| Product | Folder | What's in it |
|---|---|---|
| Marketing site | `ui_kits/website/` | Click-through hi-fi recreation of the public site. Nav, hero, stat bar, 3-step process, pricing, testimonials, contact, footer. React + Babel, no build step. |

The website kit is the only product surface defined so far. If you add a client portal (calendar of scheduled posts, draft approvals, content library) or a mobile shooter app, create a new kit under `ui_kits/`.

---

## Working with this system

1. Always start by `@import`ing `colors_and_type.css` at the top of your stylesheet.
2. Use semantic tokens (`var(--fg-primary)`, `var(--accent)`) over raw hex when possible.
3. When in doubt, look at `preview/` — every token has a card showing it in context.
4. When introducing a new component, copy a similar pattern from `ui_kits/website/components-sections.jsx` rather than starting from scratch.
