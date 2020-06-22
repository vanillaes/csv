import test from 'tape'
import { stringify } from '@vanillaes/csv'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const rfc1 = require('./__test__/rfc1.json')
const rfc2 = require('./__test__/rfc2.json')
const rfc3 = require('./__test__/rfc3.json')
const rfc4 = require('./__test__/rfc4.json')
const rfc6 = require('./__test__/rfc6.json')
const rfc7 = require('./__test__/rfc7.json')

test('RFC Rule #1 - One entry per line, each line ends with a newline', (t) => {
  const expect = rfc1.csv.join('\n')
  const actual = stringify(rfc1.json)

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #2 - Trailing newline at the end of the file omitted', (t) => {
  const expect = rfc2.csv.join('\n')
  const actual = stringify(rfc2.json, { eof: false })

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #3 - First row contains header data', (t) => {
  const expect = rfc3.csv.join('\n')
  const actual = stringify(rfc3.json, { eof: false })

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #4 - Spaces are considered data and entries should not contain a trailing comma', (t) => {
  const expect = rfc4.csv.join('\n')
  const actual = stringify(rfc4.json, { eof: false })
  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #6 - Fields containing line breaks, double-quotes, and commas should be enclosed in double-quotes', (t) => {
  const expect = rfc6.csv.join('\n')
  const actual = stringify(rfc6.json, { eof: false })

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #7 - If double-quotes are used to enclose fields, then a double-quote appering inside a field must be escaped by a preceding it with another double-quote', (t) => {
  const expect = rfc7.csv.join('\n')
  const actual = stringify(rfc7.json, { eof: false })

  t.deepEqual(actual, expect)

  t.end()
})
