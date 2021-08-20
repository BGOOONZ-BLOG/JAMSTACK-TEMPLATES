/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import {KEYS} from '../constants';
import SnapshotInteractiveMode from '../snapshot_interactive_mode';

jest.mock('../lib/terminal_utils', () => ({
  getTerminalWidth: () => 80,
  rightPad: () => {
    '';
  },
}));

jest.mock('ansi-escapes', () => ({
  cursorRestorePosition: '[MOCK - cursorRestorePosition]',
  cursorSavePosition: '[MOCK - cursorSavePosition]',
  cursorScrollDown: '[MOCK - cursorScrollDown]',
  cursorTo: (x, y) => `[MOCK - cursorTo(${x}, ${y})]`,
  cursorUp: () => '[MOCK - cursorUp]',
  eraseDown: '[MOCK - eraseDown]',
}));

jest.doMock('chalk', () =>
  Object.assign(new chalk.constructor({enabled: false}), {
    stripColor: str => str,
  }),
);

describe('SnapshotInteractiveMode', () => {
  let pipe;
  let instance;

  beforeEach(() => {
    pipe = {write: jest.fn()};
    instance = new SnapshotInteractiveMode(pipe);
  });

  test('is inactive at construction', () => {
    expect(instance.isActive()).toBeFalsy();
  });

  test('call to run process the first file', () => {
    const mockCallback = jest.fn();
    instance.run(['first.js', 'second.js'], mockCallback);
    expect(instance.isActive()).toBeTruthy();
    expect(mockCallback).toBeCalledWith('first.js', false);
  });

  test('call to abort', () => {
    const mockCallback = jest.fn();
    instance.run(['first.js', 'second.js'], mockCallback);
    expect(instance.isActive()).toBeTruthy();
    instance.abort();
    expect(instance.isActive()).toBeFalsy();
    expect(mockCallback).toBeCalledWith('', false);
  });
  describe('key press handler', () => {
    test('call to skip trigger a processing of next file', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js', 'second.js'], mockCallback);
      expect(mockCallback.mock.calls[0]).toEqual(['first.js', false]);
      instance.put(KEYS.S);
      expect(mockCallback.mock.calls[1]).toEqual(['second.js', false]);
      instance.put(KEYS.S);
      expect(mockCallback.mock.calls[2]).toEqual(['first.js', false]);
    });

    test('call to skip works with 1 file', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js'], mockCallback);
      expect(mockCallback.mock.calls[0]).toEqual(['first.js', false]);
      instance.put(KEYS.S);
      expect(mockCallback.mock.calls[1]).toEqual(['first.js', false]);
    });

    test('press U trigger a snapshot update call', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js'], mockCallback);
      expect(mockCallback.mock.calls[0]).toEqual(['first.js', false]);
      instance.put(KEYS.U);
      expect(mockCallback.mock.calls[1]).toEqual(['first.js', true]);
    });

    test('press Q or ESC triggers an abort', () => {
      instance.abort = jest.fn();
      instance.put(KEYS.Q);
      instance.put(KEYS.ESCAPE);
      expect(instance.abort).toHaveBeenCalledTimes(2);
    });

    test('press ENTER trigger a run', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js'], mockCallback);
      instance.put(KEYS.ENTER);
      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenCalledWith('first.js', false);
    });
  });
  describe('updateWithResults', () => {
    test('with a test failure simply update UI', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js'], mockCallback);
      pipe.write('TEST RESULTS CONTENTS');
      instance.updateWithResults({snapshot: {failure: true}});
      expect(pipe.write.mock.calls.join('\n')).toMatchSnapshot();
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('with a test success, call the next test', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js', 'second.js'], mockCallback);
      pipe.write('TEST RESULTS CONTENTS');
      instance.updateWithResults({snapshot: {failure: false}});
      expect(pipe.write.mock.calls.join('\n')).toMatchSnapshot();
      expect(mockCallback.mock.calls[1]).toEqual(['second.js', false]);
    });

    test('overlay handle progress UI', () => {
      const mockCallback = jest.fn();
      instance.run(['first.js', 'second.js', 'third.js'], mockCallback);
      pipe.write('TEST RESULTS CONTENTS');
      instance.updateWithResults({snapshot: {failure: false}});
      instance.updateWithResults({snapshot: {failure: true}});
      expect(pipe.write.mock.calls.join('\n')).toMatchSnapshot();
    });

    test('last test success, trigger end of interactive mode', () => {
      const mockCallback = jest.fn();
      instance.abort = jest.fn();
      instance.run(['first.js'], mockCallback);
      pipe.write('TEST RESULTS CONTENTS');
      instance.updateWithResults({snapshot: {failure: false}});
      expect(pipe.write.mock.calls.join('\n')).toMatchSnapshot();
      expect(instance.abort).toHaveBeenCalled();
    });
  });
});
