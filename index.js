/**
 * Parse takes a string of CSV data and converts it to a 2 dimensional array
 *
 * options
 * - typed - infer types [false]
 * - separator - use custom separator [,]
 * - delimiter - use custom delimiter ["]
 *
 * @static
 * @param {string} csv the CSV string to parse
 * @param {Object} [options] an object containing the options
 * @param {Function} [reviver] a custom function to modify the values
 * @returns {Array} a 2 dimensional array of `[entries][values]`
 */
export function parse (csv, options, reviver = v => v) {
  const ctx = Object.create(null)
  ctx.options = options || {}
  ctx.reviver = reviver
  ctx.value = ''
  ctx.entry = []
  ctx.output = []
  ctx.col = 1
  ctx.row = 1

  ctx.options.delimiter = ctx.options.delimiter === undefined ? '"' : options.delimiter;
  if(ctx.options.delimiter.length > 1 || ctx.options.delimiter.length === 0)
    throw Error(`CSVError: delimiter must be one character [${ctx.options.separator}]`)
    
  ctx.options.separator = ctx.options.separator === undefined ? ',' : options.separator;
  if(ctx.options.separator.length > 1 || ctx.options.separator.length === 0)
    throw Error(`CSVError: separator must be one character [${ctx.options.separator}]`)

  const lexer = new RegExp(`${escapeRegExp(ctx.options.delimiter)}|${escapeRegExp(ctx.options.separator)}|\r\n|\n|\r|[^${escapeRegExp(ctx.options.delimiter)}${escapeRegExp(ctx.options.separator)}\r\n]+`, 'y')
  const isNewline = /^(\r\n|\n|\r)$/

  let matches = []
  let match = ''
  let state = 0

  while ((matches = lexer.exec(csv)) !== null) {
    match = matches[0]

    switch (state) {
      case 0: // start of entry
        switch (true) {
          case match === ctx.options.delimiter:
            state = 3
            break
          case match === ctx.options.separator:
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
          case match === ctx.options.separator:
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
          case match === ctx.options.delimiter:
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
          case match === ctx.options.delimiter:
            state = 3
            ctx.value += match
            break
          case match === ctx.options.separator:
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
  }

  return ctx.output
}

/**
 * Stringify takes a 2 dimensional array of `[entries][values]` and converts them to CSV
 *
 * options
 * - eof - add a trailing newline at the end of file [true]
 * - separator - use custom separator [,]
 * - delimiter - use custom delimiter ["]
 *
 * @static
 * @param {Array} array the input array to stringify
 * @param {Object} [options] an object containing the options
 * @param {Function} [replacer] a custom function to modify the values
 * @returns {string} the CSV string
 */
export function stringify (array, options = {}, replacer = v => v) {
  const ctx = Object.create(null)
  ctx.options = options
  ctx.options.eof = ctx.options.eof !== undefined ? ctx.options.eof : true
  ctx.row = 1
  ctx.col = 1
  ctx.output = ''

  ctx.options.delimiter = ctx.options.delimiter === undefined ? '"' : options.delimiter;
  if(ctx.options.delimiter.length > 1 || ctx.options.delimiter.length === 0)
    throw Error(`CSVError: delimiter must be one character [${ctx.options.separator}]`)
    
  ctx.options.separator = ctx.options.separator === undefined ? ',' : options.separator;
  if(ctx.options.separator.length > 1 || ctx.options.separator.length === 0)
    throw Error(`CSVError: separator must be one character [${ctx.options.separator}]`)

  const needsDelimiters = new RegExp(`${escapeRegExp(ctx.options.delimiter)}|${escapeRegExp(ctx.options.separator)}|\r\n|\n|\r`)

  array.forEach((row, rIdx) => {
    let entry = ''
    ctx.col = 1
    row.forEach((col, cIdx) => {
      if (typeof col === 'string') {
        col = col.replace(ctx.options.delimiter, `${ctx.options.delimiter}${ctx.options.delimiter}`)
        col = needsDelimiters.test(col) ? `${ctx.options.delimiter}${col}${ctx.options.delimiter}` : col
      }
      entry += replacer(col, ctx.row, ctx.col)
      if (cIdx !== row.length - 1) {
        entry += ctx.options.separator
      }
      ctx.col++
    })
    switch (true) {
      case ctx.options.eof:
      case !ctx.options.eof && rIdx !== array.length - 1:
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

/** @private */
function valueEnd (ctx) {
  const value = ctx.options.typed ? inferType(ctx.value) : ctx.value
  ctx.entry.push(ctx.reviver(value, ctx.row, ctx.col))
  ctx.value = ''
  ctx.col++
}

/** @private */
function entryEnd (ctx) {
  ctx.output.push(ctx.entry)
  ctx.entry = []
  ctx.row++
  ctx.col = 1
}

/** @private */
function inferType (value) {
  const isNumber = /.\./

  switch (true) {
    case value === 'true':
    case value === 'false':
      return value === 'true'
    case isNumber.test(value):
      return parseFloat(value)
    case isFinite(value):
      return parseInt(value)
    default:
      return value
  }
}

/** @private */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}