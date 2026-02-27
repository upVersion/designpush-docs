---
title: Tailwind Preset FAQ
description: Common questions about setup, colors, dark mode, typography, spacing, motion, breakpoints, framework integration, and updating the DesignPush Tailwind preset.
---

**NOTE: Coming soon** — Tailwind CSS integration has been feature-flagged pending further testing and will be rolled out at a later date.

---

Common questions about setting up, using, and troubleshooting the DesignPush Tailwind preset.

---

## Setup

### How do I install the preset?

Three steps:

1. Copy the `build/tailwind/` folder into your project.
2. Register it in `tailwind.config.js`:

```js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
}
```

3. Import `variables.css` in your CSS entry point (required for semantic colors):

```css
@import '../design-system/build/core/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Do I need to install any npm packages?

No. The preset is a plain `.js` file with no dependencies. It works with any standard Tailwind v3 setup.

### Does the preset work with Tailwind v4?

Not directly. The preset uses `module.exports` (CommonJS), which is the Tailwind v3 config format. Tailwind v4 replaces JavaScript config with a CSS-first `@theme` directive.

For Tailwind v4, use the CSS variables export (`build/core/variables.css`) instead. Map the variables into your `@theme` block:

```css
@import './design-system/build/core/variables.css';

@theme {
  --color-brand-primary-500: var(--primitive-color-brand-primary-500);
  --spacing-md: var(--primitive-spacing-md);
  /* ... */
}
```

### Does the preset replace Tailwind's default theme or extend it?

It **replaces** it. The preset uses `theme` (not `theme.extend`), so Tailwind's built-in colors, spacing, and other defaults are removed. This is intentional — your design system becomes the single source of truth.

If you need values that aren't in your design system, add them via `theme.extend` in your own config:

```js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  theme: {
    extend: {
      maxWidth: { prose: '65ch' },
    },
  },
}
```

### I've already built my app with Tailwind. Can I drop in the preset?

Partially — it depends on how your existing classes are named. The preset uses `theme` (not `theme.extend`), which **replaces** Tailwind's defaults. If your app uses default classes like `bg-blue-500`, `p-4`, `text-gray-700`, those stop working because those values no longer exist in the theme.

The token names are also different:

| Tailwind default | DesignPush preset |
|---|---|
| `bg-blue-500` | `bg-brand-primary-500` |
| `p-4` | `p-xl` |
| `text-gray-700` | `text-neutral-gray-700` |

You have two options:

**Option 1: Keep defaults alongside (recommended for existing projects)**

Use `theme.extend` in your config instead of `presets`, so default Tailwind classes still work and you can gradually adopt the DesignPush classes:

```js
const preset = require('./design-system/build/tailwind/preset');

module.exports = {
  theme: {
    extend: preset.theme,  // merges on top, doesn't replace
  },
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
}
```

This lets you use `bg-blue-500` and `bg-brand-primary-500` side by side while you migrate.

**Option 2: Full migration**

Use the preset as-is (which replaces defaults), then find-and-replace your old class names to the new token names across your codebase. Bigger upfront effort, but your entire app is then driven by your design system with no stale default classes.

### I'm starting a new build. How does the preset work with AI coding tools like Claude?

Set up the preset once in your `tailwind.config.js` and you're done. From that point on, you (or any AI assistant like Claude) just write standard Tailwind utility classes — but those classes output your DesignPush token values.

Claude doesn't need to know anything about DesignPush. It writes `bg-brand-primary-500`, `font-heading`, `p-xl`, `rounded-md`, `shadow-elevation-2` — normal Tailwind syntax. The preset maps those classes to your actual colors, fonts, spacing, shadows, etc.

The one thing to do is **give Claude the preset file or README as context** so it knows the available class names. Instead of defaulting to `bg-blue-500` (which won't exist), it will use `bg-brand-primary-500` because that's what's defined in the theme.

In practice this means:
1. Export your design system from DesignPush
2. Drop `preset.js` into your project and register it in `tailwind.config.js`
3. Share `preset.js` or `README.md` with Claude as project context
4. Ask Claude to build your UI — it writes Tailwind classes, your design tokens do the rest

### How do I verify the preset loaded correctly?

Log the theme keys:

```js
const preset = require('./design-system/build/tailwind/preset');
console.log(Object.keys(preset.theme));
// → ['colors', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', ...]
```

Or open `preview.html` in a browser to visually confirm your tokens are correct.

---

## Colors

### Why do semantic color classes render as transparent?

You're missing the CSS variables import. Semantic colors like `text-semantic-text-neutral-default` reference CSS custom properties (`var(--semantic-color-text-neutral-default)`) that are defined in `variables.css`. Without that file loaded, the variables don't exist and the browser falls back to transparent.

Fix: add `@import '../design-system/build/core/variables.css';` before the Tailwind directives in your CSS entry point.

### What's the difference between primitive and semantic colors?

**Primitive colors** are resolved to literal hex values in the preset (`#4F46E5`). They work without any CSS variable dependency. Use them for fixed, theme-independent colors.

