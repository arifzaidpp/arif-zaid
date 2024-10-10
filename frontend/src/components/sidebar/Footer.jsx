import React from "react";
import { FaLinkedin, FaBehance, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-auto bg-zinc-300 flex items-center rounded-b-lg justify-center p-4">
      {/* Social Media Icons */}
      <div className="flex justify-between w-full max-w-xs">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex-grow flex justify-center"
        >
          <FaLinkedin
            className="text-gray-700 hover:text-blue-600 transition duration-200"
            size={20}
          />
        </a>
        <a
          href="https://www.behance.net"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance"
          className="flex-grow flex justify-center"
        >
          <FaBehance
            className="text-gray-700 hover:text-blue-500 transition duration-200"
            size={20}
          />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex-grow flex justify-center"
        >
          <FaGithub
            className="text-gray-700 hover:text-gray-800 transition duration-200"
            size={20}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex-grow flex justify-center"
        >
          <FaInstagram
            className="text-gray-700 hover:text-pink-600 transition duration-200"
            size={20}
          />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex-grow flex justify-center"
        >
          <FaFacebook
            className="text-gray-700 hover:text-blue-700 transition duration-200"
            size={20}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
