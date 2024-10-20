import React, { useState } from "react";

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-4 bg-zinc-300 w-full flex flex-col items-center text-center rounded-t-lg shadow-lg">
      {/* Profile Picture */}
      <div className="relative mb-2">
        <img
          src="https://res.cloudinary.com/drnexn1qc/image/upload/v1729447032/uploads/ocdwzhweyz4p98ttlzfx.jpg" // Replace with your profile photo URL
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />

        {/* Live status indicator with continuous glowing effect */}
        <div className="absolute bottom-1 right-1 flex items-center justify-center">
          <div
            className="w-4 h-4 rounded-full bg-green-500 z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <div className="absolute w-3 h-3 rounded-full animate-ping bg-gray-600" />

          {/* Tooltip for availability with smoother and reduced sliding effect */}
          <div
            className={`absolute -bottom-3 bg-gray-600 text-white text-xs px-2 py-1 rounded shadow-lg w-[8rem] whitespace-normal transform transition-all duration-500 ease-in-out ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "translate-x-[20%] opacity-0"
            }`}
            style={{ right: "-8.5rem" }} // Keeps tooltip aligned to the live status indicator
          >
            I am available for freelance hire
            {/* Tooltip Arrow */}
            <div className="absolute top-[35%] left-[-6px] h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-600" />
          </div>
        </div>
      </div>

      {/* Name and Title */}
      <h2 className="text-slate-700 text-2xl font-bold">Arif Zaid P P</h2>
      <p className="text-sm text-gray-600 -mt-2">MERN Stack Developer</p>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-400 my-2 w-full max-w-xs" />

      {/* Personal Info */}
      <div className="mt-2 w-full px-2">
        <div className="flex justify-between text-left mb-2">
          <span className="font-semibold text-gray-800 text-sm">
            Residence:
          </span>
          <span className="text-gray-600 text-sm">India</span>{" "}
          {/* Reduced text size */}
        </div>
        <div className="flex justify-between text-left mb-2">
          <span className="font-semibold text-gray-800 text-sm">City:</span>
          <span className="text-gray-600 text-sm">Malappuram</span>{" "}
          {/* Reduced text size */}
        </div>
        <div className="flex justify-between text-left">
          <span className="font-semibold text-gray-800 text-sm">Age:</span>
          <span className="text-gray-600 text-sm">19</span>{" "}
          {/* Reduced text size */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
