# Broadside Design System

```yaml
version: "alpha"
name: "Broadside"
description: "Broadside — Dark editorial canvas with a single fire orange accent and bilingual Latin/Chinese/Amharic type stack. Barlow typography. near-black newspaper canvas with warm cream text and a single fire-orange headline. Best for brand manifesto, founder vision deck, magazine / cultural pitch. AI-ready design system."
colors:
  primary: "#111111"
  secondary: "#1a1a18"
  tertiary: "#f0ece5"
  neutral: "#e85d26"
  surface: "#282826"
  accent: "#888880"
typography:
  h1:
    fontFamily: Barlow
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: Barlow
    fontSize: 1rem
    fontWeight: 400
spacing:
  sm: 1.5rem
  md: 3.0rem
  lg: 6.0rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px
```

## Overview

The broadside is the oldest form of mass communication design. Before newspapers existed as we know them, single-sheet broadsides were plastered across city walls — urgent, loud, impossible to ignore. They announced executions, political upheaval, and market prices with equal typographic fury. Everything was hierarchy: massive wood-type headlines dominating the sheet, body text crammed below in tight columns.

What made broadsides work wasn't subtlety. It was the raw collision of scale. A 72-point headline next to 8-point body copy creates tension that still feels electric. The near-black ink on cheap paper, punctuated by a single spot color for emphasis — that's where the fire orange enters. Not decorative. Functional. A visual alarm bell.

Modern editorial design owes everything to this lineage. The broadside taught us that typography IS the interface. No imagery needed. No illustration required. Just letterforms doing violent, beautiful work at extreme scales.

- **Density:** 5/10 — Balanced
- **Variance:** 6/10 — Dynamic
- **Motion:** 7/10 — Kinetic
- **Style:** Newspaper Editorial, Dark, Dramatic, Graphic
- **Keywords:** Newspaper editorial, near-black, fire orange, Barlow, broadside, bilingual, high contrast, dramatic
- **Era:** 2020s Design Studio
- **Light/Dark:** ✗ None / ✓ Full

## Color Tokens

- **--bg:** `#111111` — Primary near-black canvas
- **--bg-alt:** `#1a1a18` — Column panels, secondary surfaces, link focus
- **--fg:** `#f0ece5` — Warm cream editorial text
- **--accent:** `#e85d26` — Fire orange (functional alarm bell & headline spot color)
- **--border:** `#282826` — Structural hairline rules & column dividers
- **--muted:** `#888880` — Metadata, captions, technical labels
- **--surface:** `#1e1e1c` — Card containers & elevated blocks

## Typography System

- **Display / Hero:** Barlow (Weight 700-900), tight tracking, extreme scale contrast
- **Body:** Barlow (Weight 400), 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** Barlow (Weight 500-600), 0.875rem, letter-spacing +0.05em
- **Monospace:** IBM Plex Mono — Code, system metrics, dates, coordinates

## Layout Rules

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Corner Radius:** Strict `0px` sharp geometry across buttons, cards, images, modals.
- **Section vertical gaps:** `clamp(4rem, 8vw, 8rem)`.
- **Top Accent Line:** `2px solid #e85d26` across viewport top & major section mastheads.
- **Columns:** Asymmetrical editorial broadside grid with zig-zag feature breakdowns.
