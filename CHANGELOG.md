# @fast/graphics

## 1.6.0

Automated tests, custom calendar popup for FastDateInput, column-level filtering in FastTable with range support.

### Storybook Tests
- Currently supporting Interactions and Accessibility tests (Axe rules compliant).

### FastDateInput

- **Custom calendar popup**: replaced native `<input type="date">` with a full React-calendar. Month/year navigation with ChevronLeft/ChevronRight icons, 7-column day grid (Mon–Sun), selected day highlighted with brand `main` background + `contrastText`, today highlighted with `action.hover`.
- **Today & Clear buttons**: popup footer with both actions. "Today" jumps to current date. "Clear" resets the value.
- **Click-outside-to-close**: `useEffect` with `mousedown` listener on document closes the popup when clicking outside the wrapper.
- **Focus state on Clear**: `setFocused(false)` forced in `commitDate` so the floating label drops back to center when clearing.
- **`:active` moved to Trigger**: removed from the wrapper (which contained the popup), added to the Trigger div. Clicking calendar days, arrows, or buttons no longer triggers the press-down transform on the whole component.

### FastTable

- **New `columnFilterable` prop**: when true, renders a filter input row in `<thead>` below the header row. Each column gets a text input connected to `header.column.setFilterValue()`.
- **Range filter support**: columns with `meta: { filterVariant: 'range' }` render two number inputs (Min / Max) instead of a single text input. Values are stored as `[min, max]` array.
- **Built-in `inNumberRange`**: tanstack/react-table's native `inNumberRange` filter function. Uses `resolveFilterValue` for string-to-number parsing, auto-swaps min/max when inverted, and auto-removes when both inputs are empty.
- **Age column filter**: data now use `filterFn: 'inNumberRange'` with `meta: { filterVariant: 'range' }`.

### FastButton — aXe fixes

- **`::before` moved to `StyledWrapper`**: pseudo-element moved from `.Btn` to the outer wrapper so `.Btn` has no overlapping pseudo-elements. aXe can now resolve color contrast against the single `background-color` on `.Btn`. Added `pointer-events: none` on `::before` to prevent click interception.
- **Smooth default variant hover**: added `filter 0.2s ease` to `.Btn-content` transition. The default variant uses `filter: invert(1)` on hover which now fades smoothly instead of snapping, matching the fluid feel of outlined/text variants.

### FastTextField / FastTextArea — aXe fixes

- **`aria-label={placeholder}`**: added to both `<input>` and `<textarea>` elements. The floating label (`<span class="float-label">`) is visual only — aXe requires a programmatic association. `aria-label` resolves the "Form label" critical violation without changing the visual design.

---

## 1.5.0

FastTooltip, FastUpload, FastTextArea, FastEmptyState, forwardRef support on FastButton, JSDoc documentation across all components.

### New components

- **`FastTooltip`** — styled MUI Tooltip wrapper with `slotProps` for portal-safe styling. Squared corners, brand-colored background, same shadow as other components. Supports `color` (primary/secondary/paper/text), `placement`, `arrow`. Styled via `slotProps.tooltip.sx` — works with MUI v9 Portals.
- **`FastUpload`** — drag & drop file upload with dashed border empty state, filled file list with previews, remove button, multiple file support, `maxSize` validation, and `required` validation. Uses `CloudUploadIcon` and `ClearIcon` from MUI icons. Hover fills brand accent.
- **`FastTextArea`** — multiline text area with floating label, same brand border/focus/hover as FastTextField. Supports `rows`, `resize` (none/vertical), `minHeight`, `required`, `errorMessage`. Input color uses `text.primary`.
- **`FastEmptyState`** — placeholder image and message to cover for empty data pages or 404.

### FastButton — forwardRef + rest spread

- **`React.forwardRef`** wrapping — enables MUI Tooltip (and other wrapper components) to attach event handlers via ref.
- **`...rest` spread** on `StyledWrapper` — unknown props (e.g. `onMouseEnter`, `onMouseLeave` injected by Tooltip) are now passed to the DOM element instead of being silently lost.
- **New `type` prop**: `'button' | 'submit' | 'reset'`. Default `'button'` to prevent accidental form submits.

### Storybook

- **Icon mapping for FastButton** — `icon` control now uses a `select` with `mapping` to 8 common MUI icons (Payment, Favorite, Cart, Send, Delete, Edit, Settings, Search).
- **New stories**: FastTextArea (6 variants), FastTooltip (3 variants), FastUpload (5 variants).
- **Width/height controls** changed from `{ control: 'number' }` to `{ control: 'text' }` across FastButton, FastCard, FastCardFA — allows entering percentage values like `"100%"`.
- **JSDoc comments** added to every prop of every component — all visible in Storybook autodocs tables.

