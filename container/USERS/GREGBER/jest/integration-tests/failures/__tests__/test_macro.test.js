/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+jsinfra
 */
'use strict';

const shouldEqual = require('../macros');

test('use some imported macro to make assertion', () => {
  shouldEqual(1, 2);
});
