// @flow
import * as React from 'react';
import {Table} from 'baseui/table';

const DATA = [
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['Name', 'Age', 'Address'];

export default function Example() {
  return <Table columns={COLUMNS} data={DATA} />;
}
