import { useEffect, useMemo, useState } from 'react'

export interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** The day has arrived. */
  done: boolean
}

/**
 * Time left until `iso`, ticking once a second.
 *
 * Returns `null` if the date can't be parsed, which the card renders as
 * dashes rather than as a wrong number.
 *
 * The tick is a self-correcting timeout aligned to the next whole second,
 * not a setInterval. An interval drifts — every tick lands a millisecond
 * or two late and the error accumulates, so the seconds digit eventually
 * skips one in front of the guest. Each timeout here is measured from
 * the real clock, so it can't.
 */
export function useCountdown(iso: string): Remaining | null {
  const target = useMemo(() => {
    const time = new Date(iso).getTime()
    return Number.isNaN(time) ? null : time
  }, [iso])

  const [remaining, setRemaining] = useState<Remaining | null>(() =>
    target === null ? null : split(target - Date.now()),
  )

  useEffect(() => {
    if (target === null) {
      setRemaining(null)
      return
    }

    let timer = 0

    const tick = () => {
      const diff = target - Date.now()
      setRemaining(split(diff))
      if (diff <= 0) return // the day is here; stop ticking
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    }

    // Coming back to a backgrounded tab: browsers throttle timers there,
    // so catch up immediately rather than showing a stale minute.
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      window.clearTimeout(timer)
      tick()
    }

    tick()
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [target])

  return remaining
}

function split(diff: number): Remaining {
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }

  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)

  return { days, hours, minutes, seconds, done: false }
}
