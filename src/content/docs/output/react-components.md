---
title: React Components
description: API reference for the dp-react component library — token-driven React components exported with your design system.
---

When you export your design system, DesignPush includes **dp-react** — a set of React components that consume your design tokens via CSS custom properties. Every component is fully controlled by the tokens you've configured in the editor.

---

## Setup

1. Copy the `packages/dp-react/` folder into your project
2. Import the component CSS in your entry point:

```tsx
// src/main.tsx
import './design-system/build/core/variables.css';
import './design-system/build/components/variables.css';
```

3. Import components:

```tsx
import { Button, Input, Card } from './dp-react';
```

---

## Components

### Button

Interactive button with four variants and three sizes.

```tsx
<Button variant="primary" size="md">Save</Button>
<Button variant="ghost" size="sm" layout="icon-left" icon={<PlusIcon />}>Add item</Button>
<Button variant="destructive">Delete</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `layout` | `'label-only' \| 'icon-only' \| 'icon-left' \| 'icon-right'` | `'label-only'` | Icon placement |
| `icon` | `ReactNode` | — | Icon element |
| `toggle` | `boolean` | `false` | Toggle button mode |
| `isActive` | `boolean` | `false` | Active state (for toggle) |

Also accepts all native `<button>` attributes.

---

### Badge

Status indicator with eight semantic variants and four visual styles.

```tsx
<Badge variant="success" badgeStyle="subtle">Active</Badge>
<Badge variant="error" badgeStyle="bold">Failed</Badge>
<Badge variant="info" badgeStyle="outline" layout="icon-left" icon={<InfoIcon />}>Note</Badge>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'neutral' \| 'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` | Semantic color |
| `badgeStyle` | `'subtle' \| 'bold' \| 'outline' \| 'code'` | `'subtle'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `layout` | `'label-only' \| 'icon-only' \| 'icon-left' \| 'icon-right'` | `'label-only'` | Icon placement |
| `icon` | `ReactNode` | — | Icon element |
| `disabled` | `boolean` | `false` | Disabled state |

---

### Input

Single-line text input with optional icon and label.

```tsx
<Input placeholder="Email address" />
<Input size="sm" error placeholder="Invalid" />
<Input label="Search" layout="icon-left" icon={<SearchIcon />} placeholder="Search..." />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `error` | `boolean` | `false` | Error state |
| `label` | `string` | — | Label text |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Label placement |
| `layout` | `'label-only' \| 'icon-left' \| 'icon-right'` | `'label-only'` | Icon placement |
| `icon` | `ReactNode` | — | Icon element |
| `onIconClick` | `() => void` | — | Icon click handler |
| `type` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url' \| 'number'` | `'text'` | Input type |

Also accepts all native `<input>` attributes.

---

### TextArea

Multi-line text input with label support.

```tsx
<TextArea placeholder="Write a message..." rows={4} />
<TextArea size="sm" label="Notes" />
<TextArea error placeholder="Required field" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `error` | `boolean` | `false` | Error state |
| `label` | `string` | — | Label text |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Label placement |
| `rows` | `number` | `3` | Visible rows |

Also accepts all native `<textarea>` attributes.

---

### Select

Custom dropdown select with search, groups, and custom rendering.

```tsx
const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

<Select options={options} value={value} onChange={setValue} />
<Select options={options} searchable placeholder="Choose..." />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | — | Flat option list |
| `groups` | `SelectOptionGroup[]` | — | Grouped options (use instead of `options`) |
| `value` | `string` | — | Selected value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `variant` | `'default' \| 'menu' \| 'button'` | `'default'` | Visual style |
| `label` | `string` | — | Label text |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Label placement |
| `searchable` | `boolean` | `false` | Enable type-to-search |
| `searchPlaceholder` | `string` | `'Search...'` | Search field placeholder |
| `collapsibleGroups` | `boolean` | `false` | Allow group collapse |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean` | `false` | Error state |
| `placement` | `'bottom' \| 'top'` | — | Dropdown direction |
| `maxHeight` | `string` | — | Dropdown max height |
| `renderOption` | `(option, state) => ReactNode` | — | Custom option renderer |
| `renderValue` | `(option) => ReactNode` | — | Custom trigger renderer |
| `header` | `ReactNode` | — | Content above options |
| `loadMore` | `() => void` | — | Infinite scroll callback |
| `hasMore` | `boolean` | `false` | More items available |

**SelectOption:** `{ value: string; label: string; badge?: ReactNode; disabled?: boolean }`

**SelectOptionGroup:** `{ label: string; options: SelectOption[]; defaultOpen?: boolean }`

---

### Switch

Toggle switch with label and semantic variants.

```tsx
<Switch checked={on} onChange={handleChange} />
<Switch label="Dark mode" size="sm" />
<Switch label="Delete" variant="destructive" labelPosition="left" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `variant` | `'default' \| 'success' \| 'destructive'` | `'default'` | Color variant |
| `label` | `string` | — | Label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label placement |

