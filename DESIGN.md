---
name: deepblue
description: Editorial-confident consultancy site — navy abyss, Deep-Sea Cyan signal, italic-as-emphasis.
colors:
  bg: "#06091A"
  bg-elev: "#0B132B"
  bg-card: "#0F1A3A"
  bg-deeper: "#03050E"
  ink: "#F5F8FF"
  ink-soft: "#C1CCE3"
  ink-muted: "#7886A8"
  ink-faint: "#4A5677"
  cyan: "#4ED7E0"
  cyan-light: "#9AE5EB"
  cyan-deep: "#0EA5C7"
  royal: "#2C6FF0"
  rule: "#FFFFFF14"
  rule-soft: "#FFFFFF0A"
  rule-strong: "#FFFFFF29"
  light-bg: "#F0EDE3"
  light-bg-elev: "#E5E1D3"
  light-bg-card: "#FBF8EE"
  light-ink: "#0A1A35"
  light-cyan: "#0E8FAC"
typography:
  display:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(3.2rem, 10vw, 9.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  italic:
    fontFamily: "Instrument Serif, 'Iowan Old Style', Georgia, serif"
    fontSize: "inherit"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontStyle: "italic"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Geist Mono, 'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.74rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
    textTransform: "uppercase"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "32px"
  xl: "56px"
  "2xl": "96px"
  "3xl": "160px"
components:
  button-primary:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.bg}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "16px 30px"
  button-primary-hover:
    backgroundColor: "{colors.cyan-light}"
    textColor: "{colors.bg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-ghost-hover:
    backgroundColor: "#4ED7E01A"
    textColor: "{colors.cyan-light}"
  button-nav-pill:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
  button-nav-pill-hover:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.bg}"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "18px 22px"
  input-field-focus:
    backgroundColor: "{colors.bg-deeper}"
    textColor: "{colors.ink}"
  card-default:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "44px 40px"
  card-default-hover:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
  chip-pill:
    backgroundColor: "#FFFFFF06"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  chip-pill-hover:
    backgroundColor: "#FFFFFF06"
    textColor: "{colors.ink}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.cyan-light}"
---

# Design System: deepblue

## 1. Overview

**Creative North Star: "The Deep Studio"**

deepblue is a quiet studio at depth. The surface is navy abyss — a near-black canvas with a faint hue commitment toward midnight blue (`#06091A`). Against it, one protagonist color — **Deep-Sea Cyan** (`#4ED7E0`) — does the work of voice: emphasis italics, hairline borders, the rare CTA, the dot that pulses next to "accepting projects". Typography carries identity: Geist for the architecture, Instrument Serif italic for the *editorial flourish* that signs every heading, mono Geist for instrument labels (`01 / 04`, `Q3 2026`, `STACK FREQUENTE`). Nothing here is decorative; every kinetic element — aurora drifts, the particle hero, the cyan sweep on project rows, the giant outlined wordmark — points at meaning.

This system explicitly rejects the generic BR consultancy aesthetic: stock photography, navy-and-gold corporate palettes, "transformação digital" framing, decks-as-deliverable language, icon-card grids that exist to fill space. It also rejects the saturated-dark-mode crypto/AI hype lane — no neon glitches, no matrix particles cosplaying as data, no "unlock the future" gloss. The reference neighborhood is Linear, Vercel, Stripe: hairline precision, editorial restraint, dark by intent. The site demonstrates the work it sells; if it ever feels generic, it is failing.

A light-mode "easter egg" variant exists (warm ivory `#F0EDE3` + deeper cyan `#0E8FAC` + navy ink) — but the hero, the CTA, and the footer signature stay dark in light mode, because the dark surface is the brand stage.

**Key Characteristics:**
- One protagonist color (Deep-Sea Cyan), used sparingly and always meaningfully
- Italic-as-emphasis via Instrument Serif; *never* gradient text
- Hairline 1px rules + tinted backgrounds; shadows reserved for elements that genuinely float
- Mono labels for instrument-grade context (numbers, dates, stack lists)
- Motion that drifts or sweeps; never bounces, never elastics
- Section padding scales generously (160px+ at desktop); rhythm over density

## 2. Colors: The Abyss & Signal Palette

A single hue family carries the whole system. Surfaces are tinted near-black with a faint navy bias; ink is tinted off-white with a hint of cool. Cyan is the only saturated color that appears at brand presence, and it appears rarely.

### Primary

