'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var prefixCls = 'ant-badge';

var AntBadge = (function (_React$Component) {
  _inherits(AntBadge, _React$Component);

  function AntBadge(props) {
    _classCallCheck(this, AntBadge);

    _get(Object.getPrototypeOf(AntBadge.prototype), 'constructor', this).call(this, props);

    this.state = {
      count: props.count
    };
  }

  _createClass(AntBadge, [{
    key: 'render',
    value: function render() {
      if (this.props.dot) {
        return _react2['default'].createElement(
          'span',
          _extends({ className: prefixCls }, this.props),
          this.props.children,
          _react2['default'].createElement('sup', { className: prefixCls + '-dot' })
        );
      }
      var count = this.state.count;
      if (!count) {
        return (0, _react.cloneElement)(this.props.children);
      } else {
        count = count >= 100 ? '99+' : count;
        return _react2['default'].createElement(
          'span',
          _extends({ className: prefixCls, title: this.state.count }, this.props),
          this.props.children,
          _react2['default'].createElement(
            'sup',
            { className: prefixCls + '-count' },
            count
          )
        );
      }
    }
  }]);

  return AntBadge;
})(_react2['default'].Component);

AntBadge.defaultProps = {
  prefixCls: prefixCls,
  count: null,
  dot: false
};

AntBadge.propTypes = {
  count: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  dot: _react2['default'].PropTypes.bool
};

exports['default'] = AntBadge;
module.exports = exports['default'];