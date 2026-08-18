# MOSSes Portfolio — 3D TextLoop Variants & Rebuilt Hero

```yaml
version: "16.0.0"
name: "3D TextLoop Variants Hero"
description: "Rebuilt hero headline featuring Framer Motion 3D TextLoop variants: Initial (translateY 20px, rotateX 90deg, opacity 0, blur 4px) -> Animate (translateY 0, rotateX 0, opacity 1, blur 0) -> Exit (translateY -20px, rotateX -90deg, opacity 0, blur 4px) with spring physics and auto-width tracking."
components:
  hero:
    headline: "I build software for [Founders / Startups / Businesses / Design Engineers]"
    text-loop:
      variants:
        initial: "y: 20px, rotateX: 90deg, opacity: 0, filter: blur(4px)"
        animate: "y: 0px, rotateX: 0deg, opacity: 1, filter: blur(0px)"
        exit: "y: -20px, rotateX: -90deg, opacity: 0, filter: blur(4px)"
      spring: "stiffness 900, damping 80, mass 10"
```

## Rebuilt Hero Architecture
1. **Headline**: `I build software for <TextLoop: Founders • Startups • Businesses • Design Engineers>`
2. **3D Rotation & Blur**: Real 3D `rotateX` perspective with progressive Gaussian blur clearing.
3. **Width Interpolation**: The wrapper width smoothly expands/contracts to match the active word.