### Input text color

- FastTextField, FastTextArea, FastDateInput `.field-input` and `.date-label`/`.date-icon` now use `palette.text.primary` instead of the brand accent color. Accent retained on borders, labels, focus rings, and hover effects.

---

## 1.4.0

Storybook documentation suite, input text color refinement, and CI/CD for component showcase.

### FastTextField / FastDateInput

- **Input text color changed** from `palette[accent].main` (brand orange) to `palette.text.primary` (standard dark). Accent color retained for borders, labels, stepper buttons, and focus rings. Error state still uses `error.main` (red).
- FastDateInput `.date-label` and `.date-icon` also use `text.primary` with the same error fallback.

### Storybook

- **16 story files** covering all components: FastThemeProvider, FastButton, FastCard, FastCardFA, FastTextField, FastDateInput, FastCheckbox, FastRadio, FastRadioBox, FastToggle, FastSlider, FastBurger, FastLoader, FastDialog, FastDropdown, FastTable.
- **Auto-generated docs** (`tags: ['autodocs']`) with interactive Controls for every prop.
- **Global decorator**: all stories wrapped in `FastThemeProvider` with brand selector.
- **Vite aliases** configured for `@fast/*` packages in `.storybook/main.ts`.
- **A11y checks** enabled via `@storybook/addon-a11y`.

### CI/CD

- **New GitHub Actions workflow** (`.github/workflows/storybook.yml`): builds Storybook on push to `main`/`master` and deploys to GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages`.

---

## 1.3.2

Critical controlled-mode fixes for stepper and date picker hydration.

### FastTextField

- **Stepper + blur clamping now emit `onChange`**: `stepValue()` and `handleBlur()` call `emitChange(formatted)` via native input mutation + `dispatchEvent`. Previously only called `commitValue()` which is a no-op in controlled mode. Fixes RHF/react-hook-form compatibility.
- `emitChange` uses `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')` to set the native value and dispatches a synthetic `input` event so React Hook Form picks up the change.

### FastDateInput

- **Fixed `showPicker()` crash during Next.js hydration replay**: wrapped in `try/catch`. Old `?.() || .click()` short-circuited on exception instead of falsy, so the fallback `click()` never ran. Now `catch` block calls `click()` reliably.

---

## 1.3.1

Numeric fields with stepper, required prop on all form controls, external error messages, and button type support.

### FastTextField

- **New `numeric` prop**: restricts input to numeric values (int or float). Filters non-numeric characters on input.
- **New `stepper` prop**: shows up/down buttons on the right side of the field. Implies `numeric`. Hover fills buttons with brand color.
- **New `step`/`min`/`max`/`precision` props**: configure stepper increment, bounds, and decimal places.
- **New `errorMessage` prop**: string shown in red below the field. Implies error styling. Overrides auto-required message.
- **Fixed uncontrolled value binding**: input now uses `value={displayValue}` instead of separate `value`/`defaultValue`, fixing stepper updates and label overlap on blur.
- **`hasValue`** now checks `displayValue !== ''` for robust empty detection.

### FastDateInput

- **New `errorMessage` prop**: same behavior as FastTextField — string shown in red below the field.

### FastCheckbox / FastRadio / FastRadioBox

- **New `required` prop**: shows red asterisk `*` next to the label text. Passes `required` to the native input for browser validation.

### FastButton

- **New `type` prop**: `'button' | 'submit' | 'reset'`. Default `'button'` to prevent accidental form submits.

---

## 1.3.0

Complete redesign of FastTextField and FastDateInput with floating labels and brand styling. Required field validation, wider click targets, and external package import compatibility.

### FastTextField — full redesign

- **Floating label**: placeholder floats to top-left corner when value exists or input is focused. Smooth `0.15s` transition.
- **Brand-styled container**: `2px solid main` border, squared corners, same hover background tint as FastDateInput.
- **Click-to-focus**: clicking anywhere in the outlined container focuses the input via ref.
- **New `required` prop**: shows red asterisk `*` on the label. Auto-triggers error on blur if empty — red border, red helper text "This field is required". Error clears on type.
- **Error colors**: `.float-label` and `.field-input` turn `error.main` when required validation fails.
- **Default height**: `52px` (up from 44px) to accommodate floating label + value text.
- **`height` prop**: `number` → `Npx`, `string` → raw CSS.

### FastDateInput — full redesign

- **Floating label**: same pattern as FastTextField — placeholder floats to top-left when date is selected or focused.
- **New `required` prop**: asterisk, auto-validation on blur, error clears on date select.
- **Error colors**: `.float-label`, `.date-label`, `.date-icon` all turn `error.main` when error state is active.
- **Focus/blur tracking**: moved to the wrapper element with `tabIndex` and `role="button"` for consistent behavior.
- **Hidden input overlay**: `position: absolute; opacity: 0; pointer-events: none` — picker anchors correctly below the component.
- **Default height**: `52px`.

