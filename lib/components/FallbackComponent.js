"use strict";

exports.__esModule = true;
exports.default = FallbackComponent;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CONTAINER_STYLE = {
  backgroundColor: '#000',
  color: '#fff',
  overflow: 'auto',
  padding: 32
};

function FallbackComponent(_ref) {
  let {
    componentStack,
    error,
    height,
    width
  } = _ref;
  return _react.default.createElement("div", {
    style: _extends({}, CONTAINER_STYLE, {
      height,
      width
    })
  }, _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("b", null, "Oops! An error occured!")), _react.default.createElement("code", null, error ? error.toString() : 'Unknown Error')), componentStack && _react.default.createElement("div", null, _react.default.createElement("b", null, "Stack Trace:"), _react.default.createElement("code", null, componentStack.split('\n').map(row => _react.default.createElement("div", {
    key: row
  }, row)))));
}