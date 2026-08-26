/* =====================================================================
   The one place to edit guest-facing content on the save-the-date.

   Everything the card says is derived from here — including the date
   LINE itself. That's the point: the old page carried the date twice,
   once as prose in the HTML ("Saturday, May 15th, 2027") and once as an
   ISO string driving the countdown. Change one and the card quietly
   contradicts its own timer. Now the prose is formatted from the ISO
   value, so there is nothing to keep in step.

   NOT derived from here: the <title>, <meta> and Open Graph tags in
   app/index.html. Crawlers and link previews read the HTML before any
   script runs, so those have to be literal text. If you change the names
   or the date, change them there too.
   ===================================================================== */

export interface SaveTheDateConfig {
  couple: { partnerA: string; partnerB: string }

  /** The wedding day. ISO 8601, LOCAL time — drives the live countdown
   *  and the printed date line. */
  weddingDate: string

  region: string
  hashtag: string

  /** The engagement portrait — the hero of the card. Portrait screens get
   *  the tall crop (the card fills a phone there, so the square version
   *  would lose its top and bottom); everything else gets the square. */
  portrait: {
    wide: { webp: string; jpg: string }
    tall: { webp: string; jpg: string }
    alt: string
  }

  /** The line under the countdown. */
  followUp: string

  /** Shown in place of the countdown once the day arrives. */
  dayOfMessage: string
}

export const CONFIG: SaveTheDateConfig = {
  couple: { partnerA: 'Victor', partnerB: 'Ashley' },

  weddingDate: '2027-05-15T15:00:00',

  region: 'San Francisco Bay Area',
  hashtag: '#HappilyEverHuynh',

  portrait: {
    wide: { webp: '/assets/portrait.webp?v=1', jpg: '/assets/portrait.jpg?v=1' },
    tall: { webp: '/assets/portrait-tall.webp?v=1', jpg: '/assets/portrait-tall.jpg?v=1' },
    alt: 'Victor and Ashley, arms wrapped together, her engagement ring on show',
  },

  followUp: 'Formal invitation to follow',

  dayOfMessage: 'Today is the day — with all our love, thank you for celebrating with us. 🌿',
}

/** "Victor & Ashley" — used for the document title. */
export function coupleLine(config: SaveTheDateConfig = CONFIG): string {
  return `${config.couple.partnerA} & ${config.couple.partnerB}`
}

export interface WeddingDateParts {
  weekday: string
  month: string
  /** The day of the month, unpadded. */
  day: string
  /** "st" / "nd" / "rd" / "th" — set as a superscript on the card. */
  ordinal: string
  year: string
}

/** Break the ISO wedding date into the pieces the card sets by hand, so
 *  the printed line can never drift from the countdown's target. */
export function weddingDateParts(iso: string): WeddingDateParts | null {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null

  const day = date.getDate()
  return {
    weekday: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date),
    month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
    day: String(day),
    ordinal: ordinalSuffix(day),
    year: String(date.getFullYear()),
  }
}

/** 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st, 22nd, 23rd. The teens
 *  are the exception every naive version gets wrong. */
function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}
