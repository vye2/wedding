import { useEffect, useState } from 'react'
import { FOOTER, NAV, NAMES } from '../content'
import s from './TopNav.module.css'

/* A quiet bar that only asserts itself once you've left the hero.

   The labels are the same words as the section eyebrows, so clicking
   "What to wear" lands on something headed "What to wear". No scroll-spy
   highlighting: on a page this short it's a lot of machinery to tell
   someone what they can already see. */
export function TopNav() {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={s.nav} data-lifted={lifted} aria-label="Sections of this page">
      <div className={s.inner}>
        <a className={s.mark} href="#top">
          {NAMES.first} <span aria-hidden="true">&amp;</span> {NAMES.second}
        </a>

        <ul className={s.links}>
          {NAV.map((item) => (
            <li key={item.id}>
              <a className={s.link} href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>

        <a className={s.aside} href={FOOTER.stdHref}>{FOOTER.stdLabel}</a>
      </div>
    </nav>
  )
}
