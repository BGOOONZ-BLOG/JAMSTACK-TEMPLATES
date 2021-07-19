'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcNotification = require('rc-notification');

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var defaultDuration = 1.5;
var top = undefined;
var messageInstance = undefined;
var key = 1;

function getMessageInstance() {
  messageInstance = messageInstance || _rcNotification2['default'].newInstance({
    prefixCls: 'ant-message',
    transitionName: 'move-up',
    style: {
      top: top
    } // 覆盖原来的样式
  });
  return messageInstance;
}

function notice(content, duration, type, onClose) {
  if (duration === undefined) duration = defaultDuration;

  var iconClass = ({
    'info': 'anticon-info-circle ant-message-info',
    'success': 'anticon-check-circle ant-message-success',
    'error': 'anticon-exclamation-circle ant-message-error',
    'loading': 'anticon-loading ant-message-loading'
  })[type];
  var instance = getMessageInstance();
  instance.notice({
    key: key,
    duration: duration,
    style: {},
    content: _react2['default'].createElement(
      'div',
      { className: 'ant-message-custom-content' },
      _react2['default'].createElement('i', { className: 'anticon ' + iconClass }),
      _react2['default'].createElement(
        'span',
        null,
        content
      )
    ),
    onClose: onClose
  });
  return (function () {
    var target = key++;
    return function () {
      instance.removeNotice(target);
    };
  })();
}

exports['default'] = {
  info: function info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success: function success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error: function error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  loading: function loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config: function config(options) {
    if (options.top) {
      top = options.top;
    }
  }
};
module.exports = exports['default'];