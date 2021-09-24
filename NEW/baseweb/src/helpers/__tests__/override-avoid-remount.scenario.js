/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {styled} from '../../styles/index.js';
import {getOverrides, type OverrideT} from '../overrides.js';

const StyledBase = styled('div', {});

function Child(props: {overrides: {Base: OverrideT}}) {
  const [Base, baseProps] = getOverrides(props.overrides.Base, StyledBase);
  return (
    <div>
      <Base {...baseProps}>default children</Base>
    </div>
  );
}

// eslint-disable-next-line flowtype/no-weak-types
function BaseOverride(props: any) {
  return <input onChange={props.onChange} value={props.value} />;
}

export default function Parent() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <Child
        overrides={{
          Base: {
            component: BaseOverride,
            props: {
              onChange: event => setValue(event.target.value),
              value,
            },
          },
        }}
      />
    </div>
  );
}
