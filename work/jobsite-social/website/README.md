# Jobsite Social — Marketing Website

Next.js 15 (App Router) implementation of the Jobsite Social marketing site,
built from the Claude Design handoff bundle.

## Stack

- Next.js 15 + React 18 + TypeScript
- `next/font` for Bebas Neue, Oswald, Source Sans 3
- `lucide-react` icons (stroke 2.5)
- Vanilla CSS variables for design tokens (no Tailwind)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Layout (cream-primary direction)

The site alternates light sections with one dark anchor:

| Section       | Background              |
| ------------- | ----------------------- |
| Nav           | White                   |
| Hero          | Clean white (lightest)  |
| Stat bar      | Drywall `#F2F2F0`       |
| How It Works  | **Jobsite Black** anchor |
| Pricing       | White                   |
| Testimonials  | Cream `#EAEAE4`         |
| Contact       | White (form on cream)   |
| Footer        | Drywall                 |

Design tokens live in `app/globals.css`. Component-level inline styles match the
handoff prototype 1:1 — refactor into CSS modules later if the site grows.
