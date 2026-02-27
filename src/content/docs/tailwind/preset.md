---
title: Tailwind CSS Preset
description: Complete guide to the DesignPush Tailwind v3 preset — installation, usage examples, dark mode, extending, and updating.
---

**NOTE: Coming soon** — Tailwind CSS integration has been feature-flagged pending further testing and will be rolled out at a later date.

---

DesignPush exports a ready-to-use Tailwind CSS v3 preset that maps your design tokens directly into Tailwind's theme system. Instead of maintaining a separate `tailwind.config.js` by hand, you get a single `preset.js` file that stays in sync with every change you make in the DesignPush editor.

## What the preset contains

The preset populates Tailwind's `theme` object with values drawn from your primitive and semantic token layers:

| Tailwind key | Token source | Example output |
|---|---|---|
| `colors.brand.*` | Primitive brand palettes | `'#0168B5'` |
| `colors.feedback.*` | Primitive feedback palettes | `'#df3e3e'` |
| `colors.neutral.*` | Primitive neutral palette | `'#6E7272'` |
| `colors.semantic.text.*` | Semantic text colors | `'var(--semantic-color-text-primary-default)'` |
| `colors.semantic.surface.*` | Semantic surface colors | `'var(--semantic-color-surface-neutral-subtle)'` |
| `colors.semantic.border.*` | Semantic border colors | `'var(--semantic-color-border-neutral-default)'` |
| `colors.semantic.interactive.*` | Semantic interactive colors | `'var(--semantic-color-interactive-primary-default)'` |
| `fontFamily` | Typography families | `['Instrument Sans', 'sans-serif']` |
| `fontSize` | Typography scale | `'clamp(0.875rem, 0.825rem + 0.25vw, 1.125rem)'` |
| `fontWeight` | Typography weights | `'600'` |
| `lineHeight` | Line heights | `'1.5'` |
| `letterSpacing` | Letter spacing | `'-0.025em'` |
| `spacing` | Spacing scale | `'0.375rem'` |
| `borderRadius` | Radius scale | `'0.5625rem'` |
| `borderWidth` | Border widths | `'1px'` |
| `screens` | Breakpoints | `'768px'` |
| `boxShadow` | Elevation shadows | `'0px 4px 4px 0px rgba(0,0,0,0.06), ...'` |
| `opacity` | Opacity scale | `'0.5'` |
| `zIndex` | Z-index layers | `'50'` |
| `transitionDuration` | Duration tokens | `'300ms'` |
| `transitionTimingFunction` | Easing curves | `'cubic-bezier(0.4, 0.0, 0.2, 1)'` |

### How values are resolved

**Primitive tokens** are resolved to literal values (hex colors, rem, px, ms). This means your Tailwind classes work out of the box without any CSS variable dependency.

**Semantic colors** are emitted as `var(--semantic-color-*)` references. This is intentional: semantic colors change between light and dark themes via the `[data-theme]` attribute on your HTML element. Using CSS variables here means `bg-semantic-surface-neutral-subtle` automatically adapts when the user switches themes.

### What is not included

Pattern-level tokens, component-level tokens, semantic typography composites, semantic spacing aliases, focus ring tokens, and transition composites are excluded. These are too component-specific for a general-purpose Tailwind config.

---

## Token preview

The export includes a `preview.html` file alongside the preset. Open it in any browser to see a visual showcase of your design tokens — colors, typography, spacing, radii, shadows, motion, and breakpoints — all rendered with the actual Tailwind classes from your preset. No build step required.

The preview loads three sibling files automatically:

- `./preset.js` — your theme config (via a `module.exports` shim)
- `../core/variables.css` — CSS custom properties and Google Fonts `@import`
- Tailwind Play CDN — generates utilities on the fly

---

## Downloading the preset

### Option A: Full package export

1. Open the **Publish** dialog in DesignPush.
2. Select **Full Package**.
3. Click **Download ZIP**.
4. The preset is at `build/tailwind/preset.js` inside the ZIP.

### Option B: Selective export

