# Ashley &amp; Victor — Wedding Website

A bespoke, single-page **static** wedding website (plain HTML, CSS, and vanilla
JS — no framework, no build step, no backend). Designed to look like fine
wedding stationery and to be hosted for free on **GitHub Pages**.

> ⚠️ Demo content only. The date and venues are **placeholders (TBD)**, and the
> RSVP form intentionally **posts nowhere**. No real guest data, emails, or
> phone numbers are included.

## What's here

```
.
├── index.html            # The full detailed page (Hero, Story, Details, Locations, RSVP, FAQ, Footer)
├── save-the-date.html    # Single-screen full-bleed envelope + "open the envelope" reveal
├── css/styles.css        # LOCKED sage + blush theme (CSS variables + components). Extend, don't rewrite.
├── css/save-the-date.css # Full-bleed layered envelope (back/front/flap) + flip-open reveal
├── js/main.js            # CONFIG object + nav toggle, countdown, scroll reveal, FAQ accordion, RSVP handler
├── js/save-the-date.js   # Envelope open sequence (flap flip + slide-away), drifting petals, live countdown
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

- **`index.html`** — the full site: story, itinerary, locations, RSVP, FAQ.
- **`save-the-date.html`** — a cinematic *save-the-date* on **one non-scrolling
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
  shows the letter outright) and falls back gracefully with JavaScript disabled.

  **Add the portrait:** the letter carries one photo, framed as a circular keepsake
  (`<figure class="std__photo">` in `save-the-date.html`). Replace the placeholder
  `<span class="std__photo-ph">…</span>` with
  `<img class="std__photo-img" src="assets/portrait.jpg" alt="Victor and Ashley" />`
  — any orientation works, it's cropped to fill the circle (`object-fit: cover`).
  The frame is sized in container units, so it scales with the card on every screen.

The names on the letter and the inside card are plain HTML text (edit them in
`save-the-date.html`). The wedding date lives in `CONFIG.weddingDate` at the top of
`js/save-the-date.js` (drives that page's countdown), separate from the detailed
site's own `CONFIG` in `js/main.js`.

> **Note on 3D:** the flap hinge relies on the `.stage` element's `perspective`. A
> CSS `filter` on that same element would flatten its 3D children (the flap would
> slide instead of rotating), so the envelope's drop shadow is drawn on a
> pseudo-element rather than as a filter on the stage.

## Edit the content (one place: the CONFIG object)

Open **`js/main.js`** and edit the `CONFIG` object at the very top. Everything
guest-facing is driven from there:

| Field | What it controls |
| --- | --- |
| `coupleNames.partnerA` / `partnerB` | First names in the hero + page title |
| `fullNames` | Full names in the footer |
| `weddingDate` | **The live countdown.** ISO 8601, local time (e.g. `2027-08-21T15:00:00`). *Placeholder.* |
| `dateLabel` | The human-friendly date line in the hero (officially TBD) |
| `region` | Location region shown in hero, locations, footer |
| `hashtag` | Wedding hashtag in the footer |
| `rsvpEmail` | Placeholder "Questions?" contact (becomes a `mailto:` link) |
| `venues.ceremony` / `venues.reception` | Venue `name`, `address`, and `mapsQuery` (builds the Google Maps link) |

Elements in `index.html` carry `data-config="path.to.value"` attributes; on load,
`main.js` copies the CONFIG values into them. The HTML also contains sensible
fallback text, so the page still reads correctly if JavaScript is disabled.

Body copy (Our Story paragraphs, itinerary descriptions, FAQ answers) lives
directly in `index.html` — search for the word **"Placeholder"** to find every
spot meant to be rewritten.

## Theme / palette

The color palette (blush pink + sage green) and core components are **locked** in
`css/styles.css` as CSS variables. Reuse the existing classes (`.btn`, `.card`,
`.timeline`, `.faq`, etc.). If you add styles, keep using the variables
(`var(--sage-400)`, `var(--blush-300)`, …) — don't introduce new colors.

Fonts (Cormorant Garamond + Inter) load via Google Fonts `<link>` tags in
`index.html`.

## Preview locally

Just open `index.html` in a browser — it works straight from the file system.
For a closer-to-production preview (and so relative paths behave identically),
serve the folder:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, pick
   your branch (e.g. `main`) and folder **`/ (root)`**, then **Save**.
4. Your site publishes at `https://<user>.github.io/<repo>/` within a minute or two.

All links and asset paths in this project are **relative** (no leading `/`), so
the site works correctly under that `/<repo>/` subpath. The empty **`.nojekyll`**
file ensures GitHub Pages serves every file as-is.

> Social preview: replace `assets/og-image.png` with a real 1200×630 image and,
> if you have a custom domain, consider switching the `og:image` meta tag to an
> absolute URL so link previews render everywhere.

## RSVP — backend TODO

The RSVP form is **stateless by design**: on submit, `js/main.js` calls
`preventDefault()`, validates client-side, and shows a thank-you state. **Nothing
is sent anywhere.** To actually collect responses, wire up a no-code backend
(see the commented `TODO` block in `initRsvp()`):

- **Formspree** — create a form, then set
  `action="https://formspree.io/f/XXXXXXXX" method="post"` on the `<form>` and
  remove the `preventDefault()` (or let Formspree's AJAX handle it).
- **Google Form** — build a Form with matching fields, then point the `action`
  at its `formResponse` URL and map the inputs to the `entry.*` field names.

Until then, treat any "submitted" RSVP as **not recorded**.

## Accessibility & quality notes

- Semantic HTML5, labelled form inputs, `aria` on the mobile nav and FAQ accordion.
- Visible keyboard focus, a skip-to-content link, and `prefers-reduced-motion` support.
- Fully responsive (mobile hamburger nav, fluid type, single-column on small screens).

## Credits

- **Portrait** — the couple's own engagement photo, in two crops. `assets/portrait`
  (square, from a 4480px original) is used on landscape screens, where it bleeds to
  the card's edges; `assets/portrait-tall` (3:4, from a 4480×5974 original) is used
  on portrait screens, where the card fills the phone and the frame is far taller
  than it is wide. Both have `.webp` with a `.jpg` fallback, and the right one is
  picked by a `media="(orientation: portrait)"` `<source>` in the `<picture>`.
  Each is cropped to fill; `object-position` in `.std__photo-img` picks what survives.
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
  3. **Bump the `?v=` on the envelope URLs** in `css/save-the-date.css`, or browsers
     keep painting the old pieces, **and set `--hint-on-env`** in `:root` to suit the
     new lightness (see the note there — it can't be a constant).

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