- **Deep-Sea Cyan** (`#4ED7E0`): the brand's voice. Used for: italic emphasis text, hairline accents above cards, the active nav underline, the pulse-dot indicating availability, primary CTAs, the focus glow on inputs, the cyan-haze radial bloom on hover. Treat as a finite resource — when it appears, it should *mean* something.
- **Cyan Light** (`#9AE5EB`): the softer voice. Used inside italic display headings (`*estratégia*`, *resultado*) so the italic feels luminous rather than declarative. Also the hover-text variant for cards and footer links.
- **Cyan Deep** (`#0EA5C7`): the structural cyan. Used only for scrollbar thumbs and the occasional deep-state element. Not a primary brand color.

### Secondary

- **Royal Blue** (`#2C6FF0`): tertiary accent. Used exclusively inside the team monogram radial-gradient backdrop, paired with cyan-haze. Almost never appears elsewhere — its job is to add atmospheric depth to one specific surface.

### Neutral (Surfaces)

- **Abyss** (`#06091A`): the canvas. The body background. Carries the entire site's surface weight.
- **Surface Elevated** (`#0B132B`): the tonal step up. Used for section-alt (Serviços), the equipe section, the mobile nav overlay sheet.
- **Surface Card** (`#0F1A3A`): the highest tonal step for in-flow surfaces. Used for cards (service, featured, contact form, contact-methods list, stats grid items, theme toggle pill).
- **Deeper** (`#03050E`): the lowest tonal step. Used inside focused inputs (the field darkens on focus) and for the scrollbar track.

### Neutral (Ink)

- **Ink** (`#F5F8FF`): primary text. Tinted off-white with a cool cast; never pure `#FFF`.
- **Ink Soft** (`#C1CCE3`): secondary text — body paragraphs, hover states for links, supporting copy.
- **Ink Muted** (`#7886A8`): tertiary text — meta labels, captions, mono micro-copy.
- **Ink Faint** (`#4A5677`): the lowest visible ink — placeholders, separators inside `.meta-inline`, footer bottom subtext.

### Hairlines

- **Rule** (`rgba(255, 255, 255, 0.08)`): the default 1px border on cards, dividers, the section-alt borders.
- **Rule Soft** (`rgba(255, 255, 255, 0.04)`): for double-stacked borders and the lightest visual separation.
- **Rule Strong** (`rgba(255, 255, 255, 0.16)`): for emphasis borders, the project-preview outline, the .success-reset button, ghost-button borders.

### Named Rules

**The One Voice Rule.** Deep-Sea Cyan is the only saturated color the site speaks with. It is used on ≤10% of any given screen — emphasis italics, the active accent, one CTA, the pulse dot, hover affordances. If a screen ever feels "cyan-heavy", remove cyan until each remaining use earns its presence.

**The No-Gradient-Text Rule.** `background-clip: text` with a gradient is forbidden site-wide. Italic emphasis uses a *solid* `cyan-light` color. The team monogram (`.team-monogram .mm`) is the *only* exception — there the gradient is a deliberate signature, not decoration.

**The Hue-Anchor Rule.** Every neutral is tinted toward the brand hue. Never `#000`, never `#FFF`. If a new surface or ink color is added, it must carry a 0.005–0.02 chroma bias toward navy.

## 3. Typography

**Display Font:** Geist (with `-apple-system, BlinkMacSystemFont, 'Segoe UI'` fallback).
**Body Font:** Geist (same family — single sans for the architecture).
**Italic Voice:** Instrument Serif italic — the editorial signature.
**Label/Mono Font:** Geist Mono (with `'JetBrains Mono', ui-monospace` fallback) — instrument labels, indices, dates.

**Character:** Geist is the modernist sans skeleton — geometric, slightly humanist, capable of huge display sizes without losing structure. Instrument Serif italic, used exclusively for emphasis inside Geist headings, is the editorial flourish that signs every section header (`Dados, software *e estratégia*`, `*resultado.*`, *séria por princípio.*). The contrast between Geist's structural roman and Instrument's hand-thrown italic is the central typographic gesture of the site. Geist Mono carries the instrument-grade context: numbered indices, dates, stack tags, eyebrow labels.

### Hierarchy

