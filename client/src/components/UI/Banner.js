import React from "react";

const Banner = ({
  
  heading,
  
  customText,
  textColor,
}) => {
  return (
    <div
      className={`w-11/12 mx-auto  shadow-xl  rounded p-4 h-72 my-6 bg-cover flex flex-row justify-between`}
      style={{backgroundImage:"linear-gradient(to right, blue,red)"}}
    >
      <div>
        <h2
          style={{
            fontFamily: ["Poppins", "sans-serif"],
          }}
          className={`text-6xl text-${textColor}-50 font-semibold`}
        >
          {heading}
        </h2>
       
        <p
          style={{
            fontFamily: ["Poppins", "sans-serif"],
            fontSize: "1.5rem",
          }}
          className={textColor && `text-${textColor}-50`}
        >
          {customText}
        </p>
      </div>
      {/* <div className="w-3/12 sm:hidden ">
        <img alt="" src={SVGComponent} />
      </div> */}
    </div>
  );
};

export default Banner;
