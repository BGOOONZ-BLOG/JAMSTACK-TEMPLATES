'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var prefixCls = 'ant-breadcrumb';

var BreadcrumbItem = _react2['default'].createClass({
  displayName: 'BreadcrumbItem',

  propTypes: {
    href: _react2['default'].PropTypes.string
  },
  render: function render() {
    var link = _react2['default'].createElement(
      'a',
      _extends({ className: prefixCls + '-link' }, this.props),
      this.props.children
    );
    var slash = _react2['default'].createElement(
      'span',
      { className: prefixCls + '-slash' },
      '/'
    );
    if (typeof this.props.href === 'undefined') {
      link = _react2['default'].createElement(
        'span',
        _extends({ className: prefixCls + '-link' }, this.props),
        this.props.children
      );
    }
    return _react2['default'].createElement(
      'span',
      null,
      link,
      slash
    );
  }
});

var Breadcrumb = _react2['default'].createClass({
  displayName: 'Breadcrumb',

  propTypes: {
    router: _react2['default'].PropTypes.object,
    routes: _react2['default'].PropTypes.array,
    params: _react2['default'].PropTypes.object
  },
  render: function render() {
    var crumbs = undefined;
    var ReactRouter = this.props.router;
    var routes = this.props.routes;
    var params = this.props.params;
    if (routes && routes.length > 0 && ReactRouter) {
      (function () {
        var Link = ReactRouter.Link;
        crumbs = routes.map(function (route, i) {
          var name = route.breadcrumbName.replace(/\:(.*)/g, function (replacement, key) {
            return params[key] || replacement;
          });
          var link = undefined;
          var path = route.path.indexOf('/') === 0 ? route.path : '/' + route.path;
          if (i === routes.length - 1) {
            link = _react2['default'].createElement(
              'span',
              null,
              name
            );
          } else {
            link = _react2['default'].createElement(
              Link,
              { to: path, params: params },
              name
            );
          }
          return _react2['default'].createElement(
            BreadcrumbItem,
            { key: name },
            link
          );
        });
      })();
    } else {
      crumbs = this.props.children;
    }
    return _react2['default'].createElement(
      'div',
      { className: prefixCls },
      crumbs
    );
  }
});

Breadcrumb.Item = BreadcrumbItem;
exports['default'] = Breadcrumb;
module.exports = exports['default'];