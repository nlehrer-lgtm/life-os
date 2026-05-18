---
name: jobsite-social-design
description: Use this skill to generate well-branded interfaces and assets for Jobsite Social, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Jobsite Social is a Middle Tennessee social media content company serving blue-collar trades. The brand pairs industrial grit (black + gold, all-caps display type, sharp corners) with no-BS, tradesperson-respectful copy.

## Core files

- `colors_and_type.css` — all design tokens as CSS variables. **Always `@import` this first.**
- `assets/logo-tight.png` — primary wordmark for light backgrounds.
- `assets/logo-tight-dark.png` — wordmark for dark backgrounds (JOBSITE becomes white).
- `preview/` — per-token preview cards. Skim these to see the system in context.
- `ui_kits/website/` — full React recreation of the marketing site; copy components and adapt.

## Rules to never break

- Headlines are **ALL CAPS** — Bebas Neue display or Oswald 700. Tight tracking on display, wide on buttons (0.08em).
- **0px border-radius** by default. 2–4px max. Never rounded buttons.
- **Gold is an accent, not a background.** Pair gold with black for maximum brand impact.
- **No gradients, no emoji, no stock photography, no serifs.**
- Body copy uses second person ("your shop", "your crew"). Active voice. Short sentences.

## When invoked

If the user invokes this skill without other guidance, ask them what they want to build or design, ask a few clarifying questions (audience, surface, fidelity, content), then act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

For visual artifacts (slides, mocks, throwaway prototypes), copy assets out of `assets/` and create static HTML files. For production code, copy the relevant tokens and component patterns and adapt them to the target framework.
