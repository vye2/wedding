# Ashley &amp; Victor — Wedding Website

A bespoke wedding website designed to look like fine wedding stationery and
hosted for free on **GitHub Pages**. No backend, and no RSVP — replies come back
on the card in the paper invitation.

**Two pages, one React app** (React 19 + TypeScript + Vite, CSS Modules). All
source lives in **`app/`**; `npm run build` compiles both pages and puts the
results back in the repo root, because Pages serves this repo's root directly.

- **`wedding/index.html`** — the main page, served at
  **`ashleyhuynh.victorye.me/wedding`**. The schedule, what to wear, getting
  there, a Q&A with the two of them, and the practical questions.
- **`save-the-date.html`** — one non-scrolling screen: an envelope that opens.

Both are **generated**. Edit `app/`, run `npm run build`, commit the output.

The root **`index.html`** is the exception: a hand-written redirect to
`/wedding/`, so the bare domain still lands somewhere. The build never touches
it.

> ⚠️ **Placeholder content.** The venues are unnamed, the times are close but
> unconfirmed, and the Q&A answers are invented — see the warning below before
> this goes anywhere near a guest. No real guest data, emails, or phone numbers
> are in this repo.

## What's here

```
.
│   # ---- SOURCE — this is what you edit ----
├── app/
│   ├── home.html                 # main page: HTML shell + <noscript> fallback
│   ├── index.html                # save-the-date: HTML shell + <noscript> card
│   └── src/
│       ├── config.ts             # names, wedding date, portrait — shared by both pages
│       ├── main.tsx              # save-the-date mount point
│       ├── App.tsx               # save-the-date scene root
│       ├── timings.ts            # the reveal's durations — read by both the JS and the CSS
│       ├── hooks/                # useCountdown, useLetterFit, useOpenSequence,
│       │                         #   useSceneReady, usePrefersReducedMotion
│       ├── components/           # Opener, Envelope, Letter, Countdown, Petals
│       │
│       ├── home/                 # ---- the main page ----
│       │   ├── content.ts        # EVERY WORD on the main page, in one file
│       │   ├── Home.tsx          # section order
│       │   ├── useReveal.ts      # one observer for the whole page
│       │   └── components/       # TopNav, Hero, Knot, TheDay, PhotoBand, Wear,
│       │                         #   Travel, QandA, GoodToKnow, Gifts, SiteFooter
│       │
│       └── styles/
│           ├── tokens.css        # THE PALETTE + reduced-motion base (shared)
│           ├── home-page.css     # main page chrome + the thread, .wrap and reveal
│           └── std-page.css      # save-the-date chrome: no-scroll, floral backdrop
├── vite.config.ts                # why the artwork isn't build input, and where output lands
├── scripts/postbuild.mjs         # moves both built pages into place
│
├── index.html                    # hand-written redirect → /wedding/ (NOT generated)
│
│   # ---- BUILD OUTPUT — generated, committed, don't hand-edit ----
├── wedding/index.html            # ← app/home.html   (served at /wedding)
├── save-the-date.html            # ← app/index.html
├── assets/std/                   # hashed JS + CSS for both pages
│
├── assets/
│   ├── favicon.svg      # "A&V" monogram, on-palette
│   ├── env-back.webp    # envelope back (solid pocket)  — couple's own artwork, see Credits
│   ├── env-front.webp   # envelope front pocket (covers the letter's lower half)
│   ├── env-flap.webp    # the flap (flips down to close, rotates up to open); .png fallbacks alongside
│   ├── bg-floral.webp   # full-screen backdrop: floral frame around an open cream centre (.jpg fallback)
│   ├── paper-kraft.png  # legacy kraft texture (public domain — no longer used by the envelope)
│   └── og-image.png     # (optional) add your own 1200×630 social preview image
├── README.md         # this file
└── .nojekyll         # tells GitHub Pages to serve files as-is (no Jekyll processing)
```

## Two experiences, one palette

### `index.html` — the main page

