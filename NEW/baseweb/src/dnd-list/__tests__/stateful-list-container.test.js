/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render} from '@testing-library/react';
import {StatefulListContainer, STATE_CHANGE_TYPE} from '../index.js';

describe('StatefulListContainer', () => {
  it('basic render', () => {
    const props = {
      overrides: {
        Root: function CustomRoot() {
          return <span />;
        },
      },
      initialState: {
        items: ['Item 1', 'Item 2'],
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn(() => null);
    render(
      <StatefulListContainer {...props}>{children}</StatefulListContainer>,
    );
    expect(children).toHaveBeenCalledTimes(1);
  });

  it('children function receives onChange handler', () => {
    const props = {
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn(() => null);
    const event = {
      newIndex: undefined,
      newState: [undefined],
      oldIndex: undefined,
    };

    render(
      <StatefulListContainer {...props}>{children}</StatefulListContainer>,
    );

    expect(children).toHaveBeenCalledTimes(1);

    // onChange is passed to children function
    const childrenOnChangeProp = children.mock.calls[0][0].onChange;
    expect(childrenOnChangeProp).not.toBe(props.onChange);

    // user's onChange handler is called
    childrenOnChangeProp(event);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenLastCalledWith(event);
  });

  it('stateReducer', () => {
    const props = {
      initialState: {
        items: ['Item 1', 'Item 2'],
      },
      stateReducer: jest.fn(),
    };
    const children = jest.fn(() => null);

    render(
      <StatefulListContainer {...props}>{children}</StatefulListContainer>,
    );

    props.stateReducer.mockReturnValueOnce({items: ['Item 2', 'Item 1']});
    const targetRect: any = {};
    children.mock.calls[0][0].onChange({
      oldIndex: 0,
      newIndex: 1,
      targetRect,
    });

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenLastCalledWith(
      STATE_CHANGE_TYPE.change,
      {items: ['Item 2', 'Item 1']},
      {items: ['Item 1', 'Item 2']},
    );
  });
});
