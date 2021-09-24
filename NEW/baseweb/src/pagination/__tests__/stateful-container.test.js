/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import * as React from 'react';
import {render} from '@testing-library/react';

import {STATE_CHANGE_TYPE} from '../constants.js';
import StatefulContainer from '../stateful-container.js';

const mockChildrenFn = jest.fn().mockImplementation(() => <div />);
const mockOnPageChangeFn = jest.fn();
const mockStateReducerFn = jest
  .fn()
  .mockImplementation((changeType, changes) => (changes: any));

function getSharedProps() {
  return {
    numPages: 7,
    children: mockChildrenFn,
    onPageChange: mockOnPageChangeFn,
    stateReducer: mockStateReducerFn,
  };
}

describe('Pagination StatefulContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and passes required props to children function', () => {
    render(<StatefulContainer {...getSharedProps()} />);
    expect(mockChildrenFn.mock.calls[0][0]).toHaveProperty('currentPage', 1);
    expect(mockChildrenFn.mock.calls[0][0]).toHaveProperty('onPageChange');
  });

  it('with initialState', () => {
    const props = {
      ...getSharedProps(),
      initialState: {
        currentPage: 5,
      },
    };
    render(<StatefulContainer {...props} />);
    expect(mockChildrenFn.mock.calls[0][0]).toHaveProperty('currentPage', 5);
  });

  it('onPageChange called if and only if page has changed', () => {
    render(<StatefulContainer {...getSharedProps()} />);
    mockChildrenFn.mock.calls[0][0].onPageChange({nextPage: 5});
    expect(mockChildrenFn.mock.calls[1][0]).toHaveProperty('currentPage', 5);
    expect(mockOnPageChangeFn.mock.calls.length).toBe(1);
    mockChildrenFn.mock.calls[1][0].onPageChange({nextPage: 5});
    expect(mockOnPageChangeFn.mock.calls.length).toBe(1);
  });

  it('internalSetState calls stateReducer with the correct args', () => {
    render(<StatefulContainer {...getSharedProps()} />);
    mockChildrenFn.mock.calls[0][0].onPageChange({nextPage: 2});
    expect(mockStateReducerFn.mock.calls[0][0]).toEqual(
      STATE_CHANGE_TYPE.changePage,
    );
    expect(mockStateReducerFn.mock.calls[0][1]).toEqual({currentPage: 2});
  });

  it('internalSetState should still call setState with no stateReducer', () => {
    const props = {
      ...getSharedProps(),
      stateReducer: null,
    };
    // $FlowFixMe
    render(<StatefulContainer {...props} />);
    mockChildrenFn.mock.calls[0][0].onPageChange({nextPage: 2});
    expect(mockChildrenFn.mock.calls[1][0]).toHaveProperty('currentPage', 2);
  });
});
