# Design Fidelity Report

**Reference:** `pj-designsystem/design-system-teo` (Teo Esportes DS — organism `.hero--media` + atoms/molecules/organisms/tokens)
**Implementation:** `squads/teo-esportes/campanhas/vip-pampulha-2026/preview.html`
**Generated:** 2026-07-16
**Fidelity Score:** 63%
**Command:** `*design-compare pj-designsystem/design-system-teo squads/teo-esportes/campanhas/vip-pampulha-2026/preview.html`

> Method note: this is a **code-vs-code** semantic comparison (not image-vs-code). The reference is the DS source of truth (`.css` files + canonical HTML snippets in `index.html` / `GUIA-DE-USO.md`), not a screenshot. Token values (color/spacing/radius/type) are extracted from both sides and compared with the standard tolerances (5% HSL, ±4px spacing, ±2px radius, exact weight). Because the implementation is a **campaign preview** (single landing page), fidelity is measured as *"does it consume the DS as designed"* — token adherence AND structural/geometric adherence to the DS atoms/molecules/organisms.

---

## Summary

| Category | Matches | Total | Score |
|----------|---------|-------|-------|
| Colors (token adherence) | 26 | 28 | 93% |
| Spacing / Geometry | 6 | 15 | 40% |
| Typography | 7 | 10 | 70% |
| Structure / Component reuse | 3 | 12 | 25% |
| Effects (radius/shadow/motion) | 5 | 9 | 56% |
| **Overall** | **47** | **74** | **63%** |

Weighted overall reflects that colors/tokens are largely correct, but the implementation **reconstructs components from scratch** instead of consuming the DS atoms/molecules, producing geometry and structure drift.

---

## Score Interpretation

| Score | Grade | Meaning |
|-------|-------|---------|
| 95-100% | A | Production ready |
| 85-94% | B | Minor adjustments needed |
| 70-84% | C | Significant drift |
| 50-69% | D | Major revision required |
| <50% | F | Rebuild recommended |

**This implementation:** Grade **D — Major revision required.**
The color/token layer is B-grade (93%), but structure (25%) and geometry (40%) drag the composite down. The page *looks* on-brand because it borrows the token palette, but it does not *reuse* the design system — it re-implements ~11 components inline, so every future DS change (button hover, card media, pillar number, contrast fix) will silently bypass this page.

---

## Validation of the 4 Prior Findings

Each prior finding was re-verified against the actual files. Verdicts below.

### Finding 1 — Only 4 of 19 DS CSS files imported → **CONFIRMED (exact count)**

DS ships **19** stylesheets (excluding `shadcn/theme.css`, which is the React/Tailwind track):

```
tokens/tokens.css, tokens/base.css
atoms/  badge.css button.css indicators.css input.css price.css ribbon.css typography.css   (7)
molecules/ cards.css cart-item.css feedback.css form-field.css quantity-stepper.css segmented-control.css (6)
organisms/ header-footer.css modals.css reserve-shell.css sections.css (4)
```

`preview.html:7-10` imports exactly **4**:
`tokens/tokens.css`, `tokens/base.css`, `atoms/typography.css`, `organisms/sections.css`.

**Never imported (relevant to what the page renders):** `atoms/button.css`, `atoms/badge.css`, `molecules/cards.css`, `organisms/header-footer.css`, `atoms/price.css`. Every one of these has a real component the preview needs (button, tag, model-card, pillar, header, price) and rebuilds inline instead. **Verdict: CONFIRMED.**

### Finding 2 — Hero missing `.wrap` causes card to stick to left edge → **OUTDATED / NO LONGER TRUE (load-bearing correction)**

The premise was correct historically but the DS was **updated** (`sections.css` timestamp Jul 16 10:20). The container is now **embedded into the organism itself**:

- `organisms/sections.css:51-60` — `.hero--media { … width:100%; max-width:var(--container-max); margin:0 auto; … }` with the explicit comment: *"Container embutido: replica o uso oficial `hero hero--media wrap` sem depender do .wrap — sem isto o .hero-media-card (margin 0) gruda na borda esquerda da viewport."*
- `GUIA-DE-USO.md:281-291` — the **canonical** usage snippet now shows `<section class="hero hero--media">` **without** `.wrap`.
- `tokens/base.css:27-31` — `.wrap` comment confirms: *"os organisms de página (.nav, .hero-grid, .hero--media) embutem a mesma geometria … esquecê-lo num organism não quebra mais o container."*

