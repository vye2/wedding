/* =====================================================================
   Every word on the main page, in one file.

   ALL OF IT IS PLACEHOLDER. The relationship in the Q&A is invented, the
   times are close but unconfirmed, and the venues aren't named yet. The
   page says so where a guest could be misled — see qa.note and the
   footer — so nothing here reads as fact before it is one.

   The date is NOT repeated here. It comes from config.ts, the same
   source the save-the-date's countdown uses, and is formatted for
   display — so the two pages can't disagree about when the wedding is.
   ===================================================================== */

import { CONFIG, weddingDateParts } from '../config'

/* NOTE ON NAME ORDER: this page reads "Ashley & Victor" and the
   save-the-date reads "Victor & Ashley". That mismatch predates the
   rewrite — it was already the difference between index.html's <title>
   and the card's. Kept as found rather than silently picked; set both
   from here and config.ts when you decide which way round it goes. */
export const NAMES = { first: 'Ashley', second: 'Victor' } as const

const parts = weddingDateParts(CONFIG.weddingDate)

/** "Saturday · May 15 · 2027" — the hero's eyebrow. */
export const DATE_LINE = parts
  ? `${parts.weekday} · ${parts.month} ${parts.day} · ${parts.year}`
  : 'Date to be confirmed'

export interface NavItem {
  id: string
  label: string
}

export const NAV: NavItem[] = [
  { id: 'day', label: 'The day' },
  { id: 'wear', label: 'What to wear' },
  { id: 'travel', label: 'Getting there' },
  { id: 'qa', label: 'Q&A' },
  { id: 'know', label: 'Good to know' },
]

export const HERO = {
  /* The thesis, not a welcome message. A guest who reads only this line
     should already know the shape of the day. */
  line: 'Tea at the house in the morning, vows at one, and a banquet that runs late.',
  sub: 'Everything you need is below.',
}

export interface Movement {
  /** The place is the heading, because place is what a guest needs. */
  place: string
  time: string
  timeNote?: string
  title: string
  who: string
  body: string
}

export const DAY = {
  eyebrow: 'The day',
  title: 'It moves three times',
  intro:
    'All of it is in the Bay Area, and all of it is on the Saturday. Times are close to final; the venues are still being confirmed.',
  movements: [
    {
      place: 'At the house',
      time: '10:00 AM',
      title: 'The tea ceremony',
      who: 'Family and wedding party',
      body:
        'We serve tea to our parents and grandparents in order of seniority, and they give us their blessing. It is short, it is the part we will both cry at, and there is a great deal of bowing. Hold the cup with both hands and you will be fine.',
    },
    {
      place: 'At the church',
      time: '1:00 PM',
      timeNote: 'doors at 12:30',
      title: 'The ceremony',
      who: 'Everyone',
      body:
        'Please be in a seat by 12:45. We are starting on time, which will surprise both our families. About forty-five minutes, then photographs while everyone finds the bar.',
    },
    {
      place: 'At the banquet',
      time: '5:30 PM',
      timeNote: 'dinner called at 6:30',
      title: 'Cocktails, then dinner',
      who: 'Everyone',
      body:
        'Drinks and something to eat from half past five. Then ten courses, a great many toasts, and dancing until they turn the lights on. We intend to be the last ones out.',
    },
  ] satisfies Movement[],
}

export interface PhotoSlot {
  /** When absent, the frame renders as a labelled placeholder. */
  src?: { webp: string; jpg: string }
  alt?: string
  caption: string
}

export const PHOTOS: PhotoSlot[] = [
  { caption: 'The tea set — photo to come' },
  {
    src: { webp: '/assets/portrait.webp?v=1', jpg: '/assets/portrait.jpg?v=1' },
    alt: 'Ashley and Victor, arms wrapped together, her engagement ring on show',
    caption: 'The one that started all this',
  },
  { caption: 'The banquet hall — photo to come' },
]

export const WEAR = {
  eyebrow: 'What to wear',
  title: 'Garden formal',
  intro:
    'Long dresses or a good suit. Soft colours suit both the day and the photographs — sage, blush, dusty blue, cream.',
  /* Four notes, each of which is a real thing a guest at THIS wedding
     would otherwise get wrong. Generic dress-code copy is the thing to
     avoid here. */
  notes: [
    'Please skip white and ivory. That one is Ashley’s.',
    'If you can, avoid head-to-toe black. At a Chinese banquet it reads as mourning, and our grandmothers will notice.',
    'There is grass between the car park and the church. Heels are survivable; a flat pair for the dancing is wiser.',
    'May here is warm by day and properly cold the moment the sun goes down. Bring a layer you are happy to be photographed in.',
  ],
}

export interface TravelItem {
  label: string
  title: string
  body: string
}

