"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _reselect = require("reselect");

var _ChartComponentRegistrySingleton = _interopRequireDefault(require("../registries/ChartComponentRegistrySingleton"));

var _ChartTransformPropsRegistrySingleton = _interopRequireDefault(require("../registries/ChartTransformPropsRegistrySingleton"));

var _ChartProps = _interopRequireDefault(require("../models/ChartProps"));

var _createLoadableRenderer = _interopRequireDefault(require("./createLoadableRenderer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const IDENTITY = x => x;

const EMPTY = () => null;

const defaultProps = {
  id: '',
  className: '',
  preTransformProps: IDENTITY,
  overrideTransformProps: undefined,
  postTransformProps: IDENTITY,

  onRenderSuccess() {},

  onRenderFailure() {}

};
const BLANK_CHART_PROPS = new _ChartProps.default();

class SuperChartCore extends React.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "processChartProps", (0, _reselect.createSelector)(input => input.chartProps, input => input.preTransformProps, input => input.transformProps, input => input.postTransformProps, function (chartProps, pre, transform, post) {
      if (pre === void 0) {
        pre = IDENTITY;
      }

      if (transform === void 0) {
        transform = IDENTITY;
      }

      if (post === void 0) {
        post = IDENTITY;
      }

      return post(transform(pre(chartProps)));
    }));

    _defineProperty(this, "createLoadableRenderer", (0, _reselect.createSelector)(input => input.chartType, input => input.overrideTransformProps, (chartType, overrideTransformProps) => {
      if (chartType) {
        const Renderer = (0, _createLoadableRenderer.default)({
          loader: {
            Chart: () => (0, _ChartComponentRegistrySingleton.default)().getAsPromise(chartType),
            transformProps: overrideTransformProps ? () => Promise.resolve(overrideTransformProps) : () => (0, _ChartTransformPropsRegistrySingleton.default)().getAsPromise(chartType)
          },
          loading: loadingProps => this.renderLoading(loadingProps, chartType),
          render: this.renderChart
        }); // Trigger preloading.

        Renderer.preload();
        return Renderer;
      }

      return EMPTY;
    }));

    _defineProperty(this, "renderChart", (loaded, props) => {
      const {
        Chart,
        transformProps
      } = loaded;
      const {
        chartProps,
        preTransformProps,
        postTransformProps
      } = props;
      return React.createElement(Chart, this.processChartProps({
        chartProps,
        preTransformProps,
        transformProps,
        postTransformProps
      }));
    });

    _defineProperty(this, "renderLoading", (loadingProps, chartType) => {
      const {
        error
      } = loadingProps;

      if (error) {
        return React.createElement("div", {
          className: "alert alert-warning",
          role: "alert"
        }, React.createElement("strong", null, "ERROR"), "\xA0", React.createElement("code", null, "chartType=\"", chartType, "\""), " \u2014", error.toString());
      }

      return null;
    });

    _defineProperty(this, "setRef", container => {
      this.container = container;
    });
  }

  render() {
    const {
      id,
      className,
      preTransformProps,
      postTransformProps,
      chartProps = BLANK_CHART_PROPS,
      onRenderSuccess,
      onRenderFailure
    } = this.props; // Create LoadableRenderer and start preloading
    // the lazy-loaded Chart components

    const Renderer = this.createLoadableRenderer(this.props); // Do not render if chartProps is set to null.
    // but the pre-loading has been started in this.createLoadableRenderer
    // to prepare for rendering once chartProps becomes available.

    if (chartProps === null) {
      return null;
    }

    const containerProps = {};

    if (id) {
      containerProps.id = id;
    }

    if (className) {
      containerProps.className = className;
    }

    return React.createElement("div", _extends({}, containerProps, {
      ref: this.setRef
    }), React.createElement(Renderer, {
      preTransformProps: preTransformProps,
      postTransformProps: postTransformProps,
      chartProps: chartProps,
      onRenderSuccess: onRenderSuccess,
      onRenderFailure: onRenderFailure
    }));
  }

}

exports.default = SuperChartCore;

_defineProperty(SuperChartCore, "propTypes", {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  chartProps: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.oneOf([null])]),
  chartType: _propTypes.default.string.isRequired,
  preTransformProps: _propTypes.default.any,
  overrideTransformProps: _propTypes.default.any,
  postTransformProps: _propTypes.default.any,
  onRenderSuccess: _propTypes.default.any,
  onRenderFailure: _propTypes.default.any
});

_defineProperty(SuperChartCore, "defaultProps", defaultProps);