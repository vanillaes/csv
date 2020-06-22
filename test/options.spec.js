import test from 'tape'
import * as CSV from '@vanillaes/csv'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const reviver1 = require('./__test__/reviver1.json')
const reviver2 = require('./__test__/reviver2.json')
const typed1 = require('./__test__/typed1.json')
const typed2 = require('./__test__/typed2.json')
const replacer1 = require('./__test__/replacer1.json')
const replacer2 = require('./__test__/replacer2.json')
const eof1 = require('./__test__/eof1.json')
const eof2 = require('./__test__/eof2.json')

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
