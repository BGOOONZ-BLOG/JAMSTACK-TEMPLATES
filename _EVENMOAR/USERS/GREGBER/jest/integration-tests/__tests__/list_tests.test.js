/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

const runJest = require('../runJest');
const path = require('path');

const testRootDir = path.resolve(__dirname, '..', '..');

const normalizePaths = rawPaths =>
  rawPaths
    .split(testRootDir)
    .join(`${path.sep}MOCK_ABOLUTE_PATH`)
    .split('\\')
    .join('/');

describe('--listTests flag', () => {
  it('causes tests to be printed in different lines', () => {
    const {status, stdout} = runJest('list-tests', ['--listTests']);

    expect(status).toBe(0);
    expect(
      normalizePaths(stdout)
        .split('\n')
        .sort()
        .join('\n'),
    ).toMatchSnapshot();
  });

  it('causes tests to be printed out as JSON when using the --json flag', () => {
    const {status, stdout} = runJest('list-tests', ['--listTests', '--json']);

    expect(status).toBe(0);
    expect(() => JSON.parse(stdout)).not.toThrow();
    expect(
      JSON.stringify(
        JSON.parse(stdout)
          .map(normalizePaths)
          .sort(),
      ),
    ).toMatchSnapshot();
  });
});
