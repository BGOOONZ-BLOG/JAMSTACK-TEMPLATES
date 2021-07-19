/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

const path = require('path');
const runJest = require('../runJest');

it('runs tests in only test.js and spec.js', () => {
  const result = runJest.json('test-in-root').json;

  expect(result.success).toBe(true);
  expect(result.numTotalTests).toBe(2);

  const testNames = result.testResults
    .map(res => res.name)
    .map(name => path.basename(name))
    .sort();

  expect(testNames.length).toBe(2);
  expect(testNames[0]).toBe('spec.js');
  expect(testNames[1]).toBe('test.js');
});
