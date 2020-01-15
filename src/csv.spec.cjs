const test = require('tape');
const CSV = require('../index.cjs');
const rfc1 = require('./__test__/rfc1.json');

test('RFC Rule #1 - One entry per line, each line ends with a newline', (t) => {
  const expect = rfc1.json;
  const result = CSV.parse(rfc1.csv.join('\n'));

  t.deepEqual(result, expect);

  t.end();
});

test('RFC Rule #1 - One entry per line, each line ends with a newline', (t) => {
  const expect = rfc1.csv.join('\n');
  const result = CSV.stringify(rfc1.json);

  t.deepEqual(result, expect);

  t.end();
});
