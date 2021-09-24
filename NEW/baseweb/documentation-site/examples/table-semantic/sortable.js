// @flow
import React, {useState, useMemo} from 'react';
import {StyledLink as Link} from 'baseui/link';
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';

export default function Example() {
  const [sortColumn, setSortColumn] = useState('bar');
  const [sortAsc, setSortAsc] = useState(true);
  const [data] = useState([
    {
      foo: 10,
      bar: 'banana',
      url: 'https://example.com/b',
    },
    {
      foo: 1,
      bar: 'carrot',
      url: 'https://example.com/c',
    },
    {
      foo: 2,
      bar: 'apple',
      url: 'https://example.com/a',
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
        {row => <Link href={row.url}>{row.bar}</Link>}
      </TableBuilderColumn>
      <TableBuilderColumn
        id="foo"
        header="Quantity"
        numeric
        sortable
      >
        {row => row.foo}
      </TableBuilderColumn>
    </TableBuilder>
  );
}
