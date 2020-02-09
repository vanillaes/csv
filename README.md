<h1 align="center">CSV-ES</h1>

CSV-ES is a universal JavaScript CSV parser designed specifically to be simple, fast, and spec compliant.

[![GitHub Releases](https://badgen.net/github/tag/vanillaes/csv-es)](https://github.com/vanillaes/csv-es/releases)
[![NPM Release](https://badgen.net/npm/v/csv-es)](https://www.npmjs.com/package/csv-es)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/csv-es)](https://bundlephobia.com/result?p=csv-es)
[![MIT License](https://badgen.net/github/license/vanillaes/csv-es)](https://raw.githubusercontent.com/vanillaes/csv-es/master/LICENSE)
[![Latest Status](https://github.com/vanillaes/csv-es/workflows/Latest/badge.svg)](https://github.com/vanillaes/csv-es/actions)
[![Release Status](https://github.com/vanillaes/csv-es/workflows/Release/badge.svg)](https://github.com/vanillaes/csv-es/actions)

<p align="center"><strong>⚠️ Notice: EcmaScript Module Support in Node is Experimental ⚠️</strong></p>

## Features

- RFC Compliant
- ECMAScript Module
- CommonJS Bundle Included
- Typescript Compatible

## Installation

```sh
npm install csv-es
```

```javascript
import CSV from 'csv-es';
```

## CSV.parse()

Takes a string of CSV data and converts it to a 2 dimensional array of `[entries][values]`

### Arguments

```CSV.parse(csv, {options}, reviver(value, col, row)) : [entries][values]```

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

Takes a 2 dimensional array of `[entries][values]` and converts them to CSV

### Arguments

```CSV.stringify(array, {options}, replacer(value, col, row)) : string```

- array - the input array to stringify
- options
  - eof - add a trailing newline at the end of file (default `true`)
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

A `.cjs` bundle is included for CommonJS compatibility 

### CSV.parse()

```javascript
const CSV = require('csv-es');
const csv = // the csv string
const data = CSV.parse(csv);
```

### CSV.stringify()

```javascript
const CSV = require('csv-es');
const data = // the a 2-dimensional array
const csv = CSV.stringify(data);
```

## Typings

Typings are generated from JSDoc using Typescript. They are 100% compatible with VSCode Intellisense and will work seamlessly with Typescript.