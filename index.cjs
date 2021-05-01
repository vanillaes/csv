var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// index.js
__markAsModule(exports);
__export(exports, {
  parse: () => parse,
  stringify: () => stringify
});
function parse(csv, options, reviver = (v) => v) {
  const ctx = Object.create(null);
  ctx.options = options || {};
  ctx.reviver = reviver;
  ctx.value = "";
  ctx.entry = [];
  ctx.output = [];
  ctx.col = 1;
  ctx.row = 1;
  const lexer = /"|,|\r\n|\n|\r|[^",\r\n]+/y;
  const isNewline = /^(\r\n|\n|\r)$/;
  let matches = [];
  let match = "";
  let state = 0;
  while ((matches = lexer.exec(csv)) !== null) {
    match = matches[0];
    switch (state) {
      case 0:
        switch (true) {
          case match === '"':
            state = 3;
            break;
          case match === ",":
            state = 0;
            valueEnd(ctx);
            break;
          case isNewline.test(match):
            state = 0;
            valueEnd(ctx);
            entryEnd(ctx);
            break;
          default:
            ctx.value += match;
            state = 2;
            break;
        }
        break;
      case 2:
        switch (true) {
          case match === ",":
            state = 0;
            valueEnd(ctx);
            break;
          case isNewline.test(match):
            state = 0;
            valueEnd(ctx);
            entryEnd(ctx);
            break;
          default:
            state = 4;
            throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`);
        }
        break;
      case 3:
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
      case 4:
        switch (true) {
          case match === '"':
            state = 3;
            ctx.value += match;
            break;
          case match === ",":
            state = 0;
            valueEnd(ctx);
            break;
          case isNewline.test(match):
            state = 0;
            valueEnd(ctx);
            entryEnd(ctx);
            break;
          default:
            throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`);
        }
        break;
    }
  }
  if (ctx.entry.length !== 0) {
    valueEnd(ctx);
    entryEnd(ctx);
  }
  return ctx.output;
}
function stringify(array, options = {}, replacer = (v) => v) {
  const ctx = Object.create(null);
  ctx.options = options;
  ctx.options.eof = ctx.options.eof !== void 0 ? ctx.options.eof : true;
  ctx.row = 1;
  ctx.col = 1;
  ctx.output = "";
  const needsDelimiters = /"|,|\r\n|\n|\r/;
  array.forEach((row, rIdx) => {
    let entry = "";
    ctx.col = 1;
    row.forEach((col, cIdx) => {
      if (typeof col === "string") {
        col = col.replace('"', '""');
        col = needsDelimiters.test(col) ? `"${col}"` : col;
      }
      entry += replacer(col, ctx.row, ctx.col);
      if (cIdx !== row.length - 1) {
        entry += ",";
      }
      ctx.col++;
    });
    switch (true) {
      case ctx.options.eof:
      case (!ctx.options.eof && rIdx !== array.length - 1):
        ctx.output += `${entry}
`;
        break;
      default:
        ctx.output += `${entry}`;
        break;
    }
    ctx.row++;
  });
  return ctx.output;
}
function valueEnd(ctx) {
  const value = ctx.options.typed ? inferType(ctx.value) : ctx.value;
  ctx.entry.push(ctx.reviver(value, ctx.row, ctx.col));
  ctx.value = "";
  ctx.col++;
}
function entryEnd(ctx) {
  ctx.output.push(ctx.entry);
  ctx.entry = [];
  ctx.row++;
  ctx.col = 1;
}
function inferType(value) {
  const isNumber = /.\./;
  switch (true) {
    case value === "true":
    case value === "false":
      return value === "true";
    case isNumber.test(value):
      return parseFloat(value);
    case isFinite(value):
      return parseInt(value);
    default:
      return value;
  }
}
