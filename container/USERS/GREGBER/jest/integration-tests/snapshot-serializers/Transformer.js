/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  process(src, filename, config, options) {
    if (/bar.js$/.test(filename)) {
      return `${src};\nmodule.exports = createPlugin('bar');`;
    }
    return src;
  },
};
