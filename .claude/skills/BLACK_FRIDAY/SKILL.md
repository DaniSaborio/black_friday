---
name: outlet-rotulo
description: 'Rótulo design system (red #EB1A1D, hard black #0C0C0C, yellow accent #FFD80F, die-cut price badges with 6px white borders and offset hard shadows, type stack Archivo Black + Anton + Oswald + Barlow) for the .OUTLET liquidation store in Ciudad Quesada, San Carlos. ALWAYS use this skill when building, modifying, or reviewing any interface for this outlet — landing page, price-of-the-day hero, weekly price table, how-it-works section, location and hours, WhatsApp CTA — and also whenever the user asks for "a screen", "a section", "a component", "styles", "Tailwind", "HTML", or mockups for the outlet, even if they never say "Rótulo" or "design". Apply it too when generating throwaway HTML, wireframes, or UI examples for this client.'
---

# Rótulo — .OUTLET design system

.OUTLET is an import-and-liquidation store in Ciudad Quesada, San Carlos, Costa Rica. Its slogan is **"Black Friday todos los días"** and its whole business model is a price that drops every day of the week, from Friday down to Thursday, in two categories: `CAJONES` and `ROPA`.

The aesthetic is **Rótulo**: the printed vinyl banner and the roadside sign. Saturated red, hard black, one yellow accent, die-cut badges with thick white outlines and offset shadows with no blur. Nothing is subtle. Everything reads at 3 meters from a moving car, and then again at 380px on a phone that came from a TikTok link.

> Note on language: this document is in English, but the site ships in Spanish for the Costa Rican market. Every user-facing string, day name, currency, and label you generate stays in Spanish (`HOY ES MIÉRCOLES`, `CAJONES`, `₡1.500`, `Cómo llegar`).

---

## 1. Tokens

| Token | Value | Use |
|---|---|---|
| `rojo` | `#EB1A1D` | Dominant background. Hero, sections, badges. |
| `rojo-profundo` | `#B80A0B` | Diagonal stripes, button hover, red text **on white** |
| `negro` | `#0C0C0C` | Text on white, contrast blocks, hard shadows |
| `carbon` | `#292A2C` | Secondary sections, footer |
| `concreto` | `#78797B` | Concrete texture, giant type watermark, disabled state |
| `blanco` | `#FFFFFF` | Text on red, badge outline |
| `amarillo` | `#FFD80F` | **Accent only**: weekday names, the ₡ sign, `CAJONES`/`ROPA` labels |

Proportion: 60% red · 25% white · 10% black/charcoal · **5% yellow, never more**. Yellow loses all its punch the moment it becomes a surface instead of a highlight.

Spacing: multiples of 8px. Between sections **4rem (64px)** — the banner breathes in blocks, not in gutters. Card padding 20px. Mobile reference width: 380px.

### Contrast rules (non-negotiable)

Measured against the real palette, not guessed:

- White on `rojo` = **4.47:1** → headlines and text ≥19px bold only. **Never body copy on red.**
- Yellow on `rojo` = **3.2:1** → big numbers and short uppercase labels only. Never a sentence, never below 24px.
- Body copy is always `negro` on white or white on `carbon`.
- Red text on a white background uses `rojo-profundo`, never `rojo`.
- Focus: `outline: 3px solid #0C0C0C; outline-offset: 3px`. On red surfaces, `outline-color: #FFFFFF`. Never `outline: none`.
- Today's price is never signaled by color alone: it also carries the `HOY` label and a larger scale.

---

## 2. Typography

Four families, four jobs. If a block of text can't say which family it belongs to, the hierarchy is wrong.

- **Archivo Black** — the store's own voice. Only the H1 and section titles that shout (`LÍDERES EN IMPORTACIÓN Y LIQUIDACIÓN`). Uppercase, `letter-spacing: -0.01em`, `line-height: 0.9`.
- **Anton** — numbers and the giant watermark. Every `₡`, every price, `#1`, the countdown. Uppercase always, `line-height: 0.85` at hero sizes.
- **Oswald** 500/600 — labels and eyebrows. Weekdays, `CAJONES`, `ROPA`, `HOY`, section tags. Uppercase, `letter-spacing: 0.12em`, 12–15px.
- **Barlow** 400/600 — everything a human actually reads: paragraphs, hours, address, buttons, form fields. 17px base, `line-height: 1.55`.

Heuristic: if it's a **number**, it's Anton. If it's a **tag**, it's Oswald. If it's the **store shouting**, it's Archivo Black. If it's an **explanation**, it's Barlow.

Scale:

```css
--fs-precio: clamp(4rem, 20vw, 11rem);   /* Anton — today's price, the protagonist */
--fs-h1:     clamp(2.25rem, 9vw, 5rem);  /* Archivo Black */
--fs-h2:     clamp(1.75rem, 6vw, 3rem);  /* Anton */
--fs-badge:  clamp(1.5rem, 7vw, 2.5rem); /* Anton — price inside a badge */
--fs-label:  0.8125rem;                  /* Oswald, uppercase, 0.12em */
--fs-body:   1.0625rem;                  /* Barlow */
```

