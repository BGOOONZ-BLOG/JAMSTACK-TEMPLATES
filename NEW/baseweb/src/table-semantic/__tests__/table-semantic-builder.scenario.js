/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState, useMemo} from 'react';
import {TableBuilder, TableBuilderColumn} from '../index.js';

export default function Scenario() {
  const [sortColumn, setSortColumn] = useState('bar');
  const [sortAsc, setSortAsc] = useState(true);
  const [data] = useState([
    {
      foo: 10,
      bar: 'banana',
      url: 'https://example.com/b',
      selected: true,
    },
    {
      foo: 1,
      bar: 'carrot',
      url: 'https://example.com/c',
      selected: false,
    },
    {
      foo: 2,
      bar: 'apple',
      url: 'https://example.com/a',
      selected: false,
    },
  ]);

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      const left = sortAsc ? a : b;
      const right = sortAsc ? b : a;
      const leftValue = String(left[sortColumn]);
      const rightValue = String(right[sortColumn]);

      return leftValue.localeCompare(rightValue, 'en', {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }, [sortColumn, sortAsc, data]);

  function handleSort(id) {
    if (id === sortColumn) {
      setSortAsc(asc => !asc);
    } else {
      setSortColumn(id);
      setSortAsc(true);
    }
  }

  return (
    <TableBuilder
      data={sortedData}
      sortColumn={sortColumn}
      sortOrder={sortAsc ? 'ASC' : 'DESC'}
      onSort={handleSort}
    >
      <TableBuilderColumn id="bar" header="Produce" sortable>
        {row => <a href={row.url}>{row.bar}</a>}
      </TableBuilderColumn>
      <TableBuilderColumn id="foo" header="Quantity" numeric sortable>
        {row => row.foo}
      </TableBuilderColumn>
    </TableBuilder>
  );
}