- **Display** (Geist 500, `clamp(3.2rem, 10vw, 9.5rem)`, line-height 0.98, letter-spacing -0.04em): hero headlines only. One per page.
- **Headline** (Geist 500, `clamp(2.4rem, 5.5vw, 4.6rem)`, line-height 1.02, letter-spacing -0.035em): section H2s, manifesto list items, footer giant signature.
- **Title** (Geist 500, `1.5rem` to `clamp(1.6rem, 2.8vw, 2.4rem)`, line-height 1.05–1.2, letter-spacing -0.02em to -0.03em): H3s on cards, project rows, contact form heading.
- **Italic** (Instrument Serif 400 italic, inherits size from context, letter-spacing -0.025em, color `cyan-light`): the emphasis voice. Lives inside display/headline/title elements. Also the kicker P.S. signature and the prefix/suffix on stat numbers.
- **Body** (Geist 400, `1rem`, line-height 1.6, max 56–65ch): paragraphs. Color `ink-soft` by default; `ink` only for emphasis.
- **Label** (Geist Mono 500, `0.7–0.78rem`, letter-spacing 0.16–0.22em, UPPERCASE): eyebrows, section tags, stat labels, form labels, footer h4s, meta-inline categories. Always preceded or accompanied by a 1px cyan rule + glow when used as a section tag.

### Named Rules

**The Italic-Only-In-Headings Rule.** Instrument Serif italic is reserved for emphasis *inside* Geist display, headline, or title elements — never as a standalone paragraph face. Body text remains Geist throughout. The italic is the signature, not the medium.

**The Mono-Eyebrow Rule.** Every major section opens with a mono uppercase tag preceded by a 28×1px cyan rule with cyan-glow (`.section-tag`, `.stats-tag`, `.manifesto-tag`, `.featured-eyebrow`, `.aside-eyebrow`). This is the site's rhythm marker; sections without it feel structureless.

**The Letter-Spacing-Tightens-As-Size-Grows Rule.** Display: -0.04em. Headline: -0.035em. Title: -0.02em. Body: -0.005em. Mono labels: +0.16em to +0.22em. Type at scale always tightens; type at micro-scale always opens.

## 4. Elevation

**The system uses tonal layering for in-flow surfaces and ambient shadow for elements that genuinely float.**

Cards, form containers, and stats sit on the page through tonal step-up alone: `bg` → `bg-elev` → `bg-card`. The hairline 1px `rule` border completes the affordance. No shadow at rest — shadows on in-flow surfaces would compete with the cyan haze that does the work of attention.

Three elements are exceptions and *do* float with real shadow:
1. **Project preview card** — slides in over the projects list, anchored to the hovered row. Ambient shadow + outer cyan haze + 1px `rule-strong` outline.
2. **Theme toggle** — fixed bottom-right above content. Soft ambient shadow + backdrop blur.
3. **Mobile nav overlay** — full-bleed dim with sheet animation.

Hover affordances on cards and CTAs add a **cyan haze radial bloom** (a radial gradient of `cyan-haze` blurred at 50–80px, positioned offscreen-top-right of the card) that emerges on hover. This is the system's *active* depth language — not box-shadow but illumination from beneath. Treat the haze bloom as elevation, not decoration.

### Shadow Vocabulary

- **Ambient float** (`box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rule-strong, 0 0 80px cyan-haze`): the project preview card.
- **Lifted toggle** (`box-shadow: 0 12px 28px rgba(0, 0, 0, 0.32)` at rest, `0 16px 36px rgba(0, 0, 0, 0.4), 0 0 24px cyan-glow` on hover): the theme toggle pill.
- **Cyan focus glow** (`box-shadow: 0 0 0 4px rgba(78, 215, 224, 0.14), 0 0 32px rgba(78, 215, 224, 0.18)`): on focused inputs.
- **CTA pressure halo** (`box-shadow: 0 0 0 6px rgba(78, 215, 224, 0.18), 0 0 40px cyan-glow` on hover): on primary buttons.

### Named Rules

**The Flat-At-Rest Rule.** In-flow surfaces are flat. No shadow until the user expresses intent (hover, focus). When intent arrives, the surface either tonally lifts (`bg` → `bg-card`) OR a cyan haze bloom emerges from behind — never both.

**The Float-Earns-Shadow Rule.** Only elements that genuinely float in the viewport get a real `box-shadow`. Inline cards do not. If you reach for shadow on an in-flow card, the surface is asking for a tonal step or a cyan bloom instead.

## 5. Components

### Buttons

