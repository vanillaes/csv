import test from 'tape';
import CSV from './csv.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const reviver1 = require('./__test__/reviver1.json');
const reviver2 = require('./__test__/reviver2.json');
const typed = require('./__test__/typed.json');

test('Reviver #1 - The reviver should append 1 to each value', (t) => {
  const expect = reviver1.json;
  const result = CSV.parse(reviver1.csv.join('\n'), null, (value) => value + '1');

  t.deepEqual(result, expect);

  t.end();
});

test('Reviver #2 - The reviver should output the row:col values', (t) => {
  const expect = reviver2.json;
  const result = CSV.parse(reviver2.csv.join('\n'), null, (value, row, col) => `${row}:${col}`);

  t.deepEqual(result, expect);

  t.end();
});

test('Typed - When enabled the parser should infer the value types', (t) => {
  const expect = typed.json;
  const result = CSV.parse(typed.csv.join('\n'), { typed: true });

  t.deepEqual(result, expect);

  t.end();
});
