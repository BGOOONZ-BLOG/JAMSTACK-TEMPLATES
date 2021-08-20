/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {TestResult} from 'types/TestResult';
import type {ScrollOptions} from './lib/scroll_list';

import Prompt from './lib/Prompt';
import {
  printPatternCaret,
  printRestoredPatternCaret,
} from './lib/pattern_mode_helpers';
import PatternPrompt from './pattern_prompt';

export default class TestNamePatternPrompt extends PatternPrompt {
  _cachedTestResults: Array<TestResult>;

  constructor(pipe: stream$Writable | tty$WriteStream, prompt: Prompt) {
    super(pipe, prompt);
    this._entityName = 'tests';
    this._cachedTestResults = [];
  }

  _onChange(pattern: string, options: ScrollOptions) {
    super._onChange(pattern, options);
    this._printPrompt(pattern, options);
  }

  _printPrompt(pattern: string, options: ScrollOptions) {
    const pipe = this._pipe;
    printPatternCaret(pattern, pipe);
    printRestoredPatternCaret(pattern, this._currentUsageRows, pipe);
  }

  _getMatchedTests(pattern: string) {
    let regex;

    try {
      regex = new RegExp(pattern, 'i');
    } catch (e) {
      return [];
    }

    const matchedTests = [];

    this._cachedTestResults.forEach(({testResults}) =>
      testResults.forEach(({title}) => {
        if (regex.test(title)) {
          matchedTests.push(title);
        }
      }),
    );

    return matchedTests;
  }

  updateCachedTestResults(testResults: Array<TestResult> = []) {
    this._cachedTestResults = testResults;
  }
}
