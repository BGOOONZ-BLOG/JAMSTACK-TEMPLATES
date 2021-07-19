/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// $FlowFixMe: Flow doesn't know about the `module` module
import {builtinModules} from 'module';

// https://github.com/facebook/flow/pull/5160
declare var process: {
  binding(type: string): {},
};

const BUILTIN_MODULES =
  builtinModules ||
  Object.keys(process.binding('natives')).filter(
    (module: string) => !/^internal\//.test(module),
  );

export default function isBuiltinModule(module: string): boolean {
  return BUILTIN_MODULES.indexOf(module) !== -1;
}