`preview.html:227` uses `class="hero hero--media"` (no `.wrap`) — which now **matches the current canonical guidance**. The only place still showing `hero--media wrap` is the *stale* pattern-library demo at `index.html:571`, which lags behind the CSS.

**Verdict: the card does NOT stick to the left edge in the current DS.** The centering is handled by the organism. Finding 2's stated root cause is **invalid against the current DS**. The narrow/broken hero the user saw is caused by something else — see Finding 2b below.

### Finding 2b — Actual hero geometry cause (own investigation)

The hero card *is* narrow by design: `.hero-media-card { max-width: 480px }` (`sections.css:75`) intentionally caps the glass card and pins it bottom-left of a full-bleed section. That is the intended JIANO-style layout. If the reported screenshot showed a "tiny broken column", the likely causes are, in order of probability:

1. **`preview.html:103`** — `.hero.hero--media { padding: 0; max-width: none; margin: 0; }`. This local override **cancels the organism's embedded container** (`max-width:var(--container-max); margin:0 auto`). Result: the full-bleed section spans the whole viewport (correct for the *background*), but the card, having no container to sit inside, pins to the far-left viewport edge on wide screens — reintroducing exactly the bug the DS update was meant to kill. **This is the real regression, and it is authored in the preview, not the DS.**
2. **Font not loaded** — the page never links Lato/Roboto webfonts (see Typography section); display headings fall back to `system-ui`, changing measured line length and making the capped 480px card look off.

**Net:** Finding 2's *symptom* is real, but the *cause* is `preview.html:103` overriding the DS container, not the missing `.wrap`.

### Finding 3 — Button/card/tag/header rewritten inline instead of reusing DS atoms → **CONFIRMED (with geometry deltas)**

Every one is rebuilt in the `<style>` block with different geometry and, worse, some **collide** with the imported `sections.css` and lose:

| Element | Preview (inline) | DS official | Divergence |
|---|---|---|---|
| Button | `.btn-primary` padding `16px 32px`, no hover/active/disabled, `display:inline-block` (`preview.html:89-98`) | `.btn.btn-primary` padding `16px 30px`, `inline-flex`, `gap:10px`, hover `translateY(-2px)+shadow-brand`, active `orange-700 + text-on-brand-active`, disabled state (`button.css:18-50`) | Missing all states, wrong padding (32 vs 30), missing `.btn` base |
| Tag | `.tag` white-glass `rgba(255,255,255,.12)` + border, `text-on-media` (`preview.html:80-88`) | `.tag` **solid orange** `--orange-500` + `--text-on-brand`, uppercase, tracked (`badge.css:44-53`) | Completely different visual language (glass vs solid-orange). Preview intent (tag over media) is arguably valid but is **not** a DS token pattern |
| Pillar | flat `surface-card-1`, `padding:20px`, no number, `h3` md not-uppercase (`preview.html:116-123`) | number `.n` 30px orange display, gradient bg, hover lift, `h3` `text-lg` uppercase, `padding:26px 22px` (`cards.css:22-51`) | Missing `.n` numeral, wrong padding, wrong type, no hover |
| Model-card | flat `padding:24px`, no media block, price/incl inline (`preview.html:131-142`) | `.model-media` 320px image zone + `.model-body` split layout + `.model-price` atom, hover lift + `shadow-xl` (`cards.css:53-92`) | No media zone, no body split, no hover, wrong price atom |
| Header | `header.nav` padding `18px 32px`, no sticky, no glass (`preview.html:45-51`) | `header.site` sticky + `--surface-glass` + blur; `.nav` embedded container height 72px (`header-footer.css:10-24`) | Not sticky, no glass, no container max-width, uses non-DS class `header.nav` |

**Verdict: CONFIRMED.** Note the *collision hazard*: because `sections.css` **is** imported, the DS `.pillar`, `.model-card`, `.sec-head`, `.pillars`, `.model-grid` rules load first, then the preview's inline `<style>` (later in the cascade, equal specificity) **overrides** them. So the DS geometry for these is actively suppressed — the page carries the DS cost (bytes) without the DS benefit.

### Finding 4 — Grids use `auto-fit/minmax` vs DS fixed columns → **CONFIRMED**

