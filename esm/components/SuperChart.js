import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { parseLength } from '@superset-ui/dimension';
import { ParentSize } from '@vx/responsive';
import { createSelector } from 'reselect';
import SuperChartCore from './SuperChartCore';
import DefaultFallbackComponent from './FallbackComponent';
import ChartProps from '../models/ChartProps';
import NoResultsComponent from './NoResultsComponent';
const defaultProps = {
  FallbackComponent: DefaultFallbackComponent,
  height: 400,
  width: '100%'
};
export default class SuperChart extends React.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "core", void 0);

    _defineProperty(this, "createChartProps", ChartProps.createSelector());

    _defineProperty(this, "parseDimension", createSelector((_ref) => {
      let {
        width
      } = _ref;
      return width;
    }, (_ref2) => {
      let {
        height
      } = _ref2;
      return height;
    }, (width, height) => {
      // Parse them in case they are % or 'auto'
      const widthInfo = parseLength(width);
      const heightInfo = parseLength(height);
      const boxHeight = heightInfo.isDynamic ? heightInfo.multiplier * 100 + "%" : heightInfo.value;
      const boxWidth = widthInfo.isDynamic ? widthInfo.multiplier * 100 + "%" : widthInfo.value;
      const style = {
        height: boxHeight,
        width: boxWidth
      }; // bounding box will ensure that when one dimension is not dynamic
      // e.g. height = 300
      // the auto size will be bound to that value instead of being 100% by default
      // e.g. height: 300 instead of height: '100%'

      const BoundingBox = widthInfo.isDynamic && heightInfo.isDynamic && widthInfo.multiplier === 1 && heightInfo.multiplier === 1 ? React.Fragment : (_ref3) => {
        let {
          children
        } = _ref3;
        return React.createElement("div", {
          style: style
        }, children);
      };
      return {
        BoundingBox,
        heightInfo,
        widthInfo
      };
    }));

    _defineProperty(this, "setRef", core => {
      this.core = core;
    });
  }

  renderChart(width, height) {
    const _ref4 = this.props,
          {
      id,
      className,
      chartType,
      preTransformProps,
      overrideTransformProps,
      postTransformProps,
      onRenderSuccess,
      onRenderFailure,
      disableErrorBoundary,
      FallbackComponent: _FallbackComponent,
      onErrorBoundary,
      Wrapper,
      queryData
    } = _ref4,
          rest = _objectWithoutPropertiesLoose(_ref4, ["id", "className", "chartType", "preTransformProps", "overrideTransformProps", "postTransformProps", "onRenderSuccess", "onRenderFailure", "disableErrorBoundary", "FallbackComponent", "onErrorBoundary", "Wrapper", "queryData"]);

    const chartProps = this.createChartProps(_extends({}, rest, {
      queryData,
      height,
      width
    }));
    let chart; // Render the no results component if the query data is null or empty

    if (queryData == null || queryData.data === null || Array.isArray(queryData.data) && queryData.data.length === 0) {
      chart = React.createElement(NoResultsComponent, {
        id: id,
        className: className,
        height: height,
        width: width
      });
    } else {
      const chartWithoutWrapper = React.createElement(SuperChartCore, {
        ref: this.setRef,
        id: id,
        className: className,
        chartType: chartType,
        chartProps: chartProps,
        preTransformProps: preTransformProps,
        overrideTransformProps: overrideTransformProps,
        postTransformProps: postTransformProps,
        onRenderSuccess: onRenderSuccess,
        onRenderFailure: onRenderFailure
      });
      chart = Wrapper ? React.createElement(Wrapper, {
        width: width,
        height: height
      }, chartWithoutWrapper) : chartWithoutWrapper;
    } // Include the error boundary by default unless it is specifically disabled.


    return disableErrorBoundary === true ? chart : React.createElement(ErrorBoundary, {
      FallbackComponent: props => React.createElement(_FallbackComponent, _extends({
        width: width,
        height: height
      }, props)),
      onError: onErrorBoundary
    }, chart);
  }

  render() {
    const {
      heightInfo,
      widthInfo,
      BoundingBox
    } = this.parseDimension(this.props); // If any of the dimension is dynamic, get parent's dimension

    if (widthInfo.isDynamic || heightInfo.isDynamic) {
      const {
        debounceTime
      } = this.props;
      return React.createElement(BoundingBox, null, React.createElement(ParentSize, {
        debounceTime: debounceTime
      }, (_ref5) => {
        let {
          width,
          height
        } = _ref5;
        return width > 0 && height > 0 && this.renderChart(widthInfo.isDynamic ? Math.floor(width) : widthInfo.value, heightInfo.isDynamic ? Math.floor(height) : heightInfo.value);
      }));
    }

    return this.renderChart(widthInfo.value, heightInfo.value);
  }

}

_defineProperty(SuperChart, "propTypes", {
  disableErrorBoundary: _pt.bool,
  debounceTime: _pt.number,
  FallbackComponent: _pt.elementType,
  height: _pt.oneOfType([_pt.number, _pt.string]),
  width: _pt.oneOfType([_pt.number, _pt.string]),
  Wrapper: _pt.elementType
});

_defineProperty(SuperChart, "defaultProps", defaultProps);