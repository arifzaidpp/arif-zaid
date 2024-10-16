import { createRef, useRef, useEffect } from "react";
import { init, reInit } from "./index";
import PropTypes from "prop-types";

function TinySlider({
  options = {},           // Default options as an empty object
  getRef = () => {},     // Default getRef function
  className = "",        // Default className as an empty string
  children
}) {
  const initialRender = useRef(true);
  const sliderRef = createRef();

  useEffect(() => {
    getRef(sliderRef.current);

    if (initialRender.current) {
      init(sliderRef.current, { options, getRef, className }); // Pass options and other props to init
      initialRender.current = false;
    } else {
      reInit(sliderRef.current);
    }
  }, [options, children, getRef, className]);

  return (
    <div ref={sliderRef} className={`tiny-slider ${className}`}>
      {children}
    </div>
  );
}

TinySlider.propTypes = {
  options: PropTypes.object,
  getRef: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node, // Add children as a prop
};

export default TinySlider;
