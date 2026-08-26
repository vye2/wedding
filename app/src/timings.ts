/* =====================================================================
   The choreography, in one place.

   Opening the envelope is a timed sequence: the flap hinges up, the
   scene holds for a beat, the envelope slides off, the letter is handed
   focus. Half of that is CSS transitions and half is JavaScript waiting
   on them — which is exactly how the old page ended up with 1.7s in the
   stylesheet, 1400 in one setTimeout and an unexplained 2900 in another.
   Nudge the flap and two of those three silently fall out of step.

   So the numbers live here, and BOTH sides read them: App writes them
   onto the scene root as custom properties (see cssTimingVars below) for
   the stylesheets, and useOpenSequence schedules against the same
   values. Retiming the reveal means editing one object.
   ===================================================================== */

import type { CSSVars } from './css-vars'

export const TIMING = {
  /** The flap's 3D swing about its hinge. Slow on purpose — it's the
   *  moment the whole page is built around. */
  flapSwing: 1700,

  /** A beat to take in the open envelope before it leaves. Lands just
   *  after the swing has visually settled (it eases out), so the
   *  envelope reads as fully open before it drops. */
  beatBeforeSlide: 1400,

  /** The envelope pieces sliding straight down and out of frame. */
  envelopeSlide: 1150,

  /** The letter growing from its sandwiched size to full size as the
   *  envelope drops away. Slightly quicker than the slide, so the card
   *  has settled by the time the envelope clears the screen. */
  letterGrow: 1250,

  /** The whole scene fading in once the backdrop has decoded. */
  sceneFade: 600,

  /** A breath after the envelope has cleared before focus moves to the
   *  letter, so a screen-reader user isn't announced into a card that is
   *  still visibly moving. */
  focusSettle: 350,
} as const

/** When the letter should take focus, measured from the tap. Derived,
 *  not written down — this is the old magic 2900. */
export const REVEAL_COMPLETE = TIMING.beatBeforeSlide + TIMING.envelopeSlide + TIMING.focusSettle

/** The same durations as custom properties, for the stylesheets. Applied
 *  to the scene root in App, so every component inherits them.
 *
 *  There are deliberately NO fallbacks in the CSS (`var(--dur-flap)`,
 *  not `var(--dur-flap, 1700ms)`) — a fallback would be a second copy of
 *  the number, which is the thing this module exists to prevent. */
export const cssTimingVars: CSSVars = {
  '--dur-flap': `${TIMING.flapSwing}ms`,
  '--dur-slide': `${TIMING.envelopeSlide}ms`,
  '--dur-grow': `${TIMING.letterGrow}ms`,
  '--dur-fade': `${TIMING.sceneFade}ms`,
}
