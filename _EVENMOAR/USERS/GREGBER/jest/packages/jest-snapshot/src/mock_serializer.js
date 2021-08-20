/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Config, NewPlugin, Printer, Refs} from 'types/PrettyFormat';

export const serialize = (
  val: any,
  config: Config,
  indentation: string,
  depth: number,
  refs: Refs,
  printer: Printer,
): string => {
  // Serialize a non-default name, even if config.printFunctionName is false.
  const name = val.getMockName();
  const nameString = name === 'jest.fn()' ? '' : ' ' + name;

  let callsString = '';
  if (val.mock.calls.length !== 0) {
    const indentationNext = indentation + config.indent;
    callsString =
      ' {' +
      config.spacingOuter +
      indentationNext +
      '"calls": ' +
      printer(val.mock.calls, config, indentationNext, depth, refs) +
      (config.min ? '' : ',') +
      config.spacingOuter +
      indentation +
      '}';
  }

  return '[MockFunction' + nameString + ']' + callsString;
};

export const test = (val: any) => val && !!val._isMockFunction;

export default ({serialize, test}: NewPlugin);
