---
title: Component Tokens
description: Component showcases (Button, Badge, Text Input), the 4-tab editor (Base, Sizes, Colors, Compose), and token badges.
---

Component tokens define the visual appearance of specific UI elements — buttons, badges, text inputs, and more. They bring together primitive and semantic tokens into ready-to-use component specifications.

Select **Component** in the sidebar to see all available component showcases.

---

## How component tokens work

Component tokens are organized into three sub-layers:

```
Component Token
├── Pattern    — Shared structure (padding, radius, gap, border)
├── Variants   — Color and style differences (primary, ghost, etc.)
└── Sizes      — Dimensional overrides per size (sm, md, lg)
```

**Patterns** define the structural foundation shared by all variants and sizes. **Variants** customize color and appearance. **Sizes** override dimensions for different size options.

Each sub-layer references tokens from the primitive and semantic layers rather than containing raw values. This means a button's padding references a semantic spacing token, which in turn references a primitive spacing token — all connected.

---

## The four tabs

Every component showcase has an identical four-tab structure:

### Base tab

The Base tab controls the **pattern** — the structural tokens shared across all variants and sizes.

Typical base properties include:

| Property | Description | References |
|----------|-------------|-----------|
| Border Width | Outline thickness | Primitive border-width |
| Border Radius | Corner rounding | Primitive radius |
| Padding (X/Y) | Internal spacing | Semantic spacing |
| Gap | Space between child elements | Semantic spacing |
| Icon Size | Default icon dimensions | Primitive icon size |
| Icon Stroke | Default icon weight | Primitive icon stroke |
| Text Style | Typography preset | Semantic typography |
| Transition | Animation preset | Semantic transition |
| Cursor | Mouse cursor style | CSS cursor value |

The Base tab also includes a **Context/Description** textarea — a free-text field where you describe the component's purpose, usage guidelines, or design intent. This description is embedded in your exports and is especially useful for AI tools. See [AI Workflow](/features/ai-workflow/) for tips on writing effective descriptions.

### Sizes tab

The Sizes tab lets you define **per-size overrides** for dimensional tokens. Most components support three sizes:

| Size | Meaning |
|------|---------|
| **SM** | Compact — for dense UIs and secondary actions |
| **MD** | Default — inherits from base (no explicit overrides needed) |
| **LG** | Spacious — for primary actions and touch targets |

MD inherits everything from the Base tab, so you typically only configure SM and LG overrides. Properties you can override per size include:

- Min height
- Horizontal and vertical padding
- Gap
- Icon size
- Font size
- Border radius

Each size shows a live mini-preview so you can see the proportional differences.

### Colors tab

The Colors tab manages **variant colors** — how different variants (primary, secondary, ghost, etc.) look across different interaction states.

For each variant, you configure colors for:

| State | When it applies |
|-------|----------------|
| **Default** | Normal resting state |
| **Hover** | Mouse hover |
| **Active** | Being clicked/pressed |
| **Disabled** | Non-interactive state |

For each state, you set:

- **Background color** — Surface fill (references semantic colors)
- **Text color** — Foreground/label color
- **Border color** — Outline color
- **Opacity** — Overall transparency

Color selectors are dropdown menus showing semantic color options grouped by role (text, surface, border, interactive) and intent (primary, secondary, neutral, etc.).

### Compose tab

The Compose tab is an **interactive playground** where you assemble a complete component from your configured tokens. Select a variant, size, and layout to see the result. The tab provides:

- **Variant selector** — Choose primary, secondary, ghost, etc.
- **Size selector** — Choose sm, md, lg
- **Layout selector** — Where applicable (e.g., icon position)
- **Live preview** — The assembled component rendered with your tokens
- **Code snippet** — Generated code (JSX, JSON, CSS) that you can copy

---

## Button showcase

The Button is the most detailed component showcase, with rich customization options.

### Variants

| Variant | Purpose |
|---------|---------|
| **Primary** | Main call-to-action. Prominent fill color. |
| **Secondary** | Supporting action. Subtle fill or outlined. |
| **Ghost** | Minimal visual weight. Transparent background. |
| **Destructive** | Dangerous actions (delete, remove). Error-toned. |

### Sizes

| Size | Use case |
|------|----------|
| **SM** | Compact areas, toolbars, table actions |
| **MD** | Default size for most contexts |
| **LG** | Primary page actions, hero sections |

### States (per variant)

Each variant has 4 states: default, hover, active, and disabled. That creates a matrix of **4 variants x 4 states = 16 color configurations**.

### Base properties

The Button Base tab includes:

- **Pattern card** — Padding X/Y, border radius, border width, gap, icon size, icon stroke
- **Layout card** — Min width, max width, justify-content, cursor, white-space, overflow/text-overflow
- **Context textarea** — Description for AI and documentation

