import { DATE_LINE, HERO, NAMES } from '../content'
import { Knot } from './Knot'
import s from './Hero.module.css'

/* =====================================================================
   THE HERO — typographic, not photographic.

   The save-the-date already delivers the photograph and the countdown;
   repeating either here would be a rerun. What this page opens with
   instead is the shape of the day, in one sentence, under the knot being
   tied. A guest who reads nothing else knows there are three parts to
   the Saturday.
   ===================================================================== */
export function Hero() {
  return (
    <header className={s.hero} data-thread>
      <div className={`wrap ${s.inner}`}>
        <p className={s.date}>{DATE_LINE}</p>

        <h1 className={s.names}>
          {NAMES.first}
          <span className={s.amp}>&amp;</span>
          {NAMES.second}
        </h1>

        <Knot animate className={s.knotMark} />

        <p className={s.line}>{HERO.line}</p>
        <p className={s.sub}>{HERO.sub}</p>
      </div>
    </header>
  )
}