1. Open the **Publish** dialog.
2. Select **Select Files**.
3. Check **build/tailwind/** under Compiled Outputs.
4. Click **Download**. You'll get a `tailwind.zip` containing `preset.js` and `preview.html`.

---

## Installation

### 1. Place the preset in your project

Copy the `tailwind/` folder into your design system directory. A typical location:

```
your-project/
├── design-system/
│   └── build/
│       ├── core/
│       │   └── variables.css
│       └── tailwind/
│           ├── preset.js
│           ├── preview.html
│           └── README.md
├── src/
├── tailwind.config.js
└── package.json
```

### 2. Register the preset

Open your `tailwind.config.js` and add the preset:

```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
}
```

That's it. Tailwind now uses your design tokens as its theme.

### 3. Load the CSS variables (required for semantic colors)

Semantic colors reference CSS custom properties that are defined in `variables.css`. You must import this file in your CSS entry point:

```css
/* src/styles/globals.css */
@import '../design-system/build/core/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Without this import, semantic color classes like `text-semantic-text-primary-default` will render as transparent because the CSS variables they reference won't exist.

---

## Usage examples

### Primitive colors

Primitive colors are resolved to hex values. Use them with the palette name and shade:

```html
<!-- Brand primary at shade 500 -->
<div class="bg-brand-primary-500 text-white">Primary</div>

<!-- Feedback error at shade 600 -->
<span class="text-feedback-error-600">Something went wrong</span>

<!-- Neutral gray -->
<div class="border border-neutral-gray-300">Card</div>
```

### Semantic colors

Semantic colors live under a `semantic` namespace and adapt to the current theme:

```html
<!-- Text that follows the theme -->
<p class="text-semantic-text-neutral-default">Body text</p>

<!-- Surface that follows the theme -->
<div class="bg-semantic-surface-neutral-subtle p-md rounded-md">
  Card content
</div>

<!-- Border that follows the theme -->
<div class="border border-semantic-border-neutral-default">
  Bordered element
</div>
```

### Spacing, radius, and borders

Spacing tokens map directly to Tailwind's spacing utilities (`p-`, `m-`, `gap-`, `w-`, `h-`):

```html
<div class="p-2xl gap-lg">
  <button class="px-xl py-md rounded-lg border-regular">
    Click me
  </button>
</div>
```

### Typography

Font families, sizes, and weights map to their respective Tailwind utilities:

```html
<h1 class="font-heading text-3xl font-bold leading-tight tracking-normal">
  Heading
</h1>
<p class="font-body text-base font-normal leading-normal">
  Body text
</p>
<code class="font-mono text-sm">
  const x = 42;
</code>
```

### Shadows and elevation

Shadow tokens use the elevation naming from your design system:

```html
<div class="shadow-elevation-2">Raised card</div>
<div class="shadow-elevation-4">Modal</div>
```

### Transitions

Duration and easing tokens map to Tailwind's transition utilities:

```html
<button class="transition-colors duration-fast ease-standard hover:bg-brand-primary-600">
  Hover me
</button>
```

### Responsive breakpoints

Breakpoint tokens map to Tailwind screen prefixes:

```html
<div class="p-md md:p-xl lg:p-2xl">
  Responsive padding
</div>
```

---

## Dark mode

The preset supports dark mode through CSS custom properties, not through Tailwind's built-in `dark:` variant. Here's how it works:

1. Your `variables.css` defines semantic color values for both `[data-theme="light"]` and `[data-theme="dark"]` selectors.
2. The preset references those variables with `var(--semantic-color-*)`.
3. When you switch the `data-theme` attribute, all semantic colors update automatically.

### Setting up theme switching

```html
<!-- Light mode (default) -->
<html data-theme="light">

<!-- Dark mode -->
<html data-theme="dark">
```

Toggle with JavaScript:

```js
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
}
```

All `semantic-*` color classes will respond to the theme change with no extra CSS or Tailwind configuration.

### Using Tailwind's dark: variant alongside

If you also want to use Tailwind's `dark:` prefix for non-semantic overrides, add this to your config:

```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
}
```

Now `dark:bg-neutral-gray-900` will activate when `data-theme="dark"` is set.

---

## Extending the preset

The preset uses `theme` (not `theme.extend`), which means it replaces Tailwind's defaults entirely with your design system. This is intentional for brand consistency. If you need to add values that aren't in your design system, extend them in your own config:

```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-system/build/tailwind/preset')],
  theme: {
    extend: {
      maxWidth: {
        prose: '65ch',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
}
```

Values in `theme.extend` are merged on top of the preset without overwriting it.

---

## Updating the preset

When you change tokens in DesignPush:

1. Re-export the package (Full Package or select `build/tailwind/`).
2. Replace `preset.js` in your project.
3. Restart your dev server if it's running (Tailwind reads the config on startup).

No other changes are needed. Your existing utility classes will pick up the new values automatically.

---

## Troubleshooting

See [Tailwind FAQ](/tailwind/faq/) for common setup issues, dark mode questions, framework-specific guides, and more.
