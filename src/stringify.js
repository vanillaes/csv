/**
 * @typedef {object} Options
 * @property {boolean} [eof] include a newline at the end-of-file?
 */

/**
 * @callback Replacer
 * @param {string} value the value to be transformed
 * @param {number} row the row of the value
 * @param {number} col the column of the value
 * @returns {boolean | number | string} the transformed value
 */

/**
 * @typedef {object} StringifyContext
 * @property {boolean} eof include a newline at the end-of-file?
 * @property {Replacer} replacer a custom function to modify the values
 * @property {number} row the current row
 * @property {number} col the current column
 * @property {string} value the current value
 * @property {string} entry the current entry
 * @property {string} output the current output
 */

/**
 * Stringify takes a 2 dimensional array of `[entries][values]` and converts them to CSV
 * @static
 * @param {string[][]} [array] the input array to stringify
 * @param {Options} options an object containing the options
 * @param {Replacer} [replacer] a custom function to modify the values
 * @returns {string} the CSV string
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