```html
<div class="bg-brand-primary-500">Always this exact color</div>
```

**Semantic colors** are CSS variable references (`var(--semantic-color-*)`). They adapt when you switch between light and dark themes. Use them for UI surfaces, text, and borders that should respond to the theme.

```html
<div class="bg-semantic-surface-neutral-subtle">Adapts to light/dark</div>
```

### How do I use brand colors vs feedback colors vs neutral colors?

- **Brand**: `bg-brand-primary-500`, `text-brand-secondary-300`, `border-brand-accent-700`
- **Feedback**: `bg-feedback-error-500`, `text-feedback-success-600`, `border-feedback-warning-300`
- **Neutral**: `bg-neutral-gray-100`, `text-neutral-gray-800`, `border-neutral-gray-300`

Each palette has shades from 50 to 950. Neutral also includes `white` and `black`.

### Can I use Tailwind's default color names like `red-500` or `blue-500`?

No. The preset replaces Tailwind's default color palette entirely. Use the palette names from your design system instead (e.g. `brand-primary-500`, `feedback-error-500`). This prevents accidental use of off-brand colors.

---

## Dark mode

### How does dark mode work with this preset?

Through CSS custom properties, not Tailwind's `dark:` variant. Your `variables.css` defines semantic color values for both `[data-theme="light"]` and `[data-theme="dark"]` selectors. The preset references those variables, so semantic colors update automatically when you change the `data-theme` attribute.

```html
<html data-theme="light">  <!-- or "dark" -->
```

### How do I toggle themes with JavaScript?

```js
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
}
```

### Can I use Tailwind's `dark:` variant alongside the preset?

Yes. Add this to your config:

```js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
}
```

Now `dark:bg-neutral-gray-900` activates when `data-theme="dark"` is set. This is useful for one-off overrides that aren't covered by semantic tokens.

### Do primitive colors change in dark mode?

No. Primitive colors are hard-coded hex values. Only semantic colors (prefixed with `semantic-`) respond to theme changes.

---

## Typography

### Why aren't my fonts rendering?

The preset provides font family names but not the font files. You need to load the fonts yourself. Two options:

**Option A**: Import `variables.css`, which includes a Google Fonts `@import`:

```css
@import '../design-system/build/core/variables.css';
```

**Option B**: Add a `<link>` tag in your HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONT:wght@400..700&display=swap" rel="stylesheet">
```

Check `preview.html` to see which fonts your design system uses.

### What font utility classes are available?

Depends on your design system, but typically:

- `font-display` — display/hero font
- `font-heading` — heading font
- `font-body` — body text font
- `font-mono` — monospace/code font

### Why do font size classes use `clamp()`?

DesignPush generates fluid font sizes that scale between viewport widths. The `clamp()` function ensures text is readable on small screens without being oversized on large screens. This is handled automatically — just use `text-base`, `text-lg`, `text-2xl`, etc.

---

## Spacing & Layout

### What spacing classes are available?

Your design system defines a spacing scale. Common tokens:

| Class | Example |
|---|---|
| `p-zero` | `padding: 0rem` |
| `p-xs` | `padding: 0.125rem` |
| `p-sm` | `padding: 0.25rem` |
| `p-md` | `padding: 0.375rem` |
| `p-lg` | `padding: 0.5rem` |
| `p-xl` | `padding: 0.75rem` |
| `p-2xl` | `padding: 1rem` |
| `p-3xl` | `padding: 1.5rem` |
| `p-4xl` | `padding: 2rem` |

The exact values depend on your token configuration. Check `preview.html` for the current scale.

### Can I still use arbitrary values like `p-[24px]`?

Yes. Tailwind's arbitrary value syntax works independently of the preset. Use it for one-off values that don't exist in your design system.

### Why don't Tailwind's default spacing values (p-4, p-8) work?

The preset replaces Tailwind's default spacing scale with your design system's named tokens (`p-sm`, `p-md`, `p-lg`, etc.). Numeric spacing like `p-4` is not included unless your design system defines a `4` spacing token.

---

## Shadows & Effects

### How do I use shadow classes?

Shadow tokens use elevation naming:

```html
<div class="shadow-elevation-1">Subtle lift</div>
<div class="shadow-elevation-3">Card</div>
<div class="shadow-elevation-5">Modal overlay</div>
```

The number of elevation levels depends on your design system. Check `preview.html` for the full list.

### Are opacity and z-index tokens included?

Yes. Opacity tokens use `alpha-` naming: `opacity-alpha-0`, `opacity-alpha-25`, `opacity-alpha-50`, `opacity-alpha-75`, `opacity-alpha-100`.

Z-index tokens use `layer-` naming: `z-layer-base`, `z-layer-10`, `z-layer-50`, `z-layer-max`.

---

## Motion & Transitions

### How do I use duration and easing tokens?

Combine them with Tailwind's `transition-*` utilities:

```html
<button class="transition-colors duration-fast ease-standard hover:bg-brand-primary-600">
  Hover me
