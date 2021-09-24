/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/no-weak-types */

import * as React from 'react';
import {getInitialStyle} from 'styletron-standard';
import {LightTheme} from '../../themes/index.js';
import createMockTheme from '../../test/create-mock-theme.js';
import type {ThemeT} from '../../styles/types.js';
import type {StyletronComponent} from '../styled.js';
type ObjOrFnT = {} | (({}) => {});

type PropsT = {
  $style?: ObjOrFnT,
  $theme?: ThemeT,
  forwardedRef: any,
};

type StateT = {styles?: {}};

const MOCK_THEME = createMockTheme(LightTheme);
const IDENTITY = x => x;

export function useStyletron() {
  function css(styles: Object) {
    return {
      label: 'useStyletron mock describes the applied css properties',
      ...styles,
    };
  }

  return [css, MOCK_THEME];
}

export function styled(
  ElementName: string | React.ComponentType<{}>,
  objOrFn?: ObjOrFnT = {},
) {
  class MockStyledComponent extends React.Component<PropsT, StateT> {
    static displayName = 'MockStyledComponent';

    state = {};

    static getDerivedStateFromProps(props: PropsT) {
      const styleFnArg = {
        ...props,
        // If we use defaultProps, $theme unnecessarily ends up in snapshots
        $theme: props.$theme || MOCK_THEME,
      };

      let styles =
        typeof objOrFn === 'function' ? objOrFn(styleFnArg) : objOrFn;

      // Check for runtime overrides
      let {$style} = props;
      if (typeof $style === 'function') {
        $style = $style(styleFnArg);
      }
      if ($style) {
        styles = {...styles, ...$style};
      }

      return {styles};
    }

    getPassedProps() {
      const {forwardedRef, ...restProps} = this.props;
      return Object.keys(restProps).reduce((acc, key) => {
        if (key[0] !== '$') {
          acc[key] = restProps[key];
        }
        return acc;
      }, {});
    }

    render() {
      return (
        <ElementName
          ref={this.props.forwardedRef}
          styled-component="true"
          test-style={JSON.stringify(this.state.styles, null, 2)}
          {...this.getPassedProps()}
        />
      );
    }
  }

  // $FlowFixMe
  MockStyledComponent.__STYLETRON__ = {
    getInitialStyle,
    wrapper: IDENTITY,
    base: ElementName,
  };

  return React.forwardRef<PropsT, HTMLElement>((props, ref) => (
    <MockStyledComponent forwardedRef={ref} {...props} />
  ));
}

export const withStyle = styled;

export function withWrapper(
  StyledElement: StyletronComponent<any>,
  wrapperFn: (StyletronComponent<any>) => any => any,
) {
  return React.forwardRef<any, any>((props, ref) =>
    wrapperFn(StyledElement)({ref: ref, ...props, $theme: MOCK_THEME}),
  );
}
