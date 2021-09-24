/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, getByRole, getByText} from '@testing-library/react';

import {ProgressBar} from '../index.js';

describe('Stateless progress bar', function() {
  it('should render component', () => {
    const {container} = render(<ProgressBar value={75} />);
    getByRole(container, 'progressbar');
  });

  it('should render label', () => {
    const label = 'label';
    const {container} = render(
      <ProgressBar value={75} getProgressLabel={() => label} showLabel />,
    );
    getByText(container, label);
  });
});
