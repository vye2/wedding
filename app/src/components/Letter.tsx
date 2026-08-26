import type { Ref } from 'react'
import { weddingDateParts, type SaveTheDateConfig } from '../config'
import { Countdown } from './Countdown'
import s from './Letter.module.css'

export interface LetterProps {
  config: SaveTheDateConfig
  /** The envelope is sliding away — grow to full size. */
  revealed: boolean
  ref: Ref<HTMLElement>
}

/* =====================================================================
   THE LETTER — the actual save-the-date, rendered as a child of the
   Envelope so it sits physically between the pocket's back and front
   layers. Its top is glimpsed when the flap lifts; the whole card is
   exposed as the envelope slides down.

   "Pressed-botanical stationery": a single portrait of the couple crowns
   a quiet, tightly-set hierarchy. Gold used sparingly.
   ===================================================================== */
export function Letter({ config, revealed, ref }: LetterProps) {
  const date = weddingDateParts(config.weddingDate)
  const { partnerA, partnerB } = config.couple

  return (
    <main
      ref={ref}
      id="std-main"
      className={s.card}
      data-revealed={revealed}
      aria-labelledby="std-names"
    >
      {/* THE PORTRAIT — the hero of the card. On landscape it sits inside
          a polaroid border; on portrait the card fills the phone, so it
          runs to the edges and melts into the stock at its foot. Either
          way the photo is cropped to fill, and object-position picks what
          survives. */}
      <figure className={s.photo}>
        <picture className={s.photoMedia}>
          {/* Portrait screens get the TALL crop: the card fills a phone
              there, so the frame is far taller than it is wide and the
              square version would lose its top and bottom. First matching
              source wins, so these lead. */}
          <source media="(orientation: portrait)" srcSet={config.portrait.tall.webp} type="image/webp" />
          <source media="(orientation: portrait)" srcSet={config.portrait.tall.jpg} />
          <source srcSet={config.portrait.wide.webp} type="image/webp" />
          <img className={s.photoImg} src={config.portrait.wide.jpg} alt={config.portrait.alt} />
        </picture>

        {/* Split into parts so phones can stack it — SAVE / the / DATE —
            while landscape keeps it on one line. The {' '} are load-
            bearing there: JSX drops whitespace that spans a newline, so
            without them the three words would run together. */}
        <p className={s.eyebrow}>
          <span className={s.eyebrowKey}>Save</span>{' '}
          <span className={s.eyebrowMid}>the</span>{' '}
          <span className={s.eyebrowKey}>Date</span>
        </p>
      </figure>

      <div className={s.content}>
        <h1 className={s.names} id="std-names">
          {partnerA} <span className={s.amp}>&amp;</span> {partnerB}
        </h1>

        <div className={s.rule} aria-hidden="true">
          <i />
          <span />
          <i />
        </div>

        {date && (
          <p className={s.date}>
            {date.weekday}, {date.month} {date.day}
            <sup>{date.ordinal}</sup>, {date.year}
          </p>
        )}

        <Countdown weddingDate={config.weddingDate} dayOfMessage={config.dayOfMessage} />

        <p className={s.follow}>{config.followUp}</p>
      </div>
    </main>
  )
}
