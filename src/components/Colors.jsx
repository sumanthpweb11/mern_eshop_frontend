import React from "react";

const Colors = ({ colors, deleteColor }) => {
  return (
    <div>
      {colors.length > 0 && (
        <h1 className="capitalize mb-2 text-gray-400 text-base ">
          Colors List
        </h1>
      )}
      {colors.length > 0 && (
        <div className="flex flex-wrap -mx-1">
          {colors.map((color) => {
            return (
              <div key={color.id} className="p-1">
                <div
                  className="w-[30px] h-[30px] rounded-full cursor-pointer  "
                  style={{ backgroundColor: color.color }}
                  onClick={() => deleteColor(color)}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Colors;
