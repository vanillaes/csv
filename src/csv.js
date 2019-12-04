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
              valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              valueEnd(ctx);
              entryEnd(ctx);
              break;
            default:
              ctx.value += match;
              state = 3;
              break;
          }
          break;
        case 3: // un-delimited input
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
              throw Error('CSVError: Illegal state [row:' + ctx.row + ']');
          }
          break;
      }
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
