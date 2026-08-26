import { PHOTOS } from '../content'
import s from './PhotoBand.module.css'

/* A breath between the schedule and the rest of the page.

   Two of the three frames are empty on purpose — they render as labelled
   placeholders rather than as broken images or stock photography, so
   it's obvious at a glance which pictures still need taking. Drop a real
   src into content.ts and the frame fills itself. */
export function PhotoBand() {
  return (
    <section className={s.section} aria-label="Photographs" data-thread>
      <div className="wrap">
        <ul className={s.band}>
          {PHOTOS.map((photo) => (
            <li className={s.frame} key={photo.caption} data-reveal>
              <figure className={s.figure}>
                <div className={s.plate}>
                  {photo.src ? (
                    <picture>
                      <source srcSet={photo.src.webp} type="image/webp" />
                      <img className={s.img} src={photo.src.jpg} alt={photo.alt ?? ''} />
                    </picture>
                  ) : (
                    <span className={s.pending}>Photo to come</span>
                  )}
                </div>
                <figcaption className={s.caption}>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
