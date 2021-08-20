/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const runJest = require('../runJest');

const CACHE = path.resolve(os.tmpdir(), 'clear-cache-directory');

describe('jest --clearCache', () => {
  test('normal run results in cache directory being written', () => {
    const {status} = runJest('clear-cache', [`--cacheDirectory=${CACHE}`]);

    expect(fs.existsSync(CACHE)).toBe(true);
    expect(status).toBe(0);
  });
  test('clearCache results in deleted directory and exit status 0', () => {
    expect(fs.existsSync(CACHE)).toBe(true);

    const {status, stdout, stderr} = runJest('clear-cache', [
      '--clearCache',
      `--cacheDirectory=${CACHE}`,
    ]);

    expect(fs.existsSync(CACHE)).toBe(false);
    expect(stdout).toBe(`Cleared ${CACHE}\n`);
    expect(stderr.trim()).toBe('');
    expect(status).toBe(0);
  });
});
