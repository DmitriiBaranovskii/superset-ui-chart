"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MESSAGE_STYLES = {
  maxWidth: 800
};
const TITLE_STYLES = {
  fontSize: 16,
  fontWeight: 'bold',
  paddingBottom: 8
};
const BODY_STYLES = {
  fontSize: 14
};
const MIN_WIDTH_FOR_BODY = 250;
const BODY_STRING = 'No results were returned for this query. If you expected results to be returned, ensure any filters are configured properly and the datasource contains data for the selected time range.';

const generateContainerStyles = (height, width) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height,
  justifyContent: 'center',
  padding: 16,
  textAlign: 'center',
  width
});

const NoResultsComponent = (_ref) => {
  let {
    className,
    height,
    id,
    width
  } = _ref;
  const containerStyles = (0, _react.useMemo)(() => generateContainerStyles(height, width), [height, width]); // render the body if the width is auto/100% or greater than 250 pixels

  const shouldRenderBody = typeof width === 'string' || width > MIN_WIDTH_FOR_BODY;
  return _react.default.createElement("div", {
    className: className,
    id: id,
    style: containerStyles,
    title: shouldRenderBody ? undefined : BODY_STRING
  }, _react.default.createElement("div", {
    style: MESSAGE_STYLES
  }, _react.default.createElement("div", {
    style: TITLE_STYLES
  }, "No Results"), shouldRenderBody && _react.default.createElement("div", {
    style: BODY_STYLES
  }, BODY_STRING)));
};

NoResultsComponent.propTypes = {
  className: _propTypes.default.string,
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  id: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired
};
var _default = NoResultsComponent;
exports.default = _default;