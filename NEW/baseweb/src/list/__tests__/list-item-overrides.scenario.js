/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {ListItem, ListItemLabel} from '../index.js';

export default function Scenario() {
  return (
    <ul
      style={{
        width: '375px',
        padding: '24px',
        backgroundColor: 'lightskyblue',
      }}
    >
      <ListItem>
        <ListItemLabel>123</ListItemLabel>
        <ListItemLabel
          overrides={{
            LabelContent: {
              style: ({$theme}) => ({color: $theme.colors.positive}),
            },
          }}
        >
          ABC
        </ListItemLabel>
      </ListItem>
    </ul>
  );
}
