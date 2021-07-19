/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Glob, Path} from 'types/Config';
import type {AssertionResult, TestResult} from 'types/TestResult';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import micromatch from 'micromatch';
import slash from 'slash';
import {codeFrameColumns} from '@babel/code-frame';
import StackUtils from 'stack-utils';

// stack utils tries to create pretty stack by making paths relative.
const stackUtils = new StackUtils({
  cwd: 'something which does not exist',
});

let nodeInternals = [];

try {
  nodeInternals = StackUtils.nodeInternals()
    // this is to have the tests be the same in node 4 and node 6.
    // TODO: Remove when we drop support for node 4
    .concat(new RegExp('internal/process/next_tick.js'));
} catch (e) {
  // `StackUtils.nodeInternals()` fails in browsers. We don't need to remove
  // node internals in the browser though, so no issue.
}

type StackTraceConfig = {
  rootDir: string,
  testMatch: Array<Glob>,
};

type StackTraceOptions = {
  noStackTrace: boolean,
};

const PATH_NODE_MODULES = `${path.sep}node_modules${path.sep}`;
const PATH_JEST_PACKAGES = `${path.sep}jest${path.sep}packages${path.sep}`;

// filter for noisy stack trace lines
const JASMINE_IGNORE = /^\s+at(?:(?:.*?vendor\/|jasmine\-)|\s+jasmine\.buildExpectationResult)/;
const JEST_INTERNALS_IGNORE = /^\s+at.*?jest(-.*?)?(\/|\\)(build|node_modules|packages)(\/|\\)/;
const ANONYMOUS_FN_IGNORE = /^\s+at <anonymous>.*$/;
const ANONYMOUS_PROMISE_IGNORE = /^\s+at (new )?Promise \(<anonymous>\).*$/;
const ANONYMOUS_GENERATOR_IGNORE = /^\s+at Generator.next \(<anonymous>\).*$/;
const NATIVE_NEXT_IGNORE = /^\s+at next \(native\).*$/;
const TITLE_INDENT = '  ';
const MESSAGE_INDENT = '    ';
const STACK_INDENT = '      ';
const ANCESTRY_SEPARATOR = ' \u203A ';
const TITLE_BULLET = chalk.bold('\u25cf ');
const STACK_TRACE_COLOR = chalk.dim;
const STACK_PATH_REGEXP = /\s*at.*\(?(\:\d*\:\d*|native)\)?/;
const EXEC_ERROR_MESSAGE = 'Test suite failed to run';
const ERROR_TEXT = 'Error: ';

const trim = string => (string || '').trim();

// Some errors contain not only line numbers in stack traces
// e.g. SyntaxErrors can contain snippets of code, and we don't
// want to trim those, because they may have pointers to the column/character
// which will get misaligned.
const trimPaths = string =>
  string.match(STACK_PATH_REGEXP) ? trim(string) : string;

const getRenderedCallsite = (fileContent: string, line: number) => {
  let renderedCallsite = codeFrameColumns(
    fileContent,
    {start: {line}},
    {highlightCode: true},
  );

  renderedCallsite = renderedCallsite
    .split('\n')
    .map(line => MESSAGE_INDENT + line)
    .join('\n');

  renderedCallsite = `\n${renderedCallsite}\n`;
  return renderedCallsite;
};

// ExecError is an error thrown outside of the test suite (not inside an `it` or
// `before/after each` hooks). If it's thrown, none of the tests in the file
// are executed.
export const formatExecError = (
  testResult: TestResult,
  config: StackTraceConfig,
  options: StackTraceOptions,
  testPath: Path,
) => {
  let error = testResult.testExecError;
  if (!error || typeof error === 'number') {
    error = new Error(`Expected an Error, but "${String(error)}" was thrown`);
    error.stack = '';
  }

  let {message, stack} = error;

  if (typeof error === 'string' || !error) {
    error || (error = 'EMPTY ERROR');
    message = '';
    stack = error;
  }

  const separated = separateMessageFromStack(stack || '');
  stack = separated.stack;

  if (separated.message.indexOf(trim(message)) !== -1) {
    // Often stack trace already contains the duplicate of the message
    message = separated.message;
  }

  message = message
    .split(/\n/)
    .map(line => MESSAGE_INDENT + line)
    .join('\n');
  stack =
    stack && !options.noStackTrace
      ? '\n' + formatStackTrace(stack, config, options, testPath)
      : '';

  if (message.match(/^\s*$/) && stack.match(/^\s*$/)) {
    // this can happen if an empty object is thrown.
    message = MESSAGE_INDENT + 'Error: No message was provided';
  }

  return (
    TITLE_INDENT +
    TITLE_BULLET +
    EXEC_ERROR_MESSAGE +
    '\n\n' +
    message +
    stack +
    '\n'
  );
};

