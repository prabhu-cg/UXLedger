---
name: UXLedger
description: "Better experience, Lower debt. A UX debt register on white paper and a pale butter desk, with one amber accent. Built on the SiteNest \"Butter\" tokens shared with Assessly."
colors:
  accent: "#e8b923"
  accent-hover: "#d4a615"
  accent-text: "#826400"
  accent-tint: "#faf4df"
  on-accent: "#353335"
  background: "#ffffff"
  desk: "#fcfaf3"
  sand: "#f8f4e4"
  ink: "#4d4a4d"
  ink-strong: "#353335"
  ink-muted: "#6b6b6b"
  hairline: "#ece5cc"
  hairline-strong: "#dccfa6"
  control-border: "#8a7f6e"
  success: "#146c43"
  success-soft: "#e6f4ec"
  warning: "#8a5a00"
  warning-soft: "#fdf3e0"
  info: "#1f5f9e"
  info-soft: "#ebf3fb"
  destructive: "#b3261e"
  destructive-soft: "#fdeceb"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
rounded:
  field: "8px"
  menu: "12px"
  card: "20px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.pill}"
    height: "44px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "40px"
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.card}"
    padding: "20px"
  badge-soft:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.pill}"
    height: "20px"
  sidebar:
    backgroundColor: "{colors.desk}"
    width: "240px"
---

# Design System: UXLedger

## Overview

**Creative North Star: "White Paper on a Butter Desk"**

