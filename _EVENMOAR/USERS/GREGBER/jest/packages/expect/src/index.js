/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  Expect,
  ExpectationObject,
  ExpectationResult,
  MatcherState,
  MatchersObject,
  RawMatcherFn,
  ThrowingMatcherFn,
  PromiseMatcherFn,
} from 'types/Matchers';

import * as utils from 'jest-matcher-utils';
import matchers from './matchers';
import spyMatchers from './spy_matchers';
import toThrowMatchers, {
  createMatcher as createThrowMatcher,
} from './to_throw_matchers';
import {equals} from './jasmine_utils';
import {
  any,
  anything,
  arrayContaining,
  objectContaining,
  stringContaining,
  stringMatching,
} from './asymmetric_matchers';
import {
  INTERNAL_MATCHER_FLAG,
  getState,
  setState,
  getMatchers,
  setMatchers,
} from './jest_matchers_object';
import extractExpectedAssertionsErrors from './extract_expected_assertions_errors';

class JestAssertionError extends Error {
  matcherResult: any;
}

const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
};

const createToThrowErrorMatchingSnapshotMatcher = function(matcher) {
  return function(received: any, testName?: string) {
    return matcher.apply(this, [received, testName, true]);
  };
};

const getPromiseMatcher = (name, matcher) => {
  if (name === 'toThrow' || name === 'toThrowError') {
    return createThrowMatcher('.' + name, true);
  } else if (name === 'toThrowErrorMatchingSnapshot') {
    return createToThrowErrorMatchingSnapshotMatcher(matcher);
  }

  return null;
};

const expect = (actual: any, ...rest): ExpectationObject => {
  if (rest.length !== 0) {
    throw new Error('Expect takes at most one argument.');
  }

  const allMatchers = getMatchers();
  const expectation = {
    not: {},
    rejects: {not: {}},
    resolves: {not: {}},
  };

  Object.keys(allMatchers).forEach(name => {
    const matcher = allMatchers[name];
    const promiseMatcher = getPromiseMatcher(name, matcher) || matcher;
    expectation[name] = makeThrowingMatcher(matcher, false, actual);
    expectation.not[name] = makeThrowingMatcher(matcher, true, actual);

    expectation.resolves[name] = makeResolveMatcher(
      name,
      promiseMatcher,
      false,
      actual,
    );
    expectation.resolves.not[name] = makeResolveMatcher(
      name,
      promiseMatcher,
      true,
      actual,
    );

    expectation.rejects[name] = makeRejectMatcher(
      name,
      promiseMatcher,
      false,
      actual,
    );
    expectation.rejects.not[name] = makeRejectMatcher(
      name,
      promiseMatcher,
      true,
      actual,
    );
  });

  return expectation;
};

const getMessage = message => {
  return (
    (message && message()) ||
    utils.RECEIVED_COLOR('No message was specified for this matcher.')
  );
};

const makeResolveMatcher = (
  matcherName: string,
  matcher: RawMatcherFn,
  isNot: boolean,
  actual: Promise<any>,
): PromiseMatcherFn => (...args) => {
  const matcherStatement = `.resolves.${isNot ? 'not.' : ''}${matcherName}`;
  if (!isPromise(actual)) {
    throw new JestAssertionError(
      utils.matcherHint(matcherStatement, 'received', '') +
        '\n\n' +
        `${utils.RECEIVED_COLOR('received')} value must be a Promise.\n` +
        utils.printWithType('Received', actual, utils.printReceived),
    );
  }

  return actual.then(
    result => makeThrowingMatcher(matcher, isNot, result).apply(null, args),
    reason => {
      const err = new JestAssertionError(
        utils.matcherHint(matcherStatement, 'received', '') +
          '\n\n' +
          `Expected ${utils.RECEIVED_COLOR('received')} Promise to resolve, ` +
          'instead it rejected to value\n' +
          `  ${utils.printReceived(reason)}`,
      );
      return Promise.reject(err);
    },
  );
};

