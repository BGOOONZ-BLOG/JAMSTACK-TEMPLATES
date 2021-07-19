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
const SkipOnWindows = require('../../scripts/SkipOnWindows');
const {extractSummary, cleanup, writeFiles} = require('../Utils');
const runJest = require('../runJest');

const DIR = path.resolve(__dirname, '../console_log_output_when_run_in_band');

SkipOnWindows.suite();

beforeEach(() => cleanup(DIR));
afterAll(() => cleanup(DIR));

test('prints console.logs when run with forceExit', () => {
  writeFiles(DIR, {
    '__tests__/a-banana.js': `
      test('banana', () => console.log('Hey'));
    `,
    'package.json': '{}',
  });

  const {stderr, stdout, status} = runJest(DIR, [
    '-i',
    '--ci=false',
    '--forceExit',
  ]);
  const {rest, summary} = extractSummary(stderr);
  expect(status).toBe(0);
  expect(rest).toMatchSnapshot();
  expect(summary).toMatchSnapshot();
  expect(stdout).toMatchSnapshot();
});
