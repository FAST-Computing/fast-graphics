# @fast/components — API Reference

All components live in `@fast/components`. They require `@fast/tokens`, `@fast/mui-theme`, and a compatible MUI theme provider in the tree (use `FastThemeProvider` or `createThemeFromTokens`).

---

## FastThemeProvider

Root wrapper. Creates a MUI theme from a brand name and provides it to all children.

```tsx
import { FastThemeProvider } from '@fast/components';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `BrandName` | – | One of: `'fast_core'`, `'fast_argos'`, `'fast_atlas'`, `'simplifica_core'`, `'simplifica_burlo'` |
| `children` | `ReactNode` | – | Component tree |
| `withCssBaseline` | `boolean` | `true` | Inject MUI `CssBaseline` (normalize + global resets) |
| `withComponentDefaults` | `boolean` | `true` | Apply sensible MUI component defaults (`MuiAppBar`, `MuiButton`) |

### Example

```tsx
<FastThemeProvider brand="fast_core">
  <YourApp />
</FastThemeProvider>
```

---

## FastButton

Wallet-style button with three visual variants and a clip-path circular reveal on hover.

```tsx
import { FastButton } from '@fast/components';
```

### Types

```tsx
type FastButtonColor = 'primary' | 'secondary';
type FastButtonVariant = 'default' | 'outlined' | 'text';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Button text |
| `icon` | `ReactNode` | – | MUI icon node, e.g. `<Payment />` |
| `color` | `FastButtonColor` | `'primary'` | Which palette color to use |
| `variant` | `FastButtonVariant` | `'default'` | Visual style |
| `width` | `number \| string` | `130` | Number → `px`, string → raw CSS (e.g. `"100%"`) |
| `height` | `number \| string` | `40` | Same as width |
| `fontSize` | `number \| string` | `inherit` | Text size. Number → `px`, string → raw CSS |
| `animated` | `boolean` | `false` | Enable hover reveal animation |
| `disabled` | `boolean` | `false` | Disabled state (opacity 0.4, no interactions) |
| `onClick` | `MouseEventHandler` | – | Click handler |

### Variant behavior

| Variant | Background | Text color | Border | Hover text |
|---------|-----------|------------|--------|------------|
| `'default'` | `palette[color].main` | `contrastText` | none | `filter: invert(1)` |
| `'outlined'` | transparent | `palette[color].main` | `2px solid main` | `color: contrastText` |
| `'text'` | transparent | `palette[color].main` | none | `color: contrastText` |

### Animation

When `animated={true}`, hovering triggers a circular reveal from the bottom-left corner (`clip-path: circle(0% at 0% 100%)` → `circle(150%)`). The element background (`::before`) slides in using the variant's hover color. On press, the button translates down `3px`.

### Example

```tsx
<FastButton
  label="Pay Now"
  icon={<Payment />}
  color="primary"
  variant="outlined"
  width={200}
  height={44}
  fontSize={16}
  animated
  onClick={() => pay()}
/>
```

---

## FastCard

Simple card wrapper. Renders a `Box` + `Paper` with brand background and squared corners.

```tsx
import { FastCard } from '@fast/components';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | – | Card content |
| `width` | `number \| string` | `360` | Number → `px`, string → raw CSS |
| `height` | `number \| string` | – | Card height (optional) |

### Example

```tsx
<FastCard width={300} height={400}>
  <Typography variant="h6">Title</Typography>
  <Typography variant="body2">Content</Typography>
</FastCard>
```

---

## FastCardFA

Full-image card. An image fills the padded area with a gradient fade at the bottom. Content (title, text, buttons) sits over the fade.

```tsx
import { FastCardFA } from '@fast/components';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | – | Image source URL (required) |
| `alt` | `string` | `''` | Image alt text |
| `width` | `number \| string` | `360` | Card width |
| `height` | `number \| string` | `480` | Card height |
| `children` | `ReactNode` | – | Content rendered at bottom over the image |

### Styling note

Pass `sx={{ color: 'inherit' }}` on MUI `Typography` children to inherit the card's white text color.

