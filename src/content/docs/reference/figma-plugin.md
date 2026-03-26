---
title: Figma Plugin
description: Import your DesignPush tokens into Figma as variables, text styles, and effect styles.
---

The **DesignPush Token Importer** is a Figma plugin that brings your exported design tokens into Figma as native variables and styles — with proper aliasing, scoping, and light/dark mode support.

---

## Installation

### From GitHub (beta testing)

The plugin is available on GitHub while we prepare the Figma Community listing. Clone or download the repo and load it as a development plugin:

1. Clone the repo: [github.com/upVersion/DesignPush-FigmaPlugin](https://github.com/upVersion/DesignPush-FigmaPlugin)
2. In Figma, go to **Plugins > Development > Import plugin from manifest**
3. Select the `manifest.json` from the cloned directory
4. The plugin appears under your development plugins

### From Figma Community (coming soon)

Search for **"DesignPush Token Import"** in Figma Community and click Install.

---

## How to use

1. **Export your tokens** from DesignPush using the [Publish dialog](/output/publishing/) (Full Package or JSON only)
2. Open the plugin in Figma: **Plugins > DesignPush Token Import**
3. The UI displays two groups:
   - **Figma-Compatible Tokens** (pre-selected) — created as Figma Variables
   - **Developer Tokens** (unchecked) — created as text styles and effect styles
4. Each category shows a count (e.g. "primitive.color (145 variables)")
5. Check or uncheck categories to control what gets imported
6. Click **Import Design Tokens**

Semantic tokens require their corresponding primitive tokens to exist first. Import them together, or import primitives before semantics.

**Updating tokens:** Re-importing an updated JSON file will overwrite any existing variables with the same names. This means you can update your tokens in DesignPush, re-export, and re-run the plugin to keep Figma in sync — no need to delete collections first.

---

## What gets created

### Variables (Figma-compatible tokens)

The plugin creates variable collections organized by token layer:

#### Primitive collections

| Collection | Contents |
|---|---|
| **Colors** | All color palettes — primary, secondary, accent, success, warning, error, info, neutral (scales 50–950) |
| **Typography** | Font families, weights, sizes, line heights, letter spacing |
| **Spacing** | Full spacing scale (xs through 6xl) |
| **Radius** | Border radius tokens (xs through 4xl) |
| **Border Width** | Border width tokens |
| **Breakpoints** | Responsive breakpoints |
| **Layout** | Grid and container measurements |
| **Icons - Size** | Icon size tokens (xs through 4xl) |
| **Icons - Stroke** | Icon stroke weight tokens |
| **Motion - Duration** | Animation duration tokens |
| **Motion - Easing** | Easing function tokens |
| **Motion - Opacity** | Opacity value tokens |
| **Z-Index** | Layer stacking values |

#### Semantic collections

| Collection | Contents |
|---|---|
| **semantic.color** | Text, background, surface, border, interactive colors — with light and dark mode variants |
| **semantic.spacing** | Semantic spacing (aliased to primitives) |
| **semantic.radius** | Semantic radius (aliased to primitives) |
| **semantic.border-width** | Semantic border widths (aliased to primitives) |
| **semantic.shadows** | Shadow references |
| **semantic.focus** | Focus state tokens |
| **semantic.transition** | Transition and animation tokens |

Semantic variables use **VARIABLE_ALIAS** to reference their corresponding primitives — change a primitive and every semantic token updates automatically.

### Text styles

Complete text style hierarchy with variable bindings:

- **Display** — lg, md, sm
- **Heading** — H1 through H6
- **Body** — lg, md, sm, xs (with bold variants)
- **Label** — lg, md, sm, uppercase
- **Caption** — md, sm
- **Code** — inline, block
- **Overline** — md, sm

Each style binds font family, font size, and letter spacing to variables. Font weight and line height are set directly from token values.

### Effect styles

- **Shadow styles** — box shadow effects with descriptions imported from token metadata (elevation-1 through elevation-6)

### Developer-only tokens

The plugin UI includes a **Developer Only** section for tokens that Figma doesn't natively support as design features. These are still imported as variables for documentation and reference in [Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode), but won't directly affect design elements on the canvas.

| Token | Contents |
|---|---|
| **semantic.focus** | Focus ring width, offset, color, and opacity |
| **primitive.duration** | Animation duration values |
| **primitive.easing** | Easing function strings |
| **primitive.opacity** | Opacity scale (alpha-0 through alpha-100) |
| **primitive.z-index** | Layer stacking order values |
| **semantic.transition** | Composed transition presets |

---

## Token format

The plugin expects tokens in **DTCG (Design Tokens Community Group)** format — the same format DesignPush exports. The 3-layer structure looks like this:

```json
{
  "primitive": {
    "color": {
      "primary": {
        "500": { "$value": "#4C2BDA" }
      }
    }
  },
  "semantic": {
    "color": {
      "text": {
        "primary": {
          "light": { "$value": "{primitive.color.neutral.900}" },
          "dark": { "$value": "{primitive.color.neutral.50}" }
        }
      }
    }
  }
}
```

Semantic tokens reference primitives using curly-brace paths (e.g. `{primitive.color.neutral.900}`). The plugin resolves these to Figma variable aliases automatically.

---

## Variable naming

| Category | Pattern | Example |
|---|---|---|
| Colors | `colorname/scale` | `primary/500`, `neutral/black` |
| Typography | `category/name` | `font-family/heading`, `font-size/base` |
| Icons | `size/name`, `stroke/name` | `size/md`, `stroke/bold` |
| Dimensions | `spacing/name`, `radius/name` | `spacing/md`, `radius/lg` |
| Motion | `duration/name`, `easing/name` | `duration/fast`, `easing/ease-in` |
| Semantic | `category/name` | `text/primary`, `background/elevated` |

> Figma sorts variable collections alphabetically in the variables panel. This is a Figma limitation. If ordering matters, consider number prefixes in your token names.

---

## Font requirements

Figma plugins can only use fonts that are **already available** in Figma. This means:

- **Google Fonts** — available automatically in Figma
- **Locally installed fonts** — fonts installed on your machine are available in Figma desktop

If your design tokens reference a font that isn't available, the plugin will **skip those text styles** and show a warning listing the missing fonts and how many styles were affected.

### Installing custom fonts

If your tokens use non-Google fonts (e.g. fonts from Fontshare, Adobe Fonts, or custom typefaces):

1. Download and install the font files on your machine
2. Restart Figma desktop (required for newly installed fonts to appear)
3. Re-run the plugin — the text styles will now be created

:::note
Figma for web can only access Google Fonts. To use custom fonts in the browser, you'll need the [Figma Font Installer](https://www.figma.com/downloads/) running locally.
:::

### What happens when fonts are missing

- The plugin creates all other tokens (variables, colors, spacing, etc.) normally
- Text styles that depend on the missing font are skipped
- A warning banner shows which fonts are missing and how many styles were skipped
- Once you install the fonts, re-importing the same JSON will create the missing styles

---

## Troubleshooting

### Variables not created
- Make sure the category is checked in the plugin UI before importing

### Text styles not created or partially missing
- Check the warning banner after import — it will list any missing fonts
- Install the required fonts locally and restart Figma
- Re-import the tokens to create the missing styles
- See [Font requirements](#font-requirements) above

### Semantic tokens not aliasing
- Import primitive tokens first (or select both at the same time)
- Check that references use the correct path format: `{primitive.color.neutral.900}`

### Token counts showing zero
- Verify tokens include `$value` properties
- Typography styles need `fontFamily`, `fontSize`, etc.

### Empty collections
- Only checked categories should create collections — make sure you're on the latest version
