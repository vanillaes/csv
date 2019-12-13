class CSV {
  /**
   * Takes a string of CSV data and converts it to a 2 dimensional array
   *
   * options
   * - typed - type coercion [false]
   *
   * @static
   * @param {*} csv the CSV string to parse
   * @param {*} [options] an object containing the options
   * @param {*} [reviver] a custom function to modify the values
   * @returns a 2 dimensional array of `[entries][values]`
   */
  static parse (csv, options = {}, reviver = v => v) {
    // TODO: Add input checking
    let matches = [];
    let match = '';
    let state = 0;
    const ctx = Object.create(null);
    ctx.value = '';
    ctx.entry = [];
    ctx.output = [];
    ctx.col = 1;
    ctx.row = 1;

    const lexer = RegExp(/"|,|\r\n|\n|\r|[^",\r\n]+/y);

    while ((matches = lexer.exec(csv)) !== null) {
      match = matches[0];

      switch (state) {
        case 0: // start of entry
          switch (true) {
            case match === '"':
              state = 3;
              break;
            case match === ',':
              state = 0;
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              state = 0;
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              ctx.value += match;
              state = 2;
              break;
          }
          break;
        case 2: // un-delimited input
          switch (true) {
            case match === ',':
              state = 0;
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              state = 0;
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              state = 4;
              throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`);
          }
          break;
        case 3: // delimited input
          switch (true) {
            case match === '"':
              state = 4;
              break;
            default:
              state = 3;
              ctx.value += match;
              break;
          }
          break;
        case 4: // escaped or closing delimiter
          switch (true) {
            case match === '"':
              state = 3;
              ctx.value += match;
              break;
            case match === ',':
              state = 0;
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              state = 0;
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`);
          }
          break;
      }
    }

    // flush the last value
    if (ctx.entry.length !== 0) {
      this.valueEnd(ctx);
      this.entryEnd(ctx);
    }

    return ctx.output;
  }

  /**
   * Takes a 2 dimensional array of `[entries][values]` and converts them to CSV
   *
   * options
   * - eof - add a trailing newline at the end [true]
   *
   * @static
   * @param {*} array the input array to stringify
   * @param {*} [options] an object containing the options
   * @param {*} [replacer] a custom function to modify the values
   * @returns the CSV string
   */
  static stringify (array, options = {}, replacer = v => v) {
    // TODO: Add input checking

    options.eof = options.eof !== undefined
      ? options.eof
      : true;

    let output = '';
    array.forEach((row, rIdx) => {
      let entry = '';
      row.forEach((col, cIdx) => {
        col = col.replace('"', '""');
        entry += /"|,|\r\n|\n|\r/.test(col)
          ? `"${col}"`
          : col;
        if (cIdx !== row.length - 1) {
          entry += ',';
        }
      });
      if (options.eof === false) {
        output += entry;
        if (rIdx !== array.length - 1) {
          output += '\n';
        }
      } else {
        output += `${entry}\n`;
      }
    });
    return output;
  }

  /** @private */
  static valueEnd (ctx) {
    ctx.entry.push(ctx.value);
    ctx.value = '';
    ctx.col++;
  }

  /** @private */
  static entryEnd (ctx) {
    ctx.output.push(ctx.entry);
    ctx.entry = [];
    ctx.row++;
    ctx.col = 1;
  }
}

export default CSV;
