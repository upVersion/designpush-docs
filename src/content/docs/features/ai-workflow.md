---
title: AI Workflow
description: Setting up AI context, writing effective descriptions, token badges, tokens-extended.json, and an example AI-assisted development workflow.
---

DesignPush is built to work with AI coding assistants. Its semantic naming, structured exports, and description fields give AI tools the context they need to generate on-brand code without guessing.

This section covers how to set up AI context, write effective descriptions, and get the most out of AI-assisted development with your design system.

---

## Why DesignPush works well with AI

Traditional design systems hand off hex codes and pixel values in a Figma file or PDF. AI tools can't easily parse these. DesignPush gives AI:

1. **Semantic names** — `--semantic-color-text-primary-default` is self-documenting. AI doesn't need to guess what `#0168B5` is for.
2. **Structured data** — JSON and TypeScript exports are machine-readable. AI can traverse the token tree to understand relationships.
3. **Description fields** — Every component and many tokens have `$description` fields that explain intent, usage rules, and constraints in natural language.
4. **tokens-extended.json** — A dedicated file for extended instructions, custom tokens, and AI-readable metadata.
5. **Code snippets** — The Compose tab generates ready-to-use JSX, JSON, and CSS that AI can use as examples.

---

## Setting up AI context

To get the best results from AI coding tools, share your design system files as context. Here are the recommended files, ranked by importance:

### Priority 1: Always share

| File | Why |
|------|-----|
| `build/core/variables.css` | The primary token reference. AI learns all available token names and their CSS custom property format. |
| `tokens-core.json` | Full token structure with types, values, and descriptions. AI understands the three-layer architecture. |

### Priority 2: Share if using components

| File | Why |
|------|-----|
| `build/components/variables.css` | Component token names for buttons, badges, inputs |
| `tokens-components.json` | Component structure, variants, sizes, and descriptions |

### Priority 3: Share for advanced workflows

| File | Why |
|------|-----|
| `tokens-extended.json` | Custom instructions, extended tokens, changelog |
| `build/core/tokens.ts` | Type-safe token object (useful if AI is writing TypeScript) |

### Adding context to your AI tool

**Claude Projects / Claude Code:**
Upload your token files to the project context. Claude will automatically reference them when generating UI code.

```
# In Claude Code, add to your project's CLAUDE.md:
Design system tokens are in design-system/build/core/variables.css
Use semantic token names (--semantic-*) for all UI colors.
Use primitive tokens (--primitive-*) only when semantic equivalents don't exist.
```

**Cursor:**
Add token files to your `.cursorrules` or project context. Reference them in prompts: "Use the design tokens from variables.css for all styling."

**Other AI tools:**
Paste the contents of `variables.css` or `tokens-core.json` directly into the conversation, or reference them at the start of your prompt.

---

## Token name badges

Throughout the DesignPush editor, colored badges display token reference paths:

| Badge color | Layer | Example |
|-------------|-------|---------|
| Purple | Primitive | `primitive.radius.md` |
| Teal | Semantic | `semantic.color.text.primary.default` |

**Click any badge to copy the full token path** to your clipboard.

### Using copied token names

Token paths translate directly to CSS custom properties by adding `--` prefix and replacing dots with hyphens:

| Copied path | CSS custom property |
|-------------|-------------------|
| `primitive.radius.md` | `var(--primitive-radius-md)` |
| `semantic.color.text.primary.default` | `var(--semantic-color-text-primary-default)` |
| `component.button.primary.background` | `var(--component-button-primary-background)` |

Paste these into AI conversations for precise references: "Use `var(--semantic-color-surface-neutral-subtle)` for the card background."

---

## The $description field

Every component showcase has a **Context/Description** textarea in the Base tab. Many individual tokens also support descriptions. These free-text fields export as `$description` properties in your JSON files.

### Where descriptions appear

- **tokens-core.json** — On individual token entries
- **tokens-components.json** — On pattern and component entries
- **tokens-extended.json** — On extended token entries

### Writing effective descriptions

Descriptions are your direct communication channel with AI tools. Write them as if briefing a developer who's never seen your design system.

**Good examples:**

```
Button — Primary variant:
"Main call-to-action button. Use for the single most important action per page
or section. Limit to one primary button per view. Never use for navigation —
use links or ghost buttons instead."

Button — Ghost variant:
"Minimal visual weight for tertiary actions, toolbar items, and inline actions
within text. Ghost buttons should never be the only action in a view — pair
with a primary or secondary button."

Badge — Error intent:
"Error status indicator. Use for failed states, validation errors, and critical
alerts. Pair with error text — never rely on color alone for meaning."
```

**Less helpful examples:**

```
"A button."
"Primary color button component."
"Badge for errors."
```

### Tips for better descriptions

1. **State the purpose** — What is this component/token *for*?
2. **Give rules** — When to use, when *not* to use
3. **Note constraints** — Limits, pairing requirements, accessibility considerations
4. **Be specific** — "Use for the primary CTA on each page" is better than "main button"
5. **Think like a developer** — What would a developer need to know to use this correctly?

---

## tokens-extended.json

The extended tokens file is designed for additional context that doesn't fit in the standard token structure. It exports alongside your main token files and is particularly useful for AI consumption.

### Structure

```json
{
  "$schema": "https://designpush.com/schema/tokens-extended.json",
  "metadata": {
    "name": "My Design System",
    "version": "1.0.0",
    "lastExported": "2026-02-20T10:00:00Z"
  },
  "descriptions": {
    "components": {
      "button": {
        "overview": "Four variants: primary, secondary, ghost, destructive...",
        "guidelines": "Only one primary button per view..."
      }
    }
  },
  "extended": {
    "customTokens": {}
  }
}
```

### What AI should and shouldn't do with this file

