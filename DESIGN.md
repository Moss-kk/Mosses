# MOSSes Portfolio — Fluid Interactive Motion & Micro-Animations

```yaml
version: "13.0.0"
name: "Fluid Interactive Motion Portfolio"
description: "Interactive portfolio featuring Continuous Floating Pill Tabs (sliding active spring pill indicator), Interactive Card Swipe Carousel (touch/drag swipe with stack physics), Smooth Scroll-Spy, and spring micro-interactions."
animations:
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  duration-fast: "200ms"
  duration-normal: "320ms"
  duration-slow: "480ms"
components:
  continuous-tabs:
    layout: "floating pill navigation"
    sliding-pill: "spring-animated active background pill"
  card-carousel:
    layout: "interactive swipeable project cards & specimen carousel"
    touch-gesture: "drag, touch swipe, keyboard navigation & pagination"
```

## Interactive Motion Features
1. **Continuous Floating Pill Tabs**: Header navigation features a floating pill container with a sliding background pill that moves with spring physics (`translateX` + `width`) upon clicking or scrolling through sections.
2. **Interactive Card Swipe / Project Carousel**: Smooth touch/drag swipeable carousel with pagination dots, next/previous buttons, and stacked card depth.
3. **Scroll Reveals**: Elements animate into view with subtle fade-and-lift transitions as they enter the viewport.
4. **Tactile Button & Card Physics**: Active press scaling, glowing focus rings, and animated project links.