export const TRAVEL = {
  eyebrow: 'Getting there',
  title: 'Flying, staying, parking',
  intro: 'Most of the detail below is still being confirmed. It will be filled in here first.',
  items: [
    {
      label: 'Flying in',
      title: 'SFO, OAK or SJC',
      body:
        'All three airports work. Oakland is usually the shortest drive and the cheapest cab; San Francisco has the most flights. Give yourself an hour from any of them on a Saturday.',
    },
    {
      label: 'Staying',
      title: 'Hotel block — to be confirmed',
      body:
        'We are holding rooms at a hotel near the banquet and will put the booking link and the cut-off date here as soon as it is signed. If you would rather book your own, anywhere central will do.',
    },
    {
      label: 'Getting between',
      title: 'Parking and the shuttle',
      body:
        'There will be a shuttle between the church and the banquet so nobody has to think about driving after the toasts. Parking at both venues is to be confirmed.',
    },
  ] satisfies TravelItem[],
}

export interface Question {
  q: string
  /** Answered separately, on purpose. They do not always match. */
  first: string
  second: string
}

export const QA = {
  eyebrow: 'Q&A',
  title: 'We answered these separately',
  note:
    'The answers below are placeholders — the real ones are still being written.',
  questions: [
    {
      q: 'How did you two actually meet?',
      first:
        'A friend’s birthday in Oakland. He spent twenty minutes explaining a board game nobody wanted to play, and I thought: well, he commits.',
      second:
        'She says Oakland. It was Berkeley. I remember because I rehearsed what I was going to say on the walk over and then said none of it.',
    },
    {
      q: 'What was your first impression?',
      first:
        'Kind, and far too confident about a restaurant recommendation that turned out to have closed in 2019.',
      second:
        'That she laughed at something I said before I had finished saying it. I have been chasing that ever since.',
    },
    {
      q: 'Who said it first?',
      first: 'Me. In a car park. It was not planned and I would do it again.',
      second:
        'She did, and I said “thank you.” I will be hearing about that during the toasts.',
    },
    {
      q: 'What was the first thing you cooked together?',
      first:
        'Bún bò Huế, from my mum’s instructions down the phone, which were mostly “you’ll know.”',
      second:
        'It took five hours and it is the best thing I have ever eaten. I have not been allowed to attempt it alone since.',
    },
    {
      q: 'Tell us about the proposal.',
      first:
        'He carried the ring around for nine days waiting for the right moment. There wasn’t one, so he made one, on an ordinary Tuesday, at home.',
      second:
        'There was a plan. It involved a viewpoint and a sunset. I got four days in and asked her in the kitchen instead.',
    },
    {
      q: 'Who is the better cook?',
      first: 'Me.',
      second: 'Her. It is not close. I am the better washer-up, which is a real job.',
    },
    {
      q: 'What do you argue about most?',
      first:
        'The thermostat, and whether a given object is rubbish or “might be useful.”',
      second: 'The thermostat. There is no second thing.',
    },
    {
      q: 'What are you most looking forward to?',
      first:
        'Standing in one room with every person who got us here. That has never once happened.',
      second: 'The tea ceremony. My grandmother has been waiting a very long time.',
    },
  ] satisfies Question[],
}

export interface Faq {
  q: string
  a: string
}

export const KNOW = {
  eyebrow: 'Good to know',
  title: 'The practical answers',
  items: [
    {
      q: 'How do we RSVP?',
      a: 'By the card in your invitation. There is no form on this site — write on the card and put it back in the post. The reply-by date is on the card.',
    },
    {
      q: 'Can I bring someone?',
      a: 'Your invitation names everyone we have saved a seat for. We would happily invite the whole Bay Area, but the room has a number and we have reached it.',
    },
    {
      q: 'Are children welcome?',
      a: 'Yes, and there will be somewhere for them to nap through the toasts. Tell us on your card if you are bringing them so we can seat you near a door.',
    },
    {
      q: 'What time should I actually arrive?',
      a: 'Half past twelve for the church. Seated by a quarter to one means you see the whole thing rather than the back of it.',
    },
    {
      q: 'Am I invited to the tea ceremony?',
      a: 'It is family and wedding party only — it happens at the house and there is not room for everyone. Your invitation will say. Nobody is missing the main event.',
    },
    {
      q: 'Where do I park?',
      a: 'To be confirmed at both venues, and it will be posted here first. There will be a shuttle between the church and the banquet either way.',
    },
    {
      q: 'I have a dietary restriction.',
      a: 'Note it on your RSVP card. The banquet will have vegetarian and gluten-free courses, and we would rather ask you than guess.',
    },
    {
      q: 'Can I post photos?',
      a: 'Please do, after the ceremony — tag them ' + CONFIG.hashtag + '. During the vows we would love every phone in a pocket.',
    },
    {
      q: 'What is the weather like in May?',
      a: 'Warm in the afternoon and properly cold once the sun goes. Everyone who has not lived here gets this wrong exactly once.',
    },
  ] satisfies Faq[],
}

export const GIFTS = {
  eyebrow: 'Gifts',
  title: 'Genuinely, you being there is the thing',
  body:
    'A lot of you are flying a long way to stand in that room, and that is the gift. If you would like to do something more, there is a small registry, and a red envelope is traditional in both our families. Neither is expected.',
  linkLabel: 'The registry — link to come',
}

export const FOOTER = {
  note: 'Details are still being confirmed. This page is where they will appear first.',
  stdLabel: 'See the save-the-date',
  stdHref: '/save-the-date.html',
}
