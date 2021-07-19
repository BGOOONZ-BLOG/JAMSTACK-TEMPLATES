'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rcRadio = require('rc-radio');

var _rcRadio2 = _interopRequireDefault(_rcRadio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var AntRadio = _react2['default'].createClass({
  displayName: 'AntRadio',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render: function render() {
    var classString = this.props.className;
    if (classString) {
      classString += this.props.checked ? ' ' + classString + '-checked' : '';
    }
    return _react2['default'].createElement(
      'label',
      { className: classString },
      _react2['default'].createElement(_rcRadio2['default'], _extends({}, this.props, { children: null })),
      this.props.children
    );
  }
});

var Button = _react2['default'].createClass({
  displayName: 'Button',

  getDefaultProps: function getDefaultProps() {
    return {
      className: 'ant-radio-button'
    };
  },
  render: function render() {
    return _react2['default'].createElement(AntRadio, this.props);
  }
});

AntRadio.Button = Button;

exports['default'] = AntRadio;
module.exports = exports['default'];