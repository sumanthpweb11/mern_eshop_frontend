import React from "react";
import Animate from "./Animate";

const Text = ({ mt }) => {
  return (
    <div
      className="w-full h-4 rounded-md  bg-gray-300 animate-ping overflow-hidden relative"
      style={{ marginTop: { mt } }}
    >
      <Animate />
    </div>
  );
};

export default Text;
