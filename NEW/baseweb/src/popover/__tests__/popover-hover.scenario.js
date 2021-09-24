/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {StatefulPopover, TRIGGER_TYPE} from '../index.js';

export default function Scenario() {
  return (
    <StatefulPopover
      accessibilityType={'tooltip'}
      content={<div>content</div>}
      triggerType={TRIGGER_TYPE.hover}
    >
      <Button>Open</Button>
    </StatefulPopover>
  );
}