Also accepts all native `<input>` attributes (except `size` and `type`).

---

### Checkbox

Checkbox input with indeterminate state support.

```tsx
<Checkbox label="Accept terms" />
<Checkbox checked indeterminate label="Select all" />
<Checkbox size="sm" label="Remember me" labelPosition="left" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `label` | `string` | — | Label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label placement |

Also accepts all native `<input>` attributes (except `size` and `type`).

---

### Radio & RadioGroup

Radio button group for single-selection.

```tsx
<RadioGroup name="color" value={color} onChange={(e) => setColor(e.target.value)}>
  <Radio value="red" label="Red" />
  <Radio value="blue" label="Blue" />
  <Radio value="green" label="Green" />
</RadioGroup>
```

**RadioGroup:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Group name |
| `value` | `string` | — | Selected value |
| `onChange` | `(e: ChangeEvent) => void` | — | Change handler |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'md'` | `'md'` | Size for all radios |
| `label` | `string` | — | Group label |
| `disabled` | `boolean` | — | Disable all radios |

**Radio:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | — | Size (inherits from group) |
| `label` | `string` | — | Label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label placement |

---

### ThumbSlider

Range slider input.

```tsx
<ThumbSlider min={0} max={100} value={50} onChange={handleChange} />
<ThumbSlider size="sm" min={0} max={1} step={0.1} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `min` | Initial value (uncontrolled) |

Also accepts all native `<input>` attributes (except `size` and `type`).

---

### Tooltip

Hover tooltip with configurable position and delay.

```tsx
<Tooltip content="Save changes" position="top">
  <Button>Save</Button>
</Tooltip>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | **required** | Tooltip content |
| `children` | `ReactNode` | **required** | Trigger element |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Placement |
| `delay` | `number` | `200` | Show delay in ms |

---

### Card

Compound card component with header, body, and footer sections.

```tsx
<Card variant="elevated" size="md">
  <CardHeader title="Settings" description="Manage your preferences" />
  <CardBody>
    <p>Card content here</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>
```

**Card:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'interactive'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | — | Size |

**CardHeader:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Header title |
| `description` | `string` | — | Subtitle text |
| `subtitle` | `string` | — | Secondary subtitle |
| `avatar` | `ReactNode` | — | Avatar or icon |
| `children` | `ReactNode` | — | Custom header content |

**CardBody / CardFooter:** Accept `children` and `className`.

---

### Avatar

User avatar with image, initials, or icon content.

```tsx
<Avatar src="/photo.jpg" alt="Jane" size="lg" />
<Avatar variant="primary" size="md">JS</Avatar>
<Avatar variant="neutral" size="sm" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size |
| `variant` | `'primary' \| 'neutral' \| 'secondary'` | `'primary'` | Color variant |
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text |
| `children` | `ReactNode` | — | Initials or icon |

---

### Divider

Horizontal rule separator.

```tsx
<Divider />
<Divider variant="strong" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'subtle' \| 'strong'` | `'subtle'` | Visual weight |

---

### TabBar

Horizontal tab navigation.

```tsx
const tabs = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
];

<TabBar tabs={tabs} activeTab={active} onTabChange={setActive} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | **required** | Tab definitions |
| `activeTab` | `string` | **required** | Active tab ID |
| `onTabChange` | `(tabId: string) => void` | **required** | Tab change handler |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `controls` | `ReactNode` | — | Right-side controls |

**Tab:** `{ id: string; label: string }`

---

## Token-driven styling

Every component reads its visual properties from CSS custom properties. When you change tokens in DesignPush and re-export, the components update automatically — no code changes needed.

```
DesignPush editor → tokens-components.json → build/components/variables.css → dp-react components
```

For example, changing the button's border radius in the editor updates `--pattern-button-base-tokens-border-radius`, which the Button component consumes directly.

### Overriding tokens locally

You can override any component token with inline styles or scoped CSS:

```tsx
{/* Override button radius for this instance */}
<div style={{ '--pattern-button-base-tokens-border-radius': '999px' } as React.CSSProperties}>
  <Button>Pill button</Button>
</div>
```

---

## CSS class prefix

All dp-react components use the `dp-` class prefix (e.g., `dp-button`, `dp-input`, `dp-card`). This avoids conflicts if you're using other component libraries alongside dp-react.
