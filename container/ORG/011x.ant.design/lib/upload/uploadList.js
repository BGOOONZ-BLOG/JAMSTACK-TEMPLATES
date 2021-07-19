'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var prefixCls = 'ant-upload';
exports['default'] = _react2['default'].createClass({
  displayName: 'uploadList',

  getDefaultProps: function getDefaultProps() {
    return {
      items: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      items: this.props.items
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('items' in nextProps) {
      this.setState({
        items: nextProps.items
      });
    }
  },
  handleClose: function handleClose(file) {
    this.props.onRemove(file);
  },
  render: function render() {
    var _this = this;

    var list = this.state.items.map(function (file) {
      var statusIcon = file.status === 'done' ? _react2['default'].createElement('i', { className: 'anticon anticon-check ' + prefixCls + '-success-icon' }) : _react2['default'].createElement('i', { className: 'anticon anticon-loading' });
      var filename = file.url ? _react2['default'].createElement(
        'a',
        { className: prefixCls + '-item-name', href: file.url, _target: '_blank' },
        file.name
      ) : _react2['default'].createElement(
        'b',
        { className: prefixCls + '-item-name' },
        file.name
      );
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-list-item', key: file.uid },
        statusIcon,
        filename,
        _react2['default'].createElement('i', { className: 'anticon anticon-cross', ref: 'theCloseBtn',
          onClick: _this.handleClose.bind(_this, file) })
      );
    });
    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-list' },
      _react2['default'].createElement(
        _rcAnimate2['default'],
        { transitionName: prefixCls + '-margin-top' },
        list
      )
    );
  }
});
module.exports = exports['default'];