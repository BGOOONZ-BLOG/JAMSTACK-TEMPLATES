/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

/* eslint-disable jsx-a11y/accessible-emoji */

import * as React from 'react';
import {Tab, Tabs} from '../index.js';
import {Button, KIND} from '../../button/index.js';
import {ArrowUp, ArrowRight, ArrowLeft} from '../../icon/index.js';

const TabOverrides = {
  Tab: {style: {backgroundColor: 'aquamarine'}},
  ArtworkContainer: {style: {backgroundColor: 'gold'}},
  TabPanel: {
    style: {background: 'linear-gradient(360deg, skyblue, transparent)'},
  },
};

export default function Scenario() {
  const [activeKey, setActiveKey] = React.useState('0');
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => setActiveKey(activeKey)}
      overrides={{
        Root: {style: {backgroundColor: 'pink'}},
        TabList: {style: {backgroundColor: 'skyblue'}},
        TabHighlight: {style: {backgroundColor: 'seagreen'}},
        TabBorder: {style: {backgroundColor: 'coral'}},
      }}
    >
      <Tab title="Robot" artwork={ArrowLeft} overrides={TabOverrides}>
        <Button kind={KIND.secondary}>🤖</Button>
      </Tab>
      <Tab title="Monster" artwork={ArrowUp} overrides={TabOverrides}>
        <Button kind={KIND.secondary}>👺</Button>
      </Tab>
      <Tab title="Watermelon" artwork={ArrowRight} overrides={TabOverrides}>
        <Button kind={KIND.secondary}>🍉</Button>
      </Tab>
    </Tabs>
  );
}
