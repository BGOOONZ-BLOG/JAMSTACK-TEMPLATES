/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulSelect} from '../index.js';

export default function Scenario() {
  const [blurCount, setBlurCount] = React.useState(0);
  return (
    <React.Fragment>
      <StatefulSelect
        closeOnSelect={false}
        onBlur={() => setBlurCount(prev => prev + 1)}
        options={[
          {id: 'a', label: 'hey!'},
          {id: 'b', label: 'are you listening?'},
          {id: 'c', label: 'look at me!'},
        ]}
      />
      <button>focus target</button>
      <p>{blurCount}</p>
    </React.Fragment>
  );
}
