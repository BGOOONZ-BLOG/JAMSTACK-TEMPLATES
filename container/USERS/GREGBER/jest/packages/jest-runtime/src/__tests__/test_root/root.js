/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule root
 */

'use strict';

require('ExclusivelyManualMock');
require('ManuallyMocked');
require('ModuleWithSideEffects');
require('RegularModule');

// We only care about the static analysis, not about the runtime.
const lazyRequire = () => {
  require('image!not_really_a_module');
  require('cat.png');
  require('dog.png');
};

exports.jest = jest;
exports.lazyRequire = lazyRequire;
