import { CONFIG } from '../../config'
import { DATE_LINE, FOOTER, NAMES } from '../content'
import { Knot } from './Knot'
import s from './SiteFooter.module.css'

/* Where the thread ends — tied, this time without the animation. The
   footer deliberately does NOT carry `data-thread`: the line stops at
   the knot, which is the whole point of the metaphor. */
export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.inner}`}>
        <Knot className={s.knot} />

        <p className={s.names}>
          {NAMES.first} <span className={s.amp}>&amp;</span> {NAMES.second}
        </p>

        <p className={s.date}>{DATE_LINE}</p>

        <p className={s.note}>{FOOTER.note}</p>

        <p className={s.tag}>{CONFIG.hashtag}</p>

        <a className={s.link} href={FOOTER.stdHref}>{FOOTER.stdLabel}</a>
      </div>
    </footer>
  )
}