const makeRejectMatcher = (
  matcherName: string,
  matcher: RawMatcherFn,
  isNot: boolean,
  actual: Promise<any>,
): PromiseMatcherFn => (...args) => {
  const matcherStatement = `.rejects.${isNot ? 'not.' : ''}${matcherName}`;
  if (!isPromise(actual)) {
    throw new JestAssertionError(
      utils.matcherHint(matcherStatement, 'received', '') +
        '\n\n' +
        `${utils.RECEIVED_COLOR('received')} value must be a Promise.\n` +
        utils.printWithType('Received', actual, utils.printReceived),
    );
  }

  return actual.then(
    result => {
      const err = new JestAssertionError(
        utils.matcherHint(matcherStatement, 'received', '') +
          '\n\n' +
          `Expected ${utils.RECEIVED_COLOR('received')} Promise to reject, ` +
          'instead it resolved to value\n' +
          `  ${utils.printReceived(result)}`,
      );
      return Promise.reject(err);
    },
    reason => makeThrowingMatcher(matcher, isNot, reason).apply(null, args),
  );
};

const makeThrowingMatcher = (
  matcher: RawMatcherFn,
  isNot: boolean,
  actual: any,
): ThrowingMatcherFn => {
  return function throwingMatcher(...args) {
    let throws = true;
    const matcherContext: MatcherState = Object.assign(
      // When throws is disabled, the matcher will not throw errors during test
      // execution but instead add them to the global matcher state. If a
      // matcher throws, test execution is normally stopped immediately. The
      // snapshot matcher uses it because we want to log all snapshot
      // failures in a test.
      {dontThrow: () => (throws = false)},
      getState(),
      {
        equals,
        isNot,
        utils,
      },
    );
    let result: ExpectationResult;

    try {
      result = matcher.apply(matcherContext, [actual].concat(args));
    } catch (error) {
      if (
        matcher[INTERNAL_MATCHER_FLAG] === true &&
        !(error instanceof JestAssertionError) &&
        error.name !== 'PrettyFormatPluginError' &&
        // Guard for some environments (browsers) that do not support this feature.
        Error.captureStackTrace
      ) {
        // Try to remove this and deeper functions from the stack trace frame.
        Error.captureStackTrace(error, throwingMatcher);
      }
      throw error;
    }

    _validateResult(result);

    getState().assertionCalls++;

    if ((result.pass && isNot) || (!result.pass && !isNot)) {
      // XOR
      const message = getMessage(result.message);
      const error = new JestAssertionError(message);
      // Passing the result of the matcher with the error so that a custom
      // reporter could access the actual and expected objects of the result
      // for example in order to display a custom visual diff
      error.matcherResult = result;
      // Try to remove this function from the stack trace frame.
      // Guard for some environments (browsers) that do not support this feature.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, throwingMatcher);
      }

      if (throws) {
        throw error;
      } else {
        getState().suppressedErrors.push(error);
      }
    }
  };
};

expect.extend = (matchers: MatchersObject): void =>
  setMatchers(matchers, false);

expect.anything = anything;
expect.any = any;
expect.objectContaining = objectContaining;
expect.arrayContaining = arrayContaining;
expect.stringContaining = stringContaining;
expect.stringMatching = stringMatching;

const _validateResult = result => {
  if (
    typeof result !== 'object' ||
    typeof result.pass !== 'boolean' ||
    (result.message &&
      (typeof result.message !== 'string' &&
        typeof result.message !== 'function'))
  ) {
    throw new Error(
      'Unexpected return from a matcher function.\n' +
        'Matcher functions should ' +
        'return an object in the following format:\n' +
        '  {message?: string | function, pass: boolean}\n' +
        `'${utils.stringify(result)}' was returned`,
    );
  }
};

// add default jest matchers
setMatchers(matchers, true);
setMatchers(spyMatchers, true);
setMatchers(toThrowMatchers, true);

expect.addSnapshotSerializer = () => void 0;
expect.assertions = (expected: number) => {
  getState().expectedAssertionsNumber = expected;
};
expect.hasAssertions = expected => {
  utils.ensureNoExpected(expected, '.hasAssertions');
  getState().isExpectingAssertions = true;
};
expect.getState = getState;
expect.setState = setState;
expect.extractExpectedAssertionsErrors = extractExpectedAssertionsErrors;

module.exports = (expect: Expect);