### Example

```tsx
<FastCardFA src="/cat.jpg" width={300} height={420}>
  <Typography variant="h6" sx={{ color: 'inherit' }}>Whiskers</Typography>
  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
    <FastButton label="Pet" size="small" />
  </Box>
</FastCardFA>
```

---

## FastTextField

Branded text input wrapping MUI `TextField`. Focus ring uses the brand palette color.

```tsx
import { FastTextField } from '@fast/components';
```

### Types

```tsx
type FastTextFieldColor = 'primary' | 'secondary';
```

### Props

Extends MUI `TextFieldProps` (minus `color`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `FastTextFieldColor` | `'primary'` | Focus accent color |
| `width` | `number \| string` | – | Input width |
| `height` | `number \| string` | – | Input root height |

All other MUI `TextField` props are passed through (`label`, `value`, `onChange`, `error`, `helperText`, `disabled`, `multiline`, etc.).

### Example

```tsx
<FastTextField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  width="100%"
  error={!isValid}
  helperText="Enter a valid email"
/>
```

---

## FastDialog

Modal dialog with a branded header bar. Wraps MUI `Dialog`.

```tsx
import { FastDialog } from '@fast/components';
```

### Types

```tsx
type FastDialogColor = 'primary' | 'secondary';
```

### Props

Extends MUI `DialogProps` (minus `color`, `title`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | – | Controlled open state (required) |
| `onClose` | `() => void` | – | Close handler (required) |
| `title` | `ReactNode` | – | Header title |
| `children` | `ReactNode` | – | Dialog body content |
| `actions` | `ReactNode` | – | Footer actions (buttons) |
| `color` | `FastDialogColor` | `'primary'` | Header background color |
| `maxWidth` | `DialogProps['maxWidth']` | `'sm'` | Max width breakpoint |

### Example

```tsx
<FastDialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  title="Confirm"
  actions={
    <>
      <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
      <Button variant="contained" onClick={confirm}>Confirm</Button>
    </>
  }
>
  <Typography>Are you sure?</Typography>
</FastDialog>
```

---

## FastCheckbox

Squared checkbox with brand colors. SVG-based with animated checkmark draw.

```tsx
import { FastCheckbox } from '@fast/components';
```

### Types

```tsx
type FastCheckboxColor = 'primary' | 'secondary';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `FastCheckboxColor` | `'primary'` | Checked accent color |
| `size` | `number` | `28` | Box size in px |
| `label` | `string` | – | Label text shown next to checkbox |
| `checked` | `boolean` | – | Controlled checked state |
| `defaultChecked` | `boolean` | – | Uncontrolled initial state |
| `onChange` | `(e) => void` | – | Change handler |
| `disabled` | `boolean` | – | Disabled state |

### Example

```tsx
<FastCheckbox color="primary" label="Accept terms" defaultChecked />
```

---

## FastRadio

Squared radio button with brand colors. SVG-based, same aesthetic as `FastCheckbox`. Use with `name` for grouping.

```tsx
import { FastRadio } from '@fast/components';
```

### Types

```tsx
type FastRadioColor = 'primary' | 'secondary';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `FastRadioColor` | `'primary'` | Checked accent color |
| `size` | `number` | `28` | Box size in px |
| `label` | `string` | – | Label text shown next to radio |
| `checked` | `boolean` | – | Controlled checked state |
| `defaultChecked` | `boolean` | – | Uncontrolled initial state |
| `onChange` | `(e) => void` | – | Change handler |
| `disabled` | `boolean` | – | Disabled state |
| `name` | `string` | – | Group name (radio behavior) |
| `value` | `string` | – | Radio value |

### Example

```tsx
<FastRadio color="primary" name="pet" label="Cat" defaultChecked />
<FastRadio color="primary" name="pet" label="Dog" />
```

---

## FastRadioBox

Tile-style radio selector. A bordered box with icon and stacked label. Outlined when unchecked, solid brand fill when checked.

```tsx
import { FastRadioBox } from '@fast/components';
```

### Types

```tsx
type FastRadioColor = 'primary' | 'secondary';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `FastRadioColor` | `'primary'` | Accent color |
| `icon` | `ReactNode` | – | Icon inside the tile (MUI icon) |
| `label` | `string` | – | Label text below icon |
| `width` | `number \| string` | `72` | Tile width |
| `height` | `number \| string` | `72` | Tile height |
| `checked` | `boolean` | – | Controlled checked state |
| `defaultChecked` | `boolean` | – | Uncontrolled initial state |
| `onChange` | `(e) => void` | – | Change handler |
| `disabled` | `boolean` | – | Disabled state |
| `name` | `string` | – | Group name |
| `value` | `string` | – | Radio value |

### Example

```tsx
<FastRadioBox color="primary" name="cat" icon={<CakeIcon />} label="Whiskers" />
<FastRadioBox color="primary" name="cat" icon={<EggIcon />} label="Luna" />
```

---

## FastBurger

Animated hamburger menu icon. Uses SVG paths that morph on toggle via CSS transitions.

```tsx
import { FastBurger } from '@fast/components';
```

### Types

```tsx
type FastBurgerColor = 'primary' | 'secondary';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `FastBurgerColor` | `'primary'` | Stroke color |
| `size` | `number` | `2` | Size in `em` units |
| `checked` | `boolean` | – | Controlled checked state |
| `defaultChecked` | `boolean` | – | Uncontrolled initial state |
| `onChange` | `(e) => void` | – | Change handler |

### Example

```tsx
<FastBurger color="primary" defaultChecked />
```

---

## FastLoader

Animated loading indicator with two pulsing chevrons. SVG-based, uses `stroke-dashoffset` keyframes.

```tsx
import { FastLoader } from '@fast/components';
```

### Types

```tsx
type FastLoaderColor = 'primary' | 'secondary';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `FastLoaderColor` | `'primary'` | Chevron stroke color |
| `size` | `number` | `48` | Container size in px |

### Example

```tsx
<FastLoader color="primary" size={64} />
```

---

## FastTable

Data table built on `@tanstack/react-table`. Supports sorting, pagination, striped rows, and hover highlighting.

```tsx
import { FastTable } from '@fast/components';
```

### Types

```tsx
type FastTableColor = 'primary' | 'secondary';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | – | Row data array (required) |
| `columns` | `ColumnDef<T, any>[]` | – | Column definitions (required) |
| `color` | `FastTableColor` | `'primary'` | Header background |
| `showFooter` | `boolean` | `false` | Render footer row |
| `hoverable` | `boolean` | `true` | Highlight row on hover |
| `striped` | `boolean` | `true` | Alternate row backgrounds |
| `width` | `number \| string` | `'100%'` | Table width |
| `sortable` | `boolean` | `false` | Enable column sorting |
| `pageable` | `boolean` | `false` | Enable pagination controls |
| `defaultPageSize` | `number` | `5` | Default rows per page |
| `renderActions` | `(row: T) => ReactNode` | – | Render custom action column per row |
| `actionsHeader` | `string` | `'Actions'` | Header text for actions column |

### Example

```tsx
<FastTable
  data={cats}
  columns={columns}
  color="secondary"
  width="75%"
  sortable
  pageable
  renderActions={(row) => (
    <FastButton label="Edit" onClick={() => edit(row)} />
  )}
/>
```

---

## Design tokens reference

The underlying `fast_core` brand values used across all components:

| Token | Value |
|-------|-------|
| Primary `main` | `#FF6A00` |
| Primary `dark` | `#d64800` |
| Primary `light` | `#ff8055` |
| Secondary `main` | `#006b5e` |
| Secondary `dark` | `#005246` |
| Secondary `light` | `#54aa9b` |
| Background `default` | `#dfe0df` |
| Background `paper` | `#ffffff` |
| Text `primary` | `#0f0f0f` |
| Text `secondary` | `#5a5a5a` |
| Font | `"Google Sans", -apple-system, …` |
| Shadow | `5px 5px 10px rgba(0,0,0,0.103)` |
| Corners | `border-radius: 0` (squared) |
