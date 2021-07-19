/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {readFileSync} from 'fs';

import {parse as babylonParse} from 'babylon';
import {Expect, ItBlock} from './parser_nodes';
import type {File as BabylonFile} from 'babylon';

export type BabylonParserResult = {
  expects: Array<Expect>,
  itBlocks: Array<ItBlock>,
};

export const getASTfor = (file: string): BabylonFile => {
  const data = readFileSync(file).toString();
  const config = {plugins: ['*'], sourceType: 'module'};
  return babylonParse(data, config);
};

export const parse = (file: string): BabylonParserResult => {
  const itBlocks: ItBlock[] = [];
  const expects: Expect[] = [];

  const ast = getASTfor(file);

  // An `it`/`test` was found in the AST
  // So take the AST node and create an object for us
  // to store for later usage
  const foundItNode = (node: any, file: string) => {
    const block = new ItBlock();
    block.name = node.expression.arguments[0].value;
    block.start = node.loc.start;
    block.end = node.loc.end;

    block.start.column += 1;

    block.file = file;
    itBlocks.push(block);
  };

  // An `expect` was found in the AST
  // So take the AST node and create an object for us
  // to store for later usage
  const foundExpectNode = (node: any, file: string) => {
    const expect = new Expect();
    expect.start = node.loc.start;
    expect.end = node.loc.end;

    expect.start.column += 1;
    expect.end.column += 1;

    expect.file = file;
    expects.push(expect);
  };

  const isFunctionCall = node => {
    return (
      node.type === 'ExpressionStatement' &&
      node.expression &&
      node.expression.type === 'CallExpression'
    );
  };

  const isFunctionDeclaration = (nodeType: string) => {
    return (
      nodeType === 'ArrowFunctionExpression' ||
      nodeType === 'FunctionExpression'
    );
  };

  // Pull out the name of a CallExpression (describe/it)
  // handle cases where it's a member expression (.only)
  const getNameForNode = node => {
    if (!isFunctionCall(node)) {
      return false;
    }
    let name =
      node && node.expression && node.expression.callee
        ? node.expression.callee.name
        : undefined;
    if (
      !name &&
      node &&
      node.expression &&
      node.expression.callee &&
      node.expression.callee.object
    ) {
      name = node.expression.callee.object.name;
    }
    return name;
  };

  // When given a node in the AST, does this represent
  // the start of an it/test block?
  const isAnIt = node => {
    const name = getNameForNode(node);
    return name === 'it' || name === 'fit' || name === 'test';
  };

  // When given a node in the AST, does this represent
  // the start of an expect expression?
  const isAnExpect = node => {
    if (!isFunctionCall(node)) {
      return false;
    }
    let name = '';
    let element = node && node.expression ? node.expression.callee : undefined;
    while (!name && element) {
      name = element.name;
      // Because expect may have accessors tacked on (.to.be) or nothing
      // (expect()) we have to check multiple levels for the name
      element = element.object || element.callee;
    }
    return name === 'expect';
  };

  // A recursive AST parser
  const searchNodes = (root: any, file: string) => {
    // Look through the node's children
    for (const node in root.body) {
      if (!root.body.hasOwnProperty(node)) {
        return;
      }

      // Pull out the node
      const element = root.body[node];

      if (isAnIt(element)) {
        foundItNode(element, file);
      } else if (isAnExpect(element)) {
        foundExpectNode(element, file);
      } else if (element && element.type === 'VariableDeclaration') {
        element.declarations
          .filter(
            declaration =>
              declaration.init && isFunctionDeclaration(declaration.init.type),
          )
          .forEach(declaration => searchNodes(declaration.init.body, file));
      } else if (
        element &&
        element.type === 'ExpressionStatement' &&
        element.expression &&
        element.expression.type === 'AssignmentExpression' &&
        element.expression.right &&
        isFunctionDeclaration(element.expression.right.type)
      ) {
        searchNodes(element.expression.right.body, file);
      } else if (
        element.type === 'ReturnStatement' &&
        element.argument.arguments
      ) {
        element.argument.arguments
          .filter(argument => isFunctionDeclaration(argument.type))
          .forEach(argument => searchNodes(argument.body, file));
      }

      if (isFunctionCall(element)) {
        element.expression.arguments
          .filter(argument => isFunctionDeclaration(argument.type))
          .forEach(argument => searchNodes(argument.body, file));
      }
    }
  };

  searchNodes(ast['program'], file);

  return {
    expects,
    itBlocks,
  };
};
