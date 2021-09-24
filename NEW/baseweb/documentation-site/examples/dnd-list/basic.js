// @flow
import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';

export default function Example() {
  return (
    <StatefulList
      initialState={{
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
          'Item 5',
          'Item 6',
        ],
      }}
      onChange={console.log}
    />
  );
}