### Compose options

The Button Compose tab offers:
- 4 variants (primary, secondary, ghost, destructive)
- 3 sizes (sm, md, lg)
- Layout options for icon positioning

---

## Badge showcase

Badges are small status indicators that communicate category or state.

### Variants (intents)

| Variant | Typical color |
|---------|--------------|
| **Neutral** | Gray tones |
| **Primary** | Brand primary |
| **Secondary** | Brand secondary |
| **Accent** | Brand accent |
| **Success** | Green |
| **Warning** | Amber |
| **Error** | Red |
| **Info** | Blue |

### Styles

| Style | Appearance |
|-------|-----------|
| **Default** | Subtle fill, colored text |
| **Bold** | Solid fill, white/contrast text |

### Sizes

| Size | Use case |
|------|----------|
| **XS** | Inline indicators, counts |
| **SM** | Standard badges |
| **MD** | Prominent badges, headers |

### Base properties

Badge pattern tokens: padding X/Y, border radius, border width, gap, badge style selector.

### Colors

The Badge Colors tab organizes colors by intent. For each of the 8 intents, you configure background, text, and border colors.

---

## Text Input showcase

Text Input covers single-line inputs and multi-line textareas.

### States

| State | Appearance |
|-------|-----------|
| **Default** | Resting state |
| **Focus** | Active editing, focus ring visible |
| **Error** | Validation failure, error border |
| **Disabled** | Non-interactive, dimmed |

### Sizes

| Size | Use case |
|------|----------|
| **SM** | Compact forms |
| **MD** | Standard forms |

### Base properties

Text Input pattern tokens: padding X/Y, border radius, border width, label size, min/max width, context description.

### Colors

Text Input colors are organized by state (default, focus, error, disabled). For each state: background, text, border, and focus ring colors.

---

## Token badges

Throughout the component showcases, you'll see small colored badges next to token references:

| Badge color | Layer | Example |
|-------------|-------|---------|
| **Purple** | Primitive | `primitive.radius.md` |
| **Teal** | Semantic | `semantic.color.text.primary.default` |

**Click any badge to copy the full token path** to your clipboard. This is useful when:
- Writing CSS that references tokens: `var(--primitive-radius-md)`
- Sharing token names with teammates
- Pasting into AI conversations for precise references

---

## The Context/Description field

Every component showcase has a **Context** textarea in the Base tab. This field accepts free-text descriptions that serve two purposes:

1. **Documentation** — Describe when and how to use this component. This exports with your tokens.
2. **AI instructions** — When you share your exported tokens with AI tools, these descriptions help the AI understand your design intent.

### Writing effective descriptions

**Good descriptions:**
```
Primary action button. Use for the single most important action on a page.
Always use the primary variant for CTAs. Limit to one primary button per view.
Ghost buttons are for tertiary actions or toolbar items.
```

**Less helpful descriptions:**
```
A button component.
```

Be specific about *when to use* each component, *which variant fits which context*, and any *rules or constraints*. AI tools use this information to make better decisions when generating UI code. See [AI Workflow](/features/ai-workflow/) for more tips.

---

## Frequently asked questions

### Why is there no MD row in the Sizes tab?

MD is the **default size** — it inherits everything from the Base tab. You only need to configure SM and LG as overrides. If you want to change MD dimensions, edit the Base tab instead.

### How do I add a custom variant (e.g., a "premium" button)?

The current version has a fixed set of variants per component (4 for Button, 8 for Badge, 1 for TextInput). Custom variants are not yet supported. You can use the `tokens-extended.json` file to define additional tokens manually — see [AI Workflow](/features/ai-workflow/).

### What goes in the Context/Description field?

Usage guidelines for the component. Think of it as a brief design spec: when to use each variant, sizing rules, do's and don'ts. These descriptions are embedded in your exports and help AI tools generate appropriate code. See the section above for examples.

### Can I preview all variants at once?

The Compose tab shows one combination at a time (one variant + one size). To compare variants side-by-side, use the [Preview Panel](/features/preview-panel/), which renders multiple variants on the same page.

### How do component tokens reference semantic tokens?

Through the same reference chain used everywhere in DesignPush. When you select `semantic.color.interactive.primary.default` for a button's background, the component token stores that reference. At export time, it resolves through the chain: component → semantic → primitive → raw value. The CSS output uses `var()` references to maintain the chain at runtime.

### What components are available?

The current beta includes **Button**, **Badge**, and **Text Input** as fully editable component showcases. The sidebar also lists upcoming components (Text Area, Select, Checkbox, Radio, Switch, Avatar, Tooltip, Tab Bar, Card, Modal) that will be added in future releases.
