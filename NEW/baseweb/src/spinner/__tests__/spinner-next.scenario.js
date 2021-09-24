/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledSpinnerNext, SIZE} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <StyledSpinnerNext $size={SIZE.small} />
      <StyledSpinnerNext $size={SIZE.medium} />
      <StyledSpinnerNext $size={SIZE.large} />
    </React.Fragment>
  );
}
