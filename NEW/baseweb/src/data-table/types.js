/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {COLUMNS, SORT_DIRECTIONS} from './constants.js';

export type SortDirectionsT =
  | typeof SORT_DIRECTIONS.ASC
  | typeof SORT_DIRECTIONS.DESC
  | null;

export type ColumnsT =
  | typeof COLUMNS.ANCHOR
  | typeof COLUMNS.BOOLEAN
  | typeof COLUMNS.CATEGORICAL
  | typeof COLUMNS.CUSTOM
  | typeof COLUMNS.DATETIME
  | typeof COLUMNS.NUMERICAL
  | typeof COLUMNS.STRING;

// These options are available on all column kinds. Most have additional
// unique options depending on the data visualization requirements.
export type SharedColumnOptionsT<ValueT> = {|
  cellBlockAlign?: 'start' | 'center' | 'end',
  fillWidth?: boolean,
  filterable?: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => ValueT,
  maxWidth?: number,
  minWidth?: number,
  sortable?: boolean,
  title: string,
|};

export type RenderCellT<ValueT> = React.AbstractComponent<{
  value: ValueT,
  isMeasured?: boolean,
  isSelected?: boolean,
  onSelect?: () => void,
  textQuery?: string,
  x: number,
  y: number,
}>;

export type RenderFilterT<ValueT, FilterParamsT> = React.AbstractComponent<{|
  close: () => void,
  data: ValueT[],
  filterParams?: FilterParamsT,
  setFilter: FilterParamsT => void,
|}>;

// eslint-disable-next-line flowtype/no-weak-types
export type ColumnT<ValueT = any, FilterParamsT = any> = {|
  ...SharedColumnOptionsT<ValueT>,
  kind: ColumnsT,
  sortable: boolean,
  renderCell: RenderCellT<ValueT>,
  renderFilter: RenderFilterT<ValueT, FilterParamsT>,
  buildFilter: FilterParamsT => ValueT => boolean,
  textQueryFilter?: (string, ValueT) => boolean,
  sortFn: (ValueT, ValueT) => number,
|};

export type RowT = {
  id: number | string,
  // eslint-disable-next-line flowtype/no-weak-types
  data: any,
};

export type BatchActionT = {|
  label: string,
  onClick: ({
    clearSelection: () => mixed,
    event: SyntheticEvent<HTMLButtonElement>,
    selection: RowT[],
  }) => mixed,
  renderIcon?: React.AbstractComponent<{|size: number|}>,
|};

export type RowActionT = {|
  label: string,
  onClick: ({event: SyntheticEvent<HTMLButtonElement>, row: RowT}) => mixed,
  renderIcon: React.AbstractComponent<{|size: number|}>,
|};

export type StatefulDataTablePropsT = {|
  batchActions?: BatchActionT[],
  columns: ColumnT<>[],
  emptyMessage?: string | React.AbstractComponent<{||}>,
  filterable?: boolean,
  initialFilters?: Map<string, {description: string}>,
  initialSelectedRowIds?: Set<number | string>,
  initialSortIndex?: number,
  initialSortDirection?: SortDirectionsT,
  loading?: boolean,
  loadingMessage?: string | React.AbstractComponent<{||}>,
  onFilterAdd?: (string, {description: string}) => mixed,
  onFilterRemove?: string => mixed,
  onIncludedRowsChange?: (rows: RowT[]) => void,
  onRowHighlightChange?: (rowIndex: number, row: RowT) => void,
  onSelectionChange?: (RowT[]) => mixed,
  resizableColumnWidths?: boolean,
  rows: RowT[],
  rowActions?: RowActionT[],
  rowHeight?: number,
  rowHighlightIndex?: number,
  searchable?: boolean,
|};

export type DataTablePropsT = {|
  ...StatefulDataTablePropsT,
  emptyMessage?: string | React.AbstractComponent<{||}>,
  filters?: Map<string, {description: string}>,
  loading?: boolean,
  loadingMessage?: string | React.AbstractComponent<{||}>,
  onIncludedRowsChange?: (rows: RowT[]) => void,
  onRowHighlightChange?: (rowIndex: number, row: RowT) => void,
  onSelectMany?: (rows: RowT[]) => void,
  onSelectNone?: () => void,
  onSelectOne?: (row: RowT) => void,
  onSort?: (columnIndex: number) => void,
  resizableColumnWidths?: boolean,
  rowHighlightIndex?: number,
  selectedRowIds?: Set<string | number>,
  sortIndex?: number,
  sortDirection?: SortDirectionsT,
  textQuery?: string,
|};

export type StatefulContainerPropsT = {|
  ...StatefulDataTablePropsT,
  children: ({|
    filters: Map<string, {description: string}>,
    onFilterAdd: (title: string, filterParams: {description: string}) => void,
    onFilterRemove: (title: string) => void,
    onIncludedRowsChange: (rows: RowT[]) => void,
    onRowHighlightChange: (rowIndex: number, row: RowT) => void,
    onSelectMany: (rows: RowT[]) => void,
    onSelectNone: () => void,
    onSelectOne: (row: RowT) => void,
    onSort: (columnIndex: number) => void,
    onTextQueryChange: (query: string) => void,
    resizableColumnWidths: boolean,
    rowHighlightIndex?: number,
    selectedRowIds: Set<string | number>,
    sortIndex: number,
    sortDirection: SortDirectionsT,
    textQuery: string,
  |}) => React.Node,
|};
