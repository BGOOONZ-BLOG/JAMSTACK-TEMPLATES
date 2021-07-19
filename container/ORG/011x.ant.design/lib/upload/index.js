'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUpload = require('rc-upload');

var _rcUpload2 = _interopRequireDefault(_rcUpload);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _uploadList = require('./uploadList');

var _uploadList2 = _interopRequireDefault(_uploadList);

var _getFileItem = require('./getFileItem');

var _getFileItem2 = _interopRequireDefault(_getFileItem);

var prefixCls = 'ant-upload';

function noop() {}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error
  };
}

var AntUpload = _react2['default'].createClass({
  displayName: 'AntUpload',

  getInitialState: function getInitialState() {
    return {
      fileList: this.props.fileList || this.props.defaultFileList || []
    };
  },
  onStart: function onStart(file) {
    var targetItem = undefined;
    var nextFileList = this.state.fileList.concat();
    if (file.length > 0) {
      targetItem = file.map(function (f) {
        f = fileToObject(f);
        f.status = 'uploading';
        return f;
      });
      nextFileList = nextFileList.concat(file);
    } else {
      targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      nextFileList.push(targetItem);
    }
    this.onChange({
      file: targetItem,
      fileList: nextFileList
    });
  },
  removeFile: function removeFile(file) {
    var fileList = this.state.fileList;
    var targetItem = (0, _getFileItem2['default'])(file, fileList);
    var index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  },
  onSuccess: function onSuccess(response, file) {
    // 服务器端需要返回标准 json 字符串
    // 否则视为失败
    try {
      if (typeof response === 'string') {
        JSON.parse(response);
      }
    } catch (e) {
      this.onError(new Error('No response'), response, file);
      return;
    }
    var fileList = this.state.fileList;
    var targetItem = (0, _getFileItem2['default'])(file, fileList);
    // 之前已经删除
    if (targetItem) {
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: targetItem,
        fileList: fileList
      });
    }
  },
  onProgress: function onProgress(e, file) {
    var fileList = this.state.fileList;
    var targetItem = (0, _getFileItem2['default'])(file, fileList);
    if (targetItem) {
      this.onChange({
        event: e,
        file: file,
        fileList: this.state.fileList
      });
    }
  },
  onError: function onError(error, response, file) {
    var fileList = this.state.fileList;
    var targetItem = (0, _getFileItem2['default'])(file, fileList);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.handleRemove(targetItem);
  },
  handleRemove: function handleRemove(file) {
    var fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file: file,
        fileList: fileList
      });
    }
  },
  handleManualRemove: function handleManualRemove(file) {
    file.status = 'removed';
    this.handleRemove(file);
  },
  onChange: function onChange(info) {
    // 1. 有设置外部属性时不改变 fileList
    // 2. 上传中状态（info.event）不改变 fileList
    if (!('fileList' in this.props) && !info.event) {
      this.setState({
        fileList: info.fileList
      });
    }
    this.props.onChange(info);
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'select',
      name: '',
      multipart: false,
      action: '',
      data: {},
      accept: '',
      onChange: noop
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList
      });
    }
  },
  render: function render() {
    var type = this.props.type || 'select';
    var props = (0, _objectAssign2['default'])({}, this.props, {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess
    });
    if (type === 'drag') {
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + ' ' + prefixCls + '-drag' },
        _react2['default'].createElement(
          _rcUpload2['default'],
          props,
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-drag-container' },
            this.props.children
          )
        )
      );
    } else if (type === 'select') {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { className: prefixCls + ' ' + prefixCls + '-select' },
          _react2['default'].createElement(
            _rcUpload2['default'],
            props,
            this.props.children
          )
        ),
        _react2['default'].createElement(_uploadList2['default'], { items: this.state.fileList,
          onRemove: this.handleManualRemove })
      );
    }
  }
});

AntUpload.Dragger = _react2['default'].createClass({
  displayName: 'Dragger',

  render: function render() {
    return _react2['default'].createElement(AntUpload, _extends({}, this.props, { type: 'drag', style: { height: this.props.height } }));
  }
});

exports['default'] = AntUpload;
module.exports = exports['default'];