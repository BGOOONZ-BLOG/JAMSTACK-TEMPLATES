/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, getByTestId, getByText} from '@testing-library/react';

import {HeaderNavigation} from '../index.js';

describe('Stateless header navigation', function() {
  it('should render component', function() {
    const {container} = render(
      <HeaderNavigation>hello world</HeaderNavigation>,
    );
    getByText(container, 'hello world');
  });

  it('applies root overrides', function() {
    const {container} = render(
      <HeaderNavigation overrides={{Root: {props: {'data-testid': 'root'}}}}>
        hello world
      </HeaderNavigation>,
    );
    getByTestId(container, 'root');
  });
});
