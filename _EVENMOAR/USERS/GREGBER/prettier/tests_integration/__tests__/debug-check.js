"use strict";

const runPrettier = require("../runPrettier");

describe("doesn't crash when --debug-check is passed", () => {
  runPrettier("cli/with-shebang", ["issue1890.js", "--debug-check"]).test({
    stdout: "issue1890.js\n",
    stderr: "",
    status: 0
  });
});

describe("checks stdin with --debug-check", () => {
  runPrettier("cli/with-shebang", ["--debug-check"], {
    input: "0"
  }).test({
    stdout: "(stdin)\n",
    stderr: "",
    status: 0
  });
});

describe("show diff for 2+ error files with --debug-check", () => {
  runPrettier("cli/debug-check", ["*.js", "--debug-check"]).test({
    status: "non-zero"
  });
});
