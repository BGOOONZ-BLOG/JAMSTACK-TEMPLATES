'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var prefixCls = 'ant-popover';

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: prefixCls,
      placement: 'top',
      trigger: 'hover',
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1,
      overlayStyle: {}
    };
  },
  render: function render() {
    var overlay = _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-title' },
        this.props.title
      ),
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-content' },
        this.props.overlay
      )
    );

    var transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    return _react2['default'].createElement(
      _rcTooltip2['default'],
      _extends({ transitionName: transitionName
      }, this.props, { overlay: overlay }),
      this.props.children
    );
  }
});
module.exports = exports['default'];