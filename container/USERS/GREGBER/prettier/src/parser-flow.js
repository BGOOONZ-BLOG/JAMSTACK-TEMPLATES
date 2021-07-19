"use strict";

const createError = require("./parser-create-error");
const includeShebang = require("./parser-include-shebang");

function parse(text /*, parsers, opts*/) {
  // Fixes Node 4 issue (#1986)
  "use strict"; // eslint-disable-line
  // Inline the require to avoid loading all the JS if we don't use it
  const flowParser = require("flow-parser");

  const ast = flowParser.parse(text, {
    esproposal_class_instance_fields: true,
    esproposal_class_static_fields: true,
    esproposal_export_star_as: true
  });

  if (ast.errors.length > 0) {
    const loc = ast.errors[0].loc;
    throw createError(ast.errors[0].message, {
      start: { line: loc.start.line, column: loc.start.column + 1 },
      end: { line: loc.end.line, column: loc.end.column + 1 }
    });
  }

  includeShebang(text, ast);
  return ast;
}
module.exports = parse;
