/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import Runtime from 'jest-runtime';

export const usage = 'Usage: $0 [--config=<pathToConfigFile>]';

export const options = Object.assign({}, Runtime.getCLIOptions(), {
  replname: {
    alias: 'r',
    description:
      'The "name" of the file given to transformers to be ' +
      'transformed. For example, "repl.ts" if using a TypeScript transformer.',
    type: 'string',
  },
});
