/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ValidationOptions} from './types';

import {deprecationWarning} from './deprecated';
import {unknownOptionWarning} from './warnings';
import {errorMessage} from './errors';
import exampleConfig from './example_config';
import validationCondition from './condition';
import {ERROR, DEPRECATION, WARNING} from './utils';

export default ({
  comment: '',
  condition: validationCondition,
  deprecate: deprecationWarning,
  deprecatedConfig: {},
  error: errorMessage,
  exampleConfig,
  title: {
    deprecation: DEPRECATION,
    error: ERROR,
    warning: WARNING,
  },
  unknown: unknownOptionWarning,
}: ValidationOptions);
