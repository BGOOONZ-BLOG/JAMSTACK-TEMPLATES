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

const dir = path.resolve(__dirname, '../deprecated-cli-options');

it('Prints deprecation warnings for CLI flags', () => {
  const {stderr, status} = runJest(dir, ['--mapCoverage']);
  expect(status).toBe(0);
  expect(stderr).toMatch(/Test Suites: 1 passed, 1 total/);
  expect(stderr).toMatch(`● Deprecation Warning:

  Option "mapCoverage" has been removed, as it's no longer necessary.

  Please update your configuration.

  CLI Options Documentation:
  https://facebook.github.io/jest/docs/en/cli.html`);
});
