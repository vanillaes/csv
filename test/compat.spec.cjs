const test = require('tape')
const CSV = require('@vanillaes/csv')
const rfc1 = require('./__test__/rfc1.json')

test('CSV.parse() - should be require-able via CommonJS', t => {
  const expect = rfc1.json
  const actual = CSV.parse(rfc1.csv.join('\n'))

  t.deepEqual(actual, expect, 'CSV.parse require')

  t.end()
})

test('CSV.stringify() - should be require-able via CommonJS', t => {
  const expect = rfc1.csv.join('\n')
  const actual = CSV.stringify(rfc1.json)

  t.deepEqual(actual, expect, 'CSV.stringify require')

  t.end()
})
