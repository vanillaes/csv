<h1 align="center">CSV</h1>

CSV is a universal JavaScript CSV parser designed specifically to be simple, fast, and spec compliant.

<div align="center">
  <a href="https://github.com/vanillaes/csv/releases"><img src="https://badgen.net/github/tag/vanillaes/csv" alt="GitHub Release"></a>
  <a href="https://www.npmjs.com/package/@vanillaes/csv"><img src="https://badgen.net/npm/v/@vanillaes/csv" alt="NPM Release"></a>
  <a href="https://bundlephobia.com/result?p=@vanillaes/csv"><img src="https://badgen.net/bundlephobia/minzip/@vanillaes/csv" alt="Bundlephobia"></a>
  <a href="https://github.com/vanillaes/csv/actions"><img src="https://github.com/vanillaes/csv/workflows/Latest/badge.svg" alt="Latest Status"></a>
  <a href="https://github.com/vanillaes/csv/actions"><img src="https://github.com/vanillaes/csv/workflows/Release/badge.svg" alt="Release Status"></a>

  <a href="https://discord.gg/aSWYgtybzV"><img alt="Discord" src="https://img.shields.io/discord/723296249121603604?color=%23738ADB"></a>
</div>

## Features

- RFC Compliant
- ECMAScript Module
- Typescript Compatible

## Imports

This package works isomorphically in browser and server-side JavaScript

### Browser

Import directly from the local path or a CDN

```html
<script type="module">
import { parse } from 'path/to/csv/index.js'
</script>
```

The minified version can be imported from

```html
<script type="module">
import { parse } from 'path/to/csv/index.min.js'
</script>
```

### Node

Install the package

```sh
npm install @vanillaes/csv
```

Import using the module path

```javascript
import { parse } from '@vanillaes/csv'
```
## Usage

### CSV.parse()

Takes a string of CSV data and converts it to a 2 dimensional array of `[entries][values]`

#### Arguments

```CSV.parse(csv, {options}, reviver(value, row, col)) : [entries][values]```

- csv - the CSV string to parse
- options
  - typed - infer types (default `false`)
- reviver<sup>1</sup> - a custom function to modify the output (default `(value) => value`)

*<sup>1</sup> Values for `row` and `col` are 1-based.*

#### Example

```javascript
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

### CSV.stringify()

Takes a 2 dimensional array of `[entries][values]` and converts them to CSV

#### Arguments

```CSV.stringify(array, {options}, replacer(value, row, col)) : string```

- array - the input array to stringify
- options
  - eof - add a trailing newline at the end of file (default `true`)
- replacer<sup>1</sup> - a custom function to modify the values (default `(value) => value`)

*<sup>1</sup> Values for `row` and `col` are 1-based.*

#### Example

```javascript
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

## Typescript

Typings are generated from JSDoc using Typescript. They are 100% compatible with VSCode Intellisense and will work seamlessly with Typescript.