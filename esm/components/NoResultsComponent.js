import _pt from "prop-types";
import React, { useMemo } from 'react';
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
const BODY_STRING = 'По данному запросу не было получено данных. Если вы ожидали, что запрос всё-таки должен содержать данные, пожалуйста убедитесь, что все фильтры настроены правильно и источник данных содержит информацию для выбранного диапазона времени';

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
  const containerStyles = useMemo(() => generateContainerStyles(height, width), [height, width]); // render the body if the width is auto/100% or greater than 250 pixels

  const shouldRenderBody = typeof width === 'string' || width > MIN_WIDTH_FOR_BODY;
  return React.createElement("div", {
    className: className,
    id: id,
    style: containerStyles,
    title: shouldRenderBody ? undefined : BODY_STRING
  }, React.createElement("div", {
    style: MESSAGE_STYLES
  }, React.createElement("div", {
    style: TITLE_STYLES
  }, "Нет результатов для показа"), shouldRenderBody && React.createElement("div", {
    style: BODY_STYLES
  }, BODY_STRING)));
};

NoResultsComponent.propTypes = {
  className: _pt.string,
  height: _pt.oneOfType([_pt.number, _pt.string]).isRequired,
  id: _pt.string,
  width: _pt.oneOfType([_pt.number, _pt.string]).isRequired
};
export default NoResultsComponent;