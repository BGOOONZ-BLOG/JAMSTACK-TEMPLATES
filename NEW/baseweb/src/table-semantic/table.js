/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {
  StyledRoot,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledTableLoadingMessage,
  StyledTableEmptyMessage,
} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

import type {TablePropsT} from './types.js';

export default class Table extends React.Component<TablePropsT> {
  static defaultProps = {
    columns: [],
    data: [[]],
    loadingMessage: 'Loading...',
  };

  render() {
    const {
      overrides = {},
      columns,
      data,
      horizontalScrollWidth,
      isLoading,
      loadingMessage,
      emptyMessage,
      ...rest
    } = this.props;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    const [Table, tableProps] = getOverrides(overrides.Table, StyledTable);

    const [TableHead, tableHeadProps] = getOverrides(
      overrides.TableHead,
      StyledTableHead,
    );

    const [TableHeadRow, tableHeadRowProps] = getOverrides(
      overrides.TableHeadRow,
      StyledTableHeadRow,
    );

    const [TableHeadCell, tableHeadCellProps] = getOverrides(
      overrides.TableHeadCell,
      StyledTableHeadCell,
    );

    const [TableBody, tableBodyProps] = getOverrides(
      overrides.TableBody,
      StyledTableBody,
    );

    const [TableBodyRow, tableBodyRowProps] = getOverrides(
      overrides.TableBodyRow,
      StyledTableBodyRow,
    );

    const [TableBodyCell, tableBodyCellProps] = getOverrides(
      overrides.TableBodyCell,
      StyledTableBodyCell,
    );

    const [TableLoadingMessage, tableLoadingMessageProps] = getOverrides(
      overrides.TableLoadingMessage,
      StyledTableLoadingMessage,
    );

    const [TableEmptyMessage, tableEmptyMessageProps] = getOverrides(
      overrides.TableEmptyMessage,
      StyledTableEmptyMessage,
    );

    const isEmpty = !isLoading && data.length === 0;
    const isRendered = !isLoading && !isEmpty;

    return (
      <Root data-baseweb="table-semantic" {...rootProps} {...rest}>
        <Table $width={horizontalScrollWidth} {...tableProps}>
          <TableHead {...tableHeadProps}>
            <TableHeadRow {...tableHeadRowProps}>
              {columns.map((col, colIndex) => (
                <TableHeadCell
                  key={colIndex}
                  $col={col}
                  $colIndex={colIndex}
                  {...tableHeadCellProps}
                >
                  {col}
                </TableHeadCell>
              ))}
            </TableHeadRow>
          </TableHead>
          <TableBody {...tableBodyProps}>
            {isLoading && (
              <tr>
                <td colSpan={columns.length}>
                  <TableLoadingMessage {...tableLoadingMessageProps}>
                    {typeof loadingMessage === 'function'
                      ? loadingMessage()
                      : loadingMessage}
                  </TableLoadingMessage>
                </td>
              </tr>
            )}
            {isEmpty && emptyMessage && (
              <tr>
                <td colSpan={columns.length}>
                  <TableEmptyMessage {...tableEmptyMessageProps}>
                    {typeof emptyMessage === 'function'
                      ? emptyMessage()
                      : emptyMessage}
                  </TableEmptyMessage>
                </td>
              </tr>
            )}
            {isRendered &&
              data.map((row, rowIndex) => (
                <TableBodyRow
                  key={rowIndex}
                  $row={row}
                  $rowIndex={rowIndex}
                  {...tableBodyRowProps}
                >
                  {columns.map((col, colIndex) => (
                    <TableBodyCell
                      key={colIndex}
                      $col={col}
                      $colIndex={colIndex}
                      $row={row}
                      $rowIndex={rowIndex}
                      {...tableBodyCellProps}
                    >
                      {row[colIndex]}
                    </TableBodyCell>
                  ))}
                </TableBodyRow>
              ))}
          </TableBody>
        </Table>
      </Root>
    );
  }
}
