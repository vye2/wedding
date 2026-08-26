import { useEffect } from 'react'
import { CONFIG, coupleLine } from './config'
import { cssTimingVars } from './timings'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSceneReady } from './hooks/useSceneReady'
import { Opener } from './components/Opener'
import { Petals } from './components/Petals'
import s from './App.module.css'

/* =====================================================================
   Victor & Ashley — Save the Date.

   ONE non-scrolling screen: the couple's envelope, sized full bleed so
   its body covers the viewport. The flap flips up and out of view, the
   letter sits sandwiched between back and front, then the envelope
   slides away to reveal the card — which carries a single framed
   portrait of the couple.

   App holds only what the whole scene shares: the reveal's timings, the
   motion preference, and the gate that waits for the backdrop. The
   reveal itself belongs to Opener.
   ===================================================================== */
export function App() {
  const reduceMotion = usePrefersReducedMotion()
  const ready = useSceneReady()

  // Keep the tab title tidy if the names ever change. app/index.html
  // carries the same string literally, for crawlers and link previews
  // that read the HTML before any script runs — change both together.
  useEffect(() => {
    document.title = `${coupleLine(CONFIG)} · Save the Date`
  }, [])

  return (
    <div className={s.scene} style={cssTimingVars}>
      {/* Drifting petals, in front of the envelope. Reduced motion
          doesn't render them at all — there's nothing to hide, and
          nothing left animating off-screen. */}
      {!reduceMotion && <Petals ready={ready} />}

      <Opener config={CONFIG} ready={ready} reduceMotion={reduceMotion} />
    </div>
  )
}
