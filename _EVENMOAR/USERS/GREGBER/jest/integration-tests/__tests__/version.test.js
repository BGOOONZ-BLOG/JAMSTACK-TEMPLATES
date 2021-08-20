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
const os = require('os');
const SkipOnWindows = require('../../scripts/SkipOnWindows');
const {cleanup, writeFiles} = require('../Utils');
const runJest = require('../runJest');

const DIR = path.resolve(os.tmpdir(), 'version_test');

SkipOnWindows.suite();

beforeEach(() => cleanup(DIR));
afterAll(() => cleanup(DIR));

test('works with jest.conf.js', () => {
  writeFiles(DIR, {
    '.watchmanconfig': '',
    'package.json': '{}',
  });

  const {status, stdout, stderr} = runJest(DIR, ['--version']);
  expect(stdout).toMatch(/v\d{2}\.\d{1,2}\.\d{1,2}[\-\S]*\n$/);
  // Only version gets printed and nothing else
  expect(stdout.trim().split(/\n/)).toHaveLength(1);
  expect(stderr.trim()).toBe('');
  expect(status).toBe(0);
});
