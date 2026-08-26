import { useEffect, useState } from 'react'

/** How long the scene will wait for the backdrop before showing anyway. */
const SAFETY_NET = 3000

/** Resolve once the two things that change what the first painted frame
 *  looks like have settled: the body's floral backdrop has decoded, and
 *  the web fonts are in.
 *
 *  Without this the envelope lands on blank ivory while the picture is
 *  still downloading, and the type reflows under it a moment later. The
 *  timer behind it matters just as much — a slow or failed image must
 *  never be able to leave the page empty. */
export function useSceneReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      setReady(true)
    }

    const timer = window.setTimeout(finish, SAFETY_NET)

    const waits: Promise<unknown>[] = []

    // Read the backdrop URL back off the computed style rather than
    // repeating it here, so this can't drift out of sync with the
    // stylesheet (or its ?v= cache buster).
    const url = backdropUrl()
    if (url) {
      waits.push(
        new Promise<void>((resolve) => {
          const img = new Image()
          // Errors resolve too — a missing backdrop shows the page, it
          // doesn't withhold it.
          img.onload = img.onerror = () => resolve()
          img.src = url
        }),
      )
    }
    if (document.fonts) waits.push(document.fonts.ready)

    if (waits.length === 0) finish()
    else void Promise.all(waits).then(finish, finish)

    return () => window.clearTimeout(timer)
  }, [])

  return ready
}

function backdropUrl(): string | null {
  try {
    const declared = window.getComputedStyle(document.body).backgroundImage
    const match = /url\(["']?([^"')]+)/.exec(declared)
    return match?.[1] ?? null
  } catch {
    return null // fall through to the timer
  }
}
