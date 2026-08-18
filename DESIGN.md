# MOSSes Portfolio — Engineering Design System

```yaml
version: "2.0.0"
name: "Editorial Engineering"
description: "Mobile-first, high-precision editorial engineering portfolio. Dark near-black canvas with warm amber accent, strict 0px-to-8px geometry, and complete mobile viewport responsiveness."
colors:
  bg: "#0e0e0d"
  surface: "#171715"
  surface-raised: "#20201d"
  fg: "#f5f2eb"
  fg-subtle: "#cfcac2"
  fg-muted: "#8e8e86"
  accent: "#d49a3d"
  accent-hover: "#e5a93c"
  accent-glow: "rgba(212, 154, 61, 0.2)"
  border: "#2a2a27"
  border-light: "#3a3a37"
typography:
  display: "'Barlow', 'Space Grotesk', -apple-system, sans-serif"
  body: "'Barlow', 'Space Grotesk', -apple-system, sans-serif"
  mono: "'JetBrains Mono', 'IBM Plex Mono', monospace"
layout:
  mobile-first: true
  mobile-pad: "1rem"
  desktop-pad: "1.5rem"
  max-width: "1240px"
```

## Architecture & Principles

1. **Mobile-First Viewport System**:
   - Base CSS defines full-width (`width: 100%`) single-column layouts with consistent padding (`1rem` / `16px`).
   - Breakpoints (`768px` tablet, `1024px` desktop) progressively enhance into multi-column asymmetric layouts.
   - Zero horizontal overflow; zero half-width squished containers.

2. **Visual Identity**:
   - Technical, credible, editorial, and engineering-driven.
   - Near-black canvas (`#0e0e0d`), dark surfaces (`#171715`), warm cream text (`#f5f2eb`), and restrained warm amber/bronze accent (`#d49a3d`, 5–10% of UI).
   - Abstract technical engineering schematic (coordinate crosshairs, MK monogram, system modules) replacing any personal photos.

3. **Content Hierarchy**:
   - **Hero**: Mussie Kifle · Software Engineer · AI Product Builder · Mechatronics Engineer.
   - **Philosophy**: Engineering × Software × AI (Systems-Level Architecture, Applied AI & Automation, Production Full-Stack Agility).
   - **Features (3 Core Pillars)**:
     - `01 // SOFTWARE ENGINEERING`
     - `02 // AI + AUTOMATION`
     - `03 // ENGINEERING + ROBOTICS`
   - **Featured Projects**:
     - Flagship: `01 ADDIS FOODIE`, `02 SADOR DENTAL`, `03 EAGLE INVESTMENTS AI`
     - Secondary: `04 SPECIAL DAY`, `05 AYCHE MART`, `06 ALELGN DESIGN`
   - **Experience & Education**:
     - Eagle Investments (Co-Founder & AI Product Development)
     - Phoenixopia & Independent Development (4+ Years Development Experience)
     - AASTU B.Sc. Mechatronics Engineering (2023–2027, Expected Graduation: 2027)
   - **Additional Expertise**: Photography & Visual Storytelling (3+ years), Brand & Graphic Design.
   - **Final Contact**: LET'S BUILD SOMETHING. Direct email, phone, Telegram, LinkedIn, and GitHub.