Built around **one red thread**. In both families' folklore the red thread ties
two people who are meant to meet; it tangles but never breaks. It's also a
*line*, which makes it a layout device, and it is the only thing on the page
allowed to be loud. It knots under the names in the hero, runs down the spine of
the schedule, becomes **the line between Ashley's answers and Victor's in the
Q&A**, and is tied off in the footer.

The sections, in the order a guest needs them:

| Section | What it does |
| --- | --- |
| Hero | The date, the names, the bow being tied, and the shape of the day in one sentence |
| The day | Organised by **place** — at the house / at the church / at the banquet — because "where am I meant to be" is the real question, not "what happens at one o'clock" |
| What to wear | Garden formal, plus the four specific things a guest at *this* wedding would otherwise get wrong |
| Getting there | Airports, the hotel block, parking and the shuttle |
| **Q&A** | Eight questions the two of them answered **separately**, on opposite sides of the thread. The answers often disagree — the layout is what makes that legible |
| Good to know | The practical FAQ. Native `<details>`, so it works before the JavaScript loads |
| Gifts | Short, and in their own voice |

Two rules hold the design together:

- **The serif is a voice; the sans is information.** Cormorant for anything
  Ashley or Victor is saying, Inter for times, labels and logistics. The
  typeface tells you which mode you're reading.
- **The eyebrows are labels, not decoration** — they repeat the nav's wording
  exactly. There is no `01 / 02 / 03` numbering anywhere: only the schedule is a
  sequence, and it already has real times to count by.

**There is no RSVP on this site**, by design — replies come back on the card in
the paper invitation, and the FAQ says so.

> **The one colour outside the locked palette** is `--thread` (`#a63b2a`), a
> lacquer red. It's justified: red is the actual colour of both families'
> weddings — the áo dài, the lì xì and hóngbāo, the banquet hall. It is a
> **hairline colour only** — thread, knots, and the odd small mark. If it ever
> starts covering area, the page has lost the plot.

### `save-the-date.html`

A cinematic *save-the-date* on **one non-scrolling
  screen**. Guests land on the couple's **own blush floral envelope, sized full
  bleed**: it's deliberately oversized so its body covers the whole viewport — edge
  to edge on a desktop, and on a phone a **deep zoom that leaves only the middle of
  the envelope on screen**. The envelope is built from three layered pieces
  (`assets/env-back`, `env-front`, `env-flap`) that share one coordinate space so
  they stack exactly; the flap is authored open and shown **flipped down** to seal
  it. There's **no wax seal** — a "tap to open" hint and a soft sheen invite the tap.
  **Tap the envelope** and the **flap rotates up in 3D about its hinge** (swinging
  out of view at this size, by design), revealing the **one letter sandwiched
  between the front pocket and the back**; the **envelope pieces then slide down off
  the letter**, which stays centered.

  The letter is a **polaroid**: flat cream stock, square-ish corners and a plain
  drop shadow, with an even band of that stock above and beside the photo. (It was
  previously a deckle edge — a copy of the card sitting behind itself, pushed
  through an SVG turbulence filter to fray its outline — which read as rustic torn
  paper.) The couple's **engagement photo is the hero** across the top two thirds,
  its lower edge dissolving into the card, with **SAVE THE DATE** set white across
  it at the same size as the names. Below: the names, the date, and a live
  countdown to **Saturday, May 15, 2027**. Blush + sage throughout, with leaves
  drifting in front of the scene. Everyone sees the same page — no personalization.
  Fully keyboard-accessible; honors `prefers-reduced-motion` (skips the envelope,
  shows the letter outright). With JavaScript disabled it falls back to a plain
  typeset card — see Accessibility below.

  **Swap the portrait:** the two crops are named in `app/src/config.ts` under
  `portrait` — `wide` for landscape screens and `tall` for portrait ones, each
  with a `.webp` and a `.jpg`. Drop replacements into `assets/`, bump their
  `?v=`, and rebuild. Both are cropped to fill; `object-position` in
  `Letter.module.css` picks which part survives the crop.

  **Change the names, date or copy:** everything the card says comes from
  `app/src/config.ts`, including the printed date line — that's formatted from
  `weddingDate`, so it can't drift from the countdown. The `<title>` and the
  social-preview `<meta>` tags in `app/index.html` carry the same strings
  literally, because crawlers read the HTML before any script runs; change those
  by hand at the same time.

