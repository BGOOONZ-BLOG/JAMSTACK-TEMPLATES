/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Event, State, EventHandler} from 'types/Circus';

import {makeDescribe} from './utils';
import eventHandler from './event_handler';
import formatNodeAssertErrors from './format_node_assert_errors';

const eventHandlers: Array<EventHandler> = [
  eventHandler,
  formatNodeAssertErrors,
];

export const ROOT_DESCRIBE_BLOCK_NAME = 'ROOT_DESCRIBE_BLOCK';
const STATE_SYM = Symbol('JEST_STATE_SYMBOL');

const ROOT_DESCRIBE_BLOCK = makeDescribe(ROOT_DESCRIBE_BLOCK_NAME);
const INITIAL_STATE: State = {
  currentDescribeBlock: ROOT_DESCRIBE_BLOCK,
  expand: undefined,
  hasFocusedTests: false,
  rootDescribeBlock: ROOT_DESCRIBE_BLOCK,
  testTimeout: 5000,
};

global[STATE_SYM] = INITIAL_STATE;

export const getState = (): State => global[STATE_SYM];
export const setState = (state: State): State => (global[STATE_SYM] = state);

export const dispatch = (event: Event): void => {
  for (const handler of eventHandlers) {
    handler(event, getState());
  }
};

export const addEventHandler = (handler: EventHandler): void => {
  eventHandlers.push(handler);
};
