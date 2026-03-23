---
title: Tailwind CSS Integration
description: Turn your DesignPush design tokens into Tailwind CSS classes — setup guide for new builds and existing sites.
---

The DesignPush Tailwind integration turns your design tokens into custom Tailwind classes you can build with. Two files are provided:

| File | Format | For |
|---|---|---|
| `theme.css` | CSS (`@theme` block) | Bundler projects (Vite, Next, Astro) |
| `preset.js` | JavaScript (CommonJS) | HTML pages, prototypes, v3 CDN |

Both contain the same token values. The export covers **primitive and semantic tokens** — component-level tokens are handled by the dp-react component library.

---

## New build

For new projects, the theme **replaces** Tailwind's defaults entirely. Your design system is the only vocabulary — no `bg-blue-500`, no `p-4`. Just your token names.

### Bundler projects (theme.css)

```css
/* src/styles/globals.css */
@import "tailwindcss";
@import "../design-system/build/core/variables.css";
@import "../design-system/build/tailwind/theme.css";
```

Requires `tailwindcss` v4+ and `@tailwindcss/vite` (or equivalent plugin).

### Font loading (bundler only)

`variables.css` contains `@import url(...)` statements for fonts. In bundler setups, CSS `@import` chains get concatenated — those font imports end up mid-file and browsers silently ignore them.

**Fix:** Check the `README.md` in your exported `build/tailwind/` folder — it includes the exact `<link>` tags for your selected fonts. Add them to your HTML `<head>`.

This only applies to bundler setups. HTML pages load `variables.css` via a `<link>` tag, so fonts load correctly without this step.

### HTML pages (preset.js)

```html
<link rel="stylesheet" href="./design-system/build/core/variables.css">
<script>var module = { exports: {} };</script>
<script src="./design-system/build/tailwind/preset.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  var presetTheme = module.exports.theme || {};
  tailwind.config = { theme: presetTheme };
</script>
```

No build step, no npm. Works from `file://` or any static server.

**Note:** The `var module` shim is required because browsers don't have CommonJS. Load `preset.js` before the CDN so `module.exports` is populated.

### Building with AI

The intended workflow for new builds:

1. Export your design system from DesignPush
2. Set up the theme (bundler or HTML)
3. Share `theme.css` or `README.md` with Claude as project context
4. Ask Claude to build your UI — it writes Tailwind classes using your token names

Claude doesn't need to know anything about DesignPush. It sees `bg-brand-primary-500`, `font-heading`, `p-xl`, `shadow-elevation-2` — standard Tailwind syntax backed by your design tokens.

---

## Existing site

For projects already built with Tailwind, use `preset.js` with **extend** mode. This adds your DesignPush tokens alongside Tailwind's defaults — nothing breaks, and you can migrate class names gradually.

### HTML pages (preset.js, extend)

```html
<link rel="stylesheet" href="./design-system/build/core/variables.css">
<script>var module = { exports: {} };</script>
<script src="./design-system/build/tailwind/preset.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  var presetTheme = module.exports.theme || {};
  tailwind.config = { theme: { extend: presetTheme } };
</script>
```

The difference from the new build setup is `{ extend: presetTheme }` instead of just `presetTheme`. Both `bg-blue-500` (Tailwind default) and `bg-brand-primary-500` (DesignPush) work simultaneously.

### Bundler projects (theme.css)

`theme.css` uses the `@theme` directive which always replaces Tailwind's defaults — there is no extend equivalent in v4 CSS. For existing bundler projects, you have two options:

1. **Use `preset.js` via `@config`** — preserves defaults while adding your tokens:

```css
@import "tailwindcss";
@config "./tailwind.config.js";
```

```js
// tailwind.config.js
const preset = require('./design-system/build/tailwind/preset');
module.exports = {
  theme: {
    extend: preset.theme
  }
}
```

2. **Use `theme.css` and migrate** — replaces defaults, requires updating class names to use DesignPush token vocabulary.

### What migration looks like

With extend mode, nothing changes visually — your existing classes still resolve to the same values. The DesignPush classes are just *available*. Someone (you or Claude) has to start using them in the HTML for anything to look different.

| Tailwind default | DesignPush equivalent |
|---|---|
| `bg-blue-500` | `bg-brand-primary-500` |
| `p-4` | `p-xl` |
| `text-gray-700` | `text-neutral-gray-700` |
| `shadow-lg` | `shadow-elevation-3` |
| `font-sans` | `font-body` |

This isn't a mechanical find-and-replace — the mapping is semantic. `blue-500` might be your primary brand colour or it might be info/link colour. A human (or Claude) has to decide the intent.

---

## What's included

| Token category | Example utility | Namespace |
|---|---|---|
| Brand colors | `bg-brand-primary-500` | `@theme` / `theme.colors` |
| Feedback colors | `text-feedback-error-600` | `@theme` / `theme.colors` |
| Neutral colors | `border-neutral-gray-300` | `@theme` / `theme.colors` |
| Semantic colors | `bg-semantic-surface-neutral-subtle` | `@theme` / `theme.colors` |
| Font families | `font-heading`, `font-body` | `@theme` / `theme.fontFamily` |
| Font sizes | `text-sm`, `text-3xl` (fluid clamp) | `@theme` / `theme.fontSize` |
| Font weights | `font-bold`, `font-semibold` | `@theme` / `theme.fontWeight` |
| Line heights | `leading-tight`, `leading-relaxed` | `@theme` / `theme.lineHeight` |
| Letter spacing | `tracking-normal`, `tracking-wide` | `@theme` / `theme.letterSpacing` |
| Spacing | `p-md`, `gap-lg`, `m-2xl` | `@theme` / `theme.spacing` |
| Border radius | `rounded-md`, `rounded-full` | `@theme` / `theme.borderRadius` |
| Breakpoints | `sm:`, `md:`, `lg:` prefixes | `@theme` / `theme.screens` |
| Shadows | `shadow-elevation-2` | `@theme` / `theme.boxShadow` |
| Easing | `ease-standard`, `ease-bounce` | `@theme` / `theme.transitionTimingFunction` |
| Durations | `duration-fast`, `duration-base` | `:root` / `theme.transitionDuration` |
| Opacity | `opacity-alpha-50` | `:root` / `theme.opacity` |
| Z-index | `z-layer-50` | `:root` / `theme.zIndex` |
| Border widths | `border-thin`, `border-medium` | `:root` / `theme.borderWidth` |

**Primitive tokens** resolve to literal values (hex, rem, px, ms).

**Semantic tokens** use CSS variable references (`var(--semantic-color-*)`) and automatically adapt to light/dark mode.

**Note (v4 only):** Durations, opacity, z-index, and border widths are emitted as `:root` custom properties, not in `@theme`. In v4, use Tailwind's arbitrary value syntax: `duration-[--duration-fast]`, `opacity-[--opacity-alpha-50]`. In v3, these work as standard utility classes.

---

## Token preview

The export includes `preview.html` — open it in any browser to see a visual showcase of every primitive and semantic token. No build step required.

The preview includes:

- **Default TW / DesignPush toggle** — compare your tokens against Tailwind's defaults
- **Dark mode toggle** — verify semantic colors adapt correctly
- Full coverage of every exported token category

The preview uses the v3 CDN and loads `preset.js` automatically.

---

## Usage examples

### Colors

```html
<!-- Brand colors (literal hex values) -->
<div class="bg-brand-primary-500 text-white">Primary</div>
<span class="text-feedback-error-600">Something went wrong</span>
<div class="border border-neutral-gray-300">Card</div>

<!-- Semantic colors (theme-aware via CSS vars) -->
<p class="text-semantic-text-neutral-default">Body text</p>
<div class="bg-semantic-surface-neutral-subtle p-md rounded-md">
  Card content
</div>
```

### Typography

```html
<h1 class="font-heading text-3xl font-bold leading-tight">
  Heading
</h1>
<p class="font-body text-base leading-normal">
  Body text
</p>
<code class="font-mono text-sm">
  const x = 42;
</code>
```

### Spacing and radius

```html
<div class="p-2xl gap-lg">
  <button class="px-xl py-md rounded-lg">
    Click me
  </button>
</div>
```

### Shadows

```html
<div class="shadow-elevation-2">Raised card</div>
<div class="shadow-elevation-4">Modal</div>
```

### Transitions

```html
<!-- v3: direct utility classes -->
<button class="transition-colors ease-standard duration-fast
  hover:bg-brand-primary-600">
  Hover me
</button>

<!-- v4: easing is direct, duration uses arbitrary value -->
<button class="transition-colors ease-standard duration-[--duration-fast]
  hover:bg-brand-primary-600">
  Hover me
</button>
```

### Responsive

```html
<div class="p-md md:p-xl lg:p-2xl">
  Responsive padding
</div>
```

---

## Dark mode

Semantic colors respond to the `data-theme` attribute on `<html>`:

```html
<html data-theme="light">  <!-- or "dark" -->
```

Toggle with JavaScript:

```js
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
}
```

Primitive colors (brand, feedback, neutral) don't change — they're hard-coded hex values. Only `semantic-*` classes respond to the theme.

---

## Extending the theme

To add values that aren't in your design system, use a second `@theme` block (v4) or add to the config (v3):

**v4 bundler:**
```css
@import "tailwindcss";
@import "../design-system/build/core/variables.css";
@import "../design-system/build/tailwind/theme.css";

@theme {
  --max-width-prose: 65ch;
  --animate-spin: spin 1s linear infinite;
}
```

**v3 CDN:** Add properties to the config object alongside `presetTheme`.

---

## Updating

When you change tokens in DesignPush:

1. Re-export (Full Package or select `build/tailwind/`).
2. Replace the `tailwind/` folder in your project.
3. Bundler projects hot-reload automatically. HTML projects just refresh.

If you only changed semantic color values (light/dark), you only need to re-export `variables.css` — the theme references those by variable name, not value.

---

## Troubleshooting

See [Tailwind FAQ](/tailwind/faq/) for common setup issues, dark mode questions, framework-specific guides, and more.