### FastThemeProvider — import fix

- Changed imports from workspace names (`@fast/mui-theme`, `@fast/tokens`) to relative paths (`../../mui-theme/dist/index.js`, `../../tokens/dist/index.js`). Fixes resolution errors when the published package is installed in an external project.

### Documentation

- `CHANGELOG.md` — this entry.

---

## 1.2.0

Extended color palette, selected state, alignment control, global table search, and dark mode toggle on cards.

### FastButton — new props

- **Extended `color` palette**: `primaryMain`, `primaryLight`, `primaryDark`, `secondaryMain`, `secondaryLight`, `secondaryDark`, `paper` (white), `text` (dark). Each resolves to the exact theme color.
- **New `selected` prop**: when `true`, fills background with the color's own `main` value regardless of `variant`. Main/dark/light stay at their own shade — no swapping.
- **New `iconPosition` prop**: `'left'` (default) or `'right'` — controls icon order relative to label.
- **New `align` prop**: `'center'` (default), `'left'`, `'right'` — controls content alignment within the button.
- **Selected transitions**: added `transition: background-color 0.2s ease, box-shadow 0.2s ease` on `.Btn` for smooth fill/unfill.
- Removed `justify-content: center` from `.Btn` and added `flex: 1` on `.Btn-content` — fixes `align` prop overriding the parent centering.
- **`getColorSet`** exported and reused in `FastDropdown` for consistent color resolution across components.

### FastCard / FastCardFA

- **New `inverted` prop**: dark mode toggle. Swaps fade gradient (white↔near-black), background, and text colors using theme values (`background.paper`, `text.primary`).
- FastCardFA: `backdrop-filter: blur(2px)` with `mask-image` fade for smooth blur reveal on the bottom overlay.
- FastCardFA: image alt prop renamed from `alt` to `imgAlt` to avoid conflict with the `inverted` prop.

### FastTable

- **New `searchable` prop**: adds a global search input next to "Show X elements" in the pagination bar. Filters all columns via `@tanstack/react-table`'s `getFilteredRowModel()`.

### FastToggle

