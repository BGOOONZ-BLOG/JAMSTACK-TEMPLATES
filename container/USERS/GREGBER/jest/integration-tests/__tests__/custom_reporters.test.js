/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

const SkipOnWindows = require('../../scripts/SkipOnWindows');
const {cleanup, extractSummary, writeFiles} = require('../Utils');
const runJest = require('../runJest');
const os = require('os');
const path = require('path');

const DIR = path.resolve(os.tmpdir(), 'custom-reporters-test-dir');

beforeEach(() => cleanup(DIR));
afterEach(() => cleanup(DIR));

describe('Custom Reporters Integration', () => {
  SkipOnWindows.suite();

  test('valid string format for adding reporters', () => {
    const reporterConfig = {
      reporters: ['<rootDir>/reporters/TestReporter.js'],
    };

    const {status} = runJest('custom-reporters', [
      '--config',
      JSON.stringify(reporterConfig),
      'add.test.js',
    ]);

    expect(status).toBe(0);
  });

  test('valid array format for adding reporters', () => {
    const reporterConfig = {
      reporters: [
        ['<rootDir>/reporters/TestReporter.js', {'Dmitrii Abramov': 'Awesome'}],
      ],
    };

    const {status, stdout} = runJest('custom-reporters', [
      '--config',
      JSON.stringify(reporterConfig),
      'add.test.js',
    ]);

    expect(stdout).toMatchSnapshot();
    expect(status).toBe(0);
  });

  test('invalid format for adding reporters', () => {
    const reporterConfig = {
      reporters: [[3243242]],
    };

    const {status, stderr} = runJest('custom-reporters', [
      '--config',
      JSON.stringify(reporterConfig),
      'add.test.js',
    ]);

    expect(status).toBe(1);
    expect(stderr).toMatchSnapshot();
  });

  test('default reporters enabled', () => {
    const {stderr, stdout, status} = runJest('custom-reporters', [
      '--config',
      JSON.stringify({
        reporters: ['default', '<rootDir>/reporters/TestReporter.js'],
      }),
      'add.test.js',
    ]);

    const {summary, rest} = extractSummary(stderr);
    const parsedJSON = JSON.parse(stdout);

    expect(status).toBe(0);
    expect(rest).toMatchSnapshot();
    expect(summary).toMatchSnapshot();
    expect(parsedJSON).toMatchSnapshot();
  });

  test('TestReporter with all tests passing', () => {
    const {stdout, status, stderr} = runJest('custom-reporters', [
      'add.test.js',
    ]);

    const parsedJSON = JSON.parse(stdout);

    expect(status).toBe(0);
    expect(stderr.trim()).toBe('');
    expect(parsedJSON).toMatchSnapshot();
  });

  test('TestReporter with all tests failing', () => {
    const {stdout, status, stderr} = runJest('custom-reporters', [
      'add_fail.test.js',
    ]);

    const parsedJSON = JSON.parse(stdout);

    expect(status).toBe(1);
    expect(stderr.trim()).toBe('');
    expect(parsedJSON).toMatchSnapshot();
  });

  test('IncompleteReporter for flexibility', () => {
    const {stderr, stdout, status} = runJest('custom-reporters', [
      '--no-cache',
      '--config',
      JSON.stringify({
        reporters: ['<rootDir>/reporters/IncompleteReporter.js'],
      }),
      'add.test.js',
    ]);

    expect(status).toBe(0);
    expect(stderr.trim()).toBe('');

    expect(stdout).toMatchSnapshot();
  });

  test('prints reporter errors', () => {
    writeFiles(DIR, {
      '__tests__/test.test.js': `test('test', () => {});`,
      'package.json': JSON.stringify({
        jest: {
          reporters: ['default', '<rootDir>/reporter.js'],
          testEnvironment: 'node',
        },
      }),
      'reporter.js': `
        'use strict';
        module.exports = class Reporter {
          onRunStart() {
            throw new Error('ON_RUN_START_ERROR');
          }
        };
      `,
    });

    const {stderr, status} = runJest(DIR);
    expect(stderr).toMatch(/ON_RUN_START_ERROR/);
    expect(status).toBe(1);
  });
});
