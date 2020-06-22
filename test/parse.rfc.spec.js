import test from 'tape'
import { parse } from '@vanillaes/csv'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const rfc1 = require('./__test__/rfc1.json')
const rfc2 = require('./__test__/rfc2.json')
const rfc3 = require('./__test__/rfc3.json')
const rfc4 = require('./__test__/rfc4.json')
const rfc5 = require('./__test__/rfc5.json')
const rfc6 = require('./__test__/rfc6.json')
const rfc7 = require('./__test__/rfc7.json')

test('RFC Rule #1 - One entry per line, each line ends with a newline', (t) => {
  const expect = rfc1.json
  const actual = parse(rfc1.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #2 - Trailing newline at the end of the file omitted', (t) => {
  const expect = rfc2.json
  const actual = parse(rfc2.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #3 - First row contains header data', (t) => {
  const expect = rfc3.json
  const actual = parse(rfc3.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #4 - Spaces are considered data and entries should not contain a trailing comma', (t) => {
  const expect = rfc4.json
  const actual = parse(rfc4.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #5 - Lines may or may not be delimited by double-quotes', (t) => {
  const expect = rfc5.json
  const actual = parse(rfc5.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #6 - Fields containing line breaks, double-quotes, and commas should be enclosed in double-quotes', (t) => {
  const expect = rfc6.json
  const actual = parse(rfc6.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})

test('RFC Rule #7 - If double-quotes are used to enclose fields, then a double-quote appering inside a field must be escaped by a preceding it with another double-quote', (t) => {
  const expect = rfc7.json
  const actual = parse(rfc7.csv.join('\n'))

  t.deepEqual(actual, expect)

  t.end()
})
