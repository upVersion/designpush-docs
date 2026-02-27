---
title: Primitive Tokens
description: All 13 primitive token categories — Color, Typography, Spacing, Radius, Border Width, Shadow, Opacity, Duration, Easing, Breakpoint, Layout, Z-Index, and Icon.
---

Primitive tokens are the raw design values in your system — colors, sizes, spacing, shadows, and more. They define *what values exist* without prescribing *where to use them*. Everything else in your design system builds on top of these primitives.

Select **Primitive** in the sidebar to see all 13 categories.

---

## Color

The Color showcase is where you define your brand identity. It organizes colors into three palette groups: **Brand**, **Feedback**, and **Neutral**.

### Brand palettes

You get three brand palettes:

- **Primary** — Your main brand color (buttons, links, key UI elements)
- **Secondary** — Supporting brand color (accents, secondary actions)
- **Accent** — Highlight color (badges, emphasis, decorative elements)

Each palette contains shades from **50** (lightest) to **950** (darkest). 

### Editing a color

DesignPush uses the OKLCH color space for perceptually uniform color generation, with a familiar interface:

1. **Saturation/brightness field** —  — A gradient area where you drag to select saturation (horizontal) and brightness (vertical) for the current hue
2. **Hue slider** — A rainbow spectrum bar below the field to select hue across the full 360-degree range
3. **Color history** — Up to 5 recent colors shown as circular swatches for quick reuse
4. **Hex input** — Type an exact hex value (e.g., #3A9691) — DesignPush converts it to OKLCH internally to ensure consistent lightness and contrast across your palette
5. **Cancel / Save** — Dismiss or confirm your selection


### Shade generation

When you change a 500 shade, DesignPush will auto-generate the full shade scale. This creates a perceptually balanced ramp from light (50) to dark (950) based on the shade you edited.

### Feedback palettes

Four feedback palettes communicate system states:

- **Success** — Positive outcomes (default green tones)
- **Warning** — Caution states (amber/yellow tones)
- **Error** — Error states (red tones)
- **Info** — Informational states (blue tones)

These work identically to brand palettes — same shade range, same editing controls.

### Neutral palette

The neutral palette provides grays for text, borders, backgrounds, and subtle UI elements. It includes shades from 50 to 950. 

Neutral has two controls:

- **Hue slider** (0-360 degrees) — Tint your grays with a subtle color (warm grays, cool grays, etc.)
- **Saturation slider** (0-20%) — Control how much color tint the grays carry

A saturation of 0 gives you pure grays. Bumping it to 5-10% and choosing a hue near your brand color gives you harmonious, slightly tinted grays.

**white** and **black** tokens are included automatically in the neutral palette.  These are non-editable, and included for selection in semantic color tokens 

### Accessibility matrix

The Color showcase includes an **Accessibility** tab that evaluates WCAG contrast ratios between foreground and background color combinations. Use this to check and verify that your palette choices meets W3C accessibility standards.

### Export format

Color tokens export as CSS custom properties:
```css
--primitive-color-brand-primary-500: #0168B5;
--primitive-color-feedback-error-500: #df3e3e;
--primitive-color-neutral-gray-700: #404343;
```

---

## Typography

Typography controls define the text appearance across your design system.

### Font families

Four font slots are available:

| Slot | Purpose | Example |
|------|---------|---------|
| **Display** | Hero text, large headings | Playfair Display |
| **Heading** | Section headings (H1-H6) | Instrument Sans |
| **Body** | Paragraph text, UI labels | Inter |
| **Mono** | Code, technical content | JetBrains Mono |

Click any font slot to change it. You can select from your font library or open the **Font Manager** to add new fonts. See [Fonts](/features/fonts/) for the full font management workflow.

### Font size scale

Font sizes are generated mathematically from two core settings:

- **Scale ratio** — The multiplier between each step in the type scale. Options range from Minor Second (1.125) through Perfect Fourth (1.333). Higher ratios create more dramatic contrast between heading and body sizes; lower ratios keep things tighter and more uniform.
- **Base size** — The starting point for the scale (default 16px). All other sizes are calculated relative to this value.

The generated scale produces sizes from `xs` through `6xl`.

#### Fluid typography

When **Enable Fluid Typography** is toggled on, each size is output as a `clamp()` value that scales smoothly between a minimum and maximum size based on viewport width. You control this with four inputs:

- **Min Size / Max Size** — The floor and ceiling for the base font size (e.g., 14px–18px). All other scale steps adjust proportionally.
- **Min Viewport / Max Viewport** — The viewport breakpoints where scaling begins and ends (e.g., 320px–1920px). Below the min, fonts hold at their smallest size. Above the max, they hold at their largest. Between the two, they scale linearly.

When fluid typography is disabled, sizes are output as static values instead of `clamp()` functions.

#### Display units

The **Display as Px** toggle switches the preview between `px` and `rem` values. This is a display preference only — it doesn't affect the underlying token output.

#### Preview font

The **Preview Font** dropdown lets you toggle the scale preview between your heading and body font selections so you can see how the scale looks with each typeface.

### Font weights

Standard, non-editable weight tokens from **Thin** (100) to **Black** (900):

| Token | Value |
|-------|-------|
| thin | 100 |
| extralight | 200 |
| light | 300 |
| regular | 400 |
| medium | 500 |
| semibold | 600 |
| bold | 700 |
| extrabold | 800 |
| black | 900 |

### Line heights

Control vertical rhythm with named line-height tokens:

| Token | Preset value |
|-------|--------------|
| none | 1 |
| tight | 1.25 |
| snug | 1.375 |
| normal | 1.5 |
| relaxed | 1.625 |
| loose | 2 |

### Letter spacing

Fine-tune character spacing:

| Token | Preset value |
|-------|--------------|
| tighter | -0.05em |
| tight | -0.025em |
| normal | 0em |
| wide | 0.025em |
| wider | 0.05em |
| widest | 0.1em |

### Export format

```css
--primitive-typography-family-heading: 'Instrument Sans', sans-serif;
--primitive-typography-size-base: clamp(0.875rem, 0.825rem + 0.25vw, 1.125rem);
--primitive-typography-weight-bold: 700;
--primitive-typography-lineheight-normal: 1.5;
--primitive-typography-letterspacing-tight: -0.025em;
```

---

## Spacing

Spacing tokens define the whitespace scale used throughout your design system.

### Named scale

| Token | Description |
|-------|-------------|
| zero | No spacing (0) |
| xs | Extra small |
| sm | Small |
| md | Medium (base) |
| lg | Large |
| xl | Extra large |
| 2xl | 2x extra large |
| 3xl | 3x extra large |
| 4xl | 4x extra large |
| 5xl | 5x extra large |
| 6xl | 6x extra large |

### Scale configuration

You can control how the scale is generated:

- **Scale type** — Choose between linear, geometric, or fibonacci progressions
- **Base unit** — The foundational spacing value that the scale builds from
- **Display unit** — Toggle between `px` and `rem` display (the exported values use `rem`)

Visual bars show the relative size of each spacing token, making it easy to see the progression.

### Export format

```css
--primitive-spacing-xs: 0.125rem;
--primitive-spacing-sm: 0.25rem;
--primitive-spacing-md: 0.375rem;
--primitive-spacing-lg: 0.5rem;
--primitive-spacing-xl: 0.75rem;
```

---

## Radius

Radius tokens control corner rounding on UI elements. The scale ranges from sharp corners to fully rounded:

| Token | Description |
|-------|-------------|
| zero | No rounding (sharp corners) |
| xs | Barely rounded |
| sm | Slightly rounded |
| md | Medium rounding |
| lg | Noticeably rounded |
| xl | Very rounded |
| 2xl | Heavily rounded |
| full | Fully circular (50% / 9999px) |

Each token shows a visual preview of its corner radius. You can toggle the display between `px` and `rem`.

### Export format

```css
--primitive-radius-sm: 0.25rem;
--primitive-radius-md: 0.5rem;
--primitive-radius-full: 9999px;
```

---

## Border Width

Border width tokens define the thickness of borders and dividers:

| Token | Description |
|-------|-------------|
| none | No border (0) |
| thin | Subtle border (typically 1px) |
| regular | Standard border |
| medium | Emphasized border |
| thick | Heavy border |

Toggle between `px` and `rem` display. Each token has a description field where you can note its intended use.

### Export format

```css
--primitive-border-width-none: 0;
--primitive-border-width-thin: 1px;
--primitive-border-width-regular: 1.5px;
```

---

## Shadow

Shadow tokens create depth and elevation in your UI. DesignPush provides a multi-level elevation system:

| Token | Use case |
|-------|----------|
| elevation-1 | Subtle lift (cards at rest) |
| elevation-2 | Raised elements (hover states, dropdowns) |
| elevation-3 | Floating elements (popovers, tooltips) |
| elevation-4 | High elevation (modals, dialogs) |
| elevation-5 | Maximum elevation (toast notifications) |

Higher elevation levels use **multi-layer shadows** — elevation 2+ combines two or more shadow layers for a more realistic depth effect. Each shadow token also includes separate values for light and dark modes (dark mode shadows tend to be more pronounced).

Shadow cards show a visual preview of the shadow effect. Each token has a description field for documenting its intended use.

### Export format

```css
--primitive-shadow-elevation-1: 0px 1px 2px 0px rgba(0,0,0,0.05);
--primitive-shadow-elevation-3: 0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1);
```

---

## Opacity

Opacity tokens define transparency levels for overlays, disabled states, and subtle effects:

| Token | Value |
|-------|-------|
| alpha-0 | 0 (fully transparent) |
| alpha-5 | 0.05 |
| alpha-10 | 0.10 |
| alpha-25 | 0.25 |
| alpha-50 | 0.50 |
| alpha-75 | 0.75 |
| alpha-100 | 1.0 (fully opaque) |

Each token displays both the decimal value and the percentage equivalent. Description fields let you document the purpose (e.g., "Disabled state opacity" for alpha-50).

### Export format

```css
--primitive-opacity-alpha-0: 0;
--primitive-opacity-alpha-50: 0.5;
--primitive-opacity-alpha-100: 1;
```

---

## Duration

Duration tokens control animation and transition timing:

| Token | Typical value | Use case |
|-------|--------------|----------|
| instant | 0ms | Immediate state changes |
| fast | 100ms | Micro-interactions (hover, focus) |
| base | 200ms | Standard transitions |
| moderate | 300ms | Noticeable animations |
| slow | 500ms | Deliberate animations |
| slower | 700ms | Dramatic transitions |

Each duration card includes a **play button** that triggers an animation preview — a bar fills across the card at the specified duration, so you can see exactly how fast or slow each timing feels.

### Export format

```css
--primitive-duration-instant: 0ms;
--primitive-duration-fast: 100ms;
--primitive-duration-base: 200ms;
```

---

## Easing

Easing tokens define acceleration curves for animations and transitions:

| Token | Curve | Character |
|-------|-------|-----------|
| linear | Linear | Constant speed |
| ease | Default ease | Gentle acceleration/deceleration |
| ease-in | Ease in | Slow start, fast finish |
| ease-out | Ease out | Fast start, slow finish |
| ease-in-out | Ease in-out | Slow start, fast middle, slow finish |
| standard | Material standard | Natural feeling movement |
| decelerate | Decelerate | Objects arriving |
| accelerate | Accelerate | Objects departing |
| bounce | Bounce | Playful overshoot |

Each easing card shows an **animated dot** preview — click play to see a dot move across the card following the easing curve. The easing function values (cubic-bezier) are editable.

### Export format

```css
--primitive-easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--primitive-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## Breakpoint

Breakpoint tokens define responsive design widths:

| Token | Typical value | Device target |
|-------|--------------|---------------|
| xs | 320px | Small mobile |
| sm | 640px | Large mobile |
| md | 768px | Tablet |
| lg | 1024px | Laptop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Large desktop |

Each breakpoint shows a **responsive bar** visualization proportional to its width, along with a device label to indicate its target.

### Export format

```css
--primitive-breakpoint-xs: 320px;
--primitive-breakpoint-md: 768px;
--primitive-breakpoint-xl: 1280px;
```

---

## Layout

Layout tokens define container dimensions and grid structure, organized into two sub-tabs:

### Container widths

Named container sizes from extra-small to extra-large:

| Token | Description |
|-------|-------------|
| xs | Narrow content (e.g., login form) |
| sm | Small content area |
| md | Medium content area |
| lg | Standard page width |
| xl | Wide content area |

### Grid

Grid configuration tokens:

- **Columns** — Number of grid columns (e.g., 12)
- **Gutter** — Gap between grid columns

Visual preview bars show relative container widths.

### Export format

```css
--primitive-layout-container-md: 768px;
--primitive-layout-grid-columns: 12;
--primitive-layout-grid-gutter: 1.5rem;
```

---

## Z-Index

Z-index tokens control the stacking order of overlapping elements:

| Token | Typical value | Use case |
|-------|--------------|----------|
| layer-base | 0 | Default layer |
| layer-10 | 10 | Slightly elevated (sticky elements) |
| layer-20 | 20 | Dropdowns |
| layer-30 | 30 | Fixed elements |
| layer-40 | 40 | Modals |
| layer-50 | 50 | Popovers over modals |
| layer-max | 9999 | Toast notifications, system overlays |

The showcase includes a **stacked-planes visualization** showing how z-index layers relate to each other, making it easy to understand the stacking context.

### Export format

```css
--primitive-zindex-layer-base: 0;
--primitive-zindex-layer-10: 10;
--primitive-zindex-layer-max: 9999;
```

---

## Icon

Icon tokens control the size and stroke weight of icons in your design system, organized into two sub-tabs:

### Size

| Token | Typical value |
|-------|--------------|
| sm | 16px |
| md | 20px |
| lg | 24px |

### Stroke

| Token | Description |
|-------|-------------|
| thin | Light stroke weight |
| regular | Standard stroke weight |
| bold | Heavy stroke weight |

Each token shows a preview using sample icons (home, heart) at the specified size and stroke weight. Display toggles between `px` and `rem`.

### Export format

```css
--primitive-icon-size-sm: 1rem;
--primitive-icon-size-md: 1.25rem;
--primitive-icon-stroke-regular: 1.5;
```

---

## General editing tips

- **Every primitive token has a description field** — Use it to document the token's purpose. These descriptions are included in exports and are particularly useful for AI tools. See [AI Workflow](/features/ai-workflow/).
- **Unit display is cosmetic** — The px/rem toggle in spacing, radius, and border width showcases changes the *display* only. Exported values use the format best suited for each output (typically `rem` for CSS, raw numbers for JS/TS).
- **Changes auto-save** — Every edit is persisted automatically with a 2-second debounce. No manual save needed.
- **Token names are fixed** — You can change token *values*, but the token *names* (like `md`, `lg`, `elevation-3`) are part of the system structure and can't be renamed. This prevents downstream breakage — since semantic and component tokens reference these names, renaming a foundation token could silently break chains across your entire system.

---

## Frequently asked questions

### Can I add custom shades beyond the 50-950 range?

The shade scale (50, 100, 200, ... 900, 950) is fixed — you can't add or remove shades. However, the 500 shade is your base color, and changing it will regenerate the entire scale around that new value.

### Should I use px or rem for spacing?

Use rem. It scales with the user's browser font size settings, which is better for accessibility. DesignPush exports spacing in rem by default. The px display toggle is just for convenience while editing.

### Can I import colors from my existing brand guidelines?

Yes — paste your hex values directly into the hex input field when editing the 500 color swatch. You can paste values like `#0168B5` or `0168B5`.

### What happens if I change a primitive that semantics reference?

The change cascades automatically. If semantic tokens reference `brand-primary-500` and you change that shade, every semantic token pointing to it will resolve to the new value. This is the power of the reference chain.

### Are shadow values editable per-layer?

Shadow tokens are defined as composite values (potentially multiple layers). The current editor displays them as preset elevation levels. You can adjust the overall shadow definition for each level.
