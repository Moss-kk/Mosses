# MOSSes Portfolio — Text Loop, Scramble & Interactive Card Swipe Motion

```yaml
version: "14.0.0"
name: "Text Loop, Scramble & Card Swipe Portfolio"
description: "Interactive portfolio featuring TextLoop / TextScramble character decoding in Hero, Continuous Floating Pill Tabs with spring sliding indicator, Mobile Side-Scroll CardSwipe for Services, Projects & Experience with active dot pagination, and 3D spring hover physics."
components:
  text-loop-scramble:
    phrases:
      - "Hi, I'm Mussie — Full-Stack Developer & AI Builder"
      - "Custom Web Apps • Next.js & Supabase"
      - "AI Workflows & Telegram Bots"
      - "End-to-End Business Automation"
    animation: "character scramble decrypt + fade slide transition"
  card-swipe-mobile:
    sections: ["Services & Capabilities", "Featured & Supporting Projects", "Work Experience"]
    behavior: "touch swipe, drag constraint, scroll-snap & active dot indicator tracking"
  continuous-tabs:
    layout: "floating pill navigation with spring-animated active indicator"
```

## Motion Design Guidelines
1. **Hero Text Scramble & Loop**: Cycles through introduction and key service capabilities with a matrix/decrypt character scramble transition.
2. **Mobile CardSwipe**: Services, Projects, and Work Experience support horizontal touch-swipe gestures with active dot pagination indicators on mobile.
3. **Card Physics**: 3D tilt perspective, smooth spring hover lifting, and tactile click states.
