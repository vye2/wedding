import { Gifts } from './components/Gifts'
import { GoodToKnow } from './components/GoodToKnow'
import { Hero } from './components/Hero'
import { PhotoBand } from './components/PhotoBand'
import { QandA } from './components/QandA'
import { SiteFooter } from './components/SiteFooter'
import { TheDay } from './components/TheDay'
import { TopNav } from './components/TopNav'
import { Travel } from './components/Travel'
import { Wear } from './components/Wear'
import { useReveal } from './useReveal'
import s from './Home.module.css'

/* =====================================================================
   Ashley & Victor — the main page.

   ORDER IS THE ARGUMENT. A guest arrives wanting to know where to be and
   what to wear, so the logistics come first and are done by the halfway
   mark. Only then does the page ask for their attention rather than
   giving them something: the Q&A is the reward for having read the
   practical part, not the toll before it.

   The through-line is a red thread — the one that ties two people who
   are meant to meet. It knots under the names, runs down the spine of
   the day, becomes the line between Ashley's answers and Victor's, and
   is tied off in the footer. See --thread in tokens.css for why this is
   the one colour outside the locked palette.
   ===================================================================== */
export function Home() {
  useReveal()

  return (
    <div className={s.page} id="top">
      <a className={s.skip} href="#day">Skip to the wedding details</a>

      <TopNav />

      <main>
        <Hero />
        <TheDay />
        <PhotoBand />
        <Wear />
        <Travel />
        <QandA />
        <GoodToKnow />
        <Gifts />
      </main>

      <SiteFooter />
    </div>
  )
}
