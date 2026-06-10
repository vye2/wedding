# Victor &amp; Ashley — Wedding Website

A bespoke, single-page **static** wedding website (plain HTML, CSS, and vanilla
JS — no framework, no build step, no backend). Designed to look like fine
wedding stationery and to be hosted for free on **GitHub Pages**.

> ⚠️ Demo content only. The date and venues are **placeholders (TBD)**, and the
> RSVP form intentionally **posts nowhere**. No real guest data, emails, or
> phone numbers are included.

## What's here

```
.
├── index.html        # The whole single page (Hero, Story, Details, Locations, RSVP, FAQ, Footer)
├── css/styles.css    # LOCKED sage + blush theme (CSS variables + components). Extend, don't rewrite.
├── js/main.js        # CONFIG object + nav toggle, countdown, scroll reveal, FAQ accordion, RSVP handler
├── assets/
│   ├── favicon.svg   # "V&A" monogram, on-palette
│   └── og-image.png  # (optional) add your own 1200×630 social preview image
├── README.md         # this file
└── .nojekyll         # tells GitHub Pages to serve files as-is (no Jekyll processing)
```

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

---

Made with love for family &amp; friends. 🌿
