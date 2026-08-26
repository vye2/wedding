import { useState } from 'react'
import { cssVars } from '../css-vars'
import { cx } from '../cx'
import s from './Petals.module.css'

/* =====================================================================
   Drifting leaves and rose petals — the ambient life in front of the
   envelope, so the scene breathes even while it's still sealed.

   The randomness is generated ONCE, in a state initialiser, and then
   held. Roll it during render instead and every countdown tick — one a
   second — would re-cast the whole field and restart every animation.
   ===================================================================== */

type Shape = 'leaf' | 'bloom' | 'pale'

/** Shape mix — more blossoms than leaves, a few pale ones for lightness. */
const SHAPES: readonly Shape[] = ['leaf', 'bloom', 'bloom', 'leaf', 'pale']

interface Layer {
  /** How many pieces on this layer. */
  count: number
  size: [number, number]
  opacity: number
  blur: number
  fall: [number, number]
  sway: [number, number]
}

/* Three depth layers: farther pieces are smaller, fainter, blurrier and
   slower. Counts are half what they started at — sparse enough to read as
   the odd petal falling past rather than as weather. */
const LAYERS: readonly Layer[] = [
  { count: 6, size: [11, 14], opacity: 0.26, blur: 1.4, fall: [26, 34], sway: [8, 11] },
  { count: 7, size: [15, 20], opacity: 0.46, blur: 0.35, fall: [19, 25], sway: [6, 8] },
  { count: 6, size: [21, 28], opacity: 0.68, blur: 0, fall: [13, 18], sway: [4.5, 6.5] },
]

interface Petal {
  id: number
  shape: Shape
  /** Horizontal start, in vw. Slightly negative at the low end so pieces
   *  can enter from just off the left edge. */
  left: number
  size: number
  opacity: number
  blur: number
  fall: number
  sway: number
  /** Negative, so each piece starts mid-flight instead of the whole field
   *  falling from the top in unison. */
  fallDelay: number
  swayDelay: number
}

const SHAPE_CLASS: Record<Shape, string | undefined> = {
  leaf: s.leaf,
  bloom: s.bloom,
  pale: s.pale,
}

function between(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function pickShape(): Shape {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)] ?? 'bloom'
}

function castField(): Petal[] {
  const field: Petal[] = []
  let id = 0

  for (const layer of LAYERS) {
    for (let i = 0; i < layer.count; i++) {
      const fall = between(layer.fall[0], layer.fall[1])
      field.push({
        id: id++,
        shape: pickShape(),
        left: between(-2, 100),
        size: between(layer.size[0], layer.size[1]),
        opacity: layer.opacity,
        blur: layer.blur,
        fall,
        sway: between(layer.sway[0], layer.sway[1]),
        fallDelay: -Math.random() * fall,
        swayDelay: -Math.random() * 8,
      })
    }
  }

  return field
}

export interface PetalsProps {
  /** Held back until the backdrop has decoded, so the petals and the
   *  envelope arrive together. */
  ready: boolean
}

export function Petals({ ready }: PetalsProps) {
  const [field] = useState(castField)

  return (
    <div className={s.field} data-ready={ready} aria-hidden="true">
      {field.map((petal) => (
        <span
          key={petal.id}
          className={cx(s.petal, SHAPE_CLASS[petal.shape])}
          style={cssVars({
            left: `${petal.left.toFixed(2)}vw`,
            animationDelay: `${petal.fallDelay.toFixed(1)}s`,
            '--sz': `${petal.size.toFixed(1)}px`,
            '--op': petal.opacity.toFixed(2),
            '--bl': `${petal.blur}px`,
            '--fall': `${petal.fall.toFixed(1)}s`,
            '--sway': `${petal.sway.toFixed(1)}s`,
          })}
        >
          {/* The outer span falls; this inner shape sways and wobbles.
              Nested transforms compose into a natural flutter — one
              element can't do both, because the second transform would
              simply replace the first. */}
          <i style={{ animationDelay: `${petal.swayDelay.toFixed(1)}s` }} />
        </span>
      ))}
    </div>
  )
}
