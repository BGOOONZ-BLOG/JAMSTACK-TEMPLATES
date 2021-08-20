/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import runJest from '../runJest';
import os from 'os';
import path from 'path';

const {cleanup, writeFiles} = require('../Utils');

const SkipOnWindows = require('../../scripts/SkipOnWindows');
const DIR = path.resolve(os.tmpdir(), 'find_related_tests_test');

SkipOnWindows.suite();

beforeEach(() => cleanup(DIR));
afterEach(() => cleanup(DIR));

test('runs tests related to filename', () => {
  writeFiles(DIR, {
    '.watchmanconfig': '',
    '__tests__/test.test.js': `
      const a = require('../a');
      test('a', () => {});
    `,
    'a.js': 'module.exports = {};',
    'package.json': JSON.stringify({jest: {testEnvironment: 'node'}}),
  });

  const {stdout} = runJest(DIR, ['a.js']);
  expect(stdout).toMatch('');

  const {stderr} = runJest(DIR, ['--findRelatedTests', 'a.js']);
  expect(stderr).toMatch('PASS __tests__/test.test.js');

  const summaryMsg = 'Ran all test suites related to files matching /a.js/i.';
  expect(stderr).toMatch(summaryMsg);
});
