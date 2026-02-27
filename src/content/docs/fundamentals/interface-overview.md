---
title: Interface Overview
description: App layout, sidebar navigation, toolbar buttons, project settings, and save behavior in the DesignPush editor.
---

This section walks you through the DesignPush editor layout — where everything is, what each control does, and how to navigate between token categories.

---

## Three-column layout

The DesignPush editor uses a three-column layout:

```
┌──────────┬─────────────────────────────┬─────────────────┐
│          │                             │                 │
│ Sidebar  │     Showcase (Editor)       │  Preview Panel  │
│          │                             │                 │
│ Navigate │  Edit tokens for the        │  Live preview   │
│ between  │  selected category          │  of components  │
│ token    │                             │  with your      │
│ groups   │                             │  token values   │
│          │                             │                 │
└──────────┴─────────────────────────────┴─────────────────┘
```

- **Column 1 — Sidebar**: Navigate between token categories
- **Column 2 — Showcase**: The main editing area for the selected token category
- **Column 3 — Preview Panel**: Live component previews reflecting your current tokens

The preview panel can be toggled on and off. When the viewport is narrower than 1440px, the preview opens in fullscreen mode automatically.

---

## Sidebar

The sidebar is your primary navigation. It organizes all token categories into three sections, each accessible via a tab at the top of the sidebar.

### Section tabs

| Tab | Categories | Count |
|-----|-----------|-------|
| **Primitive** | Color, Typography, Spacing, Radius, Border Width, Shadow, Opacity, Duration, Easing, Breakpoint, Layout, Z-Index, Icon | 13 |
| **Semantic** | Color, Typography, Spacing, Focus, Transitions | 5 |
| **Component** | Button, Badge, Text Input, Text Area, Select, Checkbox, Radio, Switch, Avatar, Tooltip, Tab Bar, Card, Modal | 13 |

Click a section tab to see its token categories. Click a category to open its showcase in the main editor.

### Section memory

Each section tab remembers which category you last selected. Switching from Primitive to Semantic and back will return you to the same primitive category you were editing.

### Collapse behavior

When the preview panel is open and the editor column becomes narrower than 464px, the sidebar automatically collapses to give the editor more space. Click the sidebar toggle to reopen it.

---

## Toolbar

The toolbar sits at the top of the editor. It contains five actions, from left to right:

### Help

Icon-only button with a question mark icon. Launches this documentation site. 

### Reset

Opens the Reset dialog, which lets you reset tokens back to factory defaults. You can reset just the current showcase or all tokens globally.

- **Reset Current Showcase** — Only resets tokens for the showcase you're viewing (e.g., "Reset Button Tokens"). All other token groups are untouched.
- **Reset All Tokens** — Resets every token across all showcases — primitive, semantic, and component — back to factory defaults.

A warning reminds you that customizations will be permanently lost.

See [Tips & Troubleshooting](/reference/tips-and-troubleshooting/) for more on resetting.

### Dark Mode toggle

Switches the editor between light and dark themes. This also affects the preview panel, showing you how your tokens look in both modes.

- Sun icon = currently in dark mode (click to switch to light)
- Moon icon = currently in light mode (click to switch to dark)

The toggle sets the `data-theme` attribute on the HTML element, which is the same mechanism your exported tokens use for theming.

### Preview toggle

Shows or hides the preview panel (column 3). The button displays "Preview" with an eye icon.

- Eye icon = preview is hidden (click to show)
- Eye-off icon = preview is visible (click to hide)

When toggled on, the preview panel slides in from the right. See [Preview Panel](/features/preview-panel/) for full details.

### Publish

Opens the Publish dialog to export your design system. The button displays "Publish" with a share icon, styled with a green background to make it prominent.

See [Publishing](/output/publishing/) for the complete export workflow.

---

## Project name

Your project name appears at the top of the sidebar. Click it to edit inline — just type the new name and click away (blur) to save. The name is included in your exported files and helps identify your design system.

---

## Save indicator

DesignPush auto-saves your work to the cloud (Supabase) with a 2-second debounce. You'll see a save status indicator near the project name:

| Status | Meaning |
|--------|---------|
| Unsaved Changes | Debounced autosave function |
| Saving... | Changes are being saved to the cloud |
| Saved | All changes saved successfully (with time stamp) |

You don't need to manually save. Every edit you make is automatically persisted after a brief delay.

---

## Profile card

At the bottom of the sidebar, you'll find your profile card showing:

- **Avatar** — Your profile picture
- **Name and email** — Your account details
- **User Badge** — Your current user group (e.g., "BETA")
- **Version label** — Current app version (e.g., "v.0.9.1")
- **Bug Report** — Opens an email pre-filled with your User ID and Design System ID for support
- **Settings** — Account settings
- **Logout** — Sign out

---

## Screen requirements

DesignPush is designed for desktop use:

- **Minimum width**: 1024px — below this, the layout may not display correctly
- **Optimal width**: 1440px+ — all three columns display comfortably
- **Fullscreen preview**: If the viewport is below 1440px and the preview is opened, the preview will open fullscreen mode to ensure it has enough space

For the best experience, use a laptop or desktop browser at full width.

---

## Frequently asked questions

### Is there tablet or mobile support?

Not currently. DesignPush requires a minimum viewport width of 1024px. The editor's three-column layout and detailed token controls are designed for desktop screens. Mobile support may come in a future version.

### Can I use keyboard shortcuts?

The editor supports standard browser shortcuts (Ctrl/Cmd+Z for undo in text fields, copy, paste, and tab and arrow key navigation). There are no custom keyboard shortcuts in the current version.

### Where is my data stored?

Your token data is saved to the cloud (Supabase) automatically. There's no local-only mode in the current version. See [Tips & Troubleshooting](/reference/tips-and-troubleshooting/) for more on data storage.

### Can I have multiple projects?

Not yet, but it is planned in for a later release. 
