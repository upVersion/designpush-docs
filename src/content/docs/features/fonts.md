---
title: Font Management
description: Font management in DesignPush — Google Fonts, custom fonts, the four font slots, and font loading in exports.
---

DesignPush supports four font slots that can be filled with Google Fonts or custom fonts from any source. Fonts are managed through the Font Manager dialog and assigned in the [Primitive Typography](/editing-tokens/primitive-tokens/) showcase.

---

## Four font slots

| Slot | Purpose | Fallback |
|------|---------|----------|
| **Display** | Hero text, large decorative headings | sans-serif |
| **Heading** | Section headings (H1-H6) | sans-serif |
| **Body** | Paragraph text, UI labels, general content | sans-serif |
| **Mono** | Code blocks, technical content, data | monospace |

Each slot can use a different font family. You assign fonts to slots in the Typography showcase under the Primitive section.

---

## Opening the Font Manager

The Font Manager opens from the Typography showcase when you click to change a font slot. It's a dialog with three tabs.

---

## Tab 1: Your Fonts

Shows all custom fonts you've added to your project.

Each font entry displays:
- **Font name** — The display name
- **Category badge** — Sans (blue), Serif (red), or Mono (orange)
- **Source badge** — Google or Custom
- **Variable font indicator** — A horizontal-resize icon if the font supports variable weights
- **Available weights** — Listed as individual values (e.g., "400, 500, 600") or as a range for variable fonts (e.g., "400-700")
- **Delete button** — Remove the font from your library

If you haven't added any fonts yet, you'll see an empty state: "No custom fonts added yet..."

---

## Tab 2: Add Google Font

Search and add fonts from the Google Fonts library.

### How to add a Google Font

1. **Search** — Type a font name in the search field (e.g., "Bricolage", "Funnel", "Inter")
2. **Browse results** — Up to 10 matching fonts are displayed with live previews
3. **Review details** — Each result shows category, available weights, and whether it's a variable font
4. **Click "Add"** — The font is added to your library

The search is debounced (300ms delay) so results appear as you type without excessive API calls.

### What you see per result

- **Live font preview** — The font is loaded from Google's CDN so you see actual rendering
- **Category** — Sans, Serif, or Mono
- **Weights** — Available weight values
- **Variable indicator** — Shows if the font supports variable weight axes
- **"Add" button** — Greyed out if the font is already in your library

### Tips

- Variable fonts (marked with the resize icon) are recommended — they support any weight value, not just fixed steps
- Search for specific names rather than browsing (the Google Fonts library has 1,500+ fonts)
- If a search fails, check your internet connection — the search queries the Google Fonts API

---

## Tab 3: Add Custom Font

Add fonts from Adobe Fonts, self-hosted URLs, or any CSS-importable source.

### Form fields

| Field | Required | Description |
|-------|----------|-------------|
| **CSS Link URL** | Yes | The full URL to the font's CSS stylesheet (e.g., `https://use.typekit.net/abc123.css`) |
| **CSS font-family** | Yes | The exact `font-family` value from the stylesheet (e.g., `"futura-pt"`) |
| **Display Name** | Yes | A friendly name shown in the DesignPush UI (e.g., "Futura PT") |
| **Category** | Yes | Dropdown: sans-serif, serif, or monospace |
| **Available Weights** | Yes | Check the weights available in your font, or toggle "Variable (all weights)" for variable fonts |

### Weight selection

For non-variable fonts, check the specific weights your font provides from the 100-900 grid:

| Weight | Name |
|--------|------|
| 100 | Thin |
| 200 | Extra Light |
| 300 | Light |
| 400 | Regular |
| 500 | Medium |
| 600 | Semi Bold |
| 700 | Bold |
| 800 | Extra Bold |
| 900 | Black |

For variable fonts, toggle the **"Variable (all weights)"** switch, which enables all weights 100-900.

Click **"Add Font"** when the form is complete. The button is disabled until all required fields are filled.

---

## Assigning fonts to slots

After adding fonts to your library:

1. Go to the **Primitive > Typography** showcase
2. Find the font slot you want to change (Display, Heading, Body, or Mono)
3. Click the font selector
4. Choose from your available fonts (system defaults + your library)

The change takes effect immediately in the editor and preview panel.

---

## Font loading in exports

### Google Fonts

When you publish your design system, Google Font references are **automatically included** as `@import` rules in the exported `variables.css` file. Your project just needs to import `variables.css` and the fonts will load.

```css
/* Automatically included in variables.css */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&display=swap');
```

### Custom fonts

Custom fonts are **not automatically bundled** in exports. You need to include the font's CSS link in your project manually:

```html
<!-- In your HTML head -->
<link rel="stylesheet" href="https://use.typekit.net/abc123.css">
```

Or import in your CSS:

```css
/* In your CSS entry point, before variables.css */
@import url('https://use.typekit.net/abc123.css');
@import './design-system/build/core/variables.css';
```

The exported `variables.css` will reference the font by its `font-family` name. As long as the font CSS is loaded in the browser, the references will resolve.

---

## Frequently asked questions

### Can I use Adobe Fonts (Typekit)?

Yes. Use the **Add Custom Font** tab. Enter the Typekit CSS URL (e.g., `https://use.typekit.net/abc123.css`), the CSS font-family name, and a display name. Make sure your Adobe Fonts subscription is active and the font is published to a kit with your project's domain.

### Can I use local/self-hosted .woff2 files?

Yes, if you have a CSS file that declares `@font-face` rules pointing to your .woff2 files. Enter the URL of that CSS file in the Custom Font form. The font files themselves need to be accessible from wherever your project is hosted.

### Can I use more than 4 font families?

Not in the current version. The four slots (Display, Heading, Body, Mono) are the maximum. Most design systems use 2-3 families — the four-slot model covers the vast majority of use cases.

### What if I delete a font that's currently assigned to a slot?

The slot will fall back to its default font (typically a system sans-serif or monospace). You should assign a replacement font to avoid unexpected rendering.

### Why doesn't my Google Font preview load?

Google Font previews require an internet connection. The search queries the Google Fonts API and loads font CSS from Google's CDN for previewing. If you're offline or behind a firewall that blocks Google domains, previews won't render.

### Can I change font weights per token/style?

Font *weight values* are defined at the primitive level (100-900 scale). Individual *type styles* at the semantic level can reference any of these weights. The font's available weights determine which weight values will actually render — if your font only supports 400 and 700, using weight 600 will typically render at the nearest available weight.
