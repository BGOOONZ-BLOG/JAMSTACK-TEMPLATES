/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Config, Printer, NewPlugin, Refs} from 'types/PrettyFormat';

import ansiRegex from 'ansi-regex';
import style from 'ansi-styles';

const toHumanReadableAnsi = text => {
  return text.replace(ansiRegex(), (match, offset, string) => {
    switch (match) {
      case style.red.close:
      case style.green.close:
      case style.cyan.close:
      case style.gray.close:
      case style.white.close:
      case style.yellow.close:
      case style.bgRed.close:
      case style.bgGreen.close:
      case style.bgYellow.close:
      case style.inverse.close:
      case style.dim.close:
      case style.bold.close:
      case style.reset.open:
      case style.reset.close:
        return '</>';
      case style.red.open:
        return '<red>';
      case style.green.open:
        return '<green>';
      case style.cyan.open:
        return '<cyan>';
      case style.gray.open:
        return '<gray>';
      case style.white.open:
        return '<white>';
      case style.yellow.open:
        return '<yellow>';
      case style.bgRed.open:
        return '<bgRed>';
      case style.bgGreen.open:
        return '<bgGreen>';
      case style.bgYellow.open:
        return '<bgYellow>';
      case style.inverse.open:
        return '<inverse>';
      case style.dim.open:
        return '<dim>';
      case style.bold.open:
        return '<bold>';
      default:
        return '';
    }
  });
};

export const test = (val: any) =>
  typeof val === 'string' && val.match(ansiRegex());

export const serialize = (
  val: string,
  config: Config,
  indentation: string,
  depth: number,
  refs: Refs,
  printer: Printer,
) => printer(toHumanReadableAnsi(val), config, indentation, depth, refs);

export default ({serialize, test}: NewPlugin);
