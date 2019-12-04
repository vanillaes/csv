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
              state = 1;
              break;
            case match === ',':
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              ctx.value += match;
              state = 2;
              break;
          }
          break;
        case 1: // delimited input
          var prev = ctx.value[ctx.value.length - 1];
          switch(true) {
            case match === '"' && prev === '"':
              state = 1;
              ctx.value += match;
              break;
            case match === '"':
              state = 0;  
              break;
            default:
              state = 1;
              ctx.value += match;
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
      }
    }

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
