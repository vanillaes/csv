import test from 'tape';
import CSV from './csv.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const rfcA1 = require('./__test__/rfca1.json');

test('RFC Amendment #1 - An unquoted field may contain a null (ie empty) value', (t) => {
  const result = CSV.parse(rfcA1.csv.join('\n'));
  const expect = rfcA1.json;
  t.deepEqual(result, expect);
  t.end();
});
