'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDropdown = require('rc-dropdown');

var _rcDropdown2 = _interopRequireDefault(_rcDropdown);

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  getDefaultProps: function getDefaultProps() {
    return {
      transitionName: 'slide-up',
      prefixCls: 'ant-dropdown'
    };
  },
  render: function render() {
    return _react2['default'].createElement(_rcDropdown2['default'], this.props);
  }
});
module.exports = exports['default'];