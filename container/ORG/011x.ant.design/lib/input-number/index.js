'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rcInputNumber = require('rc-input-number');

var _rcInputNumber2 = _interopRequireDefault(_rcInputNumber);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-input-number'
    };
  },
  render: function render() {
    var sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = 'ant-input-number-lg';
    } else if (this.props.size === 'small') {
      sizeClass = 'ant-input-number-sm';
    }
    return _react2['default'].createElement(_rcInputNumber2['default'], _extends({ className: sizeClass, style: { width: 90 } }, this.props));
  }
});
module.exports = exports['default'];