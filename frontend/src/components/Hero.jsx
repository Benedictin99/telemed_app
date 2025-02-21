import React from "react";

const Hero = ({ bgImage }) => {
  return (
    <div className="flex flex-row max-h-screen">
      <img className="h-screen w-screen/2" src={bgImage} alt="" />
      <div className="text-6xl">Bienvenu</div>
    </div>
  );
};

export default Hero;
