'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _radio = require('./radio');

var _radio2 = _interopRequireDefault(_radio);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

_radio2['default'].Group = _group2['default'];
exports['default'] = _radio2['default'];
module.exports = exports['default'];