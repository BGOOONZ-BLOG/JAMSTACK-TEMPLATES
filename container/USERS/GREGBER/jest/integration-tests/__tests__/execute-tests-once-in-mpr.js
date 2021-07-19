/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
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

const DIR = path.resolve(__dirname, '../execute-tests-once-in-mpr');

SkipOnWindows.suite();

beforeEach(() => cleanup(DIR));
afterAll(() => cleanup(DIR));

test('Tests are executed only once even in an MPR', () => {
  // Make a global config that ignores all sub-projects.
  const config = {
    jest: {
      projects: ['<rootDir>', '<rootDir>/foo/*/'],
      testPathIgnorePatterns: ['/foo/'],
      testRegex: /my-test-.*\.js/.source,
    },
  };

  // Make a child config with a special regexp to ensure we execute the tests.
  const childConfig = {
    jest: {
      testRegex: /my-test-.*\.js/.source,
    },
  };

  /* eslint-disable sort-keys */
  writeFiles(DIR, {
    'foo/folder/my-test-bar.js': `test('bar', () => console.log('Bar!'));`,
    'foo/folder/package.json': JSON.stringify(childConfig, null, 2),

    'foo/directory/my-test-baz.js': `test('baz', () => console.log('Baz!'));`,
    'foo/directory/package.json': JSON.stringify(childConfig, null, 2),

    'foo/whatever/my-test-qux.js': `test('qux', () => console.log('Qux!'));`,
    'foo/whatever/package.json': JSON.stringify(childConfig, null, 2),

    'package.json': JSON.stringify(config, null, 2),
  });
  /* eslint-enable sort-keys */

  const {stderr, status} = runJest(DIR, ['foo/folder/my-test-bar.js']);

  expect(status).toBe(0);

  const {rest, summary} = extractSummary(stderr);

  // We have only one test passed, so total should equal to one, despite we have
  // three projects.
  expect(rest).toMatchSnapshot();
  expect(summary).toMatch(/1 total/);
});