- Pillars: DS `sections.css:103` → `grid-template-columns: repeat(4, 1fr)` (with `1fr 1fr` @≤880, `1fr` @≤520). Preview `preview.html:115` → `repeat(auto-fit, minmax(220px, 1fr))`. **Overrides the DS 4-col rhythm.** With 7 pillars, DS intends a 4+3 layout; `auto-fit` yields an unpredictable count per viewport.
- Models: DS `sections.css:119` → `grid-template-columns: 1fr 1fr`. Preview `preview.html:130` → `repeat(auto-fit, minmax(240px, 1fr))`. **Overrides.** With 3 cards, DS 2-col intends 2+1; `auto-fit` may produce 3-up and break the intended pairing.

**Verdict: CONFIRMED.** Both grid definitions collide with (and suppress) the imported `sections.css` grid rules.

---

## Color Comparison

Token adherence is the strong point: the preview references DS custom properties almost everywhere (zero raw hex except deliberate white-glass alphas on `.tag`).

| Token | Design (DS) | Code (preview) | Match | Fix |
|-------|-------------|----------------|-------|-----|
| Brand primary | `--orange-500 #FD7D05` | `--orange-500` | PASS | - |
| Brand hover | `--orange-600` | `--orange-600` (banner) | PASS | - |
| Text on brand | `--text-on-brand` (neutral-900) | `--text-on-brand` | PASS | - |
| Text on media | `--text-on-media #FFF` | `--text-on-media` | PASS | - |
| Eyebrow | `--orange-400` via `.eyebrow` | inherited (base.css) | PASS | - |
| Lead copy | `--neutral-300` via `.lead` | `--text-on-media-muted` (card override) | PASS | - |
| Pillar bg | gradient white-alpha (`cards.css:27`) | `--surface-card-1` | WARN | Cosmetic; DS uses translucent gradient, preview uses solid surface |
| Lime accent | `--energy-lime` | `--energy-lime` | PASS | - |
| Founder tint | `--lime-tint` / `--lime-tint-border` | same | PASS | - |
| Urgency bar | `--gradient-brand-bar` | `--gradient-brand-bar` | PASS | - |
| Neutral ramp (300/400/500) | tokens | tokens | PASS | - |
| Tag surface | `--orange-500` solid (`badge.css:45`) | `rgba(255,255,255,.12)` raw | FAIL | Use DS `.tag` (solid orange) or formalize a `.tag--media` variant in the DS |
| Tag border | (none in DS `.tag`) | `rgba(255,255,255,.24)` raw | FAIL | Same as above — raw alpha not a token |

**Colors: 26/28 = 93%.** The only true failures are the two raw-alpha values on the redefined `.tag`.

---

## Spacing / Geometry Comparison

| Location | Design (DS) | Code (preview) | Match | Fix |
|----------|-------------|----------------|-------|-----|
| Hero container | embedded `max-width:1200px; margin:0 auto` (`sections.css:57`) | **cancelled** by `max-width:none;margin:0` (`preview.html:103`) | FAIL | Remove the `.hero.hero--media` override; let the organism own the container |
| Hero card max-width | `480px` (`sections.css:75`) | `480px` (inherited, not overridden) | PASS | - |
| Hero card padding | `32px` (`sections.css:78`) | inherited `32px` | PASS | - |
| Button padding | `16px 30px` (`button.css:27`) | `16px 32px` (`preview.html:94`) | PASS (Δ2px ≤4) | - (within tolerance, but should reuse `.btn`) |
| Pillar padding | `26px 22px` (`cards.css:24`) | `20px` (`preview.html:120`) | FAIL (Δ6px) | Reuse `.pillar` or match padding |
| Model-card padding | `.model-body 22px 24px 26px` (`cards.css:79`) | `24px` flat (`preview.html:135`) | FAIL | Reuse `.model-card`+`.model-body` |
| Model media zone | `height:320px` (`cards.css:69`) | absent | FAIL | No product-image zone; add `.model-media` |
| Pillars grid | `repeat(4,1fr)` (`sections.css:103`) | `auto-fit minmax(220px)` (`preview.html:115`) | FAIL | Restore DS 4-col rhythm |
| Models grid | `1fr 1fr` (`sections.css:119`) | `auto-fit minmax(240px)` (`preview.html:130`) | FAIL | Restore DS 2-col rhythm |
| Header padding | `.nav` container, height `72px` (`header-footer.css:21`) | `18px 32px`, no height/container (`preview.html:49`) | FAIL | Reuse `header.site`+`.nav` |
| Section rhythm | `.manifesto 96px 0`, `.models 40px 0 96px` (`sections.css:95,106`) | generic `section 56px 32px; max-width:900px` (`preview.html:99`) | FAIL | DS uses full-width organism sections + `.wrap`; preview uses a 900px content column |
| Nav-cta gap | `18px` (`header-footer.css:25`) | flex default (`preview.html:36`) | WARN | Minor |
| Radius (cards) | `--radius-lg 18px` | `--radius-lg` | PASS | - |
| Radius (pills/buttons) | `--radius-pill` | `--radius-pill` | PASS | - |
| Hero card radius | `--radius-xl 28px` (`sections.css:82`) | inherited | PASS | - |

