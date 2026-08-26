import { useEffect, type RefObject } from 'react'

/* How small the card is held while sandwiched inside the envelope. Two
   things decide it:

   1. It MUST fit the band the flap and front cover (~52% of the stage),
      or it pokes out past the sealed envelope.
   2. It should be visibly smaller than its revealed size, so the reveal
      has that growth to it rather than the card simply appearing at full
      size.

   Rule 1 alone isn't enough for rule 2. On a portrait screen the
   envelope AND the card are both sized from viewport height, so the
   ratio between them is fixed — the first rule lands on 0.93 on every
   phone regardless of its size, which is a 7% growth: real, but too
   small to read as anything. Landscape doesn't have the problem (the
   card is far taller than the band there, so it lands near 0.6).

   Hence the ceiling: hold the card at 0.85 even when it would be free to
   sit larger. It's still comfortably inside the covered band, and the
   reveal gains a ~18% growth on phones. */
const SEALED_MAX = 0.85

/** The share of the stage's height that the flap and front pocket cover. */
const COVERED_BAND = 0.52

/**
 * Keep the sandwiched letter scaled to fit inside the sealed envelope.
 *
 * This is the one measurement that crosses a component boundary — it
 * needs the stage (Envelope) and the card (Letter) together — so it's
 * owned by Opener, which holds both refs.
 *
 * The result is written straight onto the node as `--fit` rather than
 * held in state. That's deliberate: this re-runs on every resize frame
 * and on every font swap, and routing a pure layout measurement through
 * a render would repaint the whole scene at 60fps to move one number.
 * Nothing else writes `--fit`, so there's no contention with React.
 */
export function useLetterFit(
  stageRef: RefObject<HTMLElement | null>,
  letterRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const stage = stageRef.current
    const letter = letterRef.current
    if (!stage || !letter) return

    const measure = () => {
      const coverable = stage.offsetHeight * COVERED_BAND
      // Layout height — unaffected by the scale transform we're setting.
      const natural = letter.offsetHeight
      const fit = natural > 0 ? Math.min(SEALED_MAX, coverable / natural) : SEALED_MAX
      letter.style.setProperty('--fit', fit.toFixed(3))
    }

    measure()

    // A ResizeObserver rather than a window resize listener: it also
    // catches the card growing when the web fonts swap in, which the old
    // page had to chase with a separate document.fonts.ready callback.
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(letter)

    return () => observer.disconnect()
  }, [stageRef, letterRef])
}
