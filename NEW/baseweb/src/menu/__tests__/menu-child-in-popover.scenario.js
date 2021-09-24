/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';

import {StatefulPopover} from '../../popover/index.js';
import {StatefulMenu, NestedMenus} from '../index.js';

const OPEN_RECENT = 'Open Recent ->';
const NEW_BREAKPOINT = 'New Breakpoint ->';
const FILE = [
  {label: 'New File'},
  {label: 'New Window'},
  {label: 'Open...'},
  {label: 'Open Workspace...'},
  {label: OPEN_RECENT},
  {label: 'Add Folder to Workspace...'},
  {label: 'Save'},
  {label: 'Save As...'},
  {label: 'Toggle Breakpoint'},
  {label: NEW_BREAKPOINT},
  {label: 'Close Folder'},
  {label: 'Close Window'},
];

const RECENT_FILES = [
  {label: 'Reopen Closed Editor'},
  {label: '~/workspace/baseui'},
  {label: '~/workspace/styletron'},
  {label: '~/workspace/my-project'},
  {label: 'More...'},
  {label: 'Clear Recently Opened'},
];

const BREAKPOINTS = [
  {label: 'Conditional Breakpoint...'},
  {label: 'Inline Breakpoint'},
  {label: 'Function Breakpoint...'},
  {label: 'Logpoint...'},
];

const Overlay = () => {
  return (
    <div
      style={{
        backgroundColor: 'lightgreen',
        position: 'absolute',
        zIndex: 1,
        height: '400px',
        width: '100%',
        top: '100px',
      }}
    >
      overlay
    </div>
  );
};

const childMenu = items => (
  <StatefulMenu
    items={items}
    overrides={{
      List: {
        style: {width: '300px'},
        props: {'data-e2e': 'child-menu'},
      },
      Option: {
        props: {
          size: 'compact',
        },
      },
    }}
  />
);

export default function Scenario() {
  return (
    <React.Fragment>
      <StatefulPopover
        overrides={{
          Body: {
            style: {zIndex: 3},
          },
        }}
        content={() => (
          <NestedMenus>
            <StatefulMenu
              items={FILE}
              overrides={{
                List: {
                  style: {width: '300px', overflow: 'auto'},
                  props: {'data-e2e': 'parent-menu'},
                },
                Option: {
                  props: {
                    size: 'compact',
                    getChildMenu: item => {
                      if (item.label === OPEN_RECENT) {
                        return childMenu(RECENT_FILES);
                      }

                      if (item.label === NEW_BREAKPOINT) {
                        return childMenu(BREAKPOINTS);
                      }
                    },
                  },
                },
              }}
            />
          </NestedMenus>
        )}
      >
        <button>click</button>
      </StatefulPopover>
      <Overlay />
    </React.Fragment>
  );
}
