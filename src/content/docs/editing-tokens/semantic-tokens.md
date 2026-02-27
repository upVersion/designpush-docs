---
title: Semantic Tokens
description: All 5 semantic categories — Color (with light/dark), Typography, Spacing, Focus, and Transitions.
---

Semantic tokens add **meaning** to your primitives. Instead of saying "use shade 500 of the primary palette," a semantic token says "use the primary text color." This layer of indirection is what enables theming — the same semantic token name resolves to different primitive values in light and dark mode.

Select **Semantic** in the sidebar to see all 5 categories.

---

## How semantics work

Every semantic token is an alias that **references a primitive**. You don't enter raw hex codes or pixel values — you select which primitive token it should point to.

```
semantic-color-text-primary-default
  Light mode → primitive-color-brand-primary-700  (dark shade for contrast on light bg)
  Dark mode  → primitive-color-brand-primary-300  (light shade for contrast on dark bg)
```

This reference structure means:

1. Changing a primitive automatically updates all semantics that reference it
2. Light and dark themes use the same semantic names but different primitive references
3. Your UI code always uses semantic names, never raw values

---

## Semantic Colors

The largest semantic category. Semantic colors map your primitive palettes to **purpose-driven roles** with full light/dark theme support.

### Color intents

There are 8 color intents, each representing a different purpose:

| Intent | Purpose | Typical source palette |
|--------|---------|----------------------|
| **Primary** | Main brand actions and emphasis | Brand Primary |
| **Secondary** | Supporting actions and content | Brand Secondary |
| **Accent** | Highlights and decorative elements | Brand Accent |
| **Neutral** | Default text, borders, surfaces | Neutral Gray |
| **Success** | Positive feedback, confirmations | Feedback Success |
| **Warning** | Caution states, alerts | Feedback Warning |
| **Error** | Error states, destructive actions | Feedback Error |
| **Info** | Informational content, hints | Feedback Info |

### Color roles

Each intent is available across four roles:

| Role | What it colors | Examples |
|------|---------------|---------|
| **Text** | Foreground text | Headings, labels, body copy, links |
| **Surface** | Backgrounds | Cards, panels, page backgrounds, hover states |
| **Border** | Outlines and dividers | Card borders, input outlines, separators |
| **Interactive** | Actionable elements | Button backgrounds, link colors, focus rings |

### Variants per role

Each role has multiple variants for different emphasis levels:

- **default** — Standard usage
- **subtle** — Lower emphasis (lighter backgrounds, muted text)
- **bold** — Higher emphasis (darker backgrounds, prominent text)
- Additional role-specific variants (e.g., `hover`, `muted`)

This creates a matrix of approximately 80+ semantic color tokens (8 intents x 4 roles x 2-4 variants each).

### Editing light and dark values

The semantic color editor shows **side-by-side** editing for light and dark modes. Each token has:

- A **sun icon** column for the light mode value
- A **moon icon** column for the dark mode value

For each mode, you select which primitive shade the semantic token should reference using a **dropdown**. The dropdown lists all available shades from the relevant primitive palette.

For example, `semantic-color-text-primary-default`:
- Light mode dropdown: select from brand-primary shades (50-950) — typically a dark shade like 700 for good contrast on light backgrounds
- Dark mode dropdown: select from brand-primary shades (50-950) — typically a light shade like 300 for good contrast on dark backgrounds

### Tab organization

Semantic colors are organized into tabs by palette group:

| Tab | Contains |
|-----|---------|
| **Brand** | Primary, Secondary, Accent intents |
| **Feedback** | Success, Warning, Error, Info intents |
| **Neutral** | Neutral intent (plus contrast tokens) |
| **Accessibility** | WCAG contrast evaluation matrix |

The Accessibility tab provides a contrast matrix similar to the one in [Primitive Colors](/editing-tokens/primitive-tokens/), but evaluated at the semantic level — checking that your light/dark theme mappings meet WCAG AA/AAA standards.

