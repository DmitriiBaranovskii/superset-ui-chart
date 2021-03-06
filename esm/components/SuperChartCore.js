import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/jsx-sort-default-props */
import * as React from 'react';
import { createSelector } from 'reselect';
import getChartComponentRegistry from '../registries/ChartComponentRegistrySingleton';
import getChartTransformPropsRegistry from '../registries/ChartTransformPropsRegistrySingleton';
import ChartProps from '../models/ChartProps';
import createLoadableRenderer from './createLoadableRenderer';

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
const BLANK_CHART_PROPS = new ChartProps();
export default class SuperChartCore extends React.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "processChartProps", createSelector(input => input.chartProps, input => input.preTransformProps, input => input.transformProps, input => input.postTransformProps, function (chartProps, pre, transform, post) {
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

    _defineProperty(this, "createLoadableRenderer", createSelector(input => input.chartType, input => input.overrideTransformProps, (chartType, overrideTransformProps) => {
      if (chartType) {
        const Renderer = createLoadableRenderer({
          loader: {
            Chart: () => getChartComponentRegistry().getAsPromise(chartType),
            transformProps: overrideTransformProps ? () => Promise.resolve(overrideTransformProps) : () => getChartTransformPropsRegistry().getAsPromise(chartType)
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

_defineProperty(SuperChartCore, "propTypes", {
  id: _pt.string,
  className: _pt.string,
  chartProps: _pt.oneOfType([_pt.any, _pt.oneOf([null])]),
  chartType: _pt.string.isRequired,
  preTransformProps: _pt.any,
  overrideTransformProps: _pt.any,
  postTransformProps: _pt.any,
  onRenderSuccess: _pt.any,
  onRenderFailure: _pt.any
});

_defineProperty(SuperChartCore, "defaultProps", defaultProps);