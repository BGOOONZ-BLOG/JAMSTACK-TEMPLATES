/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ValidationOptions} from './types';

const config: ValidationOptions = {
  comment: '  A comment',
  condition: (option, validOption) => true,
  deprecate: (config, option, deprecatedOptions, options) => false,
  deprecatedConfig: {
    key: config => {},
  },
  error: (option, received, defaultValue, options) => {},
  exampleConfig: {key: 'value', test: 'case'},
  title: {
    deprecation: 'Deprecation Warning',
    error: 'Validation Error',
    warning: 'Validation Warning',
  },
  unknown: (config, option, options) => {},
};

export default config;
