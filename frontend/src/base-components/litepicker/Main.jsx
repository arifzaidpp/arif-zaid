import { createElement, createRef, useEffect, useRef } from "react";
import { setValue, init, reInit } from "./index";
import PropTypes from "prop-types";

function Litepicker({
  options = {},
  value = "",
  onChange = () => {},
  getRef = () => {},
  id, // Added id prop
  name, // Added name prop
  children,
  ...computedProps
}) {
  const initialRender = useRef(true);
  const litepickerRef = createRef();
  const tempValue = useRef(value);

  useEffect(() => {
    getRef(litepickerRef.current);

    if (initialRender.current) {
      setValue({ options, value, onChange });
      init(litepickerRef.current, { options, value, onChange });
      initialRender.current = false;
    } else if (tempValue.current !== value) {
      reInit(litepickerRef.current, { options, value, onChange });
    }

    tempValue.current = value;
  }, [value, options, onChange, getRef]);

  return createElement(
    "input",
    {
      ...computedProps,
      ref: litepickerRef,
      type: "text",
      value,
      onChange,
      id, // Pass the id prop to the input
      name, // Pass the name prop to the input
    },
    children
  );
}

Litepicker.propTypes = {
  options: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  getRef: PropTypes.func,
  id: PropTypes.string, // Added PropType for id
  name: PropTypes.string, // Added PropType for name
};

export default Litepicker;
