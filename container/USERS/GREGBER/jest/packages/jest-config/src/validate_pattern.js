/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default function validatePattern(pattern: string) {
  if (pattern) {
    try {
      // eslint-disable-next-line no-new
      new RegExp(pattern, 'i');
    } catch (e) {
      return false;
    }
  }

  return true;
}
