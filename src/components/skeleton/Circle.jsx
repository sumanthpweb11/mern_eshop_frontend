import React from "react";
import Animate from "./Animate";

const Circle = () => {
  return (
    <div className="w-10 h-10 rounded-lg  bg-gray-300 animate-ping overflow-hidden relative">
      <Animate />
    </div>
  );
};

export default Circle;
