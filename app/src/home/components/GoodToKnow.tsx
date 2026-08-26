import { KNOW } from '../content'
import { SectionHead } from './SectionHead'
import s from './GoodToKnow.module.css'

/* =====================================================================
   THE PRACTICAL FAQ — deliberately the opposite of the Q&A above it.

   Native <details>/<summary>, so it works before the JavaScript loads,
   opens with a keyboard for free, and is findable by the browser's own
   find-in-page in supporting engines. Answers are set in the utility
   face: this is the section people scan for a fact, not one they read.
   ===================================================================== */
export function GoodToKnow() {
  return (
    <section className={s.section} id="know" aria-labelledby="know-title" data-thread>
      <div className="wrap">
        <SectionHead eyebrow={KNOW.eyebrow} title={KNOW.title} titleId="know-title" />

        <div className={s.list} data-reveal>
          {KNOW.items.map((item) => (
            <details className={s.item} key={item.q}>
              <summary className={s.q}>
                <span className={s.qText}>{item.q}</span>
                <span className={s.mark} aria-hidden="true" />
              </summary>
              <p className={s.a}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
