---
name: UXLedger
description: Better experience, Lower debt. A UX debt register in warm paper and one burnt-orange voice.
colors:
  primary: "#c74504"
  primary-text: "#a93a03"
  primary-soft: "#fdefe7"
  page: "#ffffff"
  sand: "#f4f2ea"
  ink: "#1c1917"
  ink-marketing: "#333333"
  muted-ink: "#6f6963"
  muted-ink-marketing: "#5f5a54"
  hairline: "#e8ddc8"
  hairline-strong: "#d6c7ab"
  destructive: "#b3261e"
  destructive-soft: "#fdeceb"
  success: "#146c43"
  success-soft: "#e6f4ec"
  warning: "#8a5a00"
  warning-soft: "#fdf3e0"
  info: "#1f5f9e"
  info-soft: "#ebf3fb"
  dark-page: "#12100e"
  dark-card: "#1c1916"
  dark-ink: "#faf7f2"
  dark-primary-text: "#ff8a5c"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.2vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4.2vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
  body-marketing:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.33
rounded:
  sm: "3.6px"
  md: "4.8px"
  control: "6px"
  xl: "8.4px"
  card: "16px"
  pill: "9999px"
spacing:
  card-pad: "20px"
  card-pad-wide: "24px"
  ledger-rule: "36px"
  frame-max: "1152px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    height: "36px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-text}"
  button-outline:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "36px"
  button-hero:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 32px"
  badge-default:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.pill}"
    height: "20px"
    padding: "0 8px"
  card:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "36px"
    padding: "0 10px"
  sidebar:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    width: "256px"
---

# Design System: UXLedger

## Overview

**Creative North Star: "The Working Ledger"**

