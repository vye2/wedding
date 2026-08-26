import type { CSSProperties } from 'react'

/** A style object that may also carry CSS custom properties. React passes
 *  any `--*` key straight through to the element's inline style, but
 *  CSSProperties alone doesn't admit them. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>

/** Write an inline style that includes custom properties.
 *
 *  `style={{ '--sz': '14px' }}` doesn't compile: the literal is checked
 *  against CSSProperties, which has no index signature, so the custom
 *  property reads as an excess property. Passing it through here types
 *  the literal as CSSVars instead — no cast, and a typo in a real CSS
 *  property is still caught. */
export function cssVars(style: CSSVars): CSSProperties {
  return style
}
