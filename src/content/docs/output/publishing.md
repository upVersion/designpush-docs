---
title: Publishing & Exports
description: Export modes, file formats, integration guides (React, Next.js, Vanilla, SCSS, Tailwind), and dark mode setup.
---

Publishing is how you get your design tokens out of DesignPush and into your codebase. Click the **Publish** button (green, top-right toolbar) to open the Publish dialog.

---

## Two export modes

The Publish dialog offers two modes:

### Full Package (Recommended)

Downloads a complete ZIP file with everything — source tokens, compiled outputs, and folder structure ready to drop into your project.

**When to use:** First-time setup, or anytime you want a clean, complete export.

**What's included:**
- 3 source files (JSON token definitions)
- 8+ compiled output files (CSS, SCSS, JS, TS)
- Organized folder structure
- Tailwind preset (when enabled)

Click **"Download ZIP"** to generate and download.

### Select Files (Updates)

Choose specific files to download — useful when you've only changed certain tokens and don't need a full re-export.

**When to use:** Incremental updates after initial setup.

**How it works:**
1. Choose which source files and compiled outputs you want
2. Click **"Download X items"**
3. Files download individually (via File System Access API) or as a combined ZIP

#### Source files available

| File | Required | Contains |
|------|----------|---------|
| `tokens-core.json` | Yes (always included) | Primitive + semantic token definitions |
| `tokens-components.json` | Optional | Pattern + component token definitions |
| `tokens-extended.json` | Optional | User customizations, AI descriptions, extended tokens |

#### Compiled outputs available

| Folder | Contents | Format |
|--------|----------|--------|
| `build/core/` | Core token outputs | variables.css, _variables.scss, tokens.js, tokens.ts |
| `build/components/` | Component token outputs | variables.css, _variables.scss, tokens.js, tokens.ts |
| `build/tailwind/` | Tailwind CSS v3 preset | preset.js, preview.html |

---

## Download methods

### File System Access API (modern browsers)

If your browser supports the File System Access API (Chrome, Edge), each file opens a **"Save As" dialog** where you can choose exactly where to save it. This is the most convenient method for incremental updates — you can save directly into your project folder.

### ZIP fallback (all browsers)

If the File System Access API isn't available (Firefox, Safari), all selected files are bundled into a single ZIP download. A notice in the dialog lets you know which method will be used.

### Download status

The dialog shows progress during generation:
- **Publishing...** — Files are being generated
- **Success** — Download complete (dialog auto-closes after 1.5 seconds)
- **Partial** — Some files were saved before you cancelled the Save As dialog
- **Error** — Generation failed (try again)

---

## Understanding exported files

### tokens-core.json