> **Note on 3D:** the flap hinge relies on the stage element's `perspective`. A
> CSS `filter` on that same element would flatten its 3D children (the flap would
> slide instead of rotating), so the envelope's drop shadow is drawn on the
> individual pieces rather than as a filter on the stage.

### How the reveal is put together

| Piece | Job |
| --- | --- |
| `App` | Motion preference, the gate that waits for the backdrop to decode, and the reveal's durations |
| `Opener` | Owns the reveal, plus the one measurement that needs both the envelope and the card |
| `Envelope` | The three artwork layers and the tap target. Renders the letter **as its children**, between the back and the front pocket — the JSX order *is* the physical sandwich |
| `Letter` | The card: portrait, title, names, date, countdown |
| `Countdown` | Ticks on its own so the once-a-second update doesn't re-render the scene |
| `Petals` | Casts the drifting field once, then leaves it to CSS |

Two things are worth knowing before editing:

- **`timings.ts` is the single source for the choreography.** `App` writes those
  durations onto the scene root as `--dur-*` custom properties, and the
  stylesheets read them from there — so the CSS transitions and the JavaScript
  waiting on them can't fall out of step. The CSS deliberately has no fallback
  values for them; a fallback would be a second copy of the number.
- **Every `.module.css` keeps its `@media (orientation: portrait)` block last.**
  A media query adds no specificity, so those rules tie with the base rules and
  are decided by source order. Put them anywhere else and they silently lose
  about half their declarations.

## ⚠️ Everything on the main page is placeholder

The relationship in the Q&A is **invented**, the times are close but
unconfirmed, and no venue is named. The page says so wherever a guest could be
misled — the Q&A carries *"the answers below are placeholders"*, the schedule
says the venues are being confirmed, and the footer says details will appear
there first. **Keep those lines until the real content replaces them.**

To fill it in, open **`app/src/home/content.ts`**. Every word on the page is in
that one file:

| Export | What it is |
| --- | --- |
| `NAMES` | Which name goes first |
| `HERO` | The one-sentence shape of the day |
| `DAY.movements` | The three places, their times, and what happens at each |
| `PHOTOS` | Three frames. Give one a `src` and it fills; leave it out and it renders as a labelled placeholder |
| `WEAR` | Dress code, plus the four specific notes |
| `TRAVEL.items` | Flying in, staying, getting between |
| `QA.questions` | `{ q, first, second }` — the question, then each of their answers |
| `KNOW.items` | The practical FAQ |
| `GIFTS` | Registry note |

The date is **not** in that file. It comes from `app/src/config.ts` — the same
value that drives the save-the-date's countdown — and the printed line
("Saturday, May 15th, 2027") is formatted from it, so the two pages cannot
disagree about when the wedding is.

The `<title>` and social-preview `<meta>` tags in `app/home.html` and
`app/index.html` carry the names and date as literal text, because crawlers read
the HTML before any script runs. Change those by hand at the same time.

> **Name order:** this page reads "Ashley & Victor" and the save-the-date reads
> "Victor & Ashley". That mismatch predates the rewrite — it was already the
> difference between the old homepage's `<title>` and the card. Set `NAMES` here
> and `couple` in `config.ts` when you decide which way round it goes.

## Theme / palette

The palette lives in **`app/src/styles/tokens.css`** and is the source of truth
for both pages. Sage + blush as locked, plus `--thread` — see the note above,
and the long comment where it's declared. If you add styles, use the variables.

Fonts (Cormorant Garamond, Inter, Great Vibes) load via Google Fonts `<link>`
tags in each page's HTML shell.

## Preview locally

```bash
npm install     # once
npm run dev     # opens http://localhost:5173/app/
```

- Main page: **http://localhost:5173/app/home.html**
- Save-the-date: **http://localhost:5173/app/**

Hot reload works on both. The dev server's root is the repo, so `/assets/*`
resolves off disk at exactly the paths the built pages use — what you see in dev
is what ships.

To preview the real build instead, run `npm run build` and serve the repo root.

## Build

