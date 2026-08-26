import { TRAVEL } from '../content'
import { SectionHead } from './SectionHead'
import s from './Travel.module.css'

/* Three practical cards. This is logistics, so the answers are set in
   the utility face — the page's rule is that the serif is a voice and
   the sans is information. */
export function Travel() {
  return (
    <section className={s.section} id="travel" aria-labelledby="travel-title" data-thread>
      <div className="wrap">
        <SectionHead
          eyebrow={TRAVEL.eyebrow}
          title={TRAVEL.title}
          titleId="travel-title"
          intro={TRAVEL.intro}
        />

        <div className={s.grid}>
          {TRAVEL.items.map((item) => (
            <article className={s.card} key={item.label} data-reveal>
              <p className={s.label}>{item.label}</p>
              <h3 className={s.title}>{item.title}</h3>
              <p className={s.body}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
