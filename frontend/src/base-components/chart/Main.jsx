import { createElement, createRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

const init = (el, props) => {
  const canvas = el?.getContext("2d");
  const chart = new Chart(canvas, {
    type: props.type,
    data: props.data,
    options: props.options,
  });

  // Attach ChartJs instance
  el.instance = chart;
};

function ChartComponent({
  type = "line",
  data = {},
  options = {},
  width = "auto",
  height = "auto",
  getRef = () => {},
  className = "",
  ...computedProps
}) {
  const initialRender = useRef(true);
  const chartRef = createRef();

  useEffect(() => {
    if (initialRender.current) {
      getRef(chartRef.current);
      init(chartRef.current, { type, data, options });
      initialRender.current = false;
    } else {
      chartRef.current.instance.data = data;
      chartRef.current.instance.options = options;
      chartRef.current.instance.update();
    }
  }, [data, options, getRef, type]);

  return createElement(
    "div",
    {
      style: {
        width: `${width}px`,
        height: `${height}px`,
      },
    },
    createElement(
      "canvas",
      {
        ...computedProps,
        ref: chartRef,
      },
      computedProps.children
    )
  );
}

ChartComponent.propTypes = {
  type: PropTypes.oneOf(["line", "pie", "doughnut", "bar"]),
  data: PropTypes.object,
  options: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getRef: PropTypes.func,
  className: PropTypes.string,
};

export default ChartComponent;
