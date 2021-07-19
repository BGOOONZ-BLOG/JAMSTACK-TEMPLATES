"use strict";

const util = require("./util");
const docBuilders = require("./doc-builders");
const concat = docBuilders.concat;
const join = docBuilders.join;
const hardline = docBuilders.hardline;
const line = docBuilders.line;
const softline = docBuilders.softline;
const group = docBuilders.group;
const indent = docBuilders.indent;
// const ifBreak = docBuilders.ifBreak;

// http://w3c.github.io/html/single-page.html#void-elements
const voidTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

function genericPrint(path, options, print) {
  const n = path.getValue();
  if (!n) {
    return "";
  }

  if (typeof n === "string") {
    return n;
  }

  switch (n.type) {
    case "root": {
      return printChildren(path, print);
    }
    case "directive": {
      return concat(["<", n.data, ">", hardline]);
    }
    case "text": {
      return n.data.replace(/\s+/g, " ").trim();
    }
    case "script":
    case "style":
    case "tag": {
      const selfClose = voidTags[n.name] ? ">" : " />";
      const children = printChildren(path, print);

      const hasNewline = util.hasNewlineInRange(
        options.originalText,
        util.locStart(n),
        util.locEnd(n)
      );

      return group(
        concat([
          hasNewline ? hardline : "",
          "<",
          n.name,
          printAttributes(path, print),

          n.children.length ? ">" : selfClose,

          n.name.toLowerCase() === "html"
            ? concat([hardline, children])
            : indent(children),
          n.children.length ? concat([softline, "</", n.name, ">"]) : hardline
        ])
      );
    }
    case "comment": {
      return concat(["<!-- ", n.data.trim(), " -->"]);
    }
    case "attribute": {
      if (!n.value) {
        return n.key;
      }
      return concat([n.key, '="', n.value, '"']);
    }

    default:
      /* istanbul ignore next */
      throw new Error("unknown htmlparser2 type: " + n.type);
  }
}

function printAttributes(path, print) {
  const node = path.getValue();

  return concat([
    node.attributes.length ? " " : "",
    indent(join(line, path.map(print, "attributes")))
  ]);
}

function printChildren(path, print) {
  const children = [];
  path.each(childPath => {
    const child = childPath.getValue();
    if (child.type !== "text") {
      children.push(hardline);
    }
    children.push(childPath.call(print));
  }, "children");
  return concat(children);
}

module.exports = genericPrint;
