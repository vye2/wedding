import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { REVEAL_COMPLETE, TIMING } from '../timings'

/** Where the envelope is in the reveal.
 *  - `sealed`    — flap folded down over the pocket, waiting for a tap
 *  - `opening`   — flap hinging up; the letter's top edge is glimpsed
 *  - `revealing` — the whole envelope sliding down off the letter */
export type OpenPhase = 'sealed' | 'opening' | 'revealing'

export interface OpenSequence {
  phase: OpenPhase
  /** The flap is up. */
  isOpen: boolean
  /** The envelope is leaving, and the letter is growing to full size. */
  isSliding: boolean
  /** Tap the envelope. Safe to call again — the sequence runs once. */
  open: () => void
}

/**
 * The reveal, as a small state machine.
 *
 * Reduced motion skips it entirely: the envelope is sent away at once so
 * the letter (already sandwiched inside) is simply present. Focus is not
 * moved in that case — there was no animation to wait through, and
 * yanking focus on load is its own kind of rude.
 */
export function useOpenSequence(
  letterRef: RefObject<HTMLElement | null>,
  reduceMotion: boolean,
): OpenSequence {
  const [phase, setPhase] = useState<OpenPhase>('sealed')

  // The sequence runs exactly once. A ref, not the phase, because the
  // guard has to hold the instant the envelope is tapped — a second tap
  // in the same frame would otherwise see the old phase and re-schedule.
  const started = useRef(false)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  useEffect(() => {
    if (!reduceMotion) return
    // Present the card outright — including mid-sequence, if the guest
    // turns the preference on while the flap is still swinging.
    clearTimers()
    started.current = true
    setPhase('revealing')
  }, [reduceMotion, clearTimers])

  const open = useCallback(() => {
    if (started.current) return
    started.current = true

    if (reduceMotion) {
      setPhase('revealing')
      return
    }

    // 1) The flap hinges open in 3D, revealing the letter tucked inside.
    //    That swing is the stylesheet's; here we only wait it out.
    setPhase('opening')

    // 2) A beat to take in the open envelope, then the whole thing slides
    //    straight down and out of frame, uncovering the letter.
    timers.current.push(
      window.setTimeout(() => setPhase('revealing'), TIMING.beatBeforeSlide),
    )

    // 3) The envelope has cleared the frame and the letter stands alone.
    //    Hand it focus, so a keyboard or screen-reader guest lands on the
    //    card rather than on the control that just went away.
    timers.current.push(
      window.setTimeout(() => {
        const letter = letterRef.current
        if (!letter) return
        letter.setAttribute('tabindex', '-1')
        letter.focus({ preventScroll: true })
      }, REVEAL_COMPLETE),
    )
  }, [letterRef, reduceMotion])

  return {
    phase,
    isOpen: phase !== 'sealed',
    isSliding: phase === 'revealing',
    open,
  }
}
