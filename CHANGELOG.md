# @fast/graphics

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
