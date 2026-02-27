---
title: Quick Start
description: Get up and running with DesignPush in five minutes.
---

DesignPush is a browser-based design token editor. You use it to define every visual decision in your product — colors, typography, spacing, radii, shadows, component styles, and more — then export the result as production-ready code for your development workflow.

The editor organizes tokens into three layers: **primitives** (raw values like color palettes and spacing scales), **semantics** (purpose-driven aliases like "primary text color" that enable light/dark theming), and **components** (tokens scoped to specific UI elements like buttons, inputs, and cards). Changes at any layer cascade through the system automatically.

The core experience is a three-column layout: a **sidebar** for navigating token categories, a central **showcase editor** for adjusting values, and a live **preview panel** that renders real UI components with your current tokens. You edit, preview, and publish — all from the same interface.

Exports include CSS custom properties, SCSS variables, TypeScript and JavaScript tokens, and a drop-in Tailwind CSS preset. Every export format is generated from the same source, so your design system stays consistent across tools and frameworks.

---

## 1. Open the editor

Log in and select your project. You'll see the three-column layout:

- **Sidebar** (left) — navigate between token categories
- **Showcase / Editor** (center) — edit tokens for the selected category
- **Preview Panel** (right) — live component previews reflecting your changes

See [Interface Overview](/fundamentals/interface-overview/) for a full breakdown of each area.

## 2. Name your project

Click the project name at the top of the sidebar and type a new name. This name is included in your exported files.

## 3. Customize your tokens

Start with colors — go to **Primitive > Color** in the sidebar. Click any swatch to open the color picker and adjust your brand palette.

From there you can explore all 13 primitive categories (typography, spacing, radius, shadows, and more), 5 semantic categories, and 13 component token groups.

## 4. Preview your changes

Click the **Preview** button in the toolbar to open the live preview panel. It renders real UI components — buttons, inputs, cards, badges — using your current token values, so you can see exactly how your design system looks before exporting.

Toggle between light and dark mode with the theme switch in the toolbar to check both themes.

## 5. Publish

Click the green **Publish** button, select **Full Package**, and download your design system as a ZIP. The package includes CSS custom properties, SCSS variables, TypeScript/JavaScript tokens, and a Tailwind preset — everything you need to integrate into your codebase.

For detailed integration instructions, see [Publishing & Exports](/output/publishing/).

---

## What's next

- [Design Token Fundamentals](/fundamentals/concepts/) — understand the three-layer token architecture
- [Editing Primitive Tokens](/editing-tokens/primitive-tokens/) — deep-dive into color, typography, spacing, and more
- [AI Workflow](/features/ai-workflow/) — use DesignPush tokens with Claude, Cursor, and other AI coding tools
