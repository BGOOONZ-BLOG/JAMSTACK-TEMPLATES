/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulPagination} from '../index.js';

export default function Scenario() {
  return (
    <>
      <StatefulPagination
        overrides={{
          NextButton: {props: {'data-test': 'next-button'}},
          PrevButton: {props: {'data-test': 'prev-button'}},
        }}
        size="mini"
        numPages={10}
      />
      <StatefulPagination
        overrides={{
          NextButton: {props: {'data-test': 'next-button'}},
          PrevButton: {props: {'data-test': 'prev-button'}},
        }}
        size="compact"
        numPages={10}
      />
      <StatefulPagination
        overrides={{
          NextButton: {props: {'data-test': 'next-button'}},
          PrevButton: {props: {'data-test': 'prev-button'}},
        }}
        numPages={10}
      />
      <StatefulPagination
        overrides={{
          NextButton: {props: {'data-test': 'next-button'}},
          PrevButton: {props: {'data-test': 'prev-button'}},
        }}
        numPages={10}
        size="large"
      />
    </>
  );
}
