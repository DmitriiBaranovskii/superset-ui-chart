"use strict";

exports.__esModule = true;
exports.default = reactify;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reactify(renderFn, callbacks) {
  class ReactifiedComponent extends _react.default.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "container", void 0);

      this.setContainerRef = this.setContainerRef.bind(this);
    }

    componentDidMount() {
      this.execute();
    }

    componentDidUpdate() {
      this.execute();
    }

    componentWillUnmount() {
      this.container = undefined;

      if (callbacks == null ? void 0 : callbacks.componentWillUnmount) {
        callbacks.componentWillUnmount.bind(this)();
      }
    }

    setContainerRef(ref) {
      this.container = ref;
    }

    execute() {
      if (this.container) {
        renderFn(this.container, this.props);
      }
    }

    render() {
      const {
        id,
        className
      } = this.props;
      return _react.default.createElement("div", {
        ref: this.setContainerRef,
        id: id,
        className: className
      });
    }

  }

  _defineProperty(ReactifiedComponent, "propTypes", {
    id: _propTypes.default.string,
    className: _propTypes.default.string
  });

  const ReactifiedClass = ReactifiedComponent;

  if (renderFn.displayName) {
    ReactifiedClass.displayName = renderFn.displayName;
  } // eslint-disable-next-line react/forbid-foreign-prop-types


  if (renderFn.propTypes) {
    ReactifiedClass.propTypes = _extends({}, ReactifiedClass.propTypes, {}, renderFn.propTypes);
  }

  if (renderFn.defaultProps) {
    ReactifiedClass.defaultProps = renderFn.defaultProps;
  }

  return ReactifiedComponent;
}