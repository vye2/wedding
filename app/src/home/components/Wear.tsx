import { WEAR } from '../content'
import { SectionHead } from './SectionHead'
import s from './Wear.module.css'

/* Dress code is the single thing guests look for most, so it gets its
   own section rather than a line in the FAQ. The notes are the useful
   part: not "garden formal" restated, but the four specific things a
   guest at THIS wedding would otherwise get wrong. */
export function Wear() {
  return (
    <section className={s.section} id="wear" aria-labelledby="wear-title" data-thread>
      <div className="wrap">
        <SectionHead
          eyebrow={WEAR.eyebrow}
          title={WEAR.title}
          titleId="wear-title"
          intro={WEAR.intro}
        />

        <ul className={s.notes} data-reveal>
          {WEAR.notes.map((note) => (
            <li className={s.note} key={note}>
              <span className={s.tick} aria-hidden="true" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