```bash
npm run build     # typecheck → vite build → place the output
```

That runs `tsc --noEmit`, compiles `app/` into `dist/` (gitignored), and then
`scripts/postbuild.mjs` moves three things into the repo:

- `dist/app/home.html` → **`wedding/index.html`** — Pages serves a directory's
  `index.html` for a bare path, so this is what answers `/wedding`
- `dist/app/index.html` → **`save-the-date.html`**
- `dist/assets/std/*` → **`assets/std/*`** (replaced wholesale, so old hashed
  files don't pile up)

> The crossover in those first two names is deliberate: `app/index.html` was the
> save-the-date's source before there was a second page, and renaming it would
> have churned every path for no gain. The **output** names are the ones guests
> see, and those are right.

Both pages are built together so they share a React chunk and the palette
stylesheet — a guest who has seen one has most of the other's code cached.

**Commit those.** They're generated, but Pages serves this repo's root directly,
so they have to be in the tree. Never hand-edit them — the next build overwrites
them, and the file says so at the top.

> The couple's artwork is **not** build input. `vite.config.ts` declares the repo
> as the public directory during the build so Vite passes `/assets/*` URLs
> through verbatim instead of fingerprinting and re-emitting them — otherwise
> 1.8MB of envelope PNG gets forked into hashed copies and committed twice. That
> setting is build-only; in dev it would shadow the transform pipeline and stop
> anything from compiling.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, pick
   your branch (e.g. `main`) and folder **`/ (root)`**, then **Save**.
4. Your site publishes at `https://<user>.github.io/<repo>/` within a minute or two.

The empty **`.nojekyll`** file ensures GitHub Pages serves every file as-is, and
**`CNAME`** points the site at `ashleyhuynh.victorye.me`.

The published URLs are:

| URL | File |
| --- | --- |
| `ashleyhuynh.victorye.me/wedding` | `wedding/index.html` |
| `ashleyhuynh.victorye.me/save-the-date.html` | `save-the-date.html` |
| `ashleyhuynh.victorye.me/` | `index.html` — redirects to `/wedding/` |

> **Paths are domain-root-absolute.** Both pages and their stylesheets use
> `/assets/…`, which needs the site served from a domain root — which the CNAME
> gives it. If you ever drop the custom domain and publish under
> `https://<user>.github.io/<repo>/`, set `base` in `vite.config.ts` to
> `/<repo>/` and rebuild.

> **Social preview:** `assets/og-image.png` is referenced by the `og:image` and
> `twitter:image` tags on both pages but **is not in the repo** — link previews
> have nothing to show until you add a 1200×630 export there (or repoint those
> tags in `app/home.html` and `app/index.html` at an image that exists).

## RSVP

There isn't one, and that's the decision — replies come back on the card in the
paper invitation. The FAQ's first question says so in as many words.

The previous version of this site carried a form that validated, showed a
thank-you, and **sent nothing anywhere**, which is worse than having no form at
all: a guest could reasonably believe they had replied. It went with the old
homepage. If you ever do want online replies, add a section to
`app/src/home/` and wire it to Formspree or a Google Form — but don't ship a
form that only pretends to work.

## Accessibility & quality notes

- Semantic HTML5, one focus style across the whole main page, a skip link on
  both pages, and `prefers-reduced-motion` respected everywhere.
- Fully responsive; verified with no horizontal overflow from 1440px down to
  320px.

On the main page:

- The practical FAQ is native `<details>`/`<summary>` — it opens with a keyboard
  for free, works before the JavaScript loads, and needs no ARIA wiring.
- The narrow-screen nav is a scrolling row of links, **not** a hamburger. A menu
  button for five anchors on a page you can simply scroll is a control that
  exists to be a control — and it would need a focus trap and ARIA state to get
  right.
- Scroll reveals are one `IntersectionObserver` for the page, and reduced motion
  skips it entirely rather than animating at 0.001ms.
- The hero's knot is the page's only orchestrated moment. Under reduced motion
  it is simply already tied — the animation is removed, not shortened to a flash.

On the save-the-date specifically:

- The whole envelope is one large button, so the reveal works by keyboard and by
  screen reader. Once used it goes `inert` — it can't take focus or swallow taps
  meant for the card underneath — and focus moves to the letter once the envelope
  has cleared the frame.
- The skip link **opens the envelope** as well as jumping to the card. Jumping
  alone used to land a keyboard guest on a letter still sealed inside the pocket.
- The countdown's four abbreviated columns read fine and speak badly, so the
  timer's accessible name carries the same figures in words.
- `prefers-reduced-motion` is watched live, not read once at load: turn it on
  mid-visit and the theatrics stop there and then.
- **JavaScript is now required** — a React app has no markup until it runs. A
  `<noscript>` card in `app/index.html` carries the names, the date and "formal
  invitation to follow", so the page is never blank.

## Credits

- **Portrait** — the couple's own engagement photo, in two crops. `assets/portrait`
  (square, from a 4480px original) is used on landscape screens, where it bleeds to
  the card's edges; `assets/portrait-tall` (3:4, from a 4480×5974 original) is used
  on portrait screens, where the card fills the phone and the frame is far taller
  than it is wide. Both have `.webp` with a `.jpg` fallback, and the right one is
  picked by a `media="(orientation: portrait)"` `<source>` in the `<picture>`.
  Each is cropped to fill; `object-position` in `Letter.module.css` picks what survives.
- **Backdrop** — `assets/bg-floral.webp` (with a `.jpg` fallback) is the couple's
  **own artwork**: a sunlit floral frame — roses, eucalyptus and fern around an open
  cream centre — compressed for the web. It's set on `body` with `background-size:
  cover`, so its open centre stays behind the envelope and letter at any size.
- **Envelope** — `assets/env-back`, `env-front`, and `env-flap` (WebP, with `.png`
  fallbacks) are the couple's **own artwork** — their floral-embossed envelope
  supplied as separate pieces (back, front pocket, flap) so the flap can flip open —
  cropped to a shared coordinate space and compressed for the web. No third-party
  license applies.

  They are used **as supplied, in blush** (`#f2c4be`). They have at times been
  **recoloured** and can be again — the
  embossing is carried entirely in luminance, so the recolour pins the hue and
  rescales saturation and value, leaving every petal and fern untouched. The blush
  originals are in git history if they're ever wanted back.

  **Recolouring the envelope** takes three steps:

  1. Restore the blush originals (`git checkout <pre-recolour commit> -- assets/env-*`)
     so the transform doesn't compound onto an already-recoloured file.
  2. Convert each piece: split off alpha, take RGB to HSV, pin H, scale S and V,
     merge back, reattach alpha. The numbers below are derived from the source and
     the target — they aren't guesses.
  3. **Bump the `?v=` on the envelope URLs** in
     `app/src/components/Envelope.module.css`, or browsers keep painting the old
     pieces; **set `--hint-on-env`** in `:root` (`app/src/styles/tokens.css`) to
     suit the new lightness (see the note there — it can't be a constant); then
     **rebuild and commit the output**.

  Shades tried so far, with the transform each needs from the blush source:

  | Colour | Hue | Sat | Val | Reads as | Hint |
  | --- | --- | --- | --- | --- | --- |
  | `#dfe6da` | 95° | ×0.243 | ×0.950 | nearly white | ink |
  | `#e8c7c8` | 358° | ×0.662 | ×0.959 | blush, close to the original | ink |
  | `#9caf88` | 89° | ×1.037 | ×0.723 | the palette's `--sage-400` | ink |
  | `#9c8f88` | 21° | ×0.597 | ×0.645 | warm taupe | ink |
  | `#819171` | 90° | ×1.027 | ×0.599 | muted olive-sage | either |
  | `#7a895b` | 79° | ×1.600 | ×0.570 | olive | white |
  | `#4e533b` | 72° | ×1.346 | ×0.343 | deep military olive | white |
- **Kraft paper** — `assets/paper-kraft.png` (*"Kraft tileable 1024×1024"* from
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kraft_tileable_1024x1024.png),
  released into the **public domain**) is retained from the earlier design but is no
  longer used by the save-the-date envelope.

---

Made with love for family &amp; friends. 🌿