UXLedger looks like a ledger someone actually keeps: warm paper, ruled lines, one burnt-orange pen. The token system carries that name in `src/app/globals.css` and shares it with the sibling project Yedara. Voice is plain-spoken. Surfaces are a white page and a sand ground (#f4f2ea) separated by hairline borders (#e8ddc8), and the only loud thing on any screen is the single orange (#c74504). Manrope at weight 800 with tight tracking does the shouting; everything else is quiet.

Depth is nearly flat. Cards rest on a hairline plus a 1-2px ambient shadow that reads as a border, not a lift. Only overlays (menus, dialogs, drawer) and product pictures (laptop mockup, app windows) genuinely lift. Components feel refined and restrained: 36px controls, 6px corners, 20px pill badges, no ornament.

Two scopes share one token set. The authenticated app is dense: 14px base, ink #1c1917. The public marketing surfaces (wrapped in `.marketing`, `src/app/marketing.css`) are airier: 16px base at 1.6 line height, ink #333333, muted #5f5a54. Marketing re-points the shared semantic tokens so Button, Badge and Card work unchanged in both.

**Key Characteristics:**
- Warm paper and one orange voice; status colors are small, paired and soft.
- Flat surfaces, hairline borders, tonal grounds (white vs sand).
- Manrope only. Weight 800 and negative tracking for display; 500-600 for UI.
- Light, dark and system themes from the same semantic tokens.
- Light-and-dark screenshots, never stock proof; previews are labelled sample data.

## Colors

A warm-neutral palette with a single burnt-orange accent and four small status hues, each as a text/soft-ground pair.

### Primary
- **Burnt Orange** (primary, #c74504): the one voice. Primary buttons, focus ring, chart-1, selection on marketing, pointer handles. Fills only; white text on it.
- **Deep Terracotta** (primary-text, #a93a03): orange used as text or hover on light grounds (links, badge text, the highlighted headline word, primary hover). Meets AA on white and on the tint.
- **Orange Tint** (primary-soft, #fdefe7): soft ground for the "default" and "high" badges and selection in-app.

### Neutral
- **Page White** (page, #ffffff): background, cards, popovers.
- **Sand** (sand, #f4f2ea): the one warm ground: sidebar, muted/secondary fills, hover washes, marketing "sand" sections, auth form side.
- **Ink** (ink, #1c1917): app foreground. **Marketing Ink** (ink-marketing, #333333) replaces it under `.marketing`.
- **Muted Ink** (muted-ink, #6f6963) for secondary text in-app; **Marketing Muted** (#5f5a54) under `.marketing`.
- **Hairline** (hairline, #e8ddc8): default border and input stroke. **Strong Hairline** (hairline-strong, #d6c7ab): ledger rules, window frames, marketing inputs, dividers under page titles.
- Dark theme: page #12100e, card #1c1916, ink #faf7f2, primary-text lifts to #ff8a5c, borders #302a25.

### Status pairs
Text on soft ground; used by Badge variants for severity and status.
- Destructive #b3261e on #fdeceb: critical.
- Orange #a93a03 on #fdefe7: high.
- Warning #8a5a00 on #fdf3e0: medium, deferred.
- Info #1f5f9e on #ebf3fb: low, in progress.
- Success #146c43 on #e6f4ec: resolved.
- Open is sand with muted ink; won't fix is outlined with muted ink.
Each has a lightened dark-theme counterpart (e.g. success #7ee2ab on #10281c).

### Named Rules
**The One Voice Rule.** Orange is the only accent. Fills use #c74504; any orange text on a light ground uses #a93a03. Status hues never compete with it for the primary action.

**The Semantic Token Rule.** Components use semantic tokens (bg-primary, text-muted-foreground, border-border), never raw hex. Marketing changes values by scope, not by component forks.

## Typography

**Display Font:** Manrope (ui-sans-serif, system-ui fallback)
**Body Font:** Manrope
**Label/Mono Font:** none; Manrope with `tabular-nums` for metrics

**Character:** One geometric humanist sans in a heavy-to-regular range. Heft and tight tracking make headlines confident; body stays calm.

### Hierarchy
- **Display** (800, clamp(2.5rem, 6.2vw, 4.75rem), 1.04, -0.04em): landing hero h1 only.
- **Headline** (800, clamp(1.875rem, 4.2vw, 3rem), 1.08, -0.03em): marketing section headings; read-page h1 is slightly larger (up to 3.5rem, -0.035em).
- **Title** (700, 28px, tight): app page titles via PageHeader; topbar heading is 16px/800/-0.025em; marketing feature titles 20px/800.
- **Body** (400, 14px, 1.43 in-app; 16px, 1.6 on marketing): lede 18-20px muted, capped at 60ch; descriptions 15px.
- **Label** (500-600, 12-13px): badges (12px/500), small buttons (13px), card titles 15px/600, metrics 30px/700 tabular.

### Named Rules
**The Heavy Headline Rule.** Weight 800 plus negative tracking belongs to display and section headings; UI chrome stays 500-600.

## Layout

App shell: a 256px sidebar (collapses to 72px; off-canvas below `lg`) beside a topbar and content column. Content is dense, cards on a 20px (p-5) rhythm, page header margin-bottom 32px. Marketing uses a single 1152px frame (`px-5 sm:px-6 lg:px-8`) and sections with 80px/112px vertical padding, alternating paper and sand bands with hairline top and bottom borders. Auth is a split: 58% photo panel from `lg`, and a sand form side with a max-w-sm card. Marketing headers are sticky so content scrolls beneath.

Divergence between scopes: base size (14 vs 16px), line height (1.43 vs 1.6), foreground (#1c1917 vs #333333), muted text (#6f6963 vs #5f5a54), input stroke (#e8ddc8 vs #d6c7ab), focus offset (2px vs 3px), selection (orange tint vs solid orange), and generous section spacing on marketing only.

## Elevation & Depth

Flat by default; tonal grounds and hairlines separate surfaces. Cards rest on a near-invisible ambient edge, not a visible shadow. Overlays and product pictures are the only things that lift.

### Shadow Vocabulary
- **Card rest** (`0 1px 2px 0 #1010140a, 0 1px 3px 0 #1010140f`): near-invisible ambient edge under cards and the auth form card.
- **Raised** (`0 2px 4px -1px #1010140f, 0 8px 24px -6px #1010141f`): interactive-card hover lift.
- **Overlay** (Tailwind shadow-md on menus and select popovers, shadow-lg/xl on dialog and sheet): soft, neutral, ink-tinted.
- **Product picture** (`--shadow-window`: `0 2px 4px -1px #1010140f, 0 18px 40px -14px #10101433` on AppWindow; `--shadow-laptop`: `0 26px 40px -20px #10101459` under the laptop; used as `shadow-window` and `shadow-laptop`): the only dramatic shadows.

### Named Rules
**The Lift Is Earned Rule.** Only overlays and product pictures lift visibly. A card never gains a shadow bigger than "raised", and only on hover when interactive.

## Shapes

Gently rounded, not soft. The base radius is 6px: controls (button, input, select) use it; menu items and tabs use 4.8px; panels 8.4px; cards use a larger 16px; dialogs also 16px; app windows 16px; badges, hero CTA and avatars are full pills. Borders are always 1px hairline; the laptop bezel and window dots are the only decorative geometry. Pointer-highlight corner handles are 8px squares with 2px radius.

## Components

### Buttons
- **Shape:** 6px corners, 36px tall (sm 32px, lg 40px), 16px side padding, 14px/500 text.
- **Primary:** Burnt Orange fill, white text; hover darkens to Deep Terracotta (#a93a03). Press translates 1px down.
- **Outline / Secondary / Ghost:** page-white or sand fill with hairline, hover to sand. **Destructive** is a soft red ground with red text, not a solid fill. **Link** uses primary-text.
- **Focus:** 3px ring at 50% orange. Marketing hero CTA is a 48px pill with weight 700; the closing CTA band inverts to a white button whose text uses the `--terracotta` token (#a93a03 in both themes, since the button stays white), beside a ghost button with a 70% white border.

### Badges
20px tall full pills, 12px/500, text on soft ground per the status pairs above. Used for severity and status everywhere in the register.

### Cards / Containers
- **Corner Style:** 16px. **Background:** white (dark #1c1916). **Border:** 1px hairline. **Shadow:** Card rest.
- **Internal Padding:** p-5 (20px). CardContent bakes in `sm:pt-0` and `sm:p-6`, so overrides must be `p-5 sm:p-5` (as MetricCard does).

### Inputs / Fields
36px tall, 6px radius, 1px #e8ddc8 stroke on white, 10px side padding. Focus shifts border to orange and adds the 3px 50% ring. Select matches; its popover is a 6px bordered panel with shadow-md.

### Navigation
- **Sidebar:** sand ground, hairline right border, 14px/500 items with 16px icons, 6px radius. Quiet active state: `bg-foreground/5` with weight 600 and full-ink text; inactive is muted ink with the same wash on hover. The active item is not orange.
- **Topbar:** 64px, hairline bottom border, page background. Right side: theme menu, a ghost bell, and a round avatar button with orange-tint initials. Hover washes are Oat, never orange.
- **Theme menu:** a ghost icon button (sun in light, moon in dark, switched by the `.dark` class so first paint never mismatches) opening a 160px menu: a 12px/600 muted "Theme" label, then Light, Dark and System radio items with a primary-text check on the active one. Shared by the topbar, marketing header and auth layout.
- **Marketing header:** sticky 64px, page ground at 92% with backdrop blur and a hairline bottom border (no shadow). Logo left; 15px/600 links at 80% ink (Features, How it works, FAQ, About) darkening on hover; right side theme menu, ghost "Sign in", primary "Start free". Below `md` it becomes the theme menu plus a menu button toggling a stacked list of 18px/600 links and a two-up Sign in / Start free row; Escape closes it.
- **Marketing footer:** page ground, hairline top border. Logo and a 15px muted tagline left; four columns (Product, Company, Legal, Account) of 15px muted links that underline on hover, under 14px/700 titles; a hairline-topped, centred 14px copyright line.

### PointerHighlight (signature)
The last headline word is picked out like a selection in a design tool: Deep Terracotta text, a 2px outline at 55% orange with 6px radius, four small white corner handles with orange borders, and an orange pointer arrow at the bottom-right. One per page, in the hero.

### Ruled-ledger hero ground (signature)
`.hero-aura`: 1px hairlines (strong hairline at 70%) every 36px, masked by a radial fade toward edges and bottom, over a sand-to-white wash. No glow, no gradient type. Entrance is a 14px rise, only when motion is allowed.

### Laptop mockup and app-window previews (signature)
The laptop is a charcoal (#333333; #3a342e dark) bezel around real 16:10 screenshots in `public/marketing/` (light and dark swap with the theme), with a notch and base. App-window previews are authored mockups: 16px radius, strong hairline border, sand title bar with three dots and a "Sample data" chip, wrapped in a figure with a caption and hidden from assistive tech.

### Auth photo panel (signature)
`public/auth/panel.jpg` on a deep brown base (`--panel-base`, #3a1605), covered by a Burnt Orange layer at 90% with multiply blend (turns paper to terracotta) and a vertical dark-brown scrim (`--panel-scrim`, #180902, at 55% / 30% / 80% via `color-mix`) so white type stays readable. Holds the logo, a 1.6rem/600 quote and credit line. Hidden below `lg`.

### FAQ
Native `details` rows between strong hairlines (`border-t`, last row `border-b`); question 18px/700, a 32px round plus icon with a strong hairline ring that rotates to a cross over 200ms when open; answers in muted ink at 62ch. Answers only restate claims the product already makes.

### Dashboard charts and health score
Recharts, themed only through CSS variables so light and dark follow automatically. Category bars are `--primary` with 4px top radius; severity donut maps critical to destructive, high to primary, medium to warning, low to info; the trend uses `--primary` for open and `--success` for resolved with a 25% to 0% area fade. Grid lines are dashed `--border`; axis text is 11px (category labels 10px at -35deg) with no axis or tick lines. Tooltips are 8px-radius bordered popovers on `--popover` at 12px. The health score is a 96px ring plus a progress bar in success, warning or destructive by score band, a status pill, and a four-row legend with `tabular-nums` counts. Metric cards use p-5, a wrapping 14px/500 muted title, a 30px/700 tabular value, and an 8px-radius tinted icon well in the matching status pair.

### Page header and empty state
PageHeader: back link (14px/600 muted), 28px/700 title, muted 15px description, right-aligned actions. EmptyState: 48px round white icon well with hairline ring in primary-text, 14px/600 title, muted description.

## Do's and Don'ts

### Do:
- **Do** use #c74504 for fills and #a93a03 for orange text on light grounds.
- **Do** separate surfaces with hairlines (#e8ddc8) and sand (#f4f2ea) before reaching for a shadow.
- **Do** pair every status color as text on its soft ground.
- **Do** keep sidebar active state quiet (`bg-foreground/5`).
- **Do** use `p-5 sm:p-5` when overriding CardContent padding.
- **Do** label authored previews "Sample data" and use real screenshots for the laptop.
- **Do** keep the 14px / 16px split between app and `.marketing`.

### Don't:
- **Don't** introduce a second accent hue or use orange for large text on white at #c74504.
- **Don't** lift ordinary cards beyond the Raised shadow, or put shadows on flat in-app chrome.
- **Don't** put a gradient or glow on type or on the hero ground.
- **Don't** invent customers, logos, stats, testimonials or prices in previews.
- **Don't** hard-code hex in components when a semantic token exists.

## Not canonized
Drift the build carries, not rules to extend:
- The Open Graph image (`src/app/opengraph-image.tsx`) hard-codes palette hex because its renderer cannot read CSS variables; keep the values in sync with the tokens by hand. It uses the self-hosted Manrope 400 and 800 files in `src/app/fonts/`.
- The logo mark in `layout/logo.tsx` and `icon.svg` carries its own fills (the favicon adapts to dark tabs with a media query).
- Project colour swatches in `project-form.tsx` are user data (the default is now brand orange), not palette tokens.
- Legal and About copy components (`legal-content.tsx`) style headings per page through arbitrary-variant classes rather than a shared prose style.
- The closing CTA band's white button and 70% white ghost border are the only literal white values on the public site.
