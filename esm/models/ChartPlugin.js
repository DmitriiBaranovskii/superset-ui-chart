function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { isRequired, Plugin } from '@superset-ui/core';
import getChartMetadataRegistry from '../registries/ChartMetadataRegistrySingleton';
import getChartBuildQueryRegistry from '../registries/ChartBuildQueryRegistrySingleton';
import getChartComponentRegistry from '../registries/ChartComponentRegistrySingleton';
import getChartControlPanelRegistry from '../registries/ChartControlPanelRegistrySingleton';
import getChartTransformPropsRegistry from '../registries/ChartTransformPropsRegistrySingleton';

function IDENTITY(x) {
  return x;
}

const EMPTY = {};

/**
 * Loaders of the form `() => import('foo')` may return esmodules
 * which require the value to be extracted as `module.default`
 * */
function sanitizeLoader(loader) {
  return () => {
    const loaded = loader();
    return loaded instanceof Promise ? loaded.then(module => 'default' in module && module.default || module) : loaded;
  };
}

export default class ChartPlugin extends Plugin {
  constructor(config) {
    super();

    _defineProperty(this, "controlPanel", void 0);

    _defineProperty(this, "metadata", void 0);

    _defineProperty(this, "loadBuildQuery", void 0);

    _defineProperty(this, "loadTransformProps", void 0);

    _defineProperty(this, "loadChart", void 0);

    const {
      metadata,
      buildQuery,
      loadBuildQuery,
      transformProps = IDENTITY,
      loadTransformProps,
      Chart,
      loadChart,
      controlPanel = EMPTY
    } = config;
    this.controlPanel = controlPanel;
    this.metadata = metadata;
    this.loadBuildQuery = loadBuildQuery && sanitizeLoader(loadBuildQuery) || buildQuery && sanitizeLoader(() => buildQuery) || undefined;
    this.loadTransformProps = sanitizeLoader(loadTransformProps != null ? loadTransformProps : () => transformProps);

    if (loadChart) {
      this.loadChart = sanitizeLoader(loadChart);
    } else if (Chart) {
      this.loadChart = () => Chart;
    } else {
      throw new Error('Chart or loadChart is required');
    }
  }

  register() {
    const {
      key = isRequired('config.key')
    } = this.config;
    getChartMetadataRegistry().registerValue(key, this.metadata);
    getChartComponentRegistry().registerLoader(key, this.loadChart);
    getChartControlPanelRegistry().registerValue(key, this.controlPanel);
    getChartTransformPropsRegistry().registerLoader(key, this.loadTransformProps);

    if (this.loadBuildQuery) {
      getChartBuildQueryRegistry().registerLoader(key, this.loadBuildQuery);
    }

    return this;
  }

  unregister() {
    const {
      key = isRequired('config.key')
    } = this.config;
    getChartMetadataRegistry().remove(key);
    getChartComponentRegistry().remove(key);
    getChartControlPanelRegistry().remove(key);
    getChartTransformPropsRegistry().remove(key);
    getChartBuildQueryRegistry().remove(key);
    return this;
  }

  configure(config, replace) {
    super.configure(config, replace);
    return this;
  }

}