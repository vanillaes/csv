/**
 * @callback Replacer
 * @param {string} value Raw value
 * @param {number} row Row of the value
 * @param {number} col Column of the value
 * @returns {boolean | number | string} Transformed value
 */

/**
 * @typedef {object} StringifyContext
 * @property {boolean} eof Include a newline at the end-of-file?
 * @property {Replacer} replacer Replacer function
 * @property {number} row Current row
 * @property {number} col Current column
 * @property {string} value Current value
 * @property {string} entry Current entry
 * @property {string} output Current output
 */

/**
 * Stringify takes a 2 dimensional array of `[entries][values]` and converts them to CSV
 * @static
 * @param {string[][]} [array] CSV (2D) array to format
 * @param {object} [options] CSV 'stringify' options
 * @param {boolean} [options.eof] Include a newline at the end-of-file?
 * @param {Replacer} [replacer] Custom function to modify the values
 * @returns {string} CSV string
 */
export function stringify (array = [], options = {}, replacer = v => v) {
  /** @type {StringifyContext} */
  const ctx = {
    eof: options?.eof !== undefined ? options.eof : true,
    replacer,
    row: 1,
    col: 1,
    value: '',
    entry: '',
    output: ''
  }

  const needsDelimiters = /"|,|\r\n|\n|\r/

  array.forEach((row, rIdx) => {
    let entry = ''
    ctx.col = 1
    row.forEach((col, cIdx) => {
      if (typeof col === 'string') {
        col = col.replace(/"/g, '""')
        col = needsDelimiters.test(col) ? `"${col}"` : col
      }
      entry += ctx.replacer(col, ctx.row, ctx.col)
      if (cIdx !== row.length - 1) {
        entry += ','
      }
      ctx.col++
    })
    switch (true) {
      case ctx.eof:
      case rIdx !== array.length - 1 && !ctx.eof:
        ctx.output += `${entry}\n`
        break
      default:
        ctx.output += `${entry}`
        break
    }
    ctx.row++
  })

  return ctx.output
}
