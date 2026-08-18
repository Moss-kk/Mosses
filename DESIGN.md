# MOSSes Portfolio — Sticky Header, MK Monogram & Intro TextLoop

```yaml
version: "17.0.0"
name: "MK Monogram Header & Intro TextLoop"
description: "Sticky header with refined MK monogram branding, removed static 'Hi I'm Mussie' in favor of an animated TextLoop badge ('Welcome to my portfolio', 'This is Mussie Kifle', 'Full-Stack Developer', 'AI & Systems Builder', 'What can I build for you today?'), and 3D audience TextLoop in the headline."
components:
  header:
    brand: "MK Monogram pill/badge"
    sticky: "Fixed sticky top position with high z-index and blurred warm canvas backdrop"
  hero:
    intro-loop: "font-mono TextLoop with smooth vertical slide transitions ('Welcome to my portfolio', 'This is Mussie Kifle', etc.)"
    headline-loop: "3D rotateX variants for 'Founders', 'Startups', 'Businesses', 'Design Engineers'"
```

## Updates
1. **Header Brand**: Changed from "Mussie Kifle" text to "MK" monogram badge.
2. **Sticky Header**: Guaranteed pinned sticky header at `top: 0` (`z-index: 999`).
3. **Intro TextLoop**: Replaced static intro with animated `TextLoopBasic` cycling through portfolio welcome and Mussie's engineering identity.
