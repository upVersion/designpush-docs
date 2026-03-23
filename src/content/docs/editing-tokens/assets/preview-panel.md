---
title: Preview Panel
description: Live component preview, 10 preview pages, background colors, fullscreen mode, and auto-sync with sidebar navigation.
---

The Preview Panel shows live component previews rendered with your current token values. It's the fastest way to see how your design decisions look in practice — without leaving the editor.

---

## Opening and closing the preview

Click the **Preview** button in the toolbar (eye icon) to toggle the preview panel. When open, it slides in as the third column on the right side of the editor.

- **Eye icon** with "Preview" label = preview is hidden (click to show)
- **Eye-off icon** with "Preview" label = preview is visible (click to hide)

The preview button also highlights when the panel is open, providing a visual indicator of its state.

---

## Preview pages

The preview panel contains 10 pages, each showcasing different aspects of your design system:

| Page | What it shows |
|------|--------------|
| **Overview** | A combined view of key components and tokens |
| **Buttons** | All button variants, sizes, and states |
| **Badges** | All badge intents, styles, and sizes |
| **Form Controls** | Text inputs, textareas, and form elements |
| **Typography** | Heading and body type styles rendered at all sizes |
| **Colors** | Your full color palette (primitive and semantic) |
| **Spacing** | Spacing scale visualization |
| **Surfaces** | Background and surface color combinations |
| **Navigation** | Navigation patterns and tab components |
| **Overlays** | Modal, tooltip, and overlay patterns |

Switch between pages using the dropdown selector at the bottom of the preview panel.

---

## Auto-sync with sidebar

The preview automatically syncs with your sidebar selection. When you select a token category in the sidebar, the preview jumps to the most relevant page:

| Sidebar selection | Preview page |
|-------------------|-------------|
| Primitive Color or Semantic Color | Colors |
| Primitive Typography or Semantic Typography | Typography |
| Primitive Spacing or Semantic Spacing | Spacing |
| Button | Buttons |
| Badge | Badges |
| Text Input | Form Controls |

For categories without a direct match (like Shadow, Z-Index, or Easing), the preview stays on its current page.

---

## Background color

You can change the preview background to test your components against different surface colors. A background picker offers 13 semantic surface options:

| Option | Token |
|--------|-------|
| Contrast Light | `--semantic-color-contrast-light` |
| Neutral Subtle | `--semantic-color-surface-neutral-subtle` |
| Neutral Default | `--semantic-color-surface-neutral-default` |
| Neutral Bold | `--semantic-color-surface-neutral-bold` |
| Primary Subtle | `--semantic-color-surface-primary-subtle` |
| Primary Default | `--semantic-color-surface-primary-default` |
| Primary Bold | `--semantic-color-surface-primary-bold` |
| Secondary Subtle | `--semantic-color-surface-secondary-subtle` |
| Secondary Default | `--semantic-color-surface-secondary-default` |
| Secondary Bold | `--semantic-color-surface-secondary-bold` |
| Accent Subtle | `--semantic-color-surface-accent-subtle` |
| Accent Default | `--semantic-color-surface-accent-default` |
| Accent Bold | `--semantic-color-surface-accent-bold` |

This is useful for verifying contrast and readability of your components on different backgrounds — especially when designing for both light and dark modes.

---

## Fullscreen mode

The preview panel supports fullscreen mode in two ways:

### Manual fullscreen

Click the maximize/expand control to enlarge the preview to fill the available screen area. This gives you the largest possible view of your components.

### Auto-fullscreen

When your browser viewport is **narrower than 1440px**, the preview automatically opens in fullscreen mode. This ensures the preview has enough space to render components accurately, even when the editor and sidebar would otherwise squeeze it too small.

At wider viewports (1440px+), the preview shares space with the editor in the three-column layout.

---

## How preview rendering works

The preview panel renders components using the **dp-react** component library — a dedicated copy of the design system's React components with its own CSS namespace (`dp-` prefix). This means:

1. Preview components are **real React components**, not screenshots or mockups
2. Token values are applied via **CSS custom properties** injected as inline styles
3. Changes to tokens update the preview **in real-time** — no refresh needed
4. The preview is fully interactive — you can hover, focus, and click components

The separate `dp-` namespace prevents preview styles from conflicting with the editor's own styles (which use the `ds-` namespace).

---

## Frequently asked questions

### Why does the preview look different from my exported code?

The preview uses `dp-react` components with inline style overrides for live token values. Your exported code will use CSS custom properties from `variables.css`. The visual result should be identical, but if you notice differences, it may be because:

- Your exported CSS is missing some token references (check that all compiled outputs are imported)
- The preview resolves some tokens differently than the CSS cascade in production

If something looks wrong in the preview but correct in your exported code (or vice versa), the exported code is the source of truth.

### Can I interact with preview components?

Yes. Preview components are fully interactive — hover states, focus rings, click states, and disabled states all work. This lets you test your token choices across all interaction states.

### Can I resize the preview panel?

The preview panel has a fixed width determined by the layout. You can expand it to fullscreen, but there's no drag-to-resize. Close the sidebar if you want more room for the preview in the three-column layout.

### Do all token categories have a preview?

The preview is primarily focused on **components** (buttons, badges, inputs) and **visual tokens** (colors, typography, spacing). Some token categories like Z-Index, Breakpoints, and Layout don't have dedicated preview content — these are better evaluated in context within your actual application.

### Why is the preview black/empty when I first open it?

Make sure you have the correct background selected. If the background is set to a dark surface color and your components use dark-colored text, they may be hard to see. Try switching to "Neutral Subtle" or "Contrast Light" as the background.
