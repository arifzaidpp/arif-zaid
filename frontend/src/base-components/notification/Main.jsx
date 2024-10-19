import { createElement, useRef, createRef, useEffect } from "react";
import "@left4code/tw-starter/dist/js/modal";
import { init, reInit } from "./index";
import PropTypes from "prop-types";

function Notification({
  className = "", // Default value for className
  options = {}, // Default value for options
  getRef = () => {}, // Default function for getRef
  children,
  ...computedProps
}) {
  const initialRender = useRef(true);
  const toastifyRef = createRef();

  useEffect(() => {
    if (initialRender.current) {
      getRef(toastifyRef.current);
      init(toastifyRef.current, { options, children });
      initialRender.current = false;
    } else {
      reInit(toastifyRef.current);
    }
  }, [options, children]);

  return createElement(
    "div",
    {
      ...computedProps,
      className: `toastify-content hidden ${className}`,
      ref: toastifyRef,
    },
    children
  );
}

Notification.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object,
  getRef: PropTypes.func,
  children: PropTypes.node.isRequired, // Ensure children is required
};

export default Notification;
