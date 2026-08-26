import { useRef } from 'react'
import type { SaveTheDateConfig } from '../config'
import { useLetterFit } from '../hooks/useLetterFit'
import { useOpenSequence } from '../hooks/useOpenSequence'
import { Envelope } from './Envelope'
import { Letter } from './Letter'
import s from './Opener.module.css'

export interface OpenerProps {
  config: SaveTheDateConfig
  /** The backdrop has decoded — safe to show the scene. */
  ready: boolean
  reduceMotion: boolean
}

/* =====================================================================
   THE OPENER — the one screen. Holds the full-bleed envelope and the
   letter inside it, and owns the reveal.

   It also owns the one measurement that spans both: useLetterFit needs
   the stage's height (Envelope) and the card's height (Letter) together
   to work out how small the card must be held to stay hidden inside the
   sealed pocket. This is the only place that has both refs, which is why
   it lives here rather than in either component.
   ===================================================================== */
export function Opener({ config, ready, reduceMotion }: OpenerProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLElement>(null)

  const { isOpen, isSliding, open } = useOpenSequence(letterRef, reduceMotion)
  useLetterFit(stageRef, letterRef)

  const from = `${config.couple.partnerA} and ${config.couple.partnerB}`

  return (
    <section className={s.opener} data-ready={ready}>
      {/* Opening the envelope is what gets you to the card, so the skip
          link does that too — otherwise it drops a keyboard guest onto a
          letter that is still sealed inside the pocket. */}
      <a className={s.skipLink} href="#std-main" onClick={open}>
        Skip to the details
      </a>

      <Envelope
        isOpen={isOpen}
        isSliding={isSliding}
        onOpen={open}
        from={from}
        stageRef={stageRef}
      >
        <Letter config={config} revealed={isSliding} ref={letterRef} />
      </Envelope>

      <p className={s.hint} data-hidden={isOpen}>
        <span className={s.hintText}>Tap to open</span>
      </p>
    </section>
  )
}
