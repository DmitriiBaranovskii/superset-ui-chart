function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
const CONTAINER_STYLE = {
  backgroundColor: '#000',
  color: '#fff',
  overflow: 'auto',
  padding: 32
};
export default function FallbackComponent(_ref) {
  let {
    componentStack,
    error,
    height,
    width
  } = _ref;
  return React.createElement("div", {
    style: _extends({}, CONTAINER_STYLE, {
      height,
      width
    })
  }, React.createElement("div", null, React.createElement("div", null, React.createElement("b", null, "Oops! An error occured!")), React.createElement("code", null, error ? error.toString() : 'Unknown Error')), componentStack && React.createElement("div", null, React.createElement("b", null, "Stack Trace:"), React.createElement("code", null, componentStack.split('\n').map(row => React.createElement("div", {
    key: row
  }, row)))));
}