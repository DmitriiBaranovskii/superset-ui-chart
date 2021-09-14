import _pt from "prop-types";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/sort-comp: 'off' */
import React from 'react';
import ChartClient from '../clients/ChartClient';

class ChartDataProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "chartClient", void 0);

    _defineProperty(this, "state", {
      status: 'uninitialized'
    });

    _defineProperty(this, "handleFetchData", () => {
      const {
        loadDatasource,
        formDataRequestOptions,
        datasourceRequestOptions,
        queryRequestOptions
      } = this.props;
      this.setState({
        status: 'loading'
      }, () => {
        try {
          this.chartClient.loadFormData(this.extractSliceIdAndFormData(), formDataRequestOptions).then(formData => Promise.all([loadDatasource ? this.chartClient.loadDatasource(formData.datasource, datasourceRequestOptions) : Promise.resolve(undefined), this.chartClient.loadQueryData(formData, queryRequestOptions)]).then((_ref) => {
            let [datasource, queryData] = _ref;
            return (// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              {
                datasource,
                formData,
                queryData
              }
            );
          })).then(this.handleReceiveData).catch(this.handleError);
        } catch (error) {
          this.handleError(error);
        }
      });
    });

    _defineProperty(this, "handleReceiveData", payload => {
      const {
        onLoaded
      } = this.props;
      if (onLoaded) onLoaded(payload);
      this.setState({
        payload,
        status: 'loaded'
      });
    });

    _defineProperty(this, "handleError", error => {
      const {
        onError
      } = this.props;
      if (onError) onError(error);
      this.setState({
        error,
        status: 'error'
      });
    });

    this.chartClient = new ChartClient({
      client: props.client
    });
  }

  componentDidMount() {
    this.handleFetchData();
  }

  componentDidUpdate(prevProps) {
    const {
      formData,
      sliceId
    } = this.props;

    if (formData !== prevProps.formData || sliceId !== prevProps.sliceId) {
      this.handleFetchData();
    }
  }

  extractSliceIdAndFormData() {
    const {
      formData,
      sliceId
    } = this.props;
    return formData ? {
      formData
    } : {
      sliceId: sliceId
    };
  }

  render() {
    const {
      children
    } = this.props;
    const {
      status,
      payload,
      error
    } = this.state;

    switch (status) {
      case 'loading':
        return children({
          loading: true
        });

      case 'loaded':
        return children({
          payload
        });

      case 'error':
        return children({
          error
        });

      case 'uninitialized':
      default:
        return null;
    }
  }

}

_defineProperty(ChartDataProvider, "propTypes", {
  children: _pt.func.isRequired,
  client: _pt.any,
  loadDatasource: _pt.bool,
  onError: _pt.func,
  onLoaded: _pt.func,
  formDataRequestOptions: _pt.any,
  datasourceRequestOptions: _pt.any,
  queryRequestOptions: _pt.any
});

export default ChartDataProvider;