/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Button} from '../../button/index.js';
import {StatefulSelect} from '../../select/index.js';
import {Drawer} from '../index.js';

const Example = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer animate={false} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <StatefulSelect
          options={[
            {id: 'AliceBlue', color: '#F0F8FF'},
            {id: 'AntiqueWhite', color: '#FAEBD7'},
            {id: 'Aqua', color: '#00FFFF'},
            {id: 'Aquamarine', color: '#7FFFD4'},
            {id: 'Azure', color: '#F0FFFF'},
            {id: 'Beige', color: '#F5F5DC'},
          ]}
          overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
          labelKey="id"
          valueKey="color"
          placeholder="Start searching"
        />
      </Drawer>
    </div>
  );
};

export default Example;
