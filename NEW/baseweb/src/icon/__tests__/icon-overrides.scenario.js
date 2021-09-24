/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import DeleteIcon from '../delete.js';
import PlusIcon from '../plus.js';
import {ThemeProvider, LightTheme, styled} from '../../index.js';
import {getSvgStyles} from '../../icon/styled-components.js';

const XSmallFilled = ({title, ...props}) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z"
        fill="currentColor"
      />
    </svg>
  );
};

const StyledBody = styled('div', {display: 'flex'});
const StyledCloseIcon = styled('svg', props => {
  return {
    ...getSvgStyles(props),
    color: 'pink',
    order: 1,
  };
});

// This scenario proves that local icon overrides take precedence over theme icons
export default function Scenario() {
  const closeRef = React.useRef();
  return (
    <div>
      <ThemeProvider theme={{...LightTheme, icons: {Delete: XSmallFilled}}}>
        <StyledBody>
          <DeleteIcon
            ref={closeRef}
            overrides={{Svg: {component: StyledCloseIcon}}}
          />
          Stuff
        </StyledBody>
      </ThemeProvider>
      <div>
        <PlusIcon size="54px" overrides={{Svg: {props: {size: '54px'}}}} />
      </div>
    </div>
  );
}
