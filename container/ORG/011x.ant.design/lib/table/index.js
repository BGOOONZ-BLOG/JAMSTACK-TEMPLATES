'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reqwestWithoutXhr2 = require('reqwest-without-xhr2');

var _reqwestWithoutXhr22 = _interopRequireDefault(_reqwestWithoutXhr2);

var _rcTable = require('rc-table');

var _rcTable2 = _interopRequireDefault(_rcTable);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _filterDropdown = require('./filterDropdown');

var _filterDropdown2 = _interopRequireDefault(_filterDropdown);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _objectAssign2 = require('object-assign');

var _objectAssign3 = _interopRequireDefault(_objectAssign2);

function noop() {}

function defaultResolve(data) {
  return data || [];
}

var DataSource = (function () {
  _createClass(DataSource, [{
    key: 'init',
    value: function init(config) {
      this.config = config;
      this.url = config.url || '';
      this.resolve = config.resolve || defaultResolve;
      this.getParams = config.getParams || noop;
      this.getPagination = config.getPagination || noop;
      this.headers = config.headers || {};
      this.data = config.data || {};
    }
  }]);

  function DataSource(config) {
    _classCallCheck(this, DataSource);

    if (config) {
      this.init(config);
    }
  }

  _createClass(DataSource, [{
    key: 'clone',
    value: function clone() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new DataSource((0, _objectAssign3['default'])({}, this.config, config));
    }
  }]);

  return DataSource;
})();