**AI should:**
- Read the descriptions for component usage guidelines
- Follow variant selection rules stated in descriptions
- Use the metadata to understand the design system context
- Reference extended tokens when they exist

**AI should NOT:**
- Modify the file's structure
- Override standard token values with extended values
- Ignore `$description` fields from the main token files in favor of extended descriptions

### Keeping tokens-extended.json in version control

This file is safe and recommended to commit to version control. Diffs show what descriptions and extended tokens changed between exports, which is useful for tracking design system evolution.

---

## Example AI workflow

Here's a step-by-step scenario showing how DesignPush integrates into an AI-assisted development workflow:

### Step 1: Designer configures tokens

A designer uses DesignPush to set up the design system:
- Chooses brand colors and generates shade palettes
- Configures typography (fonts, scale, weights)
- Sets up semantic color mappings for light and dark mode
- Configures button, badge, and input component tokens
- Writes detailed `$description` fields for each component

### Step 2: Publish

The designer clicks **Publish → Full Package** and downloads the complete export.

### Step 3: Developer sets up the project

The developer places the `design-system/` folder in the project root and imports `variables.css`:

```tsx
// src/main.tsx
import './design-system/build/core/variables.css';
import './design-system/build/components/variables.css';
```

### Step 4: Developer shares context with AI

The developer adds token files to their AI tool's context:

```
"Here's my design system. Use these CSS custom properties for all styling.
Prefer semantic tokens (--semantic-*) over primitives (--primitive-*).
Component tokens are in components/variables.css."
```

### Step 5: AI generates on-brand code

The developer asks AI to build a feature:

```
"Build a pricing card with a title, price, feature list, and CTA button.
Use my design system tokens for all colors, spacing, and typography."
```

AI generates code using the correct token names:

```tsx
<div style={{
  background: 'var(--semantic-color-surface-neutral-subtle)',
  border: 'var(--primitive-border-width-thin) solid var(--semantic-color-border-neutral-default)',
  borderRadius: 'var(--primitive-radius-lg)',
  padding: 'var(--semantic-spacing-inset-lg)',
}}>
  <h3 style={{
    fontFamily: 'var(--primitive-typography-family-heading)',
    fontSize: 'var(--primitive-typography-size-xl)',
    color: 'var(--semantic-color-text-neutral-default)',
  }}>
    Pro Plan
  </h3>
  {/* ... */}
</div>
```

### Step 6: Iterate

The designer tweaks tokens in DesignPush (adjusts spacing, updates colors). Re-exports. The developer replaces the token files — all AI-generated code automatically reflects the new values.

---

## Code snippet export

The **Compose** tab in each component showcase generates ready-to-use code in three formats:

| Format | Use case |
|--------|----------|
| **JSX** | React component markup with token references |
| **JSON** | Token values as a JSON object |
| **CSS** | CSS rules using custom properties |

Click the **copy button** on any snippet to copy it to your clipboard. Paste these into AI conversations as examples: "Generate more components following this pattern."

This is particularly useful for establishing a code style that AI can replicate across your project.

---

## Tips for AI-friendly design systems

### Use clear, semantic names
AI tools work best when names communicate intent. `--semantic-color-text-primary-default` is instantly understandable. Avoid cryptic abbreviations.

### Write detailed descriptions
The `$description` fields are your most powerful AI communication tool. A 2-3 sentence description for each component saves dozens of correction prompts later.

### Prefer semantic over primitive references
Tell AI to use `--semantic-color-surface-neutral-subtle` instead of `--primitive-color-neutral-gray-50`. Semantic names carry more context and automatically support theming.

### Export both CSS and TypeScript
CSS custom properties are great for styling. TypeScript exports give AI type-safe access to token values for programmatic use (conditional logic, dynamic styling).

### Copy token names from badges
Don't type token names from memory — click the badge in the editor to copy the exact path. This prevents typos that would cause AI to generate broken references.

### Keep tokens-extended.json in your repo
AI tools with file access (like Claude Code or Cursor) can read this file directly from your project for additional context.

### Share your Tailwind preset
If using Tailwind, sharing `preset.js` with AI gives it the complete mapping from utility classes to your token values. AI can then write standard Tailwind classes that resolve to your design system. See [Tailwind Preset](/tailwind/preset/).

---

## Frequently asked questions

### Which AI tools work with DesignPush tokens?

Any AI tool that can accept text context: Claude, ChatGPT, Cursor, GitHub Copilot, and others. The token files are standard formats (JSON, CSS, TypeScript) that any AI can read. No special plugin or integration is needed.

### Does the AI need to understand the three-layer architecture?

It helps but isn't required. If you share `variables.css`, the AI sees flat CSS custom property names and can use them directly. If you also share `tokens-core.json`, the AI can understand the layered relationships and make smarter decisions (e.g., choosing semantic tokens over primitives).

### How do I validate AI-generated code against my tokens?

Check that the AI used actual token names from your exports. The most common AI mistake is inventing token names that don't exist. If an AI writes `var(--color-primary)` but your actual token is `var(--semantic-color-text-primary-default)`, the property won't resolve. Share your `variables.css` to give AI the exact available names.

### Can I use AI to generate new token values?

Yes — you can ask AI to suggest color palettes, spacing scales, or typography configurations. Then enter those values in DesignPush. However, AI can't directly modify your DesignPush project — it can only suggest values that you input manually.

### What if AI uses the wrong token for a context?

This usually means the AI doesn't have enough context about your token naming conventions. Share more specific guidance: "For card backgrounds, use `--semantic-color-surface-neutral-subtle`. For primary buttons, use `--component-button-primary-background`."

### Do descriptions slow down my exports?

No. Descriptions add minimal file size (a few KB of text) and don't affect CSS compilation or runtime performance.
