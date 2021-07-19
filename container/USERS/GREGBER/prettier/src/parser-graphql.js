"use strict";

const createError = require("./parser-create-error");

function parseComments(ast) {
  const comments = [];
  const startToken = ast.loc.startToken;
  let next = startToken.next;
  while (next.kind !== "<EOF>") {
    if (next.kind === "Comment") {
      Object.assign(next, {
        // The Comment token's column starts _after_ the `#`,
        // but we need to make sure the node captures the `#`
        column: next.column - 1
      });
      comments.push(next);
    }
    next = next.next;
  }

  return comments;
}

function removeTokens(node) {
  if (node && typeof node === "object") {
    delete node.startToken;
    delete node.endToken;
    delete node.prev;
    delete node.next;
    for (const key in node) {
      removeTokens(node[key]);
    }
  }
  return node;
}

function parse(text /*, parsers, opts*/) {
  // Inline the require to avoid loading all the JS if we don't use it
  const parser = require("graphql/language");
  try {
    const ast = parser.parse(text);
    ast.comments = parseComments(ast);
    removeTokens(ast);
    return ast;
  } catch (error) {
    const GraphQLError = require("graphql/error").GraphQLError;
    if (error instanceof GraphQLError) {
      throw createError(error.message, {
        start: {
          line: error.locations[0].line,
          column: error.locations[0].column
        }
      });
    } else {
      throw error;
    }
  }
}

module.exports = parse;
