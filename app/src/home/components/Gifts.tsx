import { GIFTS } from '../content'
import s from './Gifts.module.css'

/* Short, and in the couple's own voice — which is why it's serif and
   why it doesn't get an eyebrow or a rule. A registry section that
   reads like the rest of the logistics makes the ask feel transactional. */
export function Gifts() {
  return (
    <section className={s.section} aria-labelledby="gifts-title" data-thread>
      <div className="wrap">
        <div className={s.block} data-reveal>
          <p className={s.eyebrow}>{GIFTS.eyebrow}</p>
          <h2 className={s.title} id="gifts-title">{GIFTS.title}</h2>
          <p className={s.body}>{GIFTS.body}</p>
          {/* Not a link yet, and it doesn't pretend to be one — a
              disabled-looking anchor that goes nowhere is worse than a
              plain statement that the link is coming. */}
          <p className={s.pending}>{GIFTS.linkLabel}</p>
        </div>
      </div>
    </section>
  )
}
