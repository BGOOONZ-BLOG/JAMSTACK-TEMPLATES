/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

import chalk from 'chalk';
import {KEYS} from '../constants';

const runJestMock = jest.fn();

let terminalWidth;

jest.mock('ansi-escapes', () => ({
  clearScreen: '[MOCK - clearScreen]',
  cursorDown: (count = 1) => `[MOCK - cursorDown(${count})]`,
  cursorHide: '[MOCK - cursorHide]',
  cursorRestorePosition: '[MOCK - cursorRestorePosition]',
  cursorSavePosition: '[MOCK - cursorSavePosition]',
  cursorShow: '[MOCK - cursorShow]',
  cursorTo: (x, y) => `[MOCK - cursorTo(${x}, ${y})]`,
}));

jest.mock(
  '../search_source',
  () =>
    class {
      constructor(context) {
        this._context = context;
      }

      findMatchingTests(pattern) {
        const paths = [
          './path/to/file1-test.js',
          './path/to/file2-test.js',
          './path/to/file3-test.js',
          './path/to/file4-test.js',
          './path/to/file5-test.js',
          './path/to/file6-test.js',
          './path/to/file7-test.js',
          './path/to/file8-test.js',
          './path/to/file9-test.js',
          './path/to/file10-test.js',
          './path/to/file11-test.js',
        ].filter(path => path.match(pattern));

        return {
          tests: paths.map(path => ({
            context: this._context,
            duration: null,
            path,
          })),
        };
      }
    },
);

jest.doMock('chalk', () => new chalk.constructor({enabled: false}));

jest.doMock('strip-ansi');
require('strip-ansi').mockImplementation(str => str);

jest.doMock(
  '../run_jest',
  () =>
    function() {
      const args = Array.from(arguments);
      const [{onComplete}] = args;
      runJestMock.apply(null, args);

      // Call the callback
      onComplete({snapshot: {}});

      return Promise.resolve();
    },
);

jest.doMock('../lib/terminal_utils', () => ({
  getTerminalWidth: () => terminalWidth,
}));

const watch = require('../watch').default;

const nextTick = () => new Promise(res => process.nextTick(res));

const toHex = char => Number(char.charCodeAt(0)).toString(16);

const globalConfig = {watch: true};

afterEach(runJestMock.mockReset);

describe('Watch mode flows', () => {
  let pipe;
  let hasteMapInstances;
  let contexts;
  let stdin;

  beforeEach(() => {
    terminalWidth = 80;
    pipe = {write: jest.fn()};
    hasteMapInstances = [{on: () => {}}];
    contexts = [{config: {}}];
    stdin = new MockStdin();
  });

  it('Pressing "P" enters pattern mode', () => {
    contexts[0].config = {rootDir: ''};
    watch(globalConfig, contexts, pipe, hasteMapInstances, stdin);

    // Write a enter pattern mode
    stdin.emit(KEYS.P);
    expect(pipe.write).toBeCalledWith(' pattern › ');

    const assertPattern = hex => {
      pipe.write.mockReset();
      stdin.emit(hex);
      expect(pipe.write.mock.calls.join('\n')).toMatchSnapshot();
    };

    // Write a pattern
    ['p', '.', '*', '1', '0'].map(toHex).forEach(assertPattern);

    [KEYS.BACKSPACE, KEYS.BACKSPACE].forEach(assertPattern);

    ['3'].map(toHex).forEach(assertPattern);

    // Runs Jest again
    runJestMock.mockReset();
    stdin.emit(KEYS.ENTER);
    expect(runJestMock).toBeCalled();

    // globalConfig is updated with the current pattern
    expect(runJestMock.mock.calls[0][0].globalConfig).toEqual({
      onlyChanged: false,
      passWithNoTests: true,
      testNamePattern: '',
      testPathPattern: 'p.*3',
      watch: true,
      watchAll: false,
    });
  });

  it('Pressing "c" clears the filters', async () => {
    contexts[0].config = {rootDir: ''};
    watch(globalConfig, contexts, pipe, hasteMapInstances, stdin);

    stdin.emit(KEYS.P);
    await nextTick();

    ['p', '.', '*', '1', '0']
      .map(toHex)
      .concat(KEYS.ENTER)
      .forEach(key => stdin.emit(key));

    stdin.emit(KEYS.T);
    await nextTick();

    ['t', 'e', 's', 't']
      .map(toHex)
      .concat(KEYS.ENTER)
      .forEach(key => stdin.emit(key));

    await nextTick();

    stdin.emit(KEYS.C);
    await nextTick();

    pipe.write.mockReset();
    stdin.emit(KEYS.P);
    await nextTick();

    expect(pipe.write.mock.calls.join('\n')).toMatchSnapshot();
  });
});

class MockStdin {
  constructor() {
    this._callbacks = [];
  }

  setRawMode() {}

  resume() {}

  setEncoding() {}

  on(evt, callback) {
    this._callbacks.push(callback);
  }

  emit(key) {
    this._callbacks.forEach(cb => cb(key));
  }
}
