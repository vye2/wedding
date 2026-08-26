import { NAMES, QA } from '../content'
import { SectionHead } from './SectionHead'
import s from './QandA.module.css'

/* =====================================================================
   THE Q&A — the page's signature, and the reason the thread exists.

   Each question is asked once, down the middle. Then the two answers
   hang off the thread on opposite sides: Ashley always left, Victor
   always right, so after the first question you stop reading the labels
   and just know whose voice you're in. They answered separately, so the
   answers frequently disagree — the layout is what makes that legible.

   The second answer is nudged down the page rather than set level with
   the first. Two blocks at the same height read as a comparison table;
   staggered, they read as a reply.

   NOT an accordion. These are meant to be read straight through, and
   hiding eight of them behind a click would be hiding the one part of
   the page that isn't logistics.
   ===================================================================== */
export function QandA() {
  return (
    <section className={s.section} id="qa" aria-labelledby="qa-title" data-thread="strong">
      <div className="wrap">
        <SectionHead
          eyebrow={QA.eyebrow}
          title={QA.title}
          titleId="qa-title"
          intro={<span className={s.note}>{QA.note}</span>}
        />

        <ol className={s.list}>
          {QA.questions.map((item) => (
            <li className={s.item} key={item.q} data-reveal>
              <h3 className={s.q}>{item.q}</h3>

              <div className={s.answers}>
                <Answer who={NAMES.first} side="first" text={item.first} />
                <Answer who={NAMES.second} side="second" text={item.second} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Answer({ who, side, text }: { who: string; side: 'first' | 'second'; text: string }) {
  return (
    <div className={s.answer} data-side={side}>
      <span className={s.knot} aria-hidden="true" />
      {/* The name is the label, so it's the utility face; the answer is a
          voice, so it's the serif. */}
      <p className={s.who}>{who}</p>
      <p className={s.text}>{text}</p>
    </div>
  )
}