Prices are always written `₡9.900` — Costa Rican colón sign, period as thousands separator, no decimals. Format with `Intl.NumberFormat('es-CR')`, never by hand.

---

## 3. Base configuration

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      rojo: { DEFAULT: '#EB1A1D', profundo: '#B80A0B' },
      negro: '#0C0C0C', carbon: '#292A2C', concreto: '#78797B', amarillo: '#FFD80F',
    },
    fontFamily: {
      titular:  ['"Archivo Black"', 'system-ui', 'sans-serif'],
      display:  ['Anton', 'system-ui', 'sans-serif'],
      etiqueta: ['Oswald', 'system-ui', 'sans-serif'],
      cuerpo:   ['Barlow', 'system-ui', 'sans-serif'],
    },
    boxShadow: {
      dura: '6px 6px 0 0 #0C0C0C',
      'dura-sm': '3px 3px 0 0 #0C0C0C',
      insignia: '0 8px 0 0 rgba(0,0,0,.35)',
    },
    transitionTimingFunction: { golpe: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  },
}
```

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Oswald:wght@500;600&family=Barlow:wght@400;600&display=swap" rel="stylesheet">
```

```css
:root { color-scheme: light; }
html { -webkit-text-size-adjust: 100%; }
body { background: #fff; color: #0C0C0C; font-family: 'Barlow', system-ui, sans-serif; }

/* Diagonal stripes — section background, never behind small text */
.franjas {
  background-image: repeating-linear-gradient(
    115deg, #EB1A1D 0 60px, #B80A0B 60px 120px
  );
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

Light only. No dark mode: a store sign doesn't have a night version.

---

## 4. Page structure

Mobile-first for real — base styles are the 380px ones and `md:`/`lg:` only expand. Most traffic arrives from Facebook and TikTok on a phone.

```
┌────────────────────────────────┐
│ HEADER  logo · ₡ de hoy · 📱   │  sticky, negro, 64px
├────────────────────────────────┤
│ HÉROE — el precio de hoy       │  rojo + franjas, 100svh máx
│   HOY ES MIÉRCOLES             │
│   ₡1.500 CAJONES  ₡1.900 ROPA  │
│   Mañana baja a ₡700 · 14h 22m │
│   [Cómo llegar] [WhatsApp]     │
├────────────────────────────────┤
│ LA SEMANA COMPLETA             │  blanco, 7 insignias
├────────────────────────────────┤
│ CÓMO FUNCIONA — 3 pasos        │  negro
├────────────────────────────────┤
│ DE DÓNDE VIENE LA MERCADERÍA   │  rojo
├────────────────────────────────┤
│ DÓNDE ESTAMOS — mapa, horario  │  blanco
├────────────────────────────────┤
│ FOOTER + redes                 │  carbon
└────────────────────────────────┘
│ BARRA FIJA: WhatsApp           │  bottom, 72px
```

Sections alternate red → white → black. Never two red sections in a row: the eye stops registering it and the yellow dies with it.

---

## 5. Components

### `InsigniaPrecio` — the signature element

The die-cut badge from the banner. Everything else on the site can be quiet; this is where the boldness gets spent.

Anatomy, always in this order: **day** (Oswald, yellow) → **price** (Anton, white, huge) → **category** (Oswald, yellow).

```html
<article class="insignia" data-estado="hoy">
  <p class="font-etiqueta text-amarillo tracking-[0.12em] text-[13px]">MIÉRCOLES</p>
  <p class="font-display text-white leading-none text-[clamp(1.5rem,7vw,2.5rem)]">
    <span class="text-amarillo">₡</span>1.500
  </p>
  <p class="font-etiqueta text-amarillo tracking-[0.12em] text-[13px]">CAJONES</p>
