---
title: Tailwind Theme FAQ
description: Common questions about setup, colors, dark mode, typography, spacing, motion, breakpoints, framework integration, and updating the DesignPush Tailwind theme.
---

Common questions about setting up, using, and troubleshooting the DesignPush Tailwind theme.

---

## Setup

### New build or existing site?

- **New build**: Use the theme in **replace** mode. Your design system is the only vocabulary — Tailwind's default classes like `bg-blue-500` or `p-4` are not available. See [New build setup](/tailwind/preset/#new-build).
- **Existing site**: Use `preset.js` in **extend** mode. Your DesignPush tokens are added alongside Tailwind's defaults. Nothing breaks, migrate gradually. See [Existing site setup](/tailwind/preset/#existing-site).

### How do I install the theme?

Depends on your project type. See the [main guide](/tailwind/preset/#new-build) for step-by-step setup for both bundler and HTML projects.

### Do I need to install any npm packages?

For bundler projects (theme.css), you need `tailwindcss` v4+ installed. For HTML projects (preset.js + v3 CDN), nothing to install.

### Does the theme work with Tailwind v3?

Yes — via `preset.js`. The export includes both `theme.css` (v4) and `preset.js` (v3). The v3 CDN approach works for both new builds and existing sites.

---

## Replace vs extend

### What's the difference?

**Replace** (`theme: presetTheme`): Your design system is the complete theme. Tailwind's built-in classes (`bg-blue-500`, `p-4`, `font-sans`) don't exist. Only your token names work. Best for new builds.

**Extend** (`theme: { extend: presetTheme }`): Your tokens are added alongside Tailwind's defaults. Both `bg-blue-500` and `bg-brand-primary-500` work. Best for existing sites.

### Does theme.css (v4) support extend mode?

No. The `@theme` directive always replaces Tailwind's defaults. For extend mode with a v4 bundler, use `preset.js` via `@config`:

```js
// tailwind.config.js
const preset = require('./design-system/build/tailwind/preset');
module.exports = {
  theme: { extend: preset.theme }
}
```

### Can I use Tailwind's default color names like `red-500` or `blue-500`?

In **replace** mode (new build): No. The theme replaces Tailwind's default palette entirely.

In **extend** mode (existing site): Yes. Default classes keep working alongside DesignPush classes.

### Why don't `p-4`, `p-8` work?

In **replace** mode: The theme replaces Tailwind's numeric spacing with named tokens (`p-sm`, `p-md`, `p-lg`).

In **extend** mode: They still work. Both `p-4` and `p-md` are available.

---

## Colors

### Why do semantic color classes render as transparent?

You're missing `variables.css`. Semantic colors reference CSS custom properties defined there.

**Bundler**: Add `@import '../design-system/build/core/variables.css';` before the theme import.

**HTML**: Add `<link rel="stylesheet" href="./design-system/build/core/variables.css">` to `<head>`.

### What's the difference between primitive and semantic colors?

**Primitive colors** are literal hex values. They don't change with the theme.

```html
<div class="bg-brand-primary-500">Always this exact color</div>
```

**Semantic colors** are CSS variable references. They adapt to light/dark mode.

```html
<div class="bg-semantic-surface-neutral-subtle">Adapts to light/dark</div>
```

### How do I use brand vs feedback vs neutral colors?

- **Brand**: `bg-brand-primary-500`, `text-brand-secondary-300`, `border-brand-accent-700`
- **Feedback**: `bg-feedback-error-500`, `text-feedback-success-600`, `border-feedback-warning-300`
- **Neutral**: `bg-neutral-gray-100`, `text-neutral-gray-800`, `border-neutral-gray-300`

Each palette has shades from 50 to 950. Neutral also includes `white` and `black`.

---

## Dark mode

### How does dark mode work?

Through CSS custom properties. Your `variables.css` defines semantic color values for both `[data-theme="light"]` and `[data-theme="dark"]` selectors. The theme references those variables, so semantic colors update automatically.

```html
<html data-theme="light">  <!-- or "dark" -->
```

### How do I toggle themes with JavaScript?

```js
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
}
```

### Do primitive colors change in dark mode?

No. Only `semantic-*` classes respond to theme changes.

---

## Typography

### Why aren't my fonts rendering?

The theme provides font family names but not the font files. `variables.css` includes `@import url(...)` statements that load them — but in **bundler setups** (Vite, Next, Astro), CSS `@import` chains get concatenated and those font imports end up mid-file where browsers silently ignore them.

**Fix for bundler setups:** Check the `README.md` in your exported `build/tailwind/` folder — it includes the exact `<link>` tags for your selected fonts. Add them to your HTML `<head>`.

**HTML setups** (`<link>` tag loading) work without this step.

### What font classes are available?

Depends on your design system, but typically: `font-display`, `font-heading`, `font-body`, `font-mono`.

### Why do font sizes use `clamp()`?

DesignPush generates fluid font sizes that scale between viewport widths. Just use `text-base`, `text-lg`, `text-2xl` — the fluid scaling is automatic.

---

## Spacing & layout

### What spacing classes are available?

Named tokens instead of numbers. Common scale:

| Class | Typical value |
|---|---|
| `p-zero` | 0rem |
| `p-xs` | 0.125rem |
| `p-sm` | 0.25rem |
| `p-md` | 0.375rem |
| `p-lg` | 0.5rem |
| `p-xl` | 0.75rem |
| `p-2xl` | 1rem |
| `p-3xl` | 1.5rem |
| `p-4xl` | 2rem |

Exact values depend on your tokens. Check `preview.html` for the current scale.

### Can I use arbitrary values like `p-[24px]`?

Yes. Tailwind's arbitrary value syntax always works, regardless of the theme.

---

## Shadows & effects

### How do I use shadow classes?

```html
<div class="shadow-elevation-1">Subtle lift</div>
<div class="shadow-elevation-3">Card</div>
<div class="shadow-elevation-5">Modal overlay</div>
```

### Are opacity and z-index tokens included?

Yes. In v3 they work as standard utilities (`opacity-alpha-50`, `z-layer-50`). In v4 they're `:root` properties and use arbitrary value syntax (`opacity-[--opacity-alpha-50]`, `z-[--z-layer-50]`).

---

## Motion & transitions

### How do I use duration and easing tokens?

**v3 (preset.js):** Both work as direct utility classes:
```html
<button class="transition-colors ease-standard duration-fast">Hover me</button>
```

**v4 (theme.css):** Easing works directly, duration uses arbitrary value syntax:
```html
<button class="transition-colors ease-standard duration-[--duration-fast]">Hover me</button>
```

---

## Breakpoints

### What breakpoint prefixes are available?

Typically: `xs:` (320px), `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px).

In replace mode, these are the *only* breakpoints. In extend mode, they're added alongside any defaults with the same names (values from your design system take precedence).

---

## Preview page

### What is `preview.html`?

A self-contained page that showcases every primitive and semantic token — colors, typography, spacing, radii, shadows, motion, breakpoints. Open in any browser, no build step needed.

Includes a **Default TW / DesignPush** comparison toggle and **dark mode** toggle.

### Why does it need an internet connection?

It loads the Tailwind v3 CDN to generate utility classes on the fly.

### Can I use it in production?

No. It's a development/review tool. Use the theme in your normal build pipeline for production.

### The preview covers primitive and semantic tokens only

Component-level tokens (patterns, variants, sizes) are not included — those are handled by the dp-react component library.

---

## Framework integration

### Next.js

```css
/* app/globals.css */
@import "tailwindcss";
@import "../design-system/build/core/variables.css";
@import "../design-system/build/tailwind/theme.css";
```

### Vite + React

```css
/* src/index.css */
@import "tailwindcss";
@import "../design-system/build/core/variables.css";
@import "../design-system/build/tailwind/theme.css";
```

### Astro

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "../design-system/build/core/variables.css";
@import "../design-system/build/tailwind/theme.css";
```

### CSS-in-JS (styled-components, Emotion)?

The `@theme` custom properties are on `:root`, so you can access them in any approach:

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-brand-primary-500');
```

---

## Updating

### How do I update after changing tokens?

1. Re-export from DesignPush.
2. Replace the `build/tailwind/` folder.
3. Dev server hot-reloads automatically.

### Can I edit theme.css by hand?

You can, but changes are overwritten on next export. Extend via a second `@theme` block instead.

### Do I need to re-export if I only changed semantic color values?

Only re-export `variables.css` (in `build/core/`). The theme references semantic colors by variable name, not value.

If you added or removed semantic token keys, re-export both.

### What tokens are NOT in the theme?

Pattern-level tokens, component-level tokens, semantic typography composites, semantic spacing aliases, focus ring tokens, and transition composites. These are handled by the dp-react component library.
