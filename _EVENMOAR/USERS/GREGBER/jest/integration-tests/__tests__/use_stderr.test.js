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
const DIR = path.resolve(os.tmpdir(), 'use_stderr_test');

SkipOnWindows.suite();

beforeEach(() => cleanup(DIR));
afterEach(() => cleanup(DIR));

test('no tests found message is redirected to stderr', () => {
  writeFiles(DIR, {
    '.watchmanconfig': '',
    'file1.js': 'module.exports = {}',
    'package.json': JSON.stringify({jest: {testEnvironment: 'node'}}),
  });
  let stderr;
  let stdout;

  ({stdout, stderr} = runJest(DIR, ['--useStderr']));
  expect(stdout.trim()).toBe('');
  expect(stderr).toMatch('No tests found');

  writeFiles(DIR, {
    '__tests__/test.test.js': `require('../file1'); test('file1', () => {});`,
  });

  ({stdout, stderr} = runJest(DIR, ['--useStderr']));
  expect(stdout.trim()).toBe('');
  expect(stderr).toMatch(/PASS.*test\.test\.js/);
});
