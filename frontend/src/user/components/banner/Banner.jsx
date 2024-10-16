import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-[calc(100vh-30px)]">
      <div className="relative w-full h-full">
        {/* Background Image */}
        <img
          src="./src/assets/Banner.jpeg" // Replace with the correct path to the image
          alt="Banner"
          className="object-cover w-full h-full"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(31,1,1,0.39)]"></div>

        {/* Text Content (Headline and Subheadline) */}
        <div className="absolute left-0 top-0 p-8 lg:p-16 text-left text-black font-light">
          {/* Headline */}
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-snug"
            style={{
              fontWeight: 300,
              lineHeight: "1.2",
              color: "#fcf7f3b7",
              textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            I want to{" "}
            <span className="px-2" style={{ backgroundColor: "#008073" }}>
              make things
            </span>{" "}
            <br />
            that{" "}
            <span className="underline underline-offset-8 decoration-[#008073] decoration-4">
              {" "}
              make a difference
            </span>
            .
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
