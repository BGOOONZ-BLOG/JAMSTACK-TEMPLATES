'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rcProgress = require('rc-progress');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var prefixCls = 'ant-progress';

var statusColorMap = {
  'normal': '#2db7f5',
  'exception': '#ff6600',
  'success': '#87d068'
};

var Line = _react2['default'].createClass({
  displayName: 'Line',

  propTypes: {
    status: _react2['default'].PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    showInfo: _react2['default'].PropTypes.bool,
    percent: _react2['default'].PropTypes.number,
    strokeWidth: _react2['default'].PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      percent: 0,
      strokeWidth: 10,
      status: 'normal', // exception active
      showInfo: true
    };
  },
  render: function render() {
    var props = (0, _objectAssign2['default'])({}, this.props);

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    var progressInfo = undefined;
    var fullCls = '';
    if (props.showInfo === true) {
      if (props.status === 'exception') {
        progressInfo = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-line-text' },
          _react2['default'].createElement('i', { className: 'anticon anticon-exclamation-circle' })
        );
      } else if (props.status === 'success') {
        progressInfo = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-line-text' },
          _react2['default'].createElement('i', { className: 'anticon anticon-check-circle' })
        );
      } else {
        progressInfo = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-line-text' },
          props.percent,
          '%'
        );
      }
    } else {
      fullCls = ' ' + prefixCls + '-line-wrap-full';
    }
    var percentStyle = {
      width: props.percent + '%',
      height: props.strokeWidth
    };

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-line-wrap clearfix status-' + props.status + fullCls },
      progressInfo,
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-line-outer' },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-line-inner' },
          _react2['default'].createElement('div', { className: prefixCls + '-line-bg', style: percentStyle })
        )
      )
    );
  }
});

var Circle = _react2['default'].createClass({
  displayName: 'Circle',

  getDefaultProps: function getDefaultProps() {
    return {
      width: 132,
      percent: 0,
      strokeWidth: 6,
      status: 'normal' // exception
    };
  },
  render: function render() {
    var props = (0, _objectAssign2['default'])({}, this.props);

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    var style = {
      'width': props.width,
      'height': props.width,
      'fontSize': props.width * 0.16 + 6
    };
    var progressInfo = undefined;
    if (props.status === 'exception') {
      progressInfo = _react2['default'].createElement(
        'span',
        { className: prefixCls + '-circle-text' },
        _react2['default'].createElement('i', { className: 'anticon anticon-exclamation' })
      );
    } else if (props.status === 'success') {
      progressInfo = _react2['default'].createElement(
        'span',
        { className: prefixCls + '-circle-text' },
        _react2['default'].createElement('i', { className: 'anticon anticon-check' })
      );
    } else {
      progressInfo = _react2['default'].createElement(
        'span',
        { className: prefixCls + '-circle-text' },
        props.percent,
        '%'
      );
    }

    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-circle-wrap status-' + props.status },
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-circle-inner', style: style },
        _react2['default'].createElement(_rcProgress.Circle, { percent: props.percent, strokeWidth: props.strokeWidth,
          strokeColor: statusColorMap[props.status], trailColor: '#e9e9e9' }),
        progressInfo
      )
    );
  }
});

exports['default'] = {
  Line: Line,
  Circle: Circle
};
module.exports = exports['default'];