</button>
```

Available durations typically include: `instant`, `fast`, `base`, `moderate`, `slow`, `slower`.

Available easings typically include: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `standard`, `decelerate`, `accelerate`, `bounce`.

Check `preview.html` to see the exact values and hover to preview each curve.

---

## Breakpoints

### What breakpoint prefixes are available?

Depends on your design system, but typically:

| Prefix | Width |
|---|---|
| `xs:` | 320px |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

```html
<div class="p-md md:p-xl lg:p-2xl">Responsive padding</div>
```

### Do these replace Tailwind's default breakpoints?

Yes. The preset replaces the default `sm`, `md`, `lg`, `xl`, `2xl` breakpoints with values from your design system. In most cases the values are similar, but your design system may also add extra breakpoints like `xs`.

---

## Preview page

### What is `preview.html`?

A self-contained HTML page bundled with the preset that visually showcases every token in your design system — colors, typography, spacing, radii, shadows, motion, and breakpoints. Open it in any browser. No build step, no dev server.

### Why does preview.html need an internet connection?

It loads the Tailwind Play CDN (`cdn.tailwindcss.com`) to generate utility classes on the fly. Without a connection, the Tailwind classes won't render (but the page layout will still display since it uses plain CSS for structure).

### Can I use preview.html in production?

No. It's a development/review tool. The Tailwind Play CDN is not intended for production use. For production, use the preset in your normal Tailwind build pipeline.

### The preview looks wrong / missing sections

The preview is generated dynamically from your token structure. If a section is missing, that token category doesn't exist in your design system. For example, if you haven't defined shadow tokens, the Shadows section won't appear.

---

## Framework integration

### Next.js

```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

```css
/* app/globals.css */
@import '../design-system/build/core/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Vite + React

```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}
```

```css
/* src/index.css */
@import '../design-system/build/core/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Astro

```js
// tailwind.config.mjs
import preset from './design-system/build/tailwind/preset.js';

export default {
  presets: [preset],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
}
```

```css
/* src/styles/global.css */
@import '../design-system/build/core/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Can I use the preset with CSS-in-JS libraries (styled-components, Emotion)?

The preset is a Tailwind config — it doesn't directly integrate with CSS-in-JS. However, you can access the resolved token values from the preset file directly:

```js
const preset = require('./design-system/build/tailwind/preset');
const colors = preset.theme.colors;
// colors.brand.primary['500'] → '#4F46E5'
```

Or use the CSS variables from `variables.css`, which work in any styling approach.

---

## Updating & workflow

### How do I update the preset after changing tokens?

1. Re-export from DesignPush (Full Package or select `build/tailwind/`).
2. Replace the `build/tailwind/` folder in your project.
3. Restart your dev server (Tailwind reads the config on startup).

Your existing utility classes pick up the new values automatically.

### Can I edit `preset.js` by hand?

You can, but your changes will be overwritten on the next export. If you need to extend the theme, do it in your `tailwind.config.js` via `theme.extend` instead.

### Do I need to re-export if I only changed semantic color values?

If you only changed the light/dark values for existing semantic tokens, you only need to re-export `variables.css` (in `build/core/`). The preset references semantic colors by CSS variable name, not by value, so `preset.js` doesn't change.

If you added or removed semantic token keys, you need to re-export both `preset.js` and `variables.css`.

### What tokens are NOT included in the preset?

Pattern-level tokens, component-level tokens, semantic typography composites, semantic spacing aliases, focus ring tokens, and transition composites. These are too component-specific for a Tailwind config. Use the CSS variables export or the component CSS for those.