### Export format

```css
/* Light mode */
[data-theme="light"] {
  --semantic-color-text-primary-default: var(--primitive-color-brand-primary-700);
  --semantic-color-surface-neutral-subtle: var(--primitive-color-neutral-gray-50);
  --semantic-color-border-neutral-default: var(--primitive-color-neutral-gray-300);
}

/* Dark mode */
[data-theme="dark"] {
  --semantic-color-text-primary-default: var(--primitive-color-brand-primary-300);
  --semantic-color-surface-neutral-subtle: var(--primitive-color-neutral-gray-900);
  --semantic-color-border-neutral-default: var(--primitive-color-neutral-gray-600);
}
```

---

## Semantic Typography (Type Styles)

Semantic typography defines **composite type styles** — combinations of font family, size, weight, line height, letter spacing, and text transform that form a complete text treatment.

### Available type styles

Type styles follow a hierarchy:

| Style | Typical use |
|-------|------------|
| **H1–H6** | Heading levels |
| **Body / Paragraph** | Standard body text |
| **Caption** | Small supporting text |
| **Label** | Form labels, UI labels |

### Properties per style

Each type style configures:

| Property | Selects from |
|----------|-------------|
| **Font family** | Primitive typography families (display, heading, body, mono) |
| **Font size** | Primitive typography size scale |
| **Font weight** | Primitive typography weights |
| **Line height** | Primitive typography line heights |
| **Letter spacing** | Primitive typography letter spacing |
| **Text transform** | none, uppercase, lowercase, capitalize |

Properties left empty (`null`) inherit from the primitive configuration defaults.

### Editing type styles

Each type style appears as an expandable row. Click to expand and configure its properties using dropdown selectors that reference primitive typography tokens.

A live preview shows how the type style looks with current settings, including the font rendering at the specified size and weight.

### Export format

Type styles export as composite token objects in JSON:
```json
{
  "semantic": {
    "typography": {
      "heading": {
        "lg": {
          "fontFamily": "{primitive.typography.family.heading}",
          "fontSize": "{primitive.typography.size.2xl}",
          "fontWeight": "{primitive.typography.weight.bold}",
          "lineHeight": "{primitive.typography.lineheight.tight}",
          "letterSpacing": "{primitive.typography.letterspacing.tight}"
        }
      }
    }
  }
}
```

---

## Semantic Spacing

Semantic spacing creates **purpose-driven aliases** for your primitive spacing scale. While primitives define *what sizes exist* (xs, sm, md, lg...), semantic spacing defines *how those sizes are used*.

### Three spacing categories

| Category | Purpose | CSS analogy |
|----------|---------|-------------|
| **Stack** | Vertical spacing between elements | `margin-bottom`, `gap` (column) |
| **Inset** | Internal padding of containers | `padding` |
| **Inline** | Horizontal spacing between elements | `margin-right`, `gap` (row) |

Each category has sizes from **xs** through **xl** (or similar), and each size maps to a primitive spacing token via a dropdown selector.

### Why not use primitives directly?

You *could* use `--primitive-spacing-md` everywhere. But semantic spacing lets you:

1. **Differentiate usage** — Stack-md and Inset-md can map to different primitive values (e.g., vertical rhythm might use larger spacing than padding)
2. **Change proportions globally** — Want tighter padding everywhere? Change the Inset mappings without touching Stack or Inline
3. **Communicate intent** — `semantic-spacing-stack-md` clearly says "medium vertical spacing between blocks"

### Editing

Each spacing token shows:
- The current mapping (e.g., "→ primitive-spacing-lg")
- The resolved pixel value
- A dropdown to change which primitive it references

### Export format

```css
--semantic-spacing-stack-sm: var(--primitive-spacing-sm);
--semantic-spacing-stack-md: var(--primitive-spacing-md);
--semantic-spacing-inset-md: var(--primitive-spacing-lg);
--semantic-spacing-inline-sm: var(--primitive-spacing-sm);
```

