/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, getByTestId} from '@testing-library/react';
import {StatefulList} from '../index.js';

describe('StatefulList', () => {
  it('basic render', () => {
    function CustomRoot() {
      return <span data-testid="root" />;
    }
    const props = {
      overrides: {
        Root: CustomRoot,
      },
      initialState: {
        items: ['Item 1', 'Item 2'],
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const {container} = render(<StatefulList {...props} />);
    getByTestId(container, 'root');
  });
});
