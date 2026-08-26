import { useCountdown, type Remaining } from '../hooks/useCountdown'
import s from './Countdown.module.css'

export interface CountdownProps {
  /** The wedding day. ISO 8601, local time. */
  weddingDate: string
  /** Shown in place of the timer once the day arrives. */
  dayOfMessage: string
}

/* The countdown owns its own tick. Keeping useCountdown down here rather
   than up in App is the whole reason the rest of the scene isn't
   re-rendered once a second: only this subtree changes. */
export function Countdown({ weddingDate, dayOfMessage }: CountdownProps) {
  const remaining = useCountdown(weddingDate)

  if (remaining?.done) {
    return <p className={s.done}>{dayOfMessage}</p>
  }

  return (
    <div className={s.count} role="timer" aria-label={spoken(remaining)}>
      <Unit value={remaining ? String(remaining.days) : '--'} label="Days" />
      <Unit value={pad(remaining?.hours)} label="Hrs" />
      <Unit value={pad(remaining?.minutes)} label="Min" />
      <Unit value={pad(remaining?.seconds)} label="Sec" />
    </div>
  )
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className={s.unit}>
      <span className={s.num}>{value}</span>
      <span className={s.label}>{label}</span>
    </div>
  )
}

function pad(value: number | undefined): string {
  return value === undefined ? '--' : String(value).padStart(2, '0')
}

/* The numbers are set as four abbreviated columns — "412 / 06 / 21 / 09"
   with "Hrs" and "Min" under them — which reads fine and speaks badly. So
   the timer carries the same information in words, which is what a screen
   reader announces instead of the columns. (The old page labelled it
   "Time remaining until the wedding day" and stopped there, so the actual
   figures never reached anyone using one.) */
function spoken(remaining: Remaining | null): string {
  if (!remaining) return 'Counting down to the wedding day'

  const parts = [
    plural(remaining.days, 'day'),
    plural(remaining.hours, 'hour'),
    plural(remaining.minutes, 'minute'),
    plural(remaining.seconds, 'second'),
  ]

  return `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)} until the wedding day`
}

function plural(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}