- **Shape:** all pills, all the time (`border-radius: 999px`). The pill is the brand's button signature; rectangles and rounded-rect buttons are reserved for inputs and cards.
- **Primary** (`button-primary` / `.btn-primary`, `.btn-pill-white .btn-pill-inner`, `.form-submit`): Deep-Sea Cyan background, navy text (`bg` foreground reversal), Geist 600/700, padding `16px 30px` (or `18px 32px` for `.form-submit`). On hover: lift to `cyan-light`, transform `translateY(-2px)`, add the CTA pressure halo. Submit additionally carries a 0.6s shimmer-stripe `::before` sweep.
- **Hover/Focus:** translate up 2px + cyan halo glow. Focus visible via the halo; never a default browser outline.
- **Ghost** (`.btn-pill-ghost`): transparent background, 1px `rule-strong` border, ink text, padding `15px 26px`. On hover: cyan border, `cyan-light` text, `cyan-haze` background fill.
- **Nav pill** (`.nav-btn-pill .nav-btn-inner`): inverted — ink background, navy text. The "fale com a gente" CTA. On hover: shifts to cyan background.
- **Mono reset** (`.success-reset`): ghost variant in mono uppercase (`Geist Mono 0.78rem`, letter-spacing 0.16em). Used for secondary post-action actions ("enviar outra mensagem"). Hover adds a `rotate(-30deg)` on the icon.

### Inputs / Fields

- **Style:** `bg` background (note: *darker* than the surrounding card, inverting expectation), 1px `rule` border, `rounded-md` (12px), padding `18px 22px`, Geist 400 `1rem` text.
- **Label:** above the field, mono 0.7rem, uppercase, letter-spacing 0.22em, `ink-muted` color, preceded by an italic Instrument numeric prefix (`01.`, `02.`, `03.`) in cyan — set via `data-num` attribute + `::before`.
- **Placeholder:** `ink-faint`.
- **Focus:** border shifts to cyan, background deepens to `bg-deeper`, cyan focus glow (`box-shadow: 0 0 0 4px rgba(78, 215, 224, 0.14), 0 0 32px rgba(78, 215, 224, 0.18)`). Label + label prefix shift to `cyan-light` via `:focus-within`.
- **Textarea:** `min-height: 130px`, `resize: vertical`.

### Cards / Containers

- **Corner Style:** `rounded-lg` (20px) for major cards (service, featured, contact form, contact-methods, team monogram); `rounded-md` (12px) for inputs and the floating project preview.
- **Background:** `bg-card` for in-flow cards on `bg` surfaces, `bg` for cards on `bg-elev` surfaces (about-pillars on the section-alt). Always the next tonal step from the surface they sit on.
- **Border:** 1px `rule` at rest. On hover (where interactive): shifts to cyan; non-interactive cards keep their rule.
- **Hairline accent:** many cards (`.service-card`, `.contact-form-container`, `.contact-featured`) carry a `::before` 1px gradient line `linear-gradient(90deg, transparent, cyan, transparent)` along their top edge. On non-interactive cards (`.contact-form-container`) it's always visible. On interactive cards (`.service-card`) it fades in on hover.
- **Internal Padding:** `44px 40px` for major cards (services, contact form), `32px 30px 24px` for medium (featured), `14px 18px` for compact list items (contact methods).
- **Hover behavior:** `translateY(-3px)` lift + cyan border + cyan haze bloom emerging from offscreen top-right. Icons inside cards rotate `-6deg` and flip from cyan-haze background to cyan-fill on hover.

### Chips (Tags)

- **Style:** 1px `rule` border, transparent-2% background, `Geist Mono 0.7–0.72rem`, `rounded-pill` (999px), padding `4px 10px` to `7px 14px`, color `ink-soft`.
- **Used for:** service stack tags, project tech tags, team skills, marquee separators stand outside this pattern.
- **Hover (when inside an interactive parent):** border lifts to `rule-strong`, color lifts to `ink`. No background change.

### Navigation

- **Style:** fixed-top, transparent at top of page; on scroll: `rgba(6,9,26,0.78)` background + 16px backdrop saturation/blur + 1px `rule` bottom border.
- **Typography:** Geist 500 `0.92rem`, letter-spacing -0.005em, color `ink-soft`.
- **Default state:** `ink-soft` text.
- **Hover:** `cyan-light` text + cyan underline reveal (`scaleX 0 → 1` from left).
- **Active state** (`.active` — currently-viewing section): `cyan-light` text + persistent cyan underline with glow.
- **Mobile:** hamburger reveals a full-bleed dim sheet (top-right anchored, `max-width: 400px`, `rounded-lg`); items in Geist 500 `1.8rem`, divided by hairline rules; the "fale com a gente" item gets pill treatment at the bottom.

