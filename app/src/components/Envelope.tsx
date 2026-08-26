import type { ReactNode, Ref } from 'react'
import s from './Envelope.module.css'

export interface EnvelopeProps {
  /** The flap is up. */
  isOpen: boolean
  /** The envelope is sliding down out of frame. */
  isSliding: boolean
  onOpen: () => void
  /** Who it's from — used for the control's accessible name. */
  from: string
  stageRef: Ref<HTMLDivElement>
  /** The letter. Rendered BETWEEN the back and the front pocket, which is
   *  where it physically is. */
  children: ReactNode
}

/* =====================================================================
   THE ENVELOPE — the couple's own artwork, in three layered pieces
   (back / front / flap) sharing one 938×1048 coordinate space so they
   stack exactly. Sized FULL BLEED so its body covers the screen.

   The letter is passed in as children rather than rendered here, and it
   is placed between the two pocket layers. That's not a code nicety: the
   z-order of these three elements IS the physical sandwich, and writing
   it as JSX in the same order makes the relationship visible instead of
   leaving it implied by z-index numbers in a stylesheet.

   Open state travels as data attributes on the stage, so every rule that
   depends on it lives in this component's own stylesheet. (The old page
   hung `is-open`/`is-sliding` on the full-screen .opener, which meant the
   envelope's transitions were written in terms of an element three
   components away.)
   ===================================================================== */
export function Envelope({ isOpen, isSliding, onOpen, from, stageRef, children }: EnvelopeProps) {
  return (
    <div
      ref={stageRef}
      className={s.stage}
      data-open={isOpen}
      data-sliding={isSliding}
      role="group"
      aria-label={`A sealed envelope from ${from}`}
    >
      {/* Back of the envelope pocket (solid) */}
      <div className={s.back} aria-hidden="true" />

      {children}

      {/* Front of the pocket — covers the letter's lower half */}
      <div className={s.front} aria-hidden="true" />

      {/* The flap: shown flipped DOWN over the pocket (closed); rotates up
          about its hinge to open. One image serves both faces. */}
      <div className={s.flap} aria-hidden="true" />

      {/* Soft glow — the 'open here' cue (no wax seal) */}
      <span className={s.glow} aria-hidden="true" />

      {/* The whole envelope is the control — a generous, obvious hit area,
          and the keyboard and screen-reader way in. Once it's been used it
          goes inert, so it neither takes focus nor swallows taps meant for
          the card underneath. */}
      <button
        className={s.openBtn}
        type="button"
        onClick={onOpen}
        inert={isOpen}
        aria-label={`Open the envelope from ${from}`}
      />
    </div>
  )
}
