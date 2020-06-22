import test from 'tape'
import * as CSV from '@vanillaes/csv'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const integers = require('./__test__/integers.json')
const floats = require('./__test__/floats.json')
const bools = require('./__test__/bools.json')

test('Parse Integers - Can parse data containing integers', (t) => {
  const actual = CSV.parse(integers.csv.join('\n'), { typed: true })
  const expect = integers.json
  t.deepEqual(actual, expect)
  t.end()
})

test('Stringify Integers - Can stringify data containing integers', (t) => {
  const actual = CSV.stringify(integers.json)
  const expect = integers.csv.join('\n')
  t.deepEqual(actual, expect)
  t.end()
})

test('Parse Floats - Can parse data containing floats', (t) => {
  const actual = CSV.parse(floats.csv.join('\n'), { typed: true })
  const expect = floats.json
  t.deepEqual(actual, expect)
  t.end()
})

test('Stringify Floats - Can stringify data containing floats', (t) => {
  const actual = CSV.stringify(floats.json)
  const expect = floats.csv.join('\n')
  t.deepEqual(actual, expect)
  t.end()
})

test('Parse Bools - Can parse data containing booleans', (t) => {
  const actual = CSV.parse(bools.csv.join('\n'), { typed: true })
  const expect = bools.json
  t.deepEqual(actual, expect)
  t.end()
})

test('Stringify Bools - Can stringify data containing booleans', (t) => {
  const actual = CSV.stringify(bools.json)
  const expect = bools.csv.join('\n')
  t.deepEqual(actual, expect)
  t.end()
})
