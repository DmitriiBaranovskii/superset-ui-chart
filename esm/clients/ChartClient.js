function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isDefined } from '@superset-ui/core';
import { SupersetClient } from '@superset-ui/connection';
import getChartBuildQueryRegistry from '../registries/ChartBuildQueryRegistrySingleton';
import getChartMetadataRegistry from '../registries/ChartMetadataRegistrySingleton';
export default class ChartClient {
  constructor(config) {
    if (config === void 0) {
      config = {};
    }

    _defineProperty(this, "client", void 0);

    const {
      client = SupersetClient
    } = config;
    this.client = client;
  }

  loadFormData(input, options) {
    /* If sliceId is provided, use it to fetch stored formData from API */
    if ('sliceId' in input) {
      const promise = this.client.get(_extends({
        endpoint: "/api/v1/formData/?slice_id=" + input.sliceId
      }, options)).then(response => response.json).then(json => json.form_data);
      /*
       * If formData is also specified, override API result
       * with user-specified formData
       */

      return promise.then(dbFormData => _extends({}, dbFormData, {}, input.formData));
    }
    /* If sliceId is not provided, returned formData wrapped in a Promise */


    return input.formData ? Promise.resolve(input.formData) : Promise.reject(new Error('At least one of sliceId or formData must be specified'));
  }

  async loadQueryData(formData, options) {
    const {
      viz_type: visType
    } = formData;
    const metaDataRegistry = getChartMetadataRegistry();
    const buildQueryRegistry = getChartBuildQueryRegistry();

    if (metaDataRegistry.has(visType)) {
      var _ref;

      const {
        useLegacyApi
      } = metaDataRegistry.get(visType);
      const buildQuery = (_ref = await buildQueryRegistry.get(visType)) != null ? _ref : () => formData;
      return this.client.post(_extends({
        endpoint: useLegacyApi ? '/superset/explore_json/' : '/api/v1/query/',
        postPayload: {
          [useLegacyApi ? 'form_data' : 'query_context']: buildQuery(formData)
        }
      }, options)).then(response => response.json);
    }

    return Promise.reject(new Error("Unknown chart type: " + visType));
  }

  loadDatasource(datasourceKey, options) {
    return this.client.get(_extends({
      endpoint: "/superset/fetch_datasource_metadata?datasourceKey=" + datasourceKey
    }, options)).then(response => response.json);
  } // eslint-disable-next-line class-methods-use-this


  loadAnnotation(annotationLayer) {
    /* When annotation does not require query */
    if (!isDefined(annotationLayer.sourceType)) {
      return Promise.resolve({});
    } // TODO: Implement


    return Promise.reject(new Error('This feature is not implemented yet.'));
  }

  loadAnnotations(annotationLayers) {
    if (Array.isArray(annotationLayers) && annotationLayers.length > 0) {
      return Promise.all(annotationLayers.map(layer => this.loadAnnotation(layer))).then(results => annotationLayers.reduce((prev, layer, i) => {
        const output = prev;
        output[layer.name] = results[i];
        return output;
      }, {}));
    }

    return Promise.resolve({});
  }

  loadChartData(input) {
    return this.loadFormData(input).then(formData => Promise.all([this.loadAnnotations(formData.annotation_layers), this.loadDatasource(formData.datasource), this.loadQueryData(formData)]).then((_ref2) => {
      let [annotationData, datasource, queryData] = _ref2;
      return {
        annotationData,
        datasource,
        formData,
        queryData
      };
    }));
  }

}