UXLedger uses the SiteNest "Butter" design system, the same one as Assessly. Desk (`desk`, #fcfaf3) is the chrome: the sidebar, landing bands, sign-in ground and status pages. Paper (`background` / `card`, #ffffff) is what people work with: the content area, cards, forms and the register. Amber (`accent`, #e8b923) is a fill that marks what is actionable or selected: the primary button, the logo's checks, chart bars. Amber is never text. Newsreader carries headlines; DM Sans carries everything else. The tokens live in `src/app/globals.css`.

**Key characteristics**

- **One amber voice.** Fill, not text. Text that carries the accent is `primary-text` (ochre #826400), which is also the focus colour. Text on amber is charcoal (`primary-foreground`), never white.
- **Newsreader for headlines.** Every h1 and h2 (and `.font-display`) is Newsreader 500 at -0.02em, enforced by one unlayered rule so `font-bold` cannot change it. h3, h4, labels and buttons are DM Sans 600; bold and extra-bold both resolve to 600.
- **Flat pages.** Depth comes from ground and 1px hairline. Shadows are reserved for what leaves the page plane (menus, drawers, the laptop mockup) and the hover lift on clickable cards.
- **Shape.** Every button is a full pill. Inputs, textareas and selects are 8px. Menus and popovers are 12px with pill items. Cards, panels and dialogs are 20px.
- **Selection is butter, not grey.** A selected tab, nav item or segment is `primary-soft` with `primary-text`. Hover is `muted` (sand). Grey washes (`foreground` at low opacity) are not used.
- **Light or dark, nothing else.** Light is the default; there is no system option. A sun/moon icon toggle sits in the marketing header, the app top bar and the auth page, and the choice is stored in the browser (`uxledger-theme`). Dark is the warm charcoal ramp (#141312 ground, #1c1b19 cards), never neutral grey.
- **Honest about what is simulated.** Landing screenshots are real captures of the app showing the two locked sample projects, and are captioned as sample data.

## Colors

| Role | Light | Dark |
| --- | --- | --- |
| Accent fill `--primary` | #e8b923 | #e8b923 |
| Accent hover `--primary-hover` | #d4a615 | #f0c94a |
| Accent text, focus `--primary-text`, `--ring` | #826400 | #f0c94a |
| Accent tint `--primary-soft` | #faf4df | #2a2410 |
| Text on amber `--primary-foreground` | #353335 | #353335 |
| Desk `--surface`, `--sidebar` | #fcfaf3 | #181716 |
| Sand `--muted`, `--secondary`, `--accent` | #f8f4e4 | #262420 |
| Paper `--background` / `--card` | #ffffff | #141312 / #1c1b19 |
| Body ink `--ink` | #4d4a4d | #e6e2da |
| Heading ink `--foreground` | #353335 | #faf8f2 |
| Muted ink `--muted-foreground` | #6b6b6b | #a8a399 |
| Hairline `--border` | #ece5cc | #2e2b26 |
| Hairline strong `--border-strong` | #dccfa6 | #433e35 |
| Control border `--input` | #8a7f6e | #7d7569 |

**Status pairs** (text on soft ground) drive the severity and status badges: critical is destructive, high and in-progress map to the accent tint and info, medium and deferred to warning, resolved to success. Each has a lightened dark counterpart.

**Charts** use `--chart-1` (amber) for category bars and the open trend; severity maps critical to destructive, high to amber, medium to warning, low to info.

### Named rules

**The One Voice Rule.** Amber is the only accent, and it is a fill. Anything that needs amber as text uses `primary-text`.

**The Token Only Rule.** No literal brand hex, `bg-white` or hardcoded cream in components; use `primary`, `surface`, `card`, `popover` so dark mode holds. The exceptions are the OG image renderer (`opengraph-image.tsx`, which cannot read CSS variables), the logo mark and favicon, and user-chosen project colours.

## Typography

**Display:** Newsreader 500 (Georgia fallback). **Body:** DM Sans.

- **Display** (3rem mobile, 4.5rem from `sm`, line-height 1, -0.02em): the landing hero headline, with one `primary-text` phrase.
- **Headline** (2.25rem): landing section titles. App page titles are Newsreader at `text-2xl`.
- **Title** (DM Sans 600, 1.25rem on the landing, 15px on cards): feature and card titles.
- **Body** (DM Sans 400, 14px in the app, 16px / 1.6 on marketing). Landing ledes are 1.125rem in muted ink.
- **Label** (DM Sans 600, 12px): badges, meta, hints. Sentence case.

**The Tabular Numbers Rule.** Metrics, counts and scores use `tabular-nums`.

## Layout

The landing caps at `max-w-screen-xl` with 80px vertical rhythm. Sections alternate desk and white: hero (desk), features (white), how it works (desk), differentiation (white), FAQ (desk), closing call to action (white, not an amber band). The header is a sticky 56px translucent white bar.

The app shell is a 240px desk sidebar (collapsible to 72px, off-canvas below `lg`) beside a 56px white top bar holding the theme toggle, notifications and the account menu. Content is a single column capped at 1400px.

Sign-in is a split screen from `lg`: a 58% photograph panel under a flat charcoal scrim (no gradient, no tint) and the form on the desk ground.

## Elevation & Depth

Flat by default. Surfaces separate by ground and 1px hairline. Clickable project cards lift on hover: the border strengthens to `border-strong`, the card rises 2px and gains `shadow-raised`; under reduced motion there is no lift. Menus use a `border-strong` border; dialogs and drawers sit over a `bg-black/40` scrim; the laptop mockup carries a deep soft shadow because it is a picture of a device.

## Components

- **Buttons:** full pill, 44px (36px `sm`, 52px `lg`), DM Sans 600, 2% press scale. Primary is amber with charcoal text. Outline is white with a `border-strong` outline. Destructive is an outline with red text, never a solid red block. Focus is a 3px ochre ring.
- **Inputs, textareas, selects:** 40px, 8px radius, white ground, `control-border` outline (3:1), 12px padding. Focus turns the border ochre with a ring.
- **Cards:** 20px radius, white, 1px hairline, p-5, no resting shadow.
- **Badges:** full pills, 20px, DM Sans 600. Default is `primary-soft` with `primary-text`.
- **Tabs:** a pill track with a hairline on the desk ground; the selected segment is `primary-soft` with `primary-text`.
- **Navigation:** pill items. Hover is sand with strong ink; active is `primary-soft` with `primary-text` and 600 weight.
- **Theme toggle:** a ghost icon button, moon in light mode and sun in dark, switched by the `.dark` class so first paint never mismatches. Labelled "Toggle light and dark mode".
- **Laptop mockup:** a charcoal bezel around a 16:10 capture (`public/marketing/app-dashboard-light-v2.jpg` and `app-dashboard-dark-v2.jpg`). Retake both whenever the app chrome changes, using only the locked sample projects, and rename the files so caches refresh.

## Do's and Don'ts

### Do

- Use amber as a fill and `primary-text` for accent-coloured text; put charcoal text on amber.
- Use `bg-surface` for chrome and landing bands, `bg-card` for cards, forms and popovers, sand for hover.
- Keep every button a pill, every field 8px, every card 20px.
- Make selected states `primary-soft`, hover `muted`.
- Use semantic tokens so light and dark both hold.

### Don't

- Don't use amber as text, or white text on an amber fill.
- Don't add gradients, glow, grey selection washes or amber full-width sections.
- Don't put a literal brand hex, `bg-white` or `font-bold` on a heading in components.
- Don't add a shadow to rows, badges, inputs or resting cards.
- Don't make destructive buttons solid red.
- Don't offer a "system" theme option, or use neutral grey for dark mode.
- Don't invent customers, statistics or copy in screenshots beyond clearly labelled sample data.
