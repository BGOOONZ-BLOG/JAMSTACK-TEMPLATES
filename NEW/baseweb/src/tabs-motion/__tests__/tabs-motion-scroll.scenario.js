/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import {Tab, Tabs} from '../index.js';

export default function Scenario() {
  const [activeKey, setActiveKey] = React.useState('8');
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => setActiveKey(activeKey)}
    >
      <Tab title="One">One</Tab>
      <Tab title="Two">Two</Tab>
      <Tab title="Three">Three</Tab>
      <Tab title="Four">Four</Tab>
      <Tab title="Five">Five</Tab>
      <Tab title="Six">Six</Tab>
      <Tab title="Seven">Seven</Tab>
      <Tab title="Eight">Eight</Tab>
      <Tab title="Nine">Nine</Tab>
      <Tab title="Ten">Ten</Tab>
      <Tab title="Eleven">Eleven</Tab>
      <Tab title="Twelve">Twelve</Tab>
      <Tab title="Thirteen">Thirteen</Tab>
      <Tab title="Fourteen">Fourteen</Tab>
      <Tab title="Fifteen">Fifteen</Tab>
      <Tab title="Sixteen">Sixteen</Tab>
      <Tab title="Seventeen">Seventeen</Tab>
      <Tab title="Eighteen">Eighteen</Tab>
      <Tab title="Nineteen">Nineteen</Tab>
      <Tab title="Twenty">Twenty</Tab>
    </Tabs>
  );
}
