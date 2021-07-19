/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const runJest = require('../runJest');
const {cleanup} = require('../Utils');

const DIR = path.join(os.tmpdir(), 'jest-global-teardown');

beforeEach(() => cleanup(DIR));
afterAll(() => cleanup(DIR));

test('globalTeardown is triggered once after all test suites', () => {
  mkdirp.sync(DIR);
  const teardownPath = path.resolve(
    __dirname,
    '../global-teardown/teardown.js',
  );
  const result = runJest.json('global-teardown', [
    `--globalTeardown=${teardownPath}`,
  ]);
  expect(result.status).toBe(0);
  const files = fs.readdirSync(DIR);
  expect(files).toHaveLength(1);
  const teardown = fs.readFileSync(path.join(DIR, files[0]), 'utf8');
  expect(teardown).toBe('teardown');
});
