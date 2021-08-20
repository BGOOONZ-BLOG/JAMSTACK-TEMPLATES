/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

const SkipOnWindows = require('../../scripts/SkipOnWindows');
const runJest = require('../runJest');

describe('Regex Char In Path', () => {
  SkipOnWindows.suite();

  it('parses paths containing regex chars correctly', () => {
    const {json} = runJest.json('regex-(char-in-path', []);

    expect(json.numTotalTests).toBe(1);
    expect(json.numPassedTests).toBe(1);
  });
});