### Signature Components

#### Project Magazine List with Anchored Preview

Project work is presented as a vertical list of grid-rows (52px num | 1fr content | 380px preview-slot), each row 36px-padded with a hairline divider. On hover:
1. The row gains `padding-left: 16px` shift.
2. A cyan-haze sweep (`linear-gradient(90deg, cyan-haze, transparent 50%)`) animates from 0 → 100% width across the title area (max-width clipped to leave the preview slot clean).
3. The title shifts to `cyan-light`.
4. A 380×240 floating preview card slides in from the right (`translateY(-50%) translateX(24px) → 0` scale `0.96 → 1`), vertically anchored to the row's center via JS (`top` is set dynamically). This carries the ambient float shadow + cyan haze + cyan top hairline.

This is the **single most distinctive interaction** on the site and should never be cargo-culted onto cards-with-images. Its purpose is to keep the magazine list dense AND reveal visual context without breaking flow.

#### Manifesto List

A list of 5 declarations rendered at headline scale (`clamp(2.4rem, 5.5vw, 4.6rem)`, Geist 400, line-height 1.02). Each item:
- A mono `01`/`02`/... numbering in cyan, fixed-width 32px column.
- The declaration text with Instrument Serif italic on the emphatic word (*antes*, *cabe*, *matéria-prima*, *ou não conta*, *mais autônomo*).
- A 1px `rule` bottom divider.
- On hover: `cyan-light` color + `padding-left: 16px` shift.

The manifesto sits over a centered radial cyan-haze bloom (700×700px, blur 60px) — the only structural use of a soft glow inside a section.

#### Stats Grid

A 4-column grid implemented as 1px-gap inside a 1px-border container, producing the illusion of hairline dividers between cells *without* using borders. Each cell:
- Mono index (`01 / 04`) + a 30×30 icon-pill in `cyan-haze`.
- A counter-animated big number in Geist 600 (`clamp(3rem, 6.2vw, 5.6rem)`) in cyan, with italic Instrument prefix/suffix (`$`, `+`, `M+`, `%`).
- A mono uppercase label below.
- A dashed-rule-separated italic sub-line ("desde 2019 · contínuo").
- On hover: cell background shifts to `bg-elev`, icon rotates -6° and flips to cyan-fill, number gains text-shadow `0 0 40px cyan-glow`.

#### Marquee Strip

A horizontally-scrolling band between hero and stats. Italic Instrument Serif words (`Dados`, *Software*, `Estratégia`, *Produto*...) separated by cyan `✦` glyphs, animating at 42s linear infinite. The italics in this marquee are a **content rhythm**, not emphasis — they alternate to create visual pulse rather than to mean "important".

#### Hero Canvas + Aurora

The hero combines four motion layers:
1. Three radial-gradient `aurora` blobs (cyan, royal, cyan-light) blurred at 80px, drifting on 22–28s cubic-bezier loops.
2. A `<canvas>` particle wave — small dots + occasional `0`/`1` mono digits — flowing right-to-left, sine-waved vertically, with mouse-repulsion within 18000px².
3. A `hero-overlay` that combines a base navy gradient with a mouse-following 600px cyan radial spotlight (`--mx`/`--my` driven).
4. Foreground content with the standard scroll-reveal `[data-animate]` transform.

This is the brand's "the hero IS the stage" moment. Never reproduce these on inner sections — the hero earns this density because every subsequent section is restrained.

#### Footer Giant Wordmark Signature

The footer contains a giant `clamp(5rem, 22vw, 22rem)` outlined wordmark "deepblue." with `-webkit-text-stroke: 1px rule-strong` and a faint top-down white gradient bg-clip. The terminal dot is cyan-filled (`-webkit-text-stroke: 0`). The signature is non-interactive, user-select: none, and serves as a maximal closing gesture.

### Named Rules

**The Pill-For-Pressure Rule.** Buttons are pills; inputs are rounded rectangles. Reversing this — boxy buttons or pill inputs — is forbidden. The pill is the brand's affordance for *action*; the rounded-rect is the affordance for *capture*.

**The Hairline-Plus-Bloom Rule.** Every card pairs a 1px `rule` border at rest with a cyan haze bloom on hover. Adding a heavier border at rest is forbidden (the type and the bloom carry the affordance). Adding a drop shadow at rest is forbidden (see The Flat-At-Rest Rule).

