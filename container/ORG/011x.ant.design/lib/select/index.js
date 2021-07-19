'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSelect = require('rc-select');

var _rcSelect2 = _interopRequireDefault(_rcSelect);

var AntSelect = _react2['default'].createClass({
  displayName: 'AntSelect',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-select',
      transitionName: 'slide-up',
      optionLabelProp: 'children',
      showSearch: false
    };
  },
  render: function render() {
    var sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = 'ant-select-lg';
    } else if (this.props.size === 'small') {
      sizeClass = 'ant-select-sm';
    }
    var className = this.props.className || ' ';
    var notFoundContent = this.props.notFoundContent;
    if (this.props.combobox) {
      notFoundContent = null;
    }
    return _react2['default'].createElement(_rcSelect2['default'], _extends({}, this.props, { className: className + sizeClass, notFoundContent: notFoundContent }));
  }
});

AntSelect.Option = _rcSelect2['default'].Option;
AntSelect.OptGroup = _rcSelect2['default'].OptGroup;

exports['default'] = AntSelect;
module.exports = exports['default'];