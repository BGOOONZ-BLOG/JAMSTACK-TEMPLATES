/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {EmoticonRating} from '../index.js';

export default function Scenario() {
  const [value, setValue] = React.useState(3);
  return (
    <EmoticonRating value={value} onChange={({value: v}) => setValue(v)} />
  );
}