**The Top-Cyan-Hairline Rule.** Major cards (service, featured, contact form) carry a top-edge `::before` gradient hairline (`transparent → cyan → transparent`). This is the system's *quiet signature* — recurring across the site without ever shouting.

## 6. Do's and Don'ts

### Do:

- **Do** lead every section with a mono uppercase eyebrow preceded by a 28×1px cyan rule with glow. It is the site's rhythm marker.
- **Do** use Instrument Serif italic for emphasis *inside* Geist headlines — `Dados, software *e estratégia*` not `Dados, software AND strategy`.
- **Do** spend Deep-Sea Cyan at meaning-bearing moments only: emphasis text, primary CTAs, hairline accents, focus glows, the availability pulse-dot. ≤10% of any screen surface.
- **Do** pair every interactive card with the cyan-haze bloom on hover, emerging from offscreen top-right at 50px+ blur radius.
- **Do** use pill (999px) borders for all buttons. `rounded-md` (12px) is reserved for inputs. `rounded-lg` (20px) is reserved for major cards.
- **Do** tint every neutral toward the brand hue. The cool cast on whites and the navy cast on blacks is non-negotiable.
- **Do** carry mono labels with letter-spacing ≥ 0.16em uppercase for *all* eyebrows, indices, and instrument readings. Mono is the brand's voice for context.
- **Do** preserve generous section padding (`160px` desktop, `100px` mobile). Density is for cards; sections breathe.
- **Do** ensure cyan body-text contrast against `bg-card` clears WCAG AA — the cyan ramp is bright enough but verify on each new pairing.
- **Do** respect `prefers-reduced-motion`: aurora drift, marquee, particle canvas, and `[data-animate]` transitions should soften or stop for users who ask. The site's identity is *not* its motion.

### Don't:

- **Don't** use `#000` or `#FFF`. Every neutral must carry a 0.005–0.02 chroma bias toward navy.
- **Don't** use `background-clip: text` with a gradient anywhere except the team monogram (`.team-monogram .mm`). Italic emphasis uses a solid `cyan-light` color. Gradient text on CTAs, headings, or copy is forbidden.
- **Don't** introduce a second saturated accent color. The royal blue inside the team monogram is the only secondary, and it stays inside that one surface. If a new accent feels needed, write better copy.
- **Don't** apply box-shadow to in-flow cards at rest. The Flat-At-Rest Rule. Use tonal step + 1px rule + cyan bloom on hover.
- **Don't** use side-stripe borders (`border-left: 3px solid cyan`) as a colored accent. The one current exception — `.form-error` — predates this rule and should be migrated to a full border + cyan-haze background at next refactor.
- **Don't** ship icon-card grids that look like generic SaaS "feature lists". If a card has an icon + heading + two-line description and that's all, ask whether the section needs cards at all or whether type and a list would carry the point better.
- **Don't** reproduce the hero density on inner sections. The aurora drift, particle canvas, and mouse spotlight live in the hero only. Inner sections may use *one* radial cyan-haze bloom for structural emphasis (manifesto, stats) — never all four layers.
- **Don't** look like generic BR consultancies (Deloitte/big-four wannabes): stock photos of handshakes, navy + gold, vague "transformação digital" headlines, "our 5-pillar framework" copy, decks-as-deliverable language. The site actively pushes against this — never let chrome reinstate it.
- **Don't** look like a bootcamp-grad data-scientist portfolio: dark-blue hero, "I help companies leverage data", identical project cards in a 3-up grid. The Magazine List + Anchored Preview pattern exists *specifically* to avoid this.
- **Don't** look like SaaS-template-cream landing pages, AI-hype neon-on-black, or crypto-futurist glitch text. The neighborhood is Linear/Vercel/Stripe quiet tech-luxury, not Awwwards-style maximalism.
- **Don't** animate CSS layout properties. Use `transform`, `opacity`, `filter`, `box-shadow`, `background`. Never `width`, `height`, `top`, `left` for state changes (the project preview's `top` is set imperatively, not transitioned via layout).
- **Don't** use bounce or elastic easing. The site uses `cubic-bezier(0.22, 0.61, 0.36, 1)` (default) and `cubic-bezier(0.16, 1, 0.3, 1)` (slow/expo-out). Anything that overshoots is wrong.
- **Don't** add em dashes to copy. Use commas, colons, semicolons, or periods. Brazilian Portuguese copy already follows this convention; respect it.
