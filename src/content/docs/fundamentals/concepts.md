---
title: Design Token Fundamentals
description: What design tokens are, why they matter, and the three-layer architecture (primitive, semantic, component) in DesignPush.
---

Design tokens are the building blocks of every visual decision in your product. Before you start editing anything in DesignPush, it helps to understand what tokens are, why they matter, and how DesignPush organizes them.

---

## What are design tokens?

A design token is a named value that represents a single design decision. Instead of scattering raw values like `#0168B5` or `16px` throughout your code and design files, you give each value a meaningful name:

```
primitive-color-brand-primary-500 → #0168B5
primitive-spacing-md              → 0.375rem
primitive-radius-md               → 0.5rem
```

Think of tokens like variables in a spreadsheet. Change the value in one place and every cell that references it updates automatically. Tokens work the same way — change `brand-primary-500` from blue to purple, and every button, link, and header that references it updates across your entire product.

### Tokens are not just variables

CSS custom properties and SCSS variables are *mechanisms* for storing values. Design tokens are a *system* — they carry meaning, intent, and relationships. A token named `semantic-color-text-primary-default` doesn't just hold a color; it declares "this is the primary text color for default states." That semantic meaning is what makes tokens powerful for teams, automation, and AI tools.

---

## Why use design tokens?

### Consistency
Every button, card, and input uses the same spacing, colors, and typography — because they all reference the same tokens. No more "is this `#333` or `#334`?" debates.

### Speed
Change your brand color once and it propagates everywhere. Redesigns that used to take weeks become a matter of updating a few token values.

### Maintainability
Tokens create a single source of truth. Developers don't need to ask designers for hex codes. Designers don't need to audit code for drift. The tokens *are* the spec.

### Multi-platform
The same token definitions export to CSS, SCSS, JavaScript, TypeScript, and Tailwind. One set of decisions, every format your team needs.

### AI-readiness
AI coding tools work best when your design system has clear, semantic names and structured data. Tokens give AI the vocabulary to write on-brand code without guessing. DesignPush leans into this with description fields and structured exports that AI tools can read directly.

---

## The three-layer architecture

DesignPush organizes tokens into three layers. Each layer builds on the one below it:

```
┌─────────────────────────────────────────────┐
│              Component Tokens               │
│     Button, Badge, TextInput, ...           │
│     (patterns + variants + sizes)           │
├─────────────────────────────────────────────┤
│              Semantic Tokens                │
│     Color, Typography, Spacing,             │
│     Focus, Transitions                      │
│     (purpose-driven, theme-aware)           │
├─────────────────────────────────────────────┤
│              Primitive Tokens               │
│     Color, Typography, Spacing, Radius,     │
│     Shadow, Opacity, Duration, Easing, ...  │
│     (raw values, no opinion on usage)       │
└─────────────────────────────────────────────┘
```

### Layer 1: Primitives

Primitives are the raw materials. They define *what values exist* without saying *where to use them*.

| Category | Examples |
|----------|---------|
| Color | Brand palettes (primary, secondary, accent), feedback palettes (success, warning, error, info), neutral grays |
| Typography | Font families (display, heading, body, mono), font sizes, weights, line heights, letter spacing |
| Spacing | Named scale from `zero` to `6xl` |
| Radius | Corner rounding from `zero` to `full` |
| Border Width | `none` through `thick` |
| Shadow | Elevation levels 1-5 with light/dark variants |
| Opacity | Alpha values from 0 to 100 |
| Duration | Animation timing from `instant` to `slower` |
| Easing | Curves like `standard`, `decelerate`, `bounce` |
| Breakpoint | Responsive widths from `xs` to `2xl` |
| Layout | Container widths and grid configuration |
| Z-Index | Layer stacking from `base` to `max` |
| Icon | Icon sizes (sm/md/lg) and stroke weights |

Primitives are **theme-independent** — `brand-primary-500` is always the same hex value regardless of light or dark mode.

### Layer 2: Semantics

Semantic tokens add *meaning*. Instead of "use shade 500 of the primary palette," you say "use the primary text color." Semantics create a layer of indirection that enables theming.

| Category | What it defines |
|----------|----------------|
| Color | 8 color intents (primary, secondary, accent, neutral, success, warning, error, info) across text, surface, border, and interactive roles |
| Typography | Composite type styles (display, heading, body, label at multiple sizes) |
| Spacing | Purpose-driven aliases (stack = vertical, inset = padding, inline = horizontal) |
| Focus | Focus ring appearance (width, color, offset) for accessibility |
| Transitions | Named transition presets combining duration + easing |

