import React from 'react';
import reqwest from 'reqwest-without-xhr2';
import Table from 'rc-table';
import Checkbox from '../checkbox';
import FilterDropdown from './filterDropdown';
import Pagination from '../pagination';
import objectAssign from 'object-assign';

function noop() {
}

function defaultResolve(data) {
  return data || [];
}

class DataSource {
  init(config) {
    this.config = config;
    this.url = config.url || '';
    this.resolve = config.resolve || defaultResolve;
    this.getParams = config.getParams || noop;
    this.getPagination = config.getPagination || noop;
    this.headers = config.headers || {};
    this.data = config.data || {};
  }

  constructor(config) {
    if (config) {
      this.init(config);
    }
  }

  clone(config = {}) {
    return new DataSource(objectAssign({}, this.config, config));
  }
}

let AntTable = React.createClass({
  getInitialState() {
    return {
      // 减少状态
      selectedRowKeys: [],
      // only for remote
      data: [],
      dataSource: this.props.dataSource,
      filters: {},
      loading: false,
      sortColumn: '',
      sortOrder: '',
      sorter: null,
      pagination: this.hasPagination() ? objectAssign({
        pageSize: 10,
        current: 1
      }, this.props.pagination) : {}
    };
  },

  getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      size: 'normal',
      bordered: false
    };
  },

  propTypes: {
    dataSource: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.instanceOf(DataSource)])
  },

  componentWillReceiveProps(nextProps) {
    if (('pagination' in nextProps) && nextProps.pagination !== false) {
      this.setState({
        pagination: objectAssign({}, this.state.pagination, nextProps.pagination)
      });
    }
    // 外界只有 dataSource 的变化会触发新请求
    if ('dataSource' in nextProps &&
        nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        selectedRowKeys: [],
        dataSource: nextProps.dataSource,
        loading: true
      }, this.fetch);
    }
    if (nextProps.columns !== this.props.columns) {
      this.setState({
        filters: {}
      });
    }
  },

  hasPagination(pagination) {
    if (pagination === undefined) {
      pagination = this.props.pagination;
    }
    return pagination !== false;
  },

  isLocalDataSource() {
    return Array.isArray(this.state.dataSource);
  },

  getRemoteDataSource() {
    return this.state.dataSource;
  },

  toggleSortOrder(order, column) {
    let sortColumn = this.state.sortColumn;
    let sortOrder = this.state.sortOrder;
    let sorter;
    // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
    let isSortColumn = this.isSortColumn(column);
    if (!isSortColumn) {  // 当前列未排序
      sortOrder = order;
      sortColumn = column;
    } else {                      // 当前列已排序
      if (sortOrder === order) {  // 切换为未排序状态
        sortOrder = '';
        sortColumn = null;
      } else {                    // 切换为排序状态
        sortOrder = order;
      }
    }
    if (this.isLocalDataSource()) {
      sorter = function () {
        let result = column.sorter.apply(this, arguments);
        if (sortOrder === 'ascend') {
          return result;
        } else if (sortOrder === 'descend') {
          return -result;
        }
      };
    }
    this.fetch({
      sortOrder: sortOrder,
      sortColumn: sortColumn,
      sorter: sorter
    });
  },

  handleFilter(column, filters) {
    filters = objectAssign({}, this.state.filters, {
      [this.getColumnKey(column)]: filters
    });
    this.fetch({
      selectedRowKeys: [],
      filters: filters
    });
  },

  handleSelect(record, rowIndex, e) {
    let checked = e.target.checked;
    let selectedRowKeys = this.state.selectedRowKeys.concat();
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => {
        return key !== i;
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
    if (this.props.rowSelection.onSelect) {
      let data = this.getCurrentPageData();
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  },

  handleSelectAllRow(e) {
    let checked = e.target.checked;
    let data = this.getCurrentPageData();
    let selectedRowKeys = checked ? data.map((item, i) => {
      return this.getRecordKey(item, i);
    }) : [];
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
    if (this.props.rowSelection.onSelectAll) {
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelectAll(checked, selectedRows);
    }
  },

  handlePageChange(current) {
    let pagination = objectAssign({}, this.state.pagination);
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    this.fetch({
      // 防止内存泄漏，只维持当页
      selectedRowKeys: [],
      pagination: pagination
    });
  },

  renderSelectionCheckBox(value, record, index) {
    let rowIndex = this.getRecordKey(record, index); // 从 1 开始
    let checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    return <Checkbox checked={checked} onChange={this.handleSelect.bind(this, record, rowIndex)}/>;
  },

  getRecordKey(record, index) {
    return record.key || index;
  },

  renderRowSelection() {
    let columns = this.props.columns.concat();
    if (this.props.rowSelection) {
      let data = this.getCurrentPageData();
      let checked;
      if (!data.length) {
        checked = false;
      } else {
        checked = data.every((item, i) => {
          let key = this.getRecordKey(item, i);
          return this.state.selectedRowKeys.indexOf(key) >= 0;
        });
      }
      let checkboxAll = <Checkbox checked={checked} onChange={this.handleSelectAllRow}/>;
      let selectionColumn = {
        key: 'selection-column',
        title: checkboxAll,
        width: 60,
        render: this.renderSelectionCheckBox,
        className: 'ant-table-selection-column'
      };
      if (columns[0] &&
        columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }
    return columns;
  },

  getCurrentPageData() {
    return this.isLocalDataSource() ? this.getLocalDataPaging() : this.state.data;
  },

  getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
  },

  isSortColumn(column) {
    if (!column || !this.state.sortColumn) {
      return false;
    }
    let colKey = this.getColumnKey(column);
    let isSortColumn = (this.getColumnKey(this.state.sortColumn) === colKey);
    return isSortColumn;
  },

  renderColumnsDropdown(columns) {
    return columns.map((column, i) => {
      column = objectAssign({}, column);
      let key = this.getColumnKey(column, i);
      let filterDropdown, sortButton;
      if (column.filters && column.filters.length > 0) {
        let colFilters = this.state.filters[key] || [];
        filterDropdown =
          <FilterDropdown column={column}
                          selectedKeys={colFilters}
                          confirmFilter={this.handleFilter} />;
      }
      if (column.sorter) {
        let isSortColumn = this.isSortColumn(column);
        if (isSortColumn) {
          column.className = column.className || '';
          if (this.state.sortOrder) {
            column.className += ' ant-table-column-sort';
          }
        }
        sortButton = <div className="ant-table-column-sorter">
          <span className={'ant-table-column-sorter-up ' +
                           ((isSortColumn && this.state.sortOrder === 'ascend') ? 'on' : 'off')}
                title="升序排序"
                onClick={this.toggleSortOrder.bind(this, 'ascend', column)}>
            <i className="anticon anticon-caret-up"></i>
          </span>
          <span className={'ant-table-column-sorter-down ' +
                           ((isSortColumn && this.state.sortOrder === 'descend') ? 'on' : 'off')}
                title="降序排序"
                onClick={this.toggleSortOrder.bind(this, 'descend', column)}>
            <i className="anticon anticon-caret-down"></i>
          </span>
        </div>;
      }
      column.title = <div>
        {column.title}
        {sortButton}
        {filterDropdown}
      </div>;
      return column;
    });
  },

  handleShowSizeChange(current, pageSize) {
    let pagination = objectAssign(this.state.pagination, {
      pageSize: pageSize
    });
    this.fetch({ pagination });
  },

  renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let classString = 'ant-table-pagination';
    if (this.props.size === 'small') {
      classString += ' mini';
    }
    let total = this.state.pagination.total;
    if (!total && this.isLocalDataSource()) {
      total = this.getLocalData().length;
    }
    return (total > 0) ? <Pagination className={classString}
                       onChange={this.handlePageChange}
                       total={total}
                       pageSize={10}
                       onShowSizeChange={this.handleShowSizeChange}
      {...this.state.pagination} /> : null;
  },

  prepareParamsArguments(state) {
    // 准备筛选、排序、分页的参数
    let pagination;
    let filters = {};
    let sorter = {};
    pagination = state.pagination;
    this.props.columns.forEach((column) => {
      let colFilters = state.filters[this.getColumnKey(column)] || [];
      if (colFilters.length > 0) {
        filters[this.getColumnKey(column)] = colFilters;
      }
    });
    if (state.sortColumn &&
      state.sortOrder &&
      state.sortColumn.dataIndex) {
      sorter.field = state.sortColumn.dataIndex;
      sorter.order = state.sortOrder;
    }
    return [pagination, filters, sorter];
  },

  fetch(newState) {
    if (this.isLocalDataSource()) {
      if (newState) {
        this.setState(newState);
      }
    } else {
      let state = objectAssign({}, this.state, newState);
      if (newState || !this.state.loading) {
        this.setState(objectAssign({
          loading: true
        }, newState));
      }
      // remote 模式使用 this.dataSource
      let dataSource = this.getRemoteDataSource();
      let buildInParams = dataSource.getParams.apply(this, this.prepareParamsArguments(state)) || {};
      return reqwest({
        url: dataSource.url,
        method: 'get',
        data: objectAssign(buildInParams, dataSource.data),
        headers: dataSource.headers,
        type: 'json',
        success: (result) => {
          if (this.isMounted()) {
            let pagination = objectAssign(
              state.pagination,
              dataSource.getPagination.call(this, result)
            );
            this.setState({
              loading: false,
              data: dataSource.resolve.call(this, result),
              pagination: pagination
            });
          }
        },
        error: () => {
          this.setState({
            loading: false,
            data: []
          });
        }
      });
    }
  },

  findColumn(myKey) {
    return this.props.columns.filter((c) => {
      return this.getColumnKey(c) === myKey;
    })[0];
  },

  getLocalDataPaging() {
    let data = this.getLocalData();
    let current, pageSize;
    let state = this.state;
    // 如果没有分页的话，默认全部展示
    if (!this.hasPagination()) {
      pageSize = Number.MAX_VALUE;
      current = 1;
    } else {
      pageSize = state.pagination.pageSize;
      current = state.pagination.current;
    }
    // 分页
    // ---
    // 当数据量少于每页数量时，直接设置数据
    // 否则进行读取分页数据
    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter((item, i) => {
        if (i >= (current - 1) * pageSize &&
          i < current * pageSize) {
          return item;
        }
      });
    }
    return data;
  },

  getLocalData() {
    let state = this.state;
    let data = this.state.dataSource;
    // 排序
    if (state.sortOrder && state.sorter) {
      data = data.sort(state.sorter);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach((columnKey) => {
        let col = this.findColumn(columnKey);
        let values = state.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        data = data.filter((record) => {
          return values.some((v)=> {
            return col.onFilter(v, record);
          });
        });
      });
    }
    return data;
  },

  componentDidMount() {
    if (!this.isLocalDataSource()) {
      this.fetch();
    }
  },

  render() {
    let data = this.getCurrentPageData();
    let columns = this.renderRowSelection();
    let classString = '';
    let expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
    if (this.state.loading && !this.isLocalDataSource()) {
      classString += ' ant-table-loading';
    }
    if (this.props.size === 'small') {
      classString += ' ant-table-small';
    }
    if (this.props.bordered) {
      classString += ' ant-table-bordered';
    }
    columns = this.renderColumnsDropdown(columns);
    columns = columns.map((column, i) => {
      column.key = column.dataIndex || i;
      return column;
    });
    let emptyText;
    let emptyClass = '';
    if (!data || data.length === 0) {
      emptyText = <div className="ant-table-placeholder">
        <i className="anticon anticon-frown"></i>暂无数据
      </div>;
      emptyClass = ' ant-table-empty';
    }
    return <div className={'clearfix' + emptyClass}>
      <Table
        {...this.props}
        data={data}
        columns={columns}
        className={classString}
        expandIconAsCell={expandIconAsCell}
        />
      {emptyText}
      {this.renderPagination()}
    </div>;
  }
});

AntTable.DataSource = DataSource;

export default AntTable;
