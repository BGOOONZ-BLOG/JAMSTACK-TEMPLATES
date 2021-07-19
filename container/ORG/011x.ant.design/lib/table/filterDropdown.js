'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var FilterMenu = _react2['default'].createClass({
  displayName: 'FilterMenu',

  getInitialState: function getInitialState() {
    return {
      selectedKeys: this.props.selectedKeys
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.selectedKeys
    });
  },
  getDefaultProps: function getDefaultProps() {
    return {
      handleFilter: function handleFilter() {},
      column: null
    };
  },
  setSelectedKeys: function setSelectedKeys(_ref) {
    var selectedKeys = _ref.selectedKeys;

    this.setState({
      selectedKeys: selectedKeys
    });
  },
  handleClearFilters: function handleClearFilters() {
    this.setState({
      selectedKeys: []
    }, this.handleConfirm);
  },
  handleConfirm: function handleConfirm() {
    this.setState({
      visible: false
    });
    this.props.confirmFilter(this.props.column, this.state.selectedKeys);
  },
  onVisibleChange: function onVisibleChange(visible) {
    this.setState({
      visible: visible
    });
  },
  renderMenus: function renderMenus(items) {
    var menuItems = items.map(function (item) {
      return _react2['default'].createElement(
        _rcMenu2['default'].Item,
        { key: item.value },
        item.text
      );
    });
    return menuItems;
  },
  render: function render() {
    var column = this.props.column;
    var menus = _react2['default'].createElement(
      _rcMenu2['default'],
      { multiple: true,
        prefixCls: 'ant-dropdown-menu',
        className: 'ant-table-filter-dropdown',
        onSelect: this.setSelectedKeys,
        onDeselect: this.setSelectedKeys,
        selectedKeys: this.state.selectedKeys },
      this.renderMenus(column.filters),
      _react2['default'].createElement(_rcMenu2['default'].Divider, null),
      _react2['default'].createElement(
        _rcMenu2['default'].Item,
        { disabled: true },
        _react2['default'].createElement(
          'a',
          { className: 'ant-table-filter-dropdown-link confirm',
            style: {
              cursor: 'pointer',
              pointerEvents: 'visible'
            },
            onClick: this.handleConfirm },
          '确定'
        ),
        _react2['default'].createElement(
          'a',
          { className: 'ant-table-filter-dropdown-link clear',
            style: {
              cursor: 'pointer',
              pointerEvents: 'visible'
            },
            onClick: this.handleClearFilters },
          '清空'
        )
      )
    );

    var dropdownSelectedClass = '';
    if (this.props.selectedKeys.length > 0) {
      dropdownSelectedClass = 'ant-table-filter-selected';
    }

    return _react2['default'].createElement(
      _dropdown2['default'],
      { trigger: 'click', overlay: menus, visible: this.state.visible, onVisibleChange: this.onVisibleChange },
      _react2['default'].createElement('i', { title: '筛选', className: 'anticon anticon-bars ' + dropdownSelectedClass })
    );
  }
});

exports['default'] = FilterMenu;
module.exports = exports['default'];