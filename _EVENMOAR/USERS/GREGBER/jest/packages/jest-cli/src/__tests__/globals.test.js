/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

describe('Common globals', () => {
  it('check process', () => {
    if (Symbol && Symbol.toStringTag) {
      expect(Object.prototype.toString.call(global.process)).toBe(
        '[object process]',
      );
    }
  });
});
