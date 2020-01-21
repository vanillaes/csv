import test from 'tape';
import CSV from './csv.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const reviver = require('./__test__/reviver.json');

test('RFC Rule #1 - One entry per line, each line ends with a newline', (t) => {
  const expect = reviver.json;
  const result = CSV.parse(reviver.csv.join('\n'), null, (value) => value + '1');

  t.deepEqual(result, expect);

  t.end();
});
