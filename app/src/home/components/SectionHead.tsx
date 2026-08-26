import type { ReactNode } from 'react'
import s from './SectionHead.module.css'

export interface SectionHeadProps {
  eyebrow: string
  title: string
  /** The id the heading labels, so each section can be announced by name. */
  titleId: string
  intro?: ReactNode
}

/* The eyebrow is a label, not decoration — it repeats the nav's wording
   exactly, so a guest who clicked "What to wear" lands on something that
   says "What to wear". That is the whole job. It is deliberately not a
   number: only the schedule is a sequence, and the schedule already has
   real times to count by. */
export function SectionHead({ eyebrow, title, titleId, intro }: SectionHeadProps) {
  return (
    <div className={s.head} data-reveal>
      <p className={s.eyebrow}>{eyebrow}</p>
      <h2 className={s.title} id={titleId}>{title}</h2>
      {intro ? <p className={s.intro}>{intro}</p> : null}
    </div>
  )
}
