export default class CSV {
  static parse (input, options = {}, reviver = v => v) {
    // TODO: Add input checking
    let match = '';
    let state = 0;
    const ctx = Object.create(null);
    ctx.value = '';
    ctx.entry = [];
    ctx.output = [];
    ctx.col = 1;
    ctx.row = 1;

    const lexer = RegExp(/"|,|\r\n|\n|\r|[^",\r\n]+/y);

    while(match = lexer.exec(input)) {
      match = match[0];

      switch (state) {
        case 0: // start of entry
          switch(true) {
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
          switch(true) {
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
          switch(true) {
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
          switch(true) {
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

  static stringify (input, options = {}, replacer = null) {
    // TODO: Add input checking

    // TODO: Add formatter
  }

  static valueEnd (ctx) {
    ctx.entry.push(ctx.value);
    
    ctx.value = '';
    ctx.col++;
  }

  static entryEnd (ctx) {
    ctx.output.push(ctx.entry);

    ctx.entry = [];
    ctx.row++;
    ctx.col = 1;
  }

}
