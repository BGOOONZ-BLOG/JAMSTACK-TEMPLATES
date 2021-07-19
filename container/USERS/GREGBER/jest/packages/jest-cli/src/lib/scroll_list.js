/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

export type ScrollOptions = {
  offset: number,
  max: number,
};

export default function scroll(size: number, {offset, max}: ScrollOptions) {
  let start = 0;
  let index = Math.min(offset, size);

  const halfScreen = max / 2;

  if (index <= halfScreen) {
    start = 0;
  } else {
    if (size >= max) {
      start = Math.min(index - halfScreen - 1, size - max);
    }
    index = Math.min(index - start, size);
  }

  return {
    end: Math.min(size, start + max),
    index,
    start,
  };
}
