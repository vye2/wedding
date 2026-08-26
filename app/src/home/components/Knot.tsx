import s from './Knot.module.css'

export interface KnotProps {
  /** Draw it on load. The footer's copy is already tied. */
  animate?: boolean
  /** `undefined` is spelled out because exactOptionalPropertyTypes is on,
   *  and a CSS Module lookup is always `string | undefined`. */
  className?: string | undefined
}

/* =====================================================================
   THE KNOT — the page's one orchestrated moment.

   A bow: one unbroken line that leaves the centre, sweeps out into a
   loop, comes back through the middle, and does the same on the other
   side. Two loops for two people, mirrored exactly, because neither of
   them is the accessory.

   TWO EARLIER VERSIONS ARE WORTH KNOWING ABOUT, because both failed in
   ways that look fine in code and wrong on screen:

   1. Long horizontal tails running out to both edges read as a
      calligraphic flourish — a swash under the names, not a knot.
   2. Removing the tails entirely left two flat lobes meeting in the
      middle, which is an infinity symbol. On a wedding page that is the
      most tired mark there is.

   What makes it a bow rather than either of those is the ANGLE: the
   loops rise away from the centre instead of lying flat, and two loose
   ends fall from the middle. The path is written in the order you would
   actually tie it — up the left tail, round the left loop, round the
   right loop, out along the right tail — with every segment starting
   where the last one ended, so it is one unbroken thread and the
   draw-on animation ties it in one motion.

   pathLength="1" normalises the geometry so the draw-on can be written
   as dashoffset 1 → 0 in CSS, with no JavaScript measuring anything.
   ===================================================================== */
export function Knot({ animate = false, className }: KnotProps) {
  return (
    <svg
      className={[s.knot, animate ? s.draw : null, className].filter(Boolean).join(' ')}
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={s.thread}
        pathLength="1"
        /* The two tails end at slightly different heights on purpose. A
           bow tied by hand is never symmetric, and the perfectly mirrored
           version read as a stamped ornament. */
        d="M 60 104
           C 80 88, 92 72, 100 52
           C 74 22, 32 10, 19 29
           C 6 49, 52 68, 100 52
           C 126 22, 168 10, 181 29
           C 194 49, 148 68, 100 52
           C 108 70, 120 84, 140 97"
      />
    </svg>
  )
}
