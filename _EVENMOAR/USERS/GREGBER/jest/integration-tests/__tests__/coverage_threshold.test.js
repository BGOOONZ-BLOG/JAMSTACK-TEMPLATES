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
const {cleanup, writeFiles} = require('../Utils');
const runJest = require('../runJest');

const DIR = path.resolve(__dirname, '../coverage-threshold');

SkipOnWindows.suite();

beforeEach(() => cleanup(DIR));
afterAll(() => cleanup(DIR));

test('exits with 1 if coverage threshold is not met', () => {
  const pkgJson = {
    jest: {
      collectCoverage: true,
      collectCoverageFrom: ['**/*.js'],
      coverageThreshold: {
        global: {
          lines: 90,
        },
      },
    },
  };

  writeFiles(DIR, {
    '__tests__/a-banana.js': `
      require('../not-covered.js');
      test('banana', () => expect(1).toBe(1));
    `,
    'not-covered.js': `
      module.exports = () => {
        return 1 + 2;
      };
    `,
    'package.json': JSON.stringify(pkgJson, null, 2),
  });

  const {stdout, status} = runJest(DIR, ['--coverage', '--ci=false']);
  expect(status).toBe(1);
  expect(stdout).toMatchSnapshot();
});
