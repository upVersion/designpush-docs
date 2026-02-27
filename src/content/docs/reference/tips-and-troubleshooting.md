---
title: Tips & Troubleshooting
description: Resetting tokens, common issues, practical tips, glossary, and known beta limitations.
---

This section covers resetting tokens, common issues and their solutions, practical tips for getting the most out of DesignPush, and a glossary of key terms.

---

## Resetting tokens

Click the **Reset** button (rotate icon) in the toolbar to open the Reset dialog.

### Reset current showcase

Resets only the tokens for the showcase you're currently viewing. For example, if you're on the Button showcase, this resets button-related tokens (pattern, variants, sizes) back to factory defaults. All other token groups remain untouched.

### Reset all tokens

Resets **every token** across all showcases — primitive, semantic, and component — back to factory defaults. This is a complete reset of your design system.

### Important warnings

- **Resets are permanent.** There is no undo. Your customizations will be lost.
- **Consider exporting first.** Before resetting, publish your current design system so you have a backup of your customized values.
- The dialog shows a warning: "This will revert tokens back to their default values. Any customizations you've made will be permanently lost."

---

## Data storage

### Auto-save

DesignPush automatically saves your work to the cloud (Supabase) with a 2-second debounce. Every edit triggers an auto-save after a brief delay. You'll see the save status indicator near your project name:

- **Idle** — No pending changes
- **Saving...** — Currently saving
- **Saved** — All changes persisted

### Local backup

Token data is persisted in the cloud. For local backup, use the **Publish** feature to export your token files and commit them to version control. This gives you a full backup you can reference at any time.

### Restoring from exports

If you need to restore previous token values, your exported JSON files (`tokens-core.json`, `tokens-components.json`) contain the complete token definitions. While there's no direct "import" feature in the current version, these files serve as your backup reference.

---

## Troubleshooting

### Tokens not saving

**Symptoms:** Save indicator stays on "Saving..." or changes seem to revert.

**Possible causes:**
- Network connectivity issue — check your internet connection
- Browser extension blocking Supabase API calls — try disabling ad blockers or privacy extensions temporarily
- Session expired — refresh the page and log in again

**Fix:** Refresh the page. If the issue persists, check your browser's developer console (F12 → Console) for error messages related to Supabase or network requests.

### Preview not updating

**Symptoms:** You change a token value but the preview panel doesn't reflect the change.

**Possible causes:**
- The preview is on a page that doesn't use the token you changed (e.g., changing spacing while viewing the Colors preview page)
- The token change hasn't propagated through the reference chain yet

**Fix:**
1. Make sure the preview is on a relevant page (e.g., view the Buttons page when editing button tokens)
2. Try toggling the preview off and on (click Preview button twice)
3. If the issue persists, refresh the page

### Fonts not rendering

**Symptoms:** Text appears in a default system font instead of your chosen font.

**Possible causes:**
- Google Fonts API unavailable (network issue)
- Custom font URL is incorrect or inaccessible
- Font hasn't loaded yet (give it a moment on slower connections)

**Fix:**
1. For Google Fonts: check your internet connection
2. For custom fonts: verify the CSS Link URL is correct and accessible (try opening it in a browser tab)
3. Check the browser console for font loading errors
4. Make sure the `font-family` value matches exactly what the font's CSS declares

### Wrong colors in dark mode

**Symptoms:** Colors look wrong or washed out when switching to dark mode.

**Possible causes:**
- Semantic color mappings haven't been configured for dark mode
- Dark mode shades are too similar to the background

**Fix:**
1. Go to **Semantic > Color** and check the dark mode (moon icon) mappings for each intent
2. For text tokens in dark mode, use lighter shades (100-400) that contrast with dark backgrounds
3. For surface tokens in dark mode, use darker shades (800-950)
4. Use the [Preview Panel](/features/preview-panel/) in dark mode to verify contrast

### Empty or incomplete export

**Symptoms:** Downloaded ZIP is missing files or some files are empty.

**Possible causes:**
- Export was interrupted (browser tab closed during generation)
- Select Files mode with nothing selected
- Token data hasn't loaded from the server yet

**Fix:**
1. Wait for the editor to fully load (save indicator should show "Saved" or "Idle")
2. Try **Full Package** export instead of Select Files
3. If still empty, refresh the page and try again

### Browser compatibility

**Supported browsers:**
- Chrome 90+ (recommended)
- Edge 90+
- Firefox 90+
- Safari 15+

**Known limitations:**
- File System Access API (individual file saving) is only available in Chrome and Edge. Firefox and Safari fall back to ZIP download.
- The editor requires JavaScript enabled
- Minimum viewport width: 1024px

---

## Tips for getting the most out of DesignPush

### Start with primitives, build upward

Work through the layers in order: primitives first, then semantics, then components. Each layer builds on the one below. If you jump straight to components without setting up your primitive color palette, you'll be configuring component colors without the right options available.

### Use semantic tokens for everything UI-facing

Whenever your UI code references a color, use a semantic token (`--semantic-color-*`) rather than a primitive (`--primitive-color-brand-primary-500`). Semantic tokens support theming (light/dark mode) and communicate intent. Reserve primitives for rare cases where you need a fixed, theme-independent value.

### Write detailed descriptions for AI

