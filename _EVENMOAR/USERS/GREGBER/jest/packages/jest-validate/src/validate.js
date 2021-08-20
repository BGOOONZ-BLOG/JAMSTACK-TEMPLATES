/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ValidationOptions} from './types';

import defaultConfig from './default_config';

const _validate = (config: Object, options: ValidationOptions) => {
  let hasDeprecationWarnings = false;

  for (const key in config) {
    if (
      options.deprecatedConfig &&
      key in options.deprecatedConfig &&
      typeof options.deprecate === 'function'
    ) {
      const isDeprecatedKey = options.deprecate(
        config,
        key,
        options.deprecatedConfig,
        options,
      );

      hasDeprecationWarnings = hasDeprecationWarnings || isDeprecatedKey;
    } else if (hasOwnProperty.call(options.exampleConfig, key)) {
      if (
        typeof options.condition === 'function' &&
        typeof options.error === 'function' &&
        !options.condition(config[key], options.exampleConfig[key])
      ) {
        options.error(key, config[key], options.exampleConfig[key], options);
      }
    } else {
      options.unknown &&
        options.unknown(config, options.exampleConfig, key, options);
    }
  }

  return {hasDeprecationWarnings};
};

const validate = (config: Object, options: ValidationOptions) => {
  _validate(options, defaultConfig); // validate against jest-validate config

  const defaultedOptions: ValidationOptions = Object.assign(
    {},
    defaultConfig,
    options,
    {title: Object.assign({}, defaultConfig.title, options.title)},
  );

  const {hasDeprecationWarnings} = _validate(config, defaultedOptions);

  return {
    hasDeprecationWarnings,
    isValid: true,
  };
};

export default validate;