const removeInternalStackEntries = (lines, options: StackTraceOptions) => {
  let pathCounter = 0;

  return lines.filter(line => {
    if (ANONYMOUS_FN_IGNORE.test(line)) {
      return false;
    }

    if (ANONYMOUS_PROMISE_IGNORE.test(line)) {
      return false;
    }

    if (ANONYMOUS_GENERATOR_IGNORE.test(line)) {
      return false;
    }

    if (NATIVE_NEXT_IGNORE.test(line)) {
      return false;
    }

    if (nodeInternals.some(internal => internal.test(line))) {
      return false;
    }

    if (!STACK_PATH_REGEXP.test(line)) {
      return true;
    }

    if (JASMINE_IGNORE.test(line)) {
      return false;
    }

    if (++pathCounter === 1) {
      return true; // always keep the first line even if it's from Jest
    }

    if (options.noStackTrace) {
      return false;
    }

    if (JEST_INTERNALS_IGNORE.test(line)) {
      return false;
    }

    return true;
  });
};

const formatPaths = (
  config: StackTraceConfig,
  options: StackTraceOptions,
  relativeTestPath,
  line,
) => {
  // Extract the file path from the trace line.
  const match = line.match(/(^\s*at .*?\(?)([^()]+)(:[0-9]+:[0-9]+\)?.*$)/);
  if (!match) {
    return line;
  }

  let filePath = slash(path.relative(config.rootDir, match[2]));
  // highlight paths from the current test file
  if (
    (config.testMatch &&
      config.testMatch.length &&
      micromatch(filePath, config.testMatch)) ||
    filePath === relativeTestPath
  ) {
    filePath = chalk.reset.cyan(filePath);
  }
  return STACK_TRACE_COLOR(match[1]) + filePath + STACK_TRACE_COLOR(match[3]);
};

const getTopFrame = (lines: string[]) => {
  for (const line of lines) {
    if (line.includes(PATH_NODE_MODULES) || line.includes(PATH_JEST_PACKAGES)) {
      continue;
    }

    const parsedFrame = stackUtils.parseLine(line.trim());

    if (parsedFrame && parsedFrame.file) {
      return parsedFrame;
    }
  }

  return null;
};

export const formatStackTrace = (
  stack: string,
  config: StackTraceConfig,
  options: StackTraceOptions,
  testPath: ?Path,
) => {
  let lines = stack.split(/\n/);
  let renderedCallsite = '';
  const relativeTestPath = testPath
    ? slash(path.relative(config.rootDir, testPath))
    : null;
  lines = removeInternalStackEntries(lines, options);

  const topFrame = getTopFrame(lines);

  if (topFrame) {
    const filename = topFrame.file;

    if (path.isAbsolute(filename)) {
      let fileContent;
      try {
        // TODO: check & read HasteFS instead of reading the filesystem:
        // see: https://github.com/facebook/jest/pull/5405#discussion_r164281696
        fileContent = fs.readFileSync(filename, 'utf8');
        renderedCallsite = getRenderedCallsite(fileContent, topFrame.line);
      } catch (e) {
        // the file does not exist or is inaccessible, we ignore
      }
    }
  }

  const stacktrace = lines
    .map(
      line =>
        STACK_INDENT +
        formatPaths(config, options, relativeTestPath, trimPaths(line)),
    )
    .join('\n');

  return renderedCallsite + stacktrace;
};

export const formatResultsErrors = (
  testResults: Array<AssertionResult>,
  config: StackTraceConfig,
  options: StackTraceOptions,
  testPath: ?Path,
): ?string => {
  const failedResults = testResults.reduce((errors, result) => {
    result.failureMessages.forEach(content => errors.push({content, result}));
    return errors;
  }, []);

  if (!failedResults.length) {
    return null;
  }

  return failedResults
    .map(({result, content}) => {
      let {message, stack} = separateMessageFromStack(content);
      stack = options.noStackTrace
        ? ''
        : STACK_TRACE_COLOR(
            formatStackTrace(stack, config, options, testPath),
          ) + '\n';

      message = message
        .split(/\n/)
        .map(line => MESSAGE_INDENT + line)
        .join('\n');

      const title =
        chalk.bold.red(
          TITLE_INDENT +
            TITLE_BULLET +
            result.ancestorTitles.join(ANCESTRY_SEPARATOR) +
            (result.ancestorTitles.length ? ANCESTRY_SEPARATOR : '') +
            result.title,
        ) + '\n';

      return title + '\n' + message + '\n' + stack;
    })
    .join('\n');
};

// jasmine and worker farm sometimes don't give us access to the actual
// Error object, so we have to regexp out the message from the stack string
// to format it.
export const separateMessageFromStack = (content: string) => {
  if (!content) {
    return {message: '', stack: ''};
  }

  const messageMatch = content.match(/(^(.|\n)*?(?=\n\s*at\s.*\:\d*\:\d*))/);
  let message = messageMatch ? messageMatch[0] : 'Error';
  const stack = messageMatch ? content.slice(message.length) : content;
  // If the error is a plain error instead of a SyntaxError or TypeError
  // we remove it from the message because it is generally not useful.
  if (message.startsWith(ERROR_TEXT)) {
    message = message.substr(ERROR_TEXT.length);
  }
  return {message, stack};
};
