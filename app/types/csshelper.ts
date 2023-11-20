/*
 * webpack will automatically generate type information for css modules
 * as it encounters them, however it takes a compilation pass (or two)
 * before it will pick them up. This type placates the typescript compiler
 * until that has happened.
 */

declare module '*.m.css' {
  var classes: any
  export = classes
}
