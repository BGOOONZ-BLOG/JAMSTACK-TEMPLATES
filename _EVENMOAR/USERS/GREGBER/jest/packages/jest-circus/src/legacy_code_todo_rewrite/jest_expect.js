/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {RawMatcherFn} from 'types/Matchers';

import expect from 'expect';

import {
  addSerializer,
  toMatchSnapshot,
  toThrowErrorMatchingSnapshot,
} from 'jest-snapshot';

type JasmineMatcher = {
  (): JasmineMatcher,
  compare: () => RawMatcherFn,
  negativeCompare: () => RawMatcherFn,
};

export default (config: {expand: boolean}) => {
  global.expect = expect;
  expect.setState({
    expand: config.expand,
  });
  expect.extend({
    toMatchSnapshot,
    toThrowErrorMatchingSnapshot,
  });

  (expect: Object).addSnapshotSerializer = addSerializer;
};
