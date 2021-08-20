/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (require('./RegularModule').getModuleStateValue()) {
  console.log('Hello, world!');
} else {
  console.log('Automocking is not properly disabled in jest-runtime.');
}