**Spacing/Geometry: 6/15 = 40%.** The container cancellation (Finding 2b) plus grid overrides plus the 900px content-column model are the big misses.

---

## Typography Comparison

| Element | Design (DS) | Code (preview) | Match | Fix |
|---------|-------------|----------------|-------|-----|
| Display family | `--font-display` "Lato" black italic (`base.css:43-51`) | `.display` inherited | PASS (class) / FAIL (font not loaded) | Link the Lato/Roboto webfonts; page has no `@font-face`/`<link>` to fonts |
| Hero H1 size | `--text-4xl` in canonical snippet (`GUIA:286`) | `--text-4xl` (`preview.html:76`) | PASS | - |
| Display text-transform | `uppercase` (`base.css:49`) | `none` (`preview.html:77`) — documented deviation | WARN | Intentional (mixed-case campaign copy); acceptable but breaks DS display convention |
| Eyebrow | `.eyebrow` uppercase orange (`base.css:34-40`) | `.eyebrow` reused | PASS | - |
| Lead | `.lead` text-lg light (`typography.css:13-20`) | `.lead` reused | PASS | - |
| Section head | `.sec-head h2` display black italic **uppercase** text-3xl (`sections.css:111-118`) | `.sec-head` display black italic **none** text-3xl (`preview.html:106-113`) | WARN | Rebuilt inline + text-transform deviation; reuse `.sec-head h2` |
| Pillar h3 | `text-lg` uppercase display (`cards.css:39-45`) | `text-md`, body, not-uppercase (`preview.html:122`) | FAIL | Match DS pillar h3 |
| Model h3 | `text-xl` uppercase display (`cards.css:85-91`) | `text-md` body (`preview.html:138`) | FAIL | Match DS model h3 |
| Price | `.price`/`.model-price` display black 46/26px (`price.css`) | `.price-tag` text-lg (`preview.html:140`) | FAIL | Use `.model-price` atom (note: DS `.price-tag` is a *label pill*, not the numeral — preview misuses the name) |
| Body line-height | `--leading-normal 1.5` | `--leading-normal` (`preview.html:22`) | PASS | - |

**Typography: 7/10 = 70%.** Class reuse for `.eyebrow`/`.lead`/`.display` is correct; component headings are rebuilt with wrong scale/weight. The **missing webfont link** is a real risk: all display type silently falls back to `system-ui`.

> Naming collision worth flagging: preview's `.price-tag` (`preview.html:140`) means "the price numeral", but DS `.price-tag` (`badge.css:19`) is "a small orange label pill". If `badge.css` were ever imported, these would fight.

---

## Effects Comparison

| Effect | Design (DS) | Code (preview) | Match |
|--------|-------------|----------------|-------|
| Card radius | `--radius-lg` | `--radius-lg` | PASS |
| Pill radius | `--radius-pill` | `--radius-pill` | PASS |
| Hero card shadow | `--shadow-xl` (`sections.css:83`) | inherited | PASS |
| Hero card blur | `backdrop-filter: blur(14px)` (`sections.css:80`) | inherited | PASS |
| Button hover/active | `translateY(-2px)+shadow-brand`, `scale(.98)+orange-700` (`button.css:38-43`) | none (`preview.html:89-98`) | FAIL |
| Card hover lift | `translateY(-4px)+shadow-xl` (`cards.css:63-67`) | none | FAIL |
| Pillar hover lift | `translateY(-3px)+orange border` (`cards.css:31`) | none | FAIL |
| Motion tokens | `--ease-spring`, `--dur-base` used by atoms | unused (no transitions on rebuilt components) | FAIL |
| Focus ring | global `:focus-visible 3px orange` (`base.css:25`) | inherited (base.css imported) | PASS |

**Effects: 5/9 = 56%.** Interaction/motion is the casualty of inlining components — the rebuilt button/cards have no states.

---

## Actionable Fixes

### Priority 1: High Impact (structural — unlocks the whole page)

