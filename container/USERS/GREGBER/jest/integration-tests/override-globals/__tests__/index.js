/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import _unusedRequireOverridingPromise from '..';

describe('parent', () => {
  beforeEach(() => {
    console.log('Promise is: ' + Promise.toString());
  });

  describe('child', () => {
    it('works well', () => {
      expect(() => new Promise()).toThrow('Booo');
    });
  });
});
