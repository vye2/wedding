/** Join class names, dropping anything absent.
 *
 *  CSS Modules type every lookup as `string | undefined` (the generated
 *  object is an index signature, and a typo can't be caught at compile
 *  time), so a template literal would happily splice the word
 *  "undefined" into a class attribute. This filters instead. */
export function cx(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(' ')
}