1. **Remove the hero container cancellation:** delete `max-width:none; margin:0` from `.hero.hero--media`
   - Files: `preview.html:103` (keep `padding:0` only, or drop the rule entirely)
   - Impact: 1 rule → fixes the left-pinned/narrow hero (Finding 2b root cause)

2. **Import the missing DS stylesheets and delete the inline rebuilds:** add `atoms/button.css`, `atoms/badge.css`, `atoms/price.css`, `molecules/cards.css`, `organisms/header-footer.css`
   - Files: `preview.html:7-10` (add 5 `<link>`s), then remove `.btn-primary`, `.tag`, `.pillar`, `.model-card`, `.price-tag`, `header.nav` blocks from `<style>`
   - Impact: ~11 inline components → 0; restores states, hover, media zones, geometry

3. **Restore DS grid rhythm:** remove the local `.pillars` and `.model-grid` overrides so imported `sections.css` (4-col / 2-col) wins
   - Files: `preview.html:115`, `preview.html:130`
   - Impact: 2 grids

4. **Adopt DS component markup for cards/pillars/buttons:** e.g. `.pillar` needs `<div class="n">01</div>`; `.model-card` needs `.model-media`+`.model-body`+`.model-price`; buttons need `class="btn btn-primary"`
   - Files: `preview.html:216-225` (header), `253-261` (pillars), `267-286` (models), `237,358` (buttons)
   - Impact: ~20 element instances

### Priority 2: Medium Impact

5. **Use the sticky glass header organism:** replace `header.nav` with `header.site > .nav` (+ import `header-footer.css`)
   - Files: `preview.html:45-51` (style), `216-225` (markup)
   - Impact: 1 organism

6. **Link the brand webfonts (Lato + Roboto):** the DS assumes them; without a `<link>`/`@font-face` all display type falls back to `system-ui`
   - Files: `preview.html:<head>`
   - Impact: every display heading (~15)

7. **Formalize the media-tag as a DS variant instead of raw alpha:** the white-glass tag over the hero photo is a legit need; propose `.tag--media` in `badge.css` rather than inline `rgba(255,255,255,.12/.24)`
   - Files: `preview.html:80-88` → DS `atoms/badge.css`
   - Impact: 2 raw values → tokenized

### Priority 3: Low Impact

8. **Reconcile `.price-tag` naming collision:** rename preview's price numeral to the DS `.model-price` atom to avoid semantic clash with `badge.css` `.price-tag`
   - Files: `preview.html:140`, `271/277/283`
   - Impact: cosmetic + future-proofing

9. **Section rhythm:** the generic `section { max-width:900px }` content column diverges from DS full-width organism sections + `.wrap`; align if a DS-consistent rhythm is desired
   - Files: `preview.html:99`
   - Impact: page-wide vertical rhythm

---

## Token Recommendations

Only two genuinely new tokens/variants are needed — the palette is already covered. Everything else is *reuse existing DS components*, not *add tokens*.

```yaml
# Proposed additions to the DS (not the campaign)
atoms/badge.css:
  # Media-context tag variant (white glass over photo/video hero)
  # Formalizes what preview.html:80-88 does with raw rgba() alphas.
  .tag--media:
    background: "rgba(255,255,255,.12)"   # candidate token: --surface-glass-light
    border: "1px solid rgba(255,255,255,.24)"  # candidate token: --border-on-media
    color: "var(--text-on-media)"

tokens/tokens.css:
  --surface-glass-light: "rgba(255,255,255,.12)"  # glass fill over media
  --border-on-media:     "rgba(255,255,255,.24)"  # hairline over media

# NOTE: index.html:571 still uses `hero hero--media wrap` — stale vs the
# current CSS/GUIA which dropped `.wrap`. Recommend updating the demo so the
# pattern library matches the canonical guidance (avoids future confusion).
```

---

## Extracted Design Tokens (Reference — DS)