</article>
```

```css
.insignia {
  background: #EB1A1D;
  border: 6px solid #fff;
  padding: 14px 20px;
  text-align: center;
  box-shadow: 0 8px 0 0 rgba(0,0,0,.35);
  clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
}
.insignia[data-estado="hoy"]     { transform: scale(1.12); border-color: #FFD80F; z-index: 2; }
.insignia[data-estado="pasado"]  { opacity: .45; }
.insignia[data-estado="futuro"]  { background: #B80A0B; }
```

`clip-path` cuts the border on the diagonal edges — that's intentional, it's how die-cut vinyl actually looks. Today's badge is bigger *and* labeled; the scale alone is not the message.

### `PrecioHoy` — the hero

The one thing every visitor came to find out. It answers "¿a cómo está hoy?" before any scroll.

- Weekday in Oswald yellow, 15px, tracking wide.
- Two prices side by side in Anton at `--fs-precio`, `CAJONES` and `ROPA` underneath in Oswald yellow.
- Below them, one Barlow line with tomorrow's price and the countdown.
- Two buttons: `Cómo llegar` (primary) and `Escribinos por WhatsApp` (secondary).

The price comes from the day of the week in **`America/Costa_Rica`**, computed client-side — never from the server's clock and never from a hardcoded "today":

```js
const dia = new Intl.DateTimeFormat('es-CR', {
  weekday: 'long', timeZone: 'America/Costa_Rica'
}).format(new Date());
```

The week runs **Friday → Thursday**, descending. Friday is the reset, Thursday is the floor.

### `Contador` — countdown to the drop

Ticks down to midnight in Costa Rica, then rerenders the whole hero with the new price. Format `14h 22m`, Anton for the numbers, Barlow for the rest. `aria-live="off"` — a value that changes every minute must not be announced every minute; put the price change on `aria-live="polite"` instead.

On Thursday there's no drop: the copy switches to `El precio más bajo de la semana. Mañana vuelve a ₡9.900.` Handle this case explicitly — it's the one day the countdown lies if you don't.

### `BotonRotulo`

```html
<a class="inline-block border-[3px] border-negro bg-amarillo px-6 py-3 font-etiqueta uppercase
          tracking-[0.12em] text-negro shadow-dura transition-transform duration-150 ease-golpe
          active:translate-x-[3px] active:translate-y-[3px] active:shadow-dura-sm">
  Cómo llegar
</a>
```

The press sinks the button into its own shadow. Primary = yellow on black border. Secondary = white background. On a red surface the border stays black; the shadow stays black.

### `EtiquetaSeccion`

Oswald 13px uppercase, `tracking-[0.12em]`, white text on a black block, `padding: 3px 10px`. Opens every section: `LA SEMANA COMPLETA`, `CÓMO FUNCIONA`, `DÓNDE ESTAMOS`.

### `MarcaAgua`

Anton at `clamp(5rem, 25vw, 16rem)`, color `#78797B` at 25% opacity, overflowing its container, `aria-hidden="true"`, `pointer-events-none`, `user-select: none`. One per page maximum. It's the concrete-texture block from the banner translated to type.

### `BarraFija`

72px, bottom, black, `env(safe-area-inset-bottom)` respected. A single WhatsApp action — that's the real conversion channel for this business, not a contact form. Content gets `padding-bottom: 88px` so the bar never covers the last row.

---

## 6. Copy

The voice is the banner's: shouted, short, number first. Sentence case in paragraphs, uppercase in labels — never uppercase paragraphs.

- Number leads, explanation follows: `₡1.500 el cajón, hoy miércoles`, not `Hoy tenemos una oferta especial de ₡1.500`.
- Costa Rican Spanish, informal *vos*: `Escribinos`, `Vení`, `Llevate`.
- No corporate filler: no `Bienvenidos a nuestro sitio`, no `Somos una empresa comprometida`.
- Buttons name the outcome: `Cómo llegar`, `Escribinos por WhatsApp`, `Ver la semana completa`.
- Never invent stock, brands in stock, delivery, or online purchase. The store sells in person, by volume, and stock changes daily.

---

## 7. Motion

- Button press: sink into its own shadow, 150ms `ease-golpe`.
- Today's badge: enters with `scale(0.9) → 1.12`, 300ms, once on load.
- Countdown: number changes with no animation. A ticking clock that also animates is noise.
- Nothing else. No parallax, no scroll-triggered reveals, no gradient skeletons. This is a sign, not a showreel.
- Everything degrades under `prefers-reduced-motion`.

---

## 8. Before calling a screen done

1. Does the visitor know today's price without scrolling?
2. Is yellow still under ~5% of the surface, and only on labels, `₡`, and numbers?
3. Is there any body copy sitting on red? (There shouldn't be.)
4. Do the four families hold their roles — Anton numbers, Oswald labels, Archivo Black shouting, Barlow explaining?
5. Do badges carry a white or yellow border with an offset shadow and no blur?
6. Is today's badge distinguished by label **and** scale, not by color alone?
7. Does the day come from `America/Costa_Rica`, and does Thursday's edge case read correctly?
8. Are prices formatted `₡1.500` with `Intl.NumberFormat('es-CR')`?
9. Visible focus outline, touch targets ≥44×44px, tested at 380px wide?
10. Is `padding-bottom` enough to clear the 72px fixed bar?
11. Do third-party retailer logos appear anywhere? (See below.)

## Anti-patterns

Gradients · soft or colored shadows · generic `border-radius: 12px` · yellow as a large surface · yellow or white body text on red · more than one accent color · dark mode · multicolor filled icons · uppercase paragraphs · stock photos of shopping carts and gift boxes · scroll animations · a contact form where WhatsApp belongs.

**Third-party logos.** Amazon, Target, Home Depot, eBay, Wish, Best Buy, and SHEIN are registered trademarks. They're on the printed banner, but on the website they can read as official affiliation. Default to text — `Mercadería de liquidación de las principales tiendas de Estados Unidos` — and only ship the logos if the client signs off on it in writing.