- New component: squared toggle switch with overshoot bounce animation (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Supports `color`, `label`, `checked`/`defaultChecked`/`onChange`, `disabled`.

### FastSlider

- **New `label` prop**: renders a label text above the slider.
- Width now applied to the wrapper div instead of the slider — slider fills at `width: 100%`.

### FastDropdown

- Updated color type to match `FastButtonColor`. Uses shared `getColorSet` from FastButton for consistent color rendering across all extended colors.

### Documentation

- `COMPONENTS.md` — added FastToggle, FastSlider, FastDropdown API sections.
- `CHANGELOG.md` — this entry.

---

## 1.1.0

New `@fast/components` package with 14 branded React components. Major FastButton rework, new form controls, and improved percentage-width support across the board.

### Packages

- **`@fast/components`** — new package with 14 ready-made branded components, built on `@fast/tokens` + `@fast/mui-theme`.

### New components

- `FastThemeProvider` — wraps `ThemeProvider` + `CssBaseline`, accepts `brand` prop.
- `FastTextField` — branded MUI TextField wrapper with `width`/`height` props and focus ring styling.
- `FastDialog` — branded modal dialog with colored header bar, squared corners.
- `FastCheckbox` — squared checkbox with animated checkmark draw, `label` prop.
- `FastRadio` — squared radio button with inner dot, `label` prop.
- `FastRadioBox` — tile-style radio selector with icon + label, outlined/solid states.
- `FastToggle` — toggle switch with squared thumb and overshoot bounce animation.
- `FastSlider` — MUI Slider wrapper with squared thumb, brand track, `label`/`width`/`height` props.
- `FastDropdown` — button + burger-menu dropdown, supports `default`/`outlined`/`text` variants.
- `FastCardFA` — full-image card with gradient fade, backdrop-filter blur, `inverted` dark mode.
- `FastTypography` — thin wrapper around MUI Typography with branded defaults.

### FastButton — major rework

- **New `variant` prop**: `default` (filled), `outlined` (transparent + border), `text` (no bg).
- **New `disabled` prop**: 0.4 opacity, `pointer-events: none`, no hover effects.
- **New `fontSize` prop**: number → px, string → raw CSS.
- **New `onClick` prop**: native click handler.
- **Hover animation**: replaced sliding circle with `clip-path: circle()` reveal from bottom-left corner — works at any size.
- **Variant hover behavior**: `default` uses `filter: invert(1)`, `outlined`/`text` switch to `contrastText`.
- **Color transitions**: `transition: color 0.25s` on content for smooth outlined/text hover.
- **Font fix**: added `font-family: inherit` to `<button>` element — was rendering in browser default font instead of Google Sans.
- **Width/height**: wrapper now owns width, inner button fills at 100%. Fixes `width="100%"` not filling parent.

### FastCard

- **New `inverted` prop**: dark mode — Paper bg becomes `grey.900`, text becomes `grey.100`.
- Removed `pb: 4` from outer Box to prevent visible gap when Box and Paper have different backgrounds.
- Fixed percentage width: Box gets width, Paper fills.

### FastCardFA

- **Backdrop-filter blur**: `blur(2px)` with `mask-image` fade for smooth blur reveal.
- **New `inverted` prop**: fade to `text.primary` instead of `background.paper`, text inverts.

### FastTable

- **New `renderActions` prop**: function `(row: T) => ReactNode` renders an extra actions column.
- **New `actionsHeader` prop**: custom header text (default "Actions").
- Actions column centered with `white-space: nowrap`.

### FastCheckbox / FastRadio

- **New `label` prop**: text rendered inline next to the control with `gap: 6px`.

### FastBurger

- Burger stroke color controlled by parent when used inside FastDropdown.

### Dependencies

- `@fast/components` adds `@fast/mui-theme` as a dependency (previously only had `@fast/tokens`).

### Documentation

- `COMPONENTS.md` — full API reference for all 14 components with props, types, and examples.
- `README.md` — updated quick-start with `FastThemeProvider`, brand table, complete component list, development commands, versioning guide.

---

## 1.0.0

Major cleanup and scope reduction. Dropped 3 packages (`assets`, `layouts`, `ui`), now focused on design tokens + MUI theme only.

### Breaking

- Removed `packages/assets` — CSS/SCSS variable generation pipeline (`cssVars.ts`, build scripts, dist CSS). Use `@fast/mui-theme` instead.
- Removed `packages/layouts` — React layout components (`DashboardLayout`, `LandingPageLayout`).
- Removed `packages/ui` — UI primitives (`FastButton`).
- Removed `.github/workflows/build-css.yml` — CSS CI pipeline gone with `assets` package.
- `@fast/tokens` no longer exports `cssVars` helpers.
- **Brand renamed**: `corporate` → `fast_core`, `argos` → `fast_argos`, `atlas` → `fast_atlas`.
- **Token structure flattened**: colors grouped by role (`primary.main/dark/light`, `secondary.main/dark/light`, `background.default/paper`, `font.main/mono`).
- `dist/` now in `.gitignore` — build artifacts no longer tracked.

### Features

- **2 new brands**: `simplifica_core`, `simplifica_burlo` — 5 brands total.
- **`@fast/tokens`** — Design tokens source of truth. 5 brands: `fast_core`, `fast_argos`, `fast_atlas`, `simplifica_core`, `simplifica_burlo`.
  - Brand color palette with full primary/secondary hierarchy (main, dark, light).
  - Background (default, paper) and text (primary, secondary) tokens.
  - Font family tokens (main + mono).
  - Framework-agnostic — no MUI/CSS deps.
- **`@fast/mui-theme`** — MUI theme factory from brand tokens.
  - `createThemeFromTokens(brand, options?)` — generates full MUI v9 `Theme`.
  - Supports all 5 brands with nested token structure.
  - Optional `withComponentDefaults` for preconfigured `AppBar` + `Button` defaults.
- Monorepo with npm workspaces — pruned to 2 packages.
- Dual entry points: `@fast-computing/fast-graphics/tokens` + `@fast-computing/fast-graphics/mui-theme`.
- Updated to `@mui/material` ^9.1.2 (latest v9).
- Published to GitHub Packages registry.
- Requires `@mui/material` ^9 + React 18/19 as peer dependencies.

### Changelog

#### v0.0.6 (2026-04-27)

- Fix missing GitHub Actions workflow file.

#### v0.0.5 (2026-04-27)

- Update Atlas brand palette colors.

#### v0.0.4 (2026-02-12)

- Fix `package.json` `files` field to include dist in published package.
- Convert imports to relative paths for standalone installation.
- Configure package for GitHub Packages publication under `@fast-computing` scope.
- Sync package-lock.json with dependencies.

#### v0.0.2 (2026-01-29)

- Split CSS output per brand: separate files for corporate, argos, atlas.
- Auto-build CSS on version bump via GitHub Actions.

#### v0.0.1 (2026-01-28)

- Initial project scaffold.
- Design tokens for 3 brands.
- CSS variable generation pipeline.
- CI with GitHub Actions.
- Package-lock committed for caching.
