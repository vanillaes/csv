[![GitHub Releases](https://img.shields.io/github/release/vanillaes/csv-es.svg)](https://github.com/vanillaes/csv-es/releases)
[![NPM Release](https://img.shields.io/npm/v/csv-es.svg)](https://www.npmjs.com/package/csv-es)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vanillaes/csv-es/master/LICENSE)
[![Latest Status](https://github.com/vanillaes/csv-es/workflows/Latest/badge.svg)](https://github.com/vanillaes/csv-es/actions)
[![Release Status](https://github.com/vanillaes/csv-es/workflows/Release/badge.svg)](https://github.com/vanillaes/csv-es/actions)

# CSV-ES

A fast, simple, easy-to-use CSV parser

- RFC Compliant
- ECMAScript Module
- CommonJS Bundle Included
- Typescript Compatible
- Tiny Footprint (1.4K minified)

This package combines the best of [jQuery-CSV][] and Douglas Crockford's [JSON-js][].

It provides 2 functions

- CSV.parse()
- CSV.stringify()

*Note: If you need a super configurable CSV parser, take a look at [PapaParse][].**

[jQuery-CSV]: https://github.com/typeiii/jquery-csv
[JSON-js]: https://github.com/douglascrockford/JSON-js
[PapaParse]: https://www.papaparse.com/

## Installation

```sh
npm install csv-es
```

```javascript
import CSV from 'csv-es';
```

## CSV.parse()

Takes a string of CSV data and converts it to a 2 dimensional array.

### Arguments

```CSV.parse(csv, {options}, reviver(value, col, row))```

- csv - the CSV string to parse
- options
  - typed - infer types (default `false`)
- reviver - a custom function to modify the output (default `(value) => value`)

### Example

```javascript
import CSV from '/path/to/csv/index.js';
const csv = `
"header1,header2,header3"
"aaa,bbb,ccc"
"zzz,yyy,xxx"
`;
const parsed = CSV.parse(csv)
console.log(parsed);
> [
>   [ "header1", "header2", "header3" ],
>   [ "aaa", "bbb", "ccc" ],
>   [ "zzz", "yyy", "xxx" ]
> ]
```

## CSV.stringify()

Takes a 2 dimensional array of `[entries][values]` and converts them to CSV.

### Arguments

```CSV.stringify(array, {options}, replacer(value, col, row))```

- array - the input array to stringify
- options
  - eof - add a trailing newline at the end (default `true`)
- replacer - a custom function to modify the values (default `(value) => value`)

### Example

```javascript
import CSV from '/path/to/csv/index.js';
const data = [
  [ "header1", "header2", "header3" ],
  [ "aaa", "bbb", "ccc" ],
  [ "zzz", "yyy", "xxx" ]
];
const stringified = CSV.stringify(data)
console.log(stringified);
> "header1,header2,header3"
> "aaa,bbb,ccc"
> "zzz,yyy,xxx"
```


## CommonJS

A CommonJS bundle is included for backward compatible with `node <= 13.2`

### CSV.parse()

```javascript
const CSV = require('csv-es/index.cjs');
const csv = // the csv string
const data = CSV.parse(csv);
```

### CSV.stringify()

```javascript
const CSV = require('csv-es/index.cjs');
const data = // the a 2-dimensional array
const csv = CSV.stringify(data);
```

## Typings

Typings are generated from JSDoc using Typescript. They are 100% compatible with VSCode Intellisense and will work seamlessly with Typescript.