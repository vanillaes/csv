/**
 * @typedef Options
 * @property {boolean} [typed] enable type inference?
 */

/**
 * @callback Reviver
 * @param {boolean | number | string} value the value to be transformed
 * @param {number} row the row of the value
 * @param {number} col the column of the value
 * @returns {boolean | number | string} the transformed value
 */

/**
 * @typedef {object} ParserContext
 * @property {boolean} typed enable type inference?
 * @property {Reviver} reviver the reviver function
 * @property {number} row the current row
 * @property {number} col the current column
 * @property {string} value the current value
 * @property {Array<boolean | number | string>} entry the current entry
 * @property {Array<Array<boolean | number | string>>} output the current output
 */

/**
 * Parse takes a string of CSV data and converts it to a 2 dimensional array
 * @static
 * @param {string} [csv] the CSV string to parse
 * @param {Options} [options] an object containing the options
 * @param {Reviver} [reviver] a custom function to modify the values
 * @returns {Array<Array<boolean | number | string>>} a 2 dimensional array of `[entries][values]`
 */
export function parse (csv = '', options = {}, reviver = v => v) {
  /** @type {ParserContext} */
  const ctx = {
    typed: options?.typed !== undefined ? options.typed : false,
    reviver,
    row: 1,
    col: 1,
    value: '',
    entry: [],
    output: []
  }

  const lexer = /"|,|\r\n|\n|\r|[^",\r\n]+/y
  const isNewline = /^(\r\n|\n|\r)$/

  /** @type {RegExpExecArray | null} */
  let matches
  let match = ''
  let state = 0

  while ((matches = lexer.exec(csv)) !== null) {
    match = matches[0]

    switch (state) {
      case 0: // start of entry
        switch (true) {
          case match === '"':
            state = 3
            break
          case match === ',':
            state = 0
            valueEnd(ctx)
            break
          case isNewline.test(match):
            state = 0
            valueEnd(ctx)
            entryEnd(ctx)
            break
          default:
            ctx.value += match
            state = 2
            break
        }
        break
      case 2: // un-delimited input
        switch (true) {
          case match === ',':
            state = 0
            valueEnd(ctx)
            break
          case isNewline.test(match):
            state = 0
            valueEnd(ctx)
            entryEnd(ctx)
            break
          default:
            state = 4
            throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`)
        }
        break
      case 3: // delimited input
        switch (true) {
          case match === '"':
            state = 4
            break
          default:
            state = 3
            ctx.value += match
            break
        }
        break
      case 4: // escaped or closing delimiter
        switch (true) {
          case match === '"':
            state = 3
            ctx.value += match
            break
          case match === ',':
            state = 0
            valueEnd(ctx)
            break
          case isNewline.test(match):
            state = 0
            valueEnd(ctx)
            entryEnd(ctx)
            break
          default:
            throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`)
        }
        break
    }
  }

  // flush the last value
  if (ctx.entry.length !== 0) {
    valueEnd(ctx)
    entryEnd(ctx)
    return ctx.output
  }

  // Flush the last value - if it's a single-column csv
  if (ctx.entry.length === 0 && ctx.value !== '') {
    valueEnd(ctx)
    entryEnd(ctx)
    return ctx.output
  }

  return ctx.output
}

/**
 * Transition - end of value
 * @param {ParserContext} ctx context
 */
function valueEnd (ctx) {
  const value = ctx.typed ? inferType(ctx.value) : ctx.value
  ctx.entry.push(ctx.reviver(value, ctx.row, ctx.col))
  ctx.value = ''
  ctx.col++
}

/**
 * Transition - end of entry
 * @param {ParserContext} ctx context
 */
function entryEnd (ctx) {
  ctx.output.push(ctx.entry)
  ctx.entry = []
  ctx.row++
  ctx.col = 1
}

/**
 * Infer the type based on the value
 * @param {string} value raw string value
 * @returns {boolean | number | string} value converted to the correct type
 */
function inferType (value) {
  const isFloat = /[+-]?(\d*[.])?\d+/
  const isNumber = /\d+/

  switch (true) {
    case value === 'true':
    case value === 'false':
      return value === 'true'
    case isFloat.test(value):
      return parseFloat(value)
    case isNumber.test(value):
      return parseInt(value)
    default:
      return value
  }
}
