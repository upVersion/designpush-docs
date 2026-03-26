---
title: Preview Panel
description: Live component preview with 16 preview pages, background colors, dark mode, fullscreen mode, and auto-sync with token changes.
---

The Preview Panel shows live component previews rendered with your current token values. It's the fastest way to see how your design decisions look in practice — without leaving the editor.

---

## Opening and closing the preview

Click the **Preview** button in the toolbar (eye icon) to toggle the preview panel. When open, it slides in as the third column on the right side of the editor.

- **Eye icon** with "Preview" label = preview is hidden (click to show)
- **Eye-off icon** with "Preview" label = preview is visible (click to hide)

The preview button highlights when the panel is open, providing a visual indicator of its state.

---

## Preview pages

The preview panel has 16 pages covering every supported component and token category:

| Page | What it shows |
|------|--------------|
| **Colors** | Full color palette — primitive and semantic |
| **Typography** | All 28 type styles: display, headings, body, body bold, labels, captions, code, overline |
| **Button** | All variants (primary, secondary, ghost, destructive), sizes, and icon layouts |
| **Badge** | All semantic variants, styles (subtle, bold, outline), and sizes |
| **Input** | Text input sizes, icon layouts, and states (default, error, disabled) |
| **TextArea** | Multi-line input sizes and states |
| **Select** | Dropdown select sizes and states |
| **Card** | Card variants (default, elevated, interactive) and sizes |
| **Checkbox** | Checkbox sizes and states |
| **Radio** | Radio button sizes and states |
| **Switch** | Toggle switch sizes and variants (default, success, destructive) |
| **Slider** | Range slider sizes |
| **Avatar** | Avatar sizes and color variants |
| **Tooltip** | Tooltip positions (top, bottom, left, right) |
| **Divider** | Divider variants (subtle, strong) |
| **Tab Bar** | Tab navigation sizes |

Switch between pages using the dropdown selector at the bottom of the preview panel. The preview automatically syncs with your sidebar navigation — selecting a component editor in the sidebar switches to that component's preview page.

---

## Background color

You can change the preview background to test your components against different surface colors. The background picker offers semantic surface options:

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

This is useful for verifying contrast and readability — especially when testing both light and dark modes.

---

## Dark mode

Toggle dark mode using the moon/sun icon in the toolbar. The preview switches the `data-theme` attribute, and all semantic color tokens resolve to their dark mode values. This lets you verify your design system works in both themes without leaving the editor.

---

## React components

The preview panel renders components using the **dp-react** component library — the same React components included in your design system export:

1. Preview components are **real React components**, not screenshots or mockups
2. Token values are applied via **CSS custom properties** injected as inline styles
3. Changes to tokens update the preview **in real-time** — no refresh needed
4. Components are fully interactive — hover, focus, click, and disabled states all work

See [React Components](/output/react-components/) for the full API reference.

---

## Fullscreen mode

Click the expand icon in the preview toolbar to enter fullscreen mode. This hides the sidebar and editor, giving the preview the full window width. Useful for reviewing layouts and testing responsive behavior of your components.

---

## Frequently asked questions

### Why does the preview look different from my exported code?

The preview uses `dp-react` components with inline style overrides for live token values. Your exported code uses CSS custom properties from `variables.css`. The visual result should be identical, but differences can occur if:

- Your exported CSS is missing some token references (check that all compiled outputs are imported)
- Font `@import url()` rules in `variables.css` are silently ignored by your bundler — extract them to `<link>` tags in your HTML `<head>`

If something looks wrong in the preview but correct in your exported code (or vice versa), the exported code is the source of truth.

### Can I interact with preview components?

Yes. Preview components are fully interactive — hover states, focus rings, click states, and disabled states all work. This lets you test your token choices across all interaction states.

### Can I resize the preview panel?

The preview panel has a fixed width determined by the layout. You can expand it by using fullscreen mode or closing the sidebar.

### Do all token categories have a preview?

The preview covers all supported components and visual tokens (colors, typography). Token categories like Z-Index, Breakpoints, and Layout don't have dedicated preview pages — these are better evaluated in context within your actual application.

### Why is the preview black/empty when I first open it?

Make sure you have the correct background selected. If the background is set to a dark surface color and your components use dark-colored text, they may be hard to see. Try switching to "Contrast Light" or "Neutral Subtle" as the background.
