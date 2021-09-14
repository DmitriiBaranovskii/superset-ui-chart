import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react'; // TODO: Note that id and className can collide between Props and ReactifyProps
// leading to (likely) unexpected behaviors. We should either require Props to not
// contain an id/className, or not combine them (via intersection), instead preferring
// wrapping (composition). As an example:
// interface MyProps {
//   id: number;
// }
// function myRender(container: HTMLDivElement, props: Readonly<MyProps>): void {
//   props.id // unusable: id is string & number
// }
// new (reactify(myRender))({ id: 5 }); // error: id has to be string & number

export default function reactify(renderFn, callbacks) {
  class ReactifiedComponent extends React.Component {
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
      return React.createElement("div", {
        ref: this.setContainerRef,
        id: id,
        className: className
      });
    }

  }

  _defineProperty(ReactifiedComponent, "propTypes", {
    id: _pt.string,
    className: _pt.string
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