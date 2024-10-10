import React, { useState } from "react";
import {
  FaUserAlt,
  FaProjectDiagram,
  FaChartBar,
  FaStar,
  FaGraduationCap,
  FaEnvelope,
  FaBlog,
  FaFileAlt,
} from "react-icons/fa";

const menuItems = [
  { name: "About", icon: <FaUserAlt className="text-green-500" />, color: "green-500" },
  { name: "Projects", icon: <FaProjectDiagram className="text-purple-500" />, color: "purple-500" },
  { name: "Skills", icon: <FaChartBar className="text-fuchsia-500" />, color: "fuchsia-500" },
  { name: "Certificate", icon: <FaStar className="text-red-500" />, color: "red-500" },
  { name: "Education", icon: <FaGraduationCap className="text-orange-500" />, color: "orange-500" },
  { name: "Contact", icon: <FaEnvelope className="text-yellow-900" />, color: "yellow-900" },
  { name: "Blog", icon: <FaBlog className="text-yellow-500" />, color: "yellow-500" },
  { name: "Resume", icon: <FaFileAlt className="text-gray-600" />, color: "gray-600" },
];

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState(null); // Track the hovered item

  return (
    <div className="bg-zinc-100 flex-grow overflow-y-auto scrollbar-hide"> {/* Ensure scroll and background color */}
      <ul className="w-full">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center justify-start space-x-3 p-4 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-300 ${
              hoveredItem === item.name ? `border-l-4 border-${item.color}` : "border-transparent"
            }`} // Border color and effect on hover
            onMouseEnter={() => setHoveredItem(item.name)} // Set hovered item on mouse enter
            onMouseLeave={() => setHoveredItem(null)} // Reset hovered item on mouse leave
          >
            {/* Icon and text side by side */}
            <span className="text-xl ml-4">{item.icon}</span>
            <span className="ml-4 text-gray-500">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
