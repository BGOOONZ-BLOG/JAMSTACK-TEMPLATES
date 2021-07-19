"use strict";

const path = require("path");

const validate = require("jest-validate").validate;
const deprecatedConfig = require("./deprecated");
const supportTable = require("./support").supportTable;

const defaults = {
  cursorOffset: -1,
  rangeStart: 0,
  rangeEnd: Infinity,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: "babylon",
  insertPragma: false,
  requirePragma: false,
  semi: true,
  proseWrap: "preserve",
  arrowParens: "avoid"
};

const exampleConfig = Object.assign({}, defaults, {
  filepath: "path/to/Filename",
  printWidth: 80,
  originalText: "text"
});

// Copy options and fill in default values.
function normalize(options) {
  const normalized = Object.assign({}, options || {});
  const filepath = normalized.filepath;

  if (
    filepath &&
    (!normalized.parser || normalized.parser === defaults.parser)
  ) {
    const extension = path.extname(filepath);
    const filename = path.basename(filepath).toLowerCase();

    const language = supportTable.find(
      language =>
        typeof language.since === "string" &&
        (language.extensions.indexOf(extension) > -1 ||
          (language.filenames &&
            language.filenames.find(name => name.toLowerCase() === filename)))
    );

    if (language) {
      normalized.parser = language.parsers[0];
    }
  }

  if (normalized.parser === "json") {
    normalized.trailingComma = "none";
  }

  /* istanbul ignore if */
  if (typeof normalized.trailingComma === "boolean") {
    // Support a deprecated boolean type for the trailing comma config
    // for a few versions. This code can be removed later.
    normalized.trailingComma = "es5";

    console.warn(
      "Warning: `trailingComma` without any argument is deprecated. " +
        'Specify "none", "es5", or "all".'
    );
  }

  /* istanbul ignore if */
  if (typeof normalized.proseWrap === "boolean") {
    normalized.proseWrap = normalized.proseWrap ? "always" : "never";

    console.warn(
      "Warning: `proseWrap` with boolean value is deprecated. " +
        'Use "always", "never", or "preserve" instead.'
    );
  }

  /* istanbul ignore if */
  if (normalized.parser === "postcss") {
    normalized.parser = "css";

    console.warn(
      'Warning: `parser` with value "postcss" is deprecated. ' +
        'Use "css", "less" or "scss" instead.'
    );
  }

  const parserBackup = normalized.parser;
  if (typeof normalized.parser === "function") {
    // Delete the function from the object to pass validation.
    delete normalized.parser;
  }

  validate(normalized, { exampleConfig, deprecatedConfig });

  // Restore the option back to a function;
  normalized.parser = parserBackup;

  // For backward compatibility. Deprecated in 0.0.10
  /* istanbul ignore if */
  if ("useFlowParser" in normalized) {
    normalized.parser = normalized.useFlowParser ? "flow" : "babylon";
    delete normalized.useFlowParser;
  }

  Object.keys(defaults).forEach(k => {
    if (normalized[k] == null) {
      normalized[k] = defaults[k];
    }
  });

  return normalized;
}

module.exports = { normalize, defaults };
