import test from 'tape'
import * as CSV from '@vanillaes/csv'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const rfcA1 = require('./__test__/rfca1.json')
const rfcA2 = require('./__test__/rfca2.json')
const rfcA3 = require('./__test__/rfca3.json')

test('RFC Amendment #1 - An unquoted field may contain a null (ie empty) value', (t) => {
  const actual = CSV.parse(rfcA1.csv.join('\n'))
  const expect = rfcA1.json
  t.deepEqual(actual, expect)
  t.end()
})

test('RFC Amendment #2 - A quoted field may contain a null (ie empty) value', (t) => {
  const actual = CSV.parse(rfcA2.csv.join('\n'))
  const expect = rfcA2.json
  t.deepEqual(actual, expect)
  t.end()
})

test('RFC Amendment #3 - The last field in an entry may contain a null (ie empty) value', (t) => {
  const actual = CSV.parse(rfcA3.csv.join('\n'))
  const expect = rfcA3.json
  t.deepEqual(actual, expect)
  t.end()
})
