<h1 align="center">CSV</h1>

CSV is a universal JavaScript CSV parser designed specifically to be simple, fast, and spec compliant.

[![GitHub Releases](https://badgen.net/github/tag/vanillaes/csv)](https://github.com/vanillaes/csv/releases)
[![NPM Release](https://badgen.net/npm/v/@vanillaes/csv)](https://www.npmjs.com/package/@vanillaes/csv)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/@vanillaes/csv)](https://bundlephobia.com/result?p=@vanillaes/csv)
[![MIT License](https://badgen.net/github/license/vanillaes/csv)](https://raw.githubusercontent.com/vanillaes/csv/master/LICENSE)
[![Latest Status](https://github.com/vanillaes/csv/workflows/Latest/badge.svg)](https://github.com/vanillaes/csv/actions)
[![Release Status](https://github.com/vanillaes/csv/workflows/Release/badge.svg)](https://github.com/vanillaes/csv/actions)

## Features

- RFC Compliant
- ECMAScript Module
- CommonJS Compatible
- Typescript Compatible

## Installation

```sh
npm install @vanillaes/csv
```

## CSV.parse()

Takes a string of CSV data and converts it to a 2 dimensional array of `[entries][values]`

### Arguments

```CSV.parse(csv, {options}, reviver(value, row, col)) : [entries][values]```

- csv - the CSV string to parse
- options
  - typed - infer types (default `false`)
- reviver<sup>1</sup> - a custom function to modify the output (default `(value) => value`)

*<sup>1</sup> Values for `row` and `col` are 1-based.*

### Example

```javascript
import { parse } from '@vanillaes/csv';
const csv = `
"header1,header2,header3"
"aaa,bbb,ccc"
"zzz,yyy,xxx"
`;
const parsed = parse(csv)
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

```CSV.stringify(array, {options}, replacer(value, row, col)) : string```

- array - the input array to stringify
- options
  - eof - add a trailing newline at the end of file (default `true`)
- replacer<sup>1</sup> - a custom function to modify the values (default `(value) => value`)

*<sup>1</sup> Values for `row` and `col` are 1-based.*

### Example

```javascript
import { stringify } from '@vanillaes/csv';
const data = [
  [ "header1", "header2", "header3" ],
  [ "aaa", "bbb", "ccc" ],
  [ "zzz", "yyy", "xxx" ]
];
const stringified = stringify(data)
console.log(stringified);
> "header1,header2,header3"
> "aaa,bbb,ccc"
> "zzz,yyy,xxx"
```

## CommonJS

A `.cjs` bundle is included for CommonJS compatibility 

### CSV.parse()

```javascript
const CSV = require('@vanillaes/csv');
const csv = // the csv string
const data = CSV.parse(csv);
```

### CSV.stringify()

```javascript
const CSV = require('@vanillaes/csv');
const data = // the a 2-dimensional array
const csv = CSV.stringify(data);
```

## Typescript

Typings are generated from JSDoc using Typescript. They are 100% compatible with VSCode Intellisense and will work seamlessly with Typescript.