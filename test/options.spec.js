import test from 'tape'
import * as CSV from '@vanillaes/csv'
import { createRequire } from 'module'
import { sep } from 'path'
const require = createRequire(import.meta.url)
const reviver1 = require('./__test__/reviver1.json')
const reviver2 = require('./__test__/reviver2.json')
const typed1 = require('./__test__/typed1.json')
const typed2 = require('./__test__/typed2.json')
const replacer1 = require('./__test__/replacer1.json')
const replacer2 = require('./__test__/replacer2.json')
const eof1 = require('./__test__/eof1.json')
const eof2 = require('./__test__/eof2.json')
const separator1 = require('./__test__/separator1.json')
const separator2 = require('./__test__/separator2.json')
const delimiter1 = require('./__test__/delimiter1.json')
const delimiter2 = require('./__test__/delimiter2.json')
const delimiter3 = require('./__test__/delimiter3.json')

test('Reviver #1 - The reviver should append 1 to each value', (t) => {
  const expect = reviver1.json
  const actual = CSV.parse(reviver1.csv.join('\n'), null, (value) => value + '1')

  t.deepEqual(actual, expect)

  t.end()
})

test('Reviver #2 - The reviver should output the row:col values', (t) => {
  const expect = reviver2.json
  const actual = CSV.parse(reviver2.csv.join('\n'), null, (value, row, col) => `${row}:${col}`)

  t.deepEqual(actual, expect)

  t.end()
})

test('Typed #1 - When set to true the parser should infer the value types', (t) => {
  const expect = typed1.json
  const actual = CSV.parse(typed1.csv.join('\n'), { typed: true })

  t.deepEqual(actual, expect)

  t.end()
})

test('Typed #2- When set to false the parser should not infer the value types', (t) => {
  const expect = typed2.json
  const actual = CSV.parse(typed2.csv.join('\n'), { typed: false })
  
  t.deepEqual(actual, expect)

  t.end()
})

test('Replacer #1 - The replacer should append 1 to each value', (t) => {
  const expect = replacer1.csv.join('\n')
  const actual = CSV.stringify(replacer1.json, {}, (value) => value + '1')

  t.deepEqual(actual, expect)

  t.end()
})

test('Replacer #2 - The replacer should output the row:col values', (t) => {
  const expect = replacer2.csv.join('\n')
  const actual = CSV.stringify(replacer2.json, {}, (value, row, col) => `${row}:${col}`)

  t.deepEqual(actual, expect)

  t.end()
})

test('EOF #1 - When set to true the formatter should include a newline at the end of file', (t) => {
  const expect = eof1.csv.join('\n')
  const actual = CSV.stringify(eof1.json, { eof: true })

  t.deepEqual(actual, expect)

  t.end()
})

test('EOF #2- When set to false the formatter should not include a newline at the end of file', (t) => {
  const expect = eof2.csv.join('\n')
  const actual = CSV.stringify(eof2.json, { eof: false })

  t.deepEqual(actual, expect)

  t.end()
})

test('Separator #1 - When set the parser should use this character as separator', (t) => {
  const expect = separator1.json
  const actual = CSV.parse(separator1.csv.join('\n'), { separator: ';' })

  t.deepEqual(actual, expect)

  t.end()
})

test('Separator #2 - The parser accepts regular expression meta characters as separator', (t) => {
  const expect = separator2.json
  const actual = CSV.parse(separator2.csv.join('\n'), { separator: '|' })

  t.deepEqual(actual, expect)

  t.end()
})

test('Separator #3 - The separator must be one character', (t) => {
  t.throws(
    () => CSV.parse(separator1.csv.join('\n'), { separator: '' }),
    /separator must be one character/
  )
  t.throws(
    () => CSV.parse(separator1.csv.join('\n'), { separator: '==' }),
    /separator must be one character/
  )

  t.end()
})

test('Separator #4 - When set stringify should use this character as separator', (t) => {
  const expect = separator1.csv.join('\n')
  const actual = CSV.stringify(separator1.json, { separator: ';' })

  t.deepEqual(actual, expect) 

  t.end()
})

test('Delimiter #1 - When set the parser should use this character as delimiter', (t) => {
  const expect = delimiter1.json
  const actual = CSV.parse(delimiter1.csv.join('\n'), { delimiter: '\'' })

  t.deepEqual(actual, expect)

  t.end()
})

test('Delimiter #2 - The parser accepts regular expression meta characters as delimiter', (t) => {
  const expect = delimiter2.json
  const actual = CSV.parse(delimiter2.csv.join('\n'), { delimiter: '|' })

  t.deepEqual(actual, expect)

  t.end()
})

test('Delimiter #3 - The delimiter must be one character', (t) => {  
  t.throws(
    () => CSV.parse(delimiter1.csv.join('\n'), { delimiter: '' }),
    /delimiter must be one character/
  )
  t.throws(
    () => CSV.parse(delimiter1.csv.join('\n'), { delimiter: '==' }),
    /delimiter must be one character/
  )

  t.end()
})


test('Delimiter #4 - When set stringify should use this character as delimiter', (t) => {
  const expect = delimiter3.csv.join('\n')
  const actual = CSV.stringify(delimiter3.json, { delimiter: '\'' })

  t.deepEqual(actual, expect)

  t.end()
})