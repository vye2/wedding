import { DAY } from '../content'
import { SectionHead } from './SectionHead'
import s from './TheDay.module.css'

/* =====================================================================
   THE DAY — organised by PLACE, not by a bare list of times.

   A guest's real question isn't "what happens at 1pm", it's "where am I
   meant to be, and when". So the place is the heading and the time is
   the label under it. The three movements are also the three traditions
   the day passes through, which is the thing that makes this wedding
   this wedding.

   Cards alternate sides of the thread on a wide screen — the day
   travelling down the line — and stack beside it on a phone.
   ===================================================================== */
export function TheDay() {
  return (
    <section className={s.section} id="day" aria-labelledby="day-title" data-thread>
      <div className="wrap">
        <SectionHead eyebrow={DAY.eyebrow} title={DAY.title} titleId="day-title" intro={DAY.intro} />

        <ol className={s.list}>
          {DAY.movements.map((m) => (
            <li className={s.item} key={m.place} data-reveal>
              <span className={s.knot} aria-hidden="true" />

              <article className={s.card}>
                <p className={s.place}>{m.place}</p>

                <p className={s.time}>
                  <span className={s.timeMain}>{m.time}</span>
                  {m.timeNote ? <span className={s.timeNote}>{m.timeNote}</span> : null}
                </p>

                <h3 className={s.title}>{m.title}</h3>
                <p className={s.who}>{m.who}</p>
                <p className={s.body}>{m.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