Semantic tokens **reference primitives** — `semantic-color-text-primary-default` points to a specific shade from your brand-primary palette. The key difference: semantic tokens can have *different values* for light and dark mode.

```
Light mode:  semantic-color-text-primary-default → primitive-color-brand-primary-700
Dark mode:   semantic-color-text-primary-default → primitive-color-brand-primary-300
```

Your UI code always uses `semantic-color-text-primary-default`. The theme handles which primitive it resolves to.

### Layer 3: Components

Component tokens define the visual structure of specific UI elements. They're organized into sub-layers:

- **Patterns** — Shared structural tokens (padding, radius, gap, border width) that apply across all variants and sizes of a component
- **Variants** — Color and style differences (a primary button vs. a ghost button)
- **Sizes** — Dimensional overrides per size (sm, md, lg)

Component tokens reference semantic and primitive tokens:

```
component-button-primary-background
  → semantic-color-interactive-primary-default
    → primitive-color-brand-primary-500
      → #0168B5
```

This chain means changing your brand color cascades all the way from the primitive through semantic meaning into every primary button — automatically.

---

## Token reference chains

Every token in DesignPush can be traced from the component layer down to a raw value. Here's a real example for a primary button's background color:

```
Component layer:
  component.button.primary.background.default
  References → {semantic.color.interactive.primary.default}

Semantic layer:
  semantic.color.interactive.primary.default
  Light mode → {primitive.color.brand.primary.500}
  Dark mode  → {primitive.color.brand.primary.400}

Primitive layer:
  primitive.color.brand.primary.500
  Value → #0168B5
```

You don't need to think about these chains during everyday editing — DesignPush handles the wiring. But understanding the chain helps when you're troubleshooting ("why is this button teal?") or explaining your system to teammates.

---

## Light and dark mode

DesignPush supports light and dark themes through the `data-theme` attribute on your HTML element:

```html
<html data-theme="light">  <!-- or "dark" -->
```

Here's what changes per layer:

| Layer | Changes with theme? | How? |
|-------|-------------------|------|
| Primitive | No | Raw values stay the same |
| Semantic | Yes | Each semantic token maps to different primitives per theme |
| Component | Indirectly | Components reference semantics, which change per theme |

When you edit semantic color tokens in DesignPush, you'll see side-by-side light and dark editors. Each side independently maps to primitive palette shades. This is how you create a dark theme without touching any component code.

---

## Export file types

When you publish your design system, DesignPush generates multiple file formats from the same token definitions:

| File | Format | Use case |
|------|--------|----------|
| `tokens-core.json` | JSON (DTCG format) | Source of truth for primitive + semantic tokens |
| `tokens-components.json` | JSON | Source of truth for pattern + component tokens |
| `tokens-extended.json` | JSON | User customizations, AI instructions, changelog |
| `variables.css` | CSS custom properties | Import in any web project |
| `_variables.scss` | SCSS variables | Import in SCSS projects |
| `tokens.ts` | TypeScript | Type-safe token access in TS projects |
| `tokens.js` | JavaScript | Token access in JS projects |
| `preset.js` | Tailwind preset | Drop-in Tailwind theme replacement |

You don't need all of these. Most projects use CSS custom properties (`variables.css`) as the primary integration point, plus one or two others depending on the tech stack.

See [Publishing](/output/publishing/) for detailed integration guides.

---

## Frequently asked questions

### Do I need to use all three layers?

No. You can start with just primitives and use them directly in your code via CSS custom properties. Semantic and component layers add structure and theming support — adopt them when you're ready.

### Can I skip the semantic layer and go straight from primitives to components?

Technically yes — component tokens can reference primitives directly. But you lose theming (light/dark mode) and the semantic meaning that makes your system readable. We recommend using all three layers for any project that will have more than one theme.

### What if I only need colors and spacing?

That's fine. Edit just the Color and Spacing primitives, publish, and use the CSS variables in your project. You can add more categories later without breaking anything.

### Are these the same as "design tokens" in Figma or Style Dictionary?

Yes, they follow the same concept. DesignPush uses the [Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/) format for its JSON exports, which is the emerging standard. The tokens are compatible with tools like Style Dictionary, Tokens Studio, and other DTCG-aware tools.

### How do tokens relate to CSS custom properties?

Design tokens are the *concept* (named design decisions). CSS custom properties are one *output format*. When you publish from DesignPush, your tokens are compiled into `--primitive-color-brand-primary-500: #0168B5` and similar properties that you use in your CSS via `var(--primitive-color-brand-primary-500)`.
