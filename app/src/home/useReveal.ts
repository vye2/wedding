import { useEffect } from 'react'

/**
 * Fade each `[data-reveal]` element up as it comes into view.
 *
 * One observer for the whole page, wired once after mount, rather than a
 * <Reveal> wrapper component per block. The page is static content — the
 * set of revealable elements never changes after the first render — so
 * the usual reason to prefer per-element refs (things mounting and
 * unmounting) doesn't apply, and one observer is cheaper than forty.
 *
 * Reduced motion is handled here rather than left to CSS alone: the
 * elements are simply marked shown and no observer is created.
 */
export function useReveal(): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-shown', ''))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-shown', '')
          // Reveal once. Re-hiding on scroll-up reads as a glitch, not an
          // effect.
          observer.unobserve(entry.target)
        }
      },
      // Only a little inset. A deeper margin was tried and held back
      // content that was already sitting just below the fold on load,
      // which read as the page being empty rather than as a reveal.
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