Every description you write in DesignPush is an investment in AI productivity. A 2-3 sentence description for each component variant saves dozens of correction prompts when working with AI coding assistants. See [AI Workflow](/features/ai-workflow/) for writing tips.

### Export early and often

Don't wait until your design system is "perfect" to export. Early exports let you:
- Test integration in your actual project
- Share progress with teammates
- Establish the file structure in your repo early
- Create incremental backups

### Use the preview to catch issues before export

Toggle the preview panel on and check multiple pages before publishing. The preview renders real components with your actual token values — if something looks wrong there, it'll look wrong in your exported code too.

### Copy token names from badges, don't type them

Token names are long and precise. Typing `--semantic-color-surface-neutral-subtle` from memory invites typos. Instead, click the token badge in the editor to copy the exact path, then convert to CSS property format. See [AI Workflow](/features/ai-workflow/) for the conversion pattern.

### Keep tokens-extended.json in version control

This file tracks your design intent and AI instructions. Committing it gives you:
- A history of how your design guidelines evolved
- Easy sharing with team members
- Automatic context for AI tools with file access (Claude Code, Cursor)

### Use the Compose tab for quick code references

The Compose tab in each component showcase generates code snippets in JSX, JSON, and CSS. Use these as starting points for your components or as examples to share with AI tools.

---

## Glossary

| Term | Definition |
|------|-----------|
| **Component token** | A design token that defines the visual appearance of a specific UI element (button, badge, input). References semantic and primitive tokens. |
| **CSS custom property** | A CSS variable declared with `--` prefix and used with `var()`. The output format for DesignPush tokens in CSS. |
| **Dark mode** | A color theme using dark backgrounds and light text, activated via `data-theme="dark"`. |
| **DTCG** | Design Tokens Community Group — the W3C community group defining the standard format for design tokens. DesignPush uses this format for JSON exports. |
| **Elevation** | A shadow token that simulates depth. Higher elevation = more prominent shadow. |
| **Intent** | A semantic color purpose (primary, secondary, accent, neutral, success, warning, error, info). |
| **Light mode** | The default color theme using light backgrounds and dark text, activated via `data-theme="light"`. |
| **Pattern** | The shared structural tokens for a component (padding, radius, gap, border) that apply across all variants and sizes. |
| **Primitive token** | A raw design value (color, size, duration) with no opinion on where it should be used. The foundation layer. |
| **Reference** | A token that points to another token instead of holding a raw value. Written as `{primitive.spacing.md}` in JSON. |
| **Role** | A semantic color function (text, surface, border, interactive) describing what the color is used for. |
| **Semantic token** | A purpose-driven token that references a primitive. Supports theming — the same name resolves to different values in light and dark mode. |
| **Shade** | A numbered step in a color palette (50, 100, 200... 900, 950). Lower numbers are lighter. |
| **Showcase** | The main editing view for a token category in DesignPush. Each sidebar item opens its corresponding showcase. |
| **Token** | A named design decision — a single value (color, size, duration, etc.) with a semantic name that can be referenced across platforms. |
| **Variant** | A visual variation of a component (e.g., primary, secondary, ghost, destructive for buttons). |

---

## Known limitations (beta)

DesignPush is currently in beta. Here are known limitations:

- **Component showcases** — Button, Badge, and Text Input are fully editable. Additional components may be listed in the sidebar and preview menus but not yet fully implemented.
- **No undo** — There's no undo/redo for token edits. The Reset feature is the only way to revert changes, and it goes back to factory defaults, not to a previous state.
- **No collaboration** — One user per design system. Real-time collaboration is not supported in the current version.
- **No version history** — Token changes aren't versioned. Use your exported JSON files as snapshots for version tracking.
- **No import** — You can't import existing token files into DesignPush. Projects start from the default token set.
- **Desktop only** — Minimum 1024px viewport width. No tablet or mobile support.
- **Web formats only** — Exports target web (CSS, SCSS, JS, TS, Tailwind*). Native mobile formats (iOS, Android) require processing the JSON exports with external tools. (* Tailwind integration currently in development. Coming soon)

---

## Frequently asked questions

### Is there an undo feature?

Not yet. In the current beta, there's no undo/redo. Use the Reset feature to revert to factory defaults, or restore from a previously exported JSON file.

### Can multiple team members edit the same design system?

Not simultaneously. The current version supports one user per design system. Share your work by exporting and committing token files to a shared repository.

### How do I report a bug?

Click the **Bug Report** button in your profile card (bottom of the sidebar). This opens an email pre-filled with your User ID and Design System ID, which helps the support team diagnose the issue.

### Does DesignPush work offline?

No. DesignPush requires an internet connection for:
- Loading and saving token data (Supabase)
- Google Fonts previews and loading
- User authentication

### Can I use DesignPush for an existing design system?

You can replicate your existing design system in DesignPush by entering your current values manually (hex colors, spacing values, font choices). Direct import from other tools (Figma Tokens, Style Dictionary) is not yet supported.

### What happens to my data if I cancel my subscription?

Your token data remains stored and accessible. Contact support for data export options if you need to retrieve your design system after account changes.

### How often should I re-export?

Export whenever you make meaningful changes and want to update your codebase. There's no cost or limit to exporting. For active projects, exporting after each editing session is a good rhythm.
