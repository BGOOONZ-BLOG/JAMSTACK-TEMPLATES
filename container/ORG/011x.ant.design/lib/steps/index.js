'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSteps = require('rc-steps');

var _rcSteps2 = _interopRequireDefault(_rcSteps);

var AntSteps = _react2['default'].createClass({
  displayName: 'AntSteps',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-steps',
      iconPrefix: 'ant',
      size: 'default',
      maxDescriptionWidth: 100,
      current: 0
    };
  },
  render: function render() {
    var maxDescriptionWidth = this.props.maxDescriptionWidth;
    if (this.props.direction === 'vertical') {
      maxDescriptionWidth = 'auto';
    }
    return _react2['default'].createElement(
      _rcSteps2['default'],
      { size: this.props.size,
        current: this.props.current,
        direction: this.props.direction,
        iconPrefix: this.props.iconPrefix,
        maxDescriptionWidth: maxDescriptionWidth,
        prefixCls: this.props.prefixCls },
      this.props.children
    );
  }
});

AntSteps.Step = _rcSteps2['default'].Step;

exports['default'] = AntSteps;
module.exports = exports['default'];