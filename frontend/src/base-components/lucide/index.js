import { createElement } from "react";
import * as lucideIcons from "lucide-react"; // Import all icons
import PropTypes from "prop-types";

function Lucide({ icon, className = "", ...computedProps }) {
  try {
    // Icons are now named exports in the newer version.
    const IconComponent = lucideIcons[icon];

    if (IconComponent !== undefined) {
      return createElement(IconComponent, {
        ...computedProps,
        className: `${className} ${!className.includes("lucide") ? "lucide" : ""}`, // Ensures 'lucide' class is only added if not already present
      });
    } else {
      throw new Error(`Lucide icon '${icon}' not found.`);
    }
  } catch (err) {
    console.error(err);
    // Optionally return a fallback icon here, or simply return null
    return createElement(lucideIcons.AlertCircle, {
      className: "lucide text-red-500", // Fallback icon with style (optional)
      ...computedProps,
    });
  }
}

Lucide.propTypes = {
  icon: PropTypes.string.isRequired, // Ensure icon prop is provided
  className: PropTypes.string,
};

// No need for defaultProps, defaults handled in function parameters
export default Lucide;
