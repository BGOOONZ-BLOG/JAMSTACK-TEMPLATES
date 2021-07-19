/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {DiffOptions} from './diff_strings';

import prettyFormat from 'pretty-format';
import chalk from 'chalk';
import getType from 'jest-get-type';
import diffStrings from './diff_strings';
import {NO_DIFF_MESSAGE, SIMILAR_MESSAGE} from './constants';

const {
  AsymmetricMatcher,
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent,
} = prettyFormat.plugins;

const PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher,
];
const FORMAT_OPTIONS = {
  plugins: PLUGINS,
};
const FORMAT_OPTIONS_0 = Object.assign({}, FORMAT_OPTIONS, {
  indent: 0,
});
const FALLBACK_FORMAT_OPTIONS = {
  callToJSON: false,
  maxDepth: 10,
  plugins: PLUGINS,
};
const FALLBACK_FORMAT_OPTIONS_0 = Object.assign({}, FALLBACK_FORMAT_OPTIONS, {
  indent: 0,
});

const MULTILINE_REGEXP = /[\r\n]/;

// Generate a string that will highlight the difference between two values
// with green and red. (similar to how github does code diffing)
function diff(a: any, b: any, options: ?DiffOptions): ?string {
  if (a === b) {
    return NO_DIFF_MESSAGE;
  }

  const aType = getType(a);
  let expectedType = aType;
  let omitDifference = false;
  if (aType === 'object' && typeof a.asymmetricMatch === 'function') {
    if (a.$$typeof !== Symbol.for('jest.asymmetricMatcher')) {
      // Do not know expected type of user-defined asymmetric matcher.
      return null;
    }
    if (typeof a.getExpectedType !== 'function') {
      // For example, expect.anything() matches either null or undefined
      return null;
    }
    expectedType = a.getExpectedType();
    // Primitive types boolean and number omit difference below.
    // For example, omit difference for expect.stringMatching(regexp)
    omitDifference = expectedType === 'string';
  }

  if (expectedType !== getType(b)) {
    return (
      '  Comparing two different types of values.' +
      ` Expected ${chalk.green(expectedType)} but ` +
      `received ${chalk.red(getType(b))}.`
    );
  }

  if (omitDifference) {
    return null;
  }

  switch (aType) {
    case 'string':
      const multiline = MULTILINE_REGEXP.test(a) && b.indexOf('\n') !== -1;
      if (multiline) {
        return diffStrings(a, b, options);
      }
      return null;
    case 'number':
    case 'boolean':
      return null;
    case 'map':
      return compareObjects(sortMap(a), sortMap(b), options);
    case 'set':
      return compareObjects(sortSet(a), sortSet(b), options);
    default:
      return compareObjects(a, b, options);
  }
}

function sortMap(map) {
  return new Map(Array.from(map.entries()).sort());
}

function sortSet(set) {
  return new Set(Array.from(set.values()).sort());
}

function compareObjects(a: Object, b: Object, options: ?DiffOptions) {
  let diffMessage;
  let hasThrown = false;

  try {
    diffMessage = diffStrings(
      prettyFormat(a, FORMAT_OPTIONS_0),
      prettyFormat(b, FORMAT_OPTIONS_0),
      options,
      {
        a: prettyFormat(a, FORMAT_OPTIONS),
        b: prettyFormat(b, FORMAT_OPTIONS),
      },
    );
  } catch (e) {
    hasThrown = true;
  }

  // If the comparison yields no results, compare again but this time
  // without calling `toJSON`. It's also possible that toJSON might throw.
  if (!diffMessage || diffMessage === NO_DIFF_MESSAGE) {
    diffMessage = diffStrings(
      prettyFormat(a, FALLBACK_FORMAT_OPTIONS_0),
      prettyFormat(b, FALLBACK_FORMAT_OPTIONS_0),
      options,
      {
        a: prettyFormat(a, FALLBACK_FORMAT_OPTIONS),
        b: prettyFormat(b, FALLBACK_FORMAT_OPTIONS),
      },
    );
    if (diffMessage !== NO_DIFF_MESSAGE && !hasThrown) {
      diffMessage = SIMILAR_MESSAGE + '\n\n' + diffMessage;
    }
  }

  return diffMessage;
}

module.exports = diff;