---

## Focus

Focus tokens control the appearance of keyboard focus indicators — essential for accessibility. When users navigate with a keyboard (Tab key), focused elements need a clearly visible outline.

### Focus properties

| Token | Controls | Default |
|-------|----------|---------|
| **Ring width** | Thickness of the focus outline | 2px |
| **Ring color** | Color of the focus outline | Semantic border color (typically brand primary) |
| **Outline offset** | Gap between the element and the focus ring | 2px |
| **Ring opacity** | Transparency of the focus ring | 1.0 |

### Editing

The ring color uses a grouped dropdown with options organized by:
- **Intent variants** — Border colors from each semantic intent (primary, secondary, neutral, etc.)
- **Other** — Additional color options

This lets you pick a focus color that's consistent with your brand but distinct enough to be visible.

### Accessibility note

Focus rings are critical for accessibility compliance (WCAG 2.4.7). The default settings provide a visible focus indicator that meets accessibility standards. If you customize these values, test with keyboard navigation to ensure focus remains clearly visible against all background colors in your design system.

### Export format

```css
--semantic-focus-ringwidth: 2px;
--semantic-focus-ringcolor: var(--semantic-color-border-primary-default);
--semantic-focus-outlineoffset: 2px;
```

---

## Transitions

Semantic transitions define **named transition presets** that combine a duration and easing curve into a reusable animation style.

### Transition presets

| Preset | Typical use |
|--------|------------|
| **Slow** | Page transitions, layout shifts |
| **Base** | Standard UI transitions (dropdowns, panels) |
| **Fast** | Micro-interactions (hover, focus, button press) |
| **Color** | Color-only transitions (background, text color changes) |

### Properties per transition

Each transition has:

| Property | Selects from |
|----------|-------------|
| **Duration** | Primitive duration tokens (instant, fast, base, moderate, slow, slower) |
| **Easing** | Primitive easing tokens (standard, decelerate, accelerate, bounce, etc.) |
| **Description** | Free-text description of when to use this transition |

### Animated preview

Each transition card includes a **play button** that triggers an animation preview. A colored block animates across the card using the configured duration and easing, so you can visually evaluate how the transition feels before using it.

### Export format

Transitions export as composite tokens in JSON, referencing their primitive components:
```json
{
  "semantic": {
    "transition": {
      "fast": {
        "duration": "{primitive.duration.fast}",
        "easing": "{primitive.easing.standard}"
      }
    }
  }
}
```

---

## Frequently asked questions

### Why can't I enter a hex value directly in semantic color?

By design. Semantic tokens are *aliases* that reference primitives — they don't hold raw values. This ensures the layer architecture works correctly: change a primitive once, and it cascades through all semantics that reference it. If you need a new color value, add it to the [Primitive Color](/editing-tokens/primitive-tokens/) palette first, then reference it from the semantic layer.

### How does dark mode work at the semantic level?

Each semantic color token has **two mappings** — one for light mode and one for dark mode. Both map to primitive shades, but typically use opposite ends of the shade scale. Light mode text uses dark shades (700-900) for contrast on light backgrounds; dark mode text uses light shades (100-400) for contrast on dark backgrounds. The `[data-theme]` attribute on your HTML element controls which mapping is active.

### What if a type style property is left empty?

Empty (`null`) properties inherit from the primitive typography defaults. This is useful when you want a type style to follow the base configuration for most properties but override just one or two (e.g., set a different font weight for headings but inherit everything else).

### Can I create my own semantic categories?

Not in the current version. The five semantic categories (Color, Typography, Spacing, Focus, Transitions) are fixed. You can customize all values within these categories, but you can't add new categories like "Semantic Shadow" or "Semantic Radius."

### Should I map every semantic size to a different primitive?

Not necessarily. It's fine for `stack-md` and `inset-md` to reference the same primitive (`spacing-md`). The semantic layer exists for *when you want them to differ*, not as a requirement that they must.
