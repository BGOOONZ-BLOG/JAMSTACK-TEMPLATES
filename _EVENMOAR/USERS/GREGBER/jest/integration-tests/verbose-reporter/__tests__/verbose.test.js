/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

test('works just fine', () => {
  expect(1).toBe(1);
});

test('does not work', () => {
  expect(1).toBe(2);
});

describe('Verbose', () => {
  it('works', () => {
    expect('apple').toBe('apple');
  });
});
