/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import chalk from 'chalk';

export const NO_DIFF_MESSAGE = chalk.dim(
  'Compared values have no visual difference.',
);

export const SIMILAR_MESSAGE = chalk.dim(
  'Compared values serialize to the same structure.\n' +
    'Printing internal object structure without calling `toJSON` instead.',
);
