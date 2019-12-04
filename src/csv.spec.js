import  test from 'tape';
import CSV from './csv.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const rfc1 = require('./__test__/rfc1.json');
const rfc2 = require('./__test__/rfc2.json')
const rfc3 = require('./__test__/rfc3.json')
const rfc4 = require('./__test__/rfc4.json')

test('RFC Rule #1 - One entry per line, each line ends with a newline', (t) => {
  const expect = CSV.parse(rfc1.csv.join('\n'));
  const result = rfc1.json;

  t.deepEqual(result, expect);

  t.end();
});

test('RFC Rule #2 - Trailing newline at the end of the file ommitted', (t) => {
  const expect = CSV.parse(rfc2.csv.join('\n'));
  const result = rfc2.json;

  t.deepEqual(result, expect);

  t.end();
});

test('RFC Rule #3 - First row contains header data', (t) => {
  const expect = CSV.parse(rfc3.csv.join('\n'));
  const result = rfc3.json;

  t.deepEqual(result, expect);

  t.end();
});

test('RFC Rule #4 - Spaces are considered data and entries should not contain a trailing comma', (t) => {
  const expect = CSV.parse(rfc4.csv.join('\n'));
  const result = rfc4.json;

  t.deepEqual(result, expect);

  t.end();
});

// // TODO: Implement this
// test('RFC Rule #5 - Lines may or may not be delimited by double-quotes', (t) => {
//   const expect = null;
//   const result = null;

//   t.deepEqual(result, expect);

//   t.end();
// });

// // TODO: Implement this
// test('RFC Rule #6 - Fields containing line breaks, double-quotes, and commas should be enclosed in double-quotes', (t) => {
//   const expect = null;
//   const result = null;

//   t.deepEqual(result, expect);

//   t.end();
// });

// // TODO: Implement this
// test('RFC Rule #7 - If double-quotes are used to enclose fields, then a double-quote appering inside a field must be escaped by a preceding it with another double-quote', (t) => {
//   const expect = null;
//   const result = null;

//   t.deepEqual(result, expect);

//   t.end();
// });
