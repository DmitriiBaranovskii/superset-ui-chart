"use strict";

exports.__esModule = true;
exports.default = void 0;

var _reselect = require("reselect");

var _core = require("@superset-ui/core");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class ChartProps {
  constructor(config) {
    if (config === void 0) {
      config = {};
    }

    _defineProperty(this, "annotationData", void 0);

    _defineProperty(this, "datasource", void 0);

    _defineProperty(this, "rawDatasource", void 0);

    _defineProperty(this, "initialValues", void 0);

    _defineProperty(this, "formData", void 0);

    _defineProperty(this, "rawFormData", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "hooks", void 0);

    _defineProperty(this, "queryData", void 0);

    _defineProperty(this, "width", void 0);

    const {
      annotationData = {},
      datasource = {},
      formData = {},
      hooks = {},
      initialValues = {},
      queryData = {},
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT
    } = config;
    this.width = width;
    this.height = height;
    this.annotationData = annotationData;
    this.datasource = (0, _core.convertKeysToCamelCase)(datasource);
    this.rawDatasource = datasource;
    this.formData = (0, _core.convertKeysToCamelCase)(formData);
    this.rawFormData = formData;
    this.hooks = hooks;
    this.initialValues = initialValues;
    this.queryData = queryData;
  }

} // eslint-disable-next-line func-name-matching


exports.default = ChartProps;

_defineProperty(ChartProps, "createSelector", void 0);

ChartProps.createSelector = function create() {
  return (0, _reselect.createSelector)(input => input.annotationData, input => input.datasource, input => input.formData, input => input.height, input => input.hooks, input => input.initialValues, input => input.queryData, input => input.width, (annotationData, datasource, formData, height, hooks, initialValues, queryData, width) => new ChartProps({
    annotationData,
    datasource,
    formData,
    height,
    hooks,
    initialValues,
    queryData,
    width
  }));
};