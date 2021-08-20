/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* eslint-disable jest/no-focused-tests */

const SkipOnWindows = {
  suite() {
    if (process.platform === 'win32') {
      fit('does not work on Windows', () => {
        console.warn('[SKIP] Does not work on Windows');
      });
    }
  },

  test() {
    if (process.platform === 'win32') {
      console.warn('[SKIP] Does not work on Windows');
      return true;
    }
    return false;
  },
};

module.exports = SkipOnWindows;