```yaml
colors:
  brand: { orange-500: "#FD7D05", orange-600: "#E06D00", orange-700: "#B85800" }
  on_brand: { text-on-brand: "var(--neutral-900)", text-on-brand-active: "#FFFFFF" }
  on_media: { text-on-media: "#FFFFFF", text-on-media-muted: "rgba(255,255,255,.72)",
              overlay-media: "linear-gradient(180deg, .20 → .82 rgba(22,22,22))" }
  neutral_ramp: { 50: "#F7F7F7", 300: "#C9C9C9", 400: "#A3A3A3", 500: "#7A7A7A", 900: "#1C1C1C" }
  accent: { energy-lime: "#C6F24A", lime-tint: "rgba(198,242,74,.08)" }
  surfaces: { card-1: "#232323", card-2: "#1A1A1A", footer: "#131313", glass: "rgba(20,20,20,.72)" }
typography:
  display: { family: "Lato", weight: 900, style: italic, transform: uppercase, size-4xl: "clamp(3rem→5.25rem)" }
  scale: { text-sm: ".875rem", text-md: "1rem", text-lg: "1.25rem", text-3xl: "clamp(2.125→3.75rem)" }
spacing_layout:
  container: { max: "1200px", pad: "24px" }
  hero_media: { min-height: "clamp(420px,62vw,720px)", card-max: "480px", card-pad: "32px" }
  grids: { pillars: "repeat(4,1fr)", models: "1fr 1fr" }
radius: { lg: "18px", xl: "28px", pill: "999px" }
effects:
  shadow: { lg: "0 18px 40px", xl: "0 30px 70px", brand: "0 10px 28px rgba(253,125,5,.34)" }
  motion: { ease-spring: "cubic-bezier(.34,1.56,.64,1)", dur-base: "200ms" }
  button_states: { hover: "translateY(-2px)+shadow-brand", active: "scale(.98)+orange-700" }
components:
  btn: { padding: "16px 30px", display: inline-flex, variants: [primary, ghost, secondary], states: [hover, active, disabled] }
  tag: { bg: "orange-500 solid", color: "text-on-brand", uppercase: true }
  pillar: { numeral: ".n 30px orange", h3: "text-lg uppercase", pad: "26px 22px", hover: lift }
  model-card: { media-zone: "320px", body-split: true, price-atom: ".model-price 26px", hover: "lift+shadow-xl" }
  header: { header.site: "sticky+glass+blur", nav: "container height 72px" }
```

## Extracted Code Tokens (Implementation — preview.html)

```yaml
imports: [tokens.css, base.css, atoms/typography.css, organisms/sections.css]   # 4 of 19
colors: uses DS custom properties throughout; 2 raw rgba() on .tag (255,255,255 .12/.24)
typography:
  display: { class: .display (reused), transform: none (deviation), fonts: NOT LOADED (system-ui fallback) }
  headings_rebuilt: { .sec-head, .pillar h3 (text-md), .model-card h3 (text-md) }  # wrong scale vs DS
spacing_layout:
  hero: { override: "max-width:none;margin:0 (CANCELS DS container)", card-max: "480px (inherited)" }
  grids: { pillars: "auto-fit minmax(220px)", models: "auto-fit minmax(240px)" }   # overrides DS
  sections: "generic section 56px 32px max-width:900px"   # content-column, not DS organism rhythm
components_rebuilt_inline:
  - .btn-primary   # no states, padding 16px 32px
  - .tag           # white-glass, not DS solid-orange
  - .pillar        # flat, no numeral, wrong type
  - .model-card    # no media zone, no body split, no hover
  - .price-tag     # numeral (name collides with DS badge .price-tag)
  - header.nav     # not sticky, no glass, no container
effects: { button_states: none, card_hover: none, pillar_hover: none, motion_tokens: unused }
```

---

## Next Steps

1. [ ] Apply Priority 1 fixes (4 changes — container un-cancel, import 5 CSS, drop 2 grid overrides, adopt DS markup)
2. [ ] Apply Priority 2 fixes (3 changes — sticky glass header, load webfonts, formalize `.tag--media`)
3. [ ] Apply Priority 3 fixes (2 changes — price naming, section rhythm)
4. [ ] Re-run `*design-compare` to validate improvements (target ≥85%)
5. [ ] Update DS: add `.tag--media` variant + tokens; refresh `index.html:571` stale `hero--media wrap`
6. [ ] Run `*validate-tokens` to confirm zero remaining hardcoded values (only the 2 `.tag` alphas today)

---

## Comparison Thresholds Used

| Category | Threshold | Method |
|----------|-----------|--------|
| Colors | 5% | HSL distance |
| Spacing | ±4px | Absolute difference |
| Typography size | ±2px | Absolute difference |
| Typography weight | exact | Exact match |
| Border radius | ±2px | Absolute difference |

---

*Generated by Brad Frost (Design System Architect) v3.5.0*
*Command: `*design-compare pj-designsystem/design-system-teo squads/teo-esportes/campanhas/vip-pampulha-2026/preview.html`*
