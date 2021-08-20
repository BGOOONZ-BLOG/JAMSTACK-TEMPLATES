/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
/* eslint-disable no-extend-native */

'use strict';

// $FlowFixMe
Array.prototype[Symbol.iterator] = null;
// $FlowFixMe
String.prototype[Symbol.iterator] = null;

test('modifying global object does not affect test runner', () => {});
