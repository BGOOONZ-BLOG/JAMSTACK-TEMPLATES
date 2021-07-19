'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcCalendar = require('rc-calendar');

var _rcCalendar2 = _interopRequireDefault(_rcCalendar);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _gregorianCalendarLibLocaleZhCn = require('gregorian-calendar/lib/locale/zh-cn');

var _gregorianCalendarLibLocaleZhCn2 = _interopRequireDefault(_gregorianCalendarLibLocaleZhCn);

var _rcCalendarLibLocaleZhCn = require('rc-calendar/lib/locale/zh-cn');

var _rcCalendarLibLocaleZhCn2 = _interopRequireDefault(_rcCalendarLibLocaleZhCn);

var _gregorianCalendarFormat = require('gregorian-calendar-format');

var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);

// 和顶部文案保持一致

var _gregorianCalendarFormatLibLocaleZhCn = require('gregorian-calendar-format/lib/locale/zh-cn');

var _gregorianCalendarFormatLibLocaleZhCn2 = _interopRequireDefault(_gregorianCalendarFormatLibLocaleZhCn);

_gregorianCalendarFormatLibLocaleZhCn2['default'].shortMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 以下两行代码
// 给没有初始值的日期选择框提供本地化信息
var defaultCalendarValue = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
defaultCalendarValue.setTime(Date.now());

function createPicker(TheCalendar) {
  return _react2['default'].createClass({
    getInitialState: function getInitialState() {
      var value = undefined;
      if (this.props.value) {
        value = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
        value.setTime(new Date(this.props.value).valueOf());
      }
      return {
        value: value
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        var value = null;
        if (nextProps.value) {
          value = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
          value.setTime(new Date(nextProps.value).valueOf());
        }
        this.setState({
          value: value
        });
      }
    },
    getDefaultProps: function getDefaultProps() {
      return {
        format: 'yyyy-MM-dd',
        placeholder: '请选择日期',
        transitionName: 'slide-up',
        onSelect: function onSelect() {}
      };
    },
    handleChange: function handleChange(v) {
      this.setState({
        value: v
      });
      this.props.onSelect(new Date(v.getTime()));
    },
    render: function render() {
      var calendar = _react2['default'].createElement(TheCalendar, {
        disabledDate: this.props.disabledDate,
        locale: _rcCalendarLibLocaleZhCn2['default'],
        orient: ['top', 'left'],
        defaultValue: defaultCalendarValue,
        showTime: this.props.showTime,
        prefixCls: 'ant-calendar',
        showOk: this.props.showTime,
        showClear: false });
      var sizeClass = '';
      if (this.props.size === 'large') {
        sizeClass = ' ant-input-lg';
      } else if (this.props.size === 'small') {
        sizeClass = ' ant-input-sm';
      }
      return _react2['default'].createElement(
        _rcCalendar.Picker,
        {
          transitionName: this.props.transitionName,
          disabled: this.props.disabled,
          trigger: _react2['default'].createElement('span', { className: 'ant-calendar-picker-icon' }),
          calendar: calendar,
          adjustOrientOnCalendarOverflow: { x: true, y: false },
          formatter: new _gregorianCalendarFormat2['default'](this.props.format),
          value: this.state.value,
          defaultValue: this.props.defaultValue,
          prefixCls: 'ant-calendar-picker',
          style: this.props.style,
          onChange: this.handleChange },
        _react2['default'].createElement('input', {
          placeholder: this.props.placeholder,
          className: 'ant-calendar-picker-input ant-input' + sizeClass })
      );
    }
  });
}

var AntDatePicker = createPicker(_rcCalendar2['default']);

var AntMonthPicker = createPicker(_rcCalendar.MonthCalendar);

var AntCalendar = _react2['default'].createClass({
  displayName: 'AntCalendar',

  getDefaultProps: function getDefaultProps() {
    return {
      locale: _rcCalendarLibLocaleZhCn2['default'],
      prefixCls: 'ant-calendar'
    };
  },
  render: function render() {
    return _react2['default'].createElement(_rcCalendar2['default'], this.props);
  }
});

AntDatePicker.Calendar = AntCalendar;
AntDatePicker.MonthPicker = AntMonthPicker;

exports['default'] = AntDatePicker;
module.exports = exports['default'];