The **source of truth** for primitive and semantic tokens. This file uses the [DTCG (Design Tokens Community Group)](https://tr.designtokens.org/format/) format.

```json
{
  "primitive": {
    "color": {
      "brand": {
        "primary": {
          "500": {
            "$value": "#0168B5",
            "$type": "color"
          }
        }
      }
    },
    "spacing": {
      "md": {
        "$value": "0.375rem",
        "$type": "dimension"
      }
    }
  },
  "semantic": {
    "color": {
      "text": {
        "primary": {
          "default": {
            "$value": "{primitive.color.brand.primary.700}",
            "$type": "color"
          }
        }
      }
    }
  }
}
```

Key properties per token:
- `$value` — The token's value (raw or reference to another token)
- `$type` — The DTCG type (color, dimension, fontFamily, etc.)
- `$description` — Human-readable description (when set)

### tokens-components.json

Pattern and component token definitions. Structure mirrors individual component configurations:

```json
{
  "patterns": {
    "button": {
      "borderRadius": {
        "$value": "{primitive.radius.md}"
      },
      "paddingX": {
        "$value": "{semantic.spacing.inset.md}"
      }
    }
  },
  "component": {
    "button": {
      "primary": {
        "background": {
          "default": {
            "$value": "{semantic.color.interactive.primary.default}"
          }
        }
      }
    }
  }
}
```

### tokens-extended.json

A supplementary file for user customizations, AI-readable descriptions, and extended configurations. This is particularly useful for:

- Storing component usage guidelines that AI tools can read
- Adding custom tokens that DesignPush doesn't natively support
- Tracking changes between exports

See [AI Workflow](/features/ai-workflow/) for how to use this file effectively.

### variables.css (core)

CSS custom properties for all primitive and semantic tokens. This is the primary integration point for most web projects.

```css
/* Primitive tokens */
:root {
  --primitive-color-brand-primary-500: #0168B5;
  --primitive-spacing-md: 0.375rem;
  --primitive-radius-md: 0.5rem;
  --primitive-typography-family-body: 'Inter', sans-serif;
}

/* Semantic tokens - light mode */
[data-theme="light"] {
  --semantic-color-text-primary-default: var(--primitive-color-brand-primary-700);
  --semantic-color-surface-neutral-subtle: var(--primitive-color-neutral-gray-50);
}

/* Semantic tokens - dark mode */
[data-theme="dark"] {
  --semantic-color-text-primary-default: var(--primitive-color-brand-primary-300);
  --semantic-color-surface-neutral-subtle: var(--primitive-color-neutral-gray-900);
}
```

Also includes `@import` rules for Google Fonts used in your design system.

### variables.css (components)

CSS custom properties for component patterns and variants:

```css
:root {
  --component-button-border-radius: var(--primitive-radius-md);
  --component-button-padding-x: var(--semantic-spacing-inset-md);
  --component-button-primary-background: var(--semantic-color-interactive-primary-default);
  --component-button-primary-text-color: var(--semantic-color-text-on-primary);
}
```

### _variables.scss

SCSS variables (both core and component). Use these if your project uses SCSS:

```scss
$primitive-color-brand-primary-500: #0168B5;
$primitive-spacing-md: 0.375rem;
$semantic-color-text-primary-default: var(--semantic-color-text-primary-default);
```

### tokens.ts / tokens.js

TypeScript and JavaScript objects for programmatic token access:

```typescript
// tokens.ts
export const tokens = {
  primitive: {
    color: {
      brand: {
        primary: {
          500: '#0168B5',
        },
      },
    },
    spacing: {
      md: '0.375rem',
    },
  },
  semantic: {
    color: {
      text: {
        primary: {
          default: 'var(--semantic-color-text-primary-default)',
        },
      },
    },
  },
} as const;
```

---

## Integration guides

### Vanilla HTML/CSS

1. Copy the `design-system/` folder into your project
2. Link the CSS in your HTML:

```html
<link rel="stylesheet" href="./design-system/build/core/variables.css">
<link rel="stylesheet" href="./design-system/build/components/variables.css">
```

3. Set the theme attribute:

```html
<html data-theme="light">
```

4. Use tokens in your CSS:

```css
.card {
  background: var(--semantic-color-surface-neutral-subtle);
  border: var(--primitive-border-width-thin) solid var(--semantic-color-border-neutral-default);
  border-radius: var(--primitive-radius-md);
  padding: var(--semantic-spacing-inset-md);
}

.card-title {
  color: var(--semantic-color-text-neutral-default);
  font-family: var(--primitive-typography-family-heading);
  font-size: var(--primitive-typography-size-lg);
}
```

### React / Vite

1. Place the `design-system/` folder in your project root
2. Import in your entry point:

```tsx
// src/main.tsx
import './design-system/build/core/variables.css';
import './design-system/build/components/variables.css';
import './App.tsx';
```

3. Set the theme in your root HTML:

```html
<!-- index.html -->
<html data-theme="light">
```

4. Use tokens via CSS or inline styles:

```tsx
// Using CSS classes
<button className="primary-button">Click me</button>

// Or inline with token imports
import { tokens } from './design-system/build/core/tokens';
<div style={{ padding: tokens.primitive.spacing.md }}>Content</div>
```

### Next.js (App Router)

1. Place the `design-system/` folder in your project root
2. Import in your root layout:

```tsx
// app/layout.tsx
import '../design-system/build/core/variables.css';
import '../design-system/build/components/variables.css';

export default function RootLayout({ children }) {
  return (
    <html data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

1. Import in `_app.tsx`:

```tsx
// pages/_app.tsx
import '../design-system/build/core/variables.css';
import '../design-system/build/components/variables.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

2. Set theme in `_document.tsx`:

```tsx
// pages/_document.tsx
<Html data-theme="light">
```

### SCSS

1. Import the SCSS variables:

```scss
// src/styles/main.scss
@import '../design-system/build/core/variables';
@import '../design-system/build/components/variables';

.button {
  padding: $primitive-spacing-md $primitive-spacing-lg;
  border-radius: $primitive-radius-md;
}
```

### TypeScript / JavaScript

For programmatic access to token values:

```typescript
import { tokens } from './design-system/build/core/tokens';

// Type-safe token access
const primaryColor = tokens.primitive.color.brand.primary['500'];
const spacing = tokens.primitive.spacing.md;
```

### Tailwind CSS

DesignPush exports a Tailwind CSS v3 preset. See the dedicated guides:

- [Tailwind CSS Preset](/tailwind/preset/) — Full setup and usage guide
- [Tailwind FAQ](/tailwind/faq/) — Common questions and troubleshooting

---

## Dark mode setup

### How it works

DesignPush uses the `data-theme` attribute on your HTML element to switch between light and dark modes:

```html
<html data-theme="light">  <!-- Light mode -->
<html data-theme="dark">   <!-- Dark mode -->
```

Your exported `variables.css` contains two blocks of semantic color definitions — one for `[data-theme="light"]` and one for `[data-theme="dark"]`. When the attribute changes, all semantic color tokens resolve to their theme-specific values automatically.

### Adding a theme toggle

```javascript
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
}

// Optional: persist preference
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Optional: load preference on page load
const saved = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
```

### What changes between themes

| Token type | Changes? | Details |
|-----------|----------|---------|
| Primitive | No | Raw values stay the same |
| Semantic colors | Yes | Each token maps to different primitive shades |
| Semantic typography | No | Type styles don't change per theme |
| Semantic spacing | No | Spacing doesn't change per theme |
| Focus tokens | Depends | Ring color may reference a semantic color that changes |
| Component tokens | Indirectly | They reference semantics, which change |

---

## Updating your design system

### Incremental updates

When you change a few tokens in DesignPush:

1. Open Publish → **Select Files**
2. Choose only the compiled outputs you need (e.g., just `build/core/` if you changed primitives)
3. Replace the files in your project
4. Restart your dev server if running (some build tools cache config files)

### Full re-export

For major changes or when unsure:

1. Open Publish → **Full Package**
2. Download the ZIP
3. Replace your entire `design-system/` folder with the new contents
4. Restart your dev server

### What not to edit manually

- **`variables.css`** — Regenerated on every export. Manual edits will be overwritten.
- **`tokens.ts` / `tokens.js`** — Auto-generated. Don't edit.
- **`_variables.scss`** — Auto-generated.

If you need custom tokens beyond what DesignPush provides, use `tokens-extended.json` for additions (see [AI Workflow](/features/ai-workflow/)) and keep your custom values in a separate CSS file.

---

## Frequently asked questions

### When should I use Full Package vs Select Files?

Use **Full Package** the first time and whenever you want a clean, complete export. Use **Select Files** for incremental updates when you know exactly which files changed. When in doubt, use Full Package — it's always safe.

### Do I need both core and components CSS?

If you're only using primitive and semantic tokens (for general styling), you only need `build/core/variables.css`. If you're also using component tokens (button patterns, badge colors, etc.), import `build/components/variables.css` as well.

### How large is the ZIP file?

Typically under 100KB. Token files are text-based and compress well.

### Can I set up CI/CD to pull tokens automatically?

Not directly from DesignPush in the current version. The recommended workflow is: export → commit to your repo → CI/CD picks up the committed files. Future versions may support API-based token delivery.

### Can I use both CSS and SCSS exports?

Yes. The CSS custom properties (`variables.css`) and SCSS variables (`_variables.scss`) can coexist. CSS custom properties are generally recommended for new projects because they support runtime theming (light/dark mode) without a rebuild.

### What's the folder structure of the ZIP?

```
design-system/
├── tokens-core.json
├── tokens-components.json
├── tokens-extended.json
├── build/
│   ├── core/
│   │   ├── variables.css
│   │   ├── _variables.scss
│   │   ├── tokens.js
│   │   └── tokens.ts
│   ├── components/
│   │   ├── variables.css
│   │   ├── _variables.scss
│   │   ├── tokens.js
│   │   └── tokens.ts
│   └── tailwind/
│       ├── preset.js
│       └── preview.html
```

### Will re-exporting break my existing code?

No, if your code uses the correct token names. Token names are stable — `--primitive-color-brand-primary-500` will always be that name. Only the *values* change. If you renamed or removed a token category in DesignPush (which isn't currently possible), that would break references.

### How do I share tokens with my team?

Export the design system, commit it to your shared repository, and have teammates pull. The token files are plain text (JSON, CSS, JS) and work well with version control. Diffs clearly show what changed between versions.

### Can I export just for a specific platform (iOS, Android)?

Not in the current version. DesignPush exports web-focused formats (CSS, SCSS, JS, TS, Tailwind). For native mobile platforms, use the JSON source files (`tokens-core.json`, `tokens-components.json`) as input for platform-specific build tools like Style Dictionary.
