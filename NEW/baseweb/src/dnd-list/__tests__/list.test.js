/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getAllByTestId} from '@testing-library/react';

import {List} from '../index.js';

describe('List', () => {
  //$FlowFixMe
  console.warn = jest.fn(); // eslint-disable-line
  it('basic render', () => {
    const {container} = render(
      <List
        items={['Item 1', 'Item 2']}
        onChange={jest.fn()}
        overrides={{Item: {props: {'data-testid': 'item'}}}}
      />,
    );
    expect(getAllByTestId(container, 'item')).toHaveLength(2);
  });

  it('label override', () => {
    const CustomLabel = ({children}) => (
      <span data-testid="label">Child: {children}</span>
    );
    const overrides = {
      Label: CustomLabel,
    };
    const {container} = render(
      <List
        items={['Item 1', 'Item 2']}
        onChange={jest.fn()}
        overrides={overrides}
      />,
    );
    expect(getAllByTestId(container, 'label')).toHaveLength(2);
  });
});