var AntTable = _react2['default'].createClass({
  displayName: 'AntTable',

  getInitialState: function getInitialState() {
    return {
      // 减少状态
      selectedRowKeys: [],
      // only for remote
      data: [],
      dataSource: this.props.dataSource,
      filters: {},
      dirty: false,
      loading: false,
      sortColumn: '',
      sortOrder: '',
      sorter: null,
      radioIndex: null,
      pagination: this.hasPagination() ? (0, _objectAssign3['default'])({
        pageSize: 10,
        current: 1
      }, this.props.pagination) : {}
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      size: 'normal',
      bordered: false
    };
  },

  propTypes: {
    dataSource: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.instanceOf(DataSource)])
  },

  getDefaultSelection: function getDefaultSelection() {
    var _this = this;

    var selectedRowKeys = [];
    if (this.props.rowSelection && this.props.rowSelection.getCheckboxProps) {
      var data = this.getCurrentPageData();
      data.filter(function (item) {
        if (_this.props.rowSelection.getCheckboxProps) {
          return _this.props.rowSelection.getCheckboxProps(item).defaultValue;
        }
        return true;
      }).map(function (record, rowIndex) {
        selectedRowKeys.push(_this.getRecordKey(record, rowIndex));
      });
    }
    return selectedRowKeys;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('pagination' in nextProps && nextProps.pagination !== false) {
      this.setState({
        pagination: (0, _objectAssign3['default'])({}, this.state.pagination, nextProps.pagination)
      });
    }
    // 外界只有 dataSource 的变化会触发新请求
    if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
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

  hasPagination: function hasPagination(pagination) {
    if (pagination === undefined) {
      pagination = this.props.pagination;
    }
    return pagination !== false;
  },

  isLocalDataSource: function isLocalDataSource() {
    return Array.isArray(this.state.dataSource);
  },

  getRemoteDataSource: function getRemoteDataSource() {
    return this.state.dataSource;
  },

  toggleSortOrder: function toggleSortOrder(order, column) {
    var sortColumn = this.state.sortColumn;
    var sortOrder = this.state.sortOrder;
    var sorter = undefined;
    // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
    var isSortColumn = this.isSortColumn(column);
    if (!isSortColumn) {
      // 当前列未排序
      sortOrder = order;
      sortColumn = column;
    } else {
      // 当前列已排序
      if (sortOrder === order) {
        // 切换为未排序状态
        sortOrder = '';
        sortColumn = null;
      } else {
        // 切换为排序状态
        sortOrder = order;
      }
    }
    if (this.isLocalDataSource()) {
      sorter = function () {
        var result = column.sorter.apply(this, arguments);
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

  handleFilter: function handleFilter(column, filters) {
    filters = (0, _objectAssign3['default'])({}, this.state.filters, _defineProperty({}, this.getColumnKey(column), filters));
    this.fetch({
      selectedRowKeys: [],
      filters: filters
    });
  },

  handleSelect: function handleSelect(record, rowIndex, e) {
    var _this2 = this;

    var checked = e.target.checked;
    var defaultSelection = [];
    if (!this.state.dirty) {
      defaultSelection = this.getDefaultSelection();
    }
    var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    var key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter(function (i) {
        return key !== i;
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys,
      dirty: true
    });
    if (this.props.rowSelection.onSelect) {
      var data = this.getCurrentPageData();
      var selectedRows = data.filter(function (row, i) {
        return selectedRowKeys.indexOf(_this2.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  },

  handleRadioSelect: function handleRadioSelect(record, rowIndex, e) {
    var _this3 = this;

    var checked = e.target.checked;
    var defaultSelection = [];
    if (!this.state.dirty) {
      defaultSelection = this.getDefaultSelection();
    }
    var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    var key = this.getRecordKey(record, rowIndex);
    selectedRowKeys = [key];
    this.setState({
      selectedRowKeys: selectedRowKeys,
      radioIndex: record.key,
      dirty: true
    });
    if (this.props.rowSelection.onSelect) {
      var data = this.getCurrentPageData();
      var selectedRows = data.filter(function (row, i) {
        return selectedRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  },

  handleSelectAllRow: function handleSelectAllRow(e) {
    var _this4 = this;

    var checked = e.target.checked;
    var data = this.getCurrentPageData();
    var selectedRowKeys = checked ? data.filter(function (item) {
      if (_this4.props.rowSelection.getCheckboxProps) {
        return !_this4.props.rowSelection.getCheckboxProps(item).disabled;
      }
      return true;
    }).map(function (item, i) {
      return _this4.getRecordKey(item, i);
    }) : [];
    this.setState({
      selectedRowKeys: selectedRowKeys,
      dirty: true
    });
    if (this.props.rowSelection.onSelectAll) {
      var selectedRows = data.filter(function (row, i) {
        return selectedRowKeys.indexOf(_this4.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelectAll(checked, selectedRows);
    }
  },

  handlePageChange: function handlePageChange(current) {
    var pagination = (0, _objectAssign3['default'])({}, this.state.pagination);
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

  onRadioChange: function onRadioChange(ev) {
    this.setState({
      radioIndex: ev.target.value
    });
  },

  renderSelectionRadio: function renderSelectionRadio(value, record, index) {
    var rowIndex = this.getRecordKey(record, index); // 从 1 开始
    var props = {};
    if (this.props.rowSelection.getCheckboxProps) {
      props = this.props.rowSelection.getCheckboxProps.call(this, record);
    }
    var checked = this.state.dirty ? this.state.radioIndex === record.key : this.getDefaultSelection().indexOf(rowIndex) >= 0;
    return _react2['default'].createElement(_radio2['default'], { disabled: props.disabled, onChange: this.handleRadioSelect.bind(this, record, rowIndex), value: record.key, checked: checked });
  },

  renderSelectionCheckBox: function renderSelectionCheckBox(value, record, index) {
    var rowIndex = this.getRecordKey(record, index); // 从 1 开始
    var checked = this.state.dirty ? this.state.selectedRowKeys.indexOf(rowIndex) >= 0 : this.getDefaultSelection().indexOf(rowIndex) >= 0;
    var props = {};
    if (this.props.rowSelection.getCheckboxProps) {
      props = this.props.rowSelection.getCheckboxProps.call(this, record);
    }
    return _react2['default'].createElement(_checkbox2['default'], { checked: checked, disabled: props.disabled, onChange: this.handleSelect.bind(this, record, rowIndex) });
  },

  getRecordKey: function getRecordKey(record, index) {
    return record.key || index;
  },

  renderRowSelection: function renderRowSelection() {
    var _this5 = this;

    var columns = this.props.columns.concat();
    if (this.props.rowSelection) {
      var data = this.getCurrentPageData();
      var checked = undefined;
      if (!data.length) {
        checked = false;
      } else {
        checked = data.filter(function (item) {
          if (_this5.props.rowSelection.getCheckboxProps) {
            return !_this5.props.rowSelection.getCheckboxProps(item).disabled;
          }
          return true;
        }).every(function (item, i) {
          var key = _this5.getRecordKey(item, i);
          return _this5.state.selectedRowKeys.indexOf(key) >= 0;
        });
      }
      var selectionColumn = undefined;
      if (this.props.rowSelection.type === 'radio') {
        selectionColumn = {
          key: 'selection-column',
          width: 60,
          render: this.renderSelectionRadio,
          className: 'ant-table-selection-column'
        };
      } else {
        var checkboxAll = _react2['default'].createElement(_checkbox2['default'], { checked: checked, onChange: this.handleSelectAllRow });
        selectionColumn = {
          key: 'selection-column',
          title: checkboxAll,
          width: 60,
          render: this.renderSelectionCheckBox,
          className: 'ant-table-selection-column'
        };
      }
      if (columns[0] && columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }
    return columns;
  },

  getCurrentPageData: function getCurrentPageData() {
    return this.isLocalDataSource() ? this.getLocalDataPaging() : this.state.data;
  },

  getColumnKey: function getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
  },

  isSortColumn: function isSortColumn(column) {
    if (!column || !this.state.sortColumn) {
      return false;
    }
    var colKey = this.getColumnKey(column);
    var isSortColumn = this.getColumnKey(this.state.sortColumn) === colKey;
    return isSortColumn;
  },

  renderColumnsDropdown: function renderColumnsDropdown(columns) {
    var _this6 = this;

    return columns.map(function (column, i) {
      column = (0, _objectAssign3['default'])({}, column);
      var key = _this6.getColumnKey(column, i);
      var filterDropdown = undefined,
          sortButton = undefined;
      if (column.filters && column.filters.length > 0) {
        var colFilters = _this6.state.filters[key] || [];
        filterDropdown = _react2['default'].createElement(_filterDropdown2['default'], { column: column,
          selectedKeys: colFilters,
          confirmFilter: _this6.handleFilter });
      }
      if (column.sorter) {
        var isSortColumn = _this6.isSortColumn(column);
        if (isSortColumn) {
          column.className = column.className || '';
          if (_this6.state.sortOrder) {
            column.className += ' ant-table-column-sort';
          }
        }
        sortButton = _react2['default'].createElement(
          'div',
          { className: 'ant-table-column-sorter' },
          _react2['default'].createElement(
            'span',
            { className: 'ant-table-column-sorter-up ' + (isSortColumn && _this6.state.sortOrder === 'ascend' ? 'on' : 'off'),
              title: '升序排序',
              onClick: _this6.toggleSortOrder.bind(_this6, 'ascend', column) },
            _react2['default'].createElement('i', { className: 'anticon anticon-caret-up' })
          ),
          _react2['default'].createElement(
            'span',
            { className: 'ant-table-column-sorter-down ' + (isSortColumn && _this6.state.sortOrder === 'descend' ? 'on' : 'off'),
              title: '降序排序',
              onClick: _this6.toggleSortOrder.bind(_this6, 'descend', column) },
            _react2['default'].createElement('i', { className: 'anticon anticon-caret-down' })
          )
        );
      }
      column.title = _react2['default'].createElement(
        'div',
        null,
        column.title,
        sortButton,
        filterDropdown
      );
      return column;
    });
  },

  handleShowSizeChange: function handleShowSizeChange(current, pageSize) {
    var pagination = (0, _objectAssign3['default'])(this.state.pagination, {
      pageSize: pageSize
    });
    this.fetch({ pagination: pagination });
  },

  renderPagination: function renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    var classString = 'ant-table-pagination';
    if (this.props.size === 'small') {
      classString += ' mini';
    }
    var total = this.state.pagination.total;
    if (!total && this.isLocalDataSource()) {
      total = this.getLocalData().length;
    }
    return total > 0 ? _react2['default'].createElement(_pagination2['default'], _extends({ className: classString,
      onChange: this.handlePageChange,
      total: total,
      pageSize: 10,
      onShowSizeChange: this.handleShowSizeChange
    }, this.state.pagination)) : null;
  },

  prepareParamsArguments: function prepareParamsArguments(state) {
    var _this7 = this;

    // 准备筛选、排序、分页的参数
    var pagination = undefined;
    var filters = {};
    var sorter = {};
    pagination = state.pagination;
    this.props.columns.forEach(function (column) {
      var colFilters = state.filters[_this7.getColumnKey(column)] || [];
      if (colFilters.length > 0) {
        filters[_this7.getColumnKey(column)] = colFilters;
      }
    });
    if (state.sortColumn && state.sortOrder && state.sortColumn.dataIndex) {
      sorter.field = state.sortColumn.dataIndex;
      sorter.order = state.sortOrder;
    }
    return [pagination, filters, sorter];
  },

  fetch: function fetch(newState) {
    var _this8 = this;

    if (this.isLocalDataSource()) {
      if (newState) {
        this.setState(newState);
      }
    } else {
      var _ret = (function () {
        var state = (0, _objectAssign3['default'])({}, _this8.state, newState);
        if (newState || !_this8.state.loading) {
          _this8.setState((0, _objectAssign3['default'])({
            loading: true
          }, newState));
        }
        // remote 模式使用 this.dataSource
        var dataSource = _this8.getRemoteDataSource();
        var buildInParams = dataSource.getParams.apply(_this8, _this8.prepareParamsArguments(state)) || {};
        return {
          v: (0, _reqwestWithoutXhr22['default'])({
            url: dataSource.url,
            method: 'get',
            data: (0, _objectAssign3['default'])(buildInParams, dataSource.data),
            headers: dataSource.headers,
            type: 'json',
            success: function success(result) {
              if (_this8.isMounted()) {
                var pagination = (0, _objectAssign3['default'])(state.pagination, dataSource.getPagination.call(_this8, result));
                _this8.setState({
                  dirty: false,
                  loading: false,
                  data: dataSource.resolve.call(_this8, result),
                  pagination: pagination
                });
              }
            },
            error: function error() {
              _this8.setState({
                loading: false,
                data: []
              });
            }
          })
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  },

  findColumn: function findColumn(myKey) {
    var _this9 = this;

    return this.props.columns.filter(function (c) {
      return _this9.getColumnKey(c) === myKey;
    })[0];
  },

  getLocalDataPaging: function getLocalDataPaging() {
    var data = this.getLocalData();
    var current = undefined,
        pageSize = undefined;
    var state = this.state;
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
      data = data.filter(function (item, i) {
        if (i >= (current - 1) * pageSize && i < current * pageSize) {
          return item;
        }
      });
    }
    return data;
  },

  getLocalData: function getLocalData() {
    var _this10 = this;

    var state = this.state;
    var data = this.state.dataSource;
    // 排序
    if (state.sortOrder && state.sorter) {
      data = data.sort(state.sorter);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach(function (columnKey) {
        var col = _this10.findColumn(columnKey);
        var values = state.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        data = data.filter(function (record) {
          return values.some(function (v) {
            return col.onFilter(v, record);
          });
        });
      });
    }
    return data;
  },

  componentDidMount: function componentDidMount() {
    if (!this.isLocalDataSource()) {
      this.fetch();
    }
  },

  render: function render() {
    var data = this.getCurrentPageData();
    var columns = this.renderRowSelection();
    var classString = '';
    var expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
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
    columns = columns.map(function (column, i) {
      column.key = column.dataIndex || i;
      return column;
    });
    var emptyText = undefined;
    var emptyClass = '';
    if (!data || data.length === 0) {
      emptyText = _react2['default'].createElement(
        'div',
        { className: 'ant-table-placeholder' },
        _react2['default'].createElement('i', { className: 'anticon anticon-frown' }),
        '暂无数据'
      );
      emptyClass = ' ant-table-empty';
    }
    return _react2['default'].createElement(
      'div',
      { className: 'clearfix' + emptyClass },
      _react2['default'].createElement(_rcTable2['default'], _extends({}, this.props, {
        data: data,
        columns: columns,
        className: classString,
        expandIconAsCell: expandIconAsCell
      })),
      emptyText,
      this.renderPagination()
    );
  }
});

AntTable.DataSource = DataSource;

exports['default'] = AntTable;
module.exports = exports['default'];