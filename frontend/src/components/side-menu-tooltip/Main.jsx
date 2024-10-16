import { useRef, createElement, useEffect } from "react";
import { Tippy } from "@/base-components";
import PropTypes from "prop-types";

const toggleTooltip = (el) => {
  if (dom(window).width() <= 1260) {
    el._tippy.enable();
  } else {
    el._tippy.disable();
  }
};

const initTooltipEvent = (tippyRef) => {
  window.addEventListener("resize", () => {
    toggleTooltip(tippyRef);
  });
};

function Main({ tag = "span", ...computedProps }) { // Default value for tag here
  const tippyRef = useRef();

  useEffect(() => {
    toggleTooltip(tippyRef.current);
    initTooltipEvent(tippyRef.current);
  }, [tippyRef.current]);

  return createElement(
    Tippy,
    {
      ...computedProps,
      tag,
      options: { placement: "left" },
      getRef: (el) => {
        tippyRef.current = el;
      },
    },
    computedProps.children
  );
}

Main.propTypes = {
  tag: PropTypes.string,
};

export default Main;
