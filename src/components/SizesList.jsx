import React from "react";

const SizesList = ({ sizeList, deleteSize }) => {
  return (
    sizeList.length > 0 && (
      <>
        <h3 className="capitalize mb-2 text-gray-400 text-base">Size List</h3>
        <div className="flex flex-wrap -mx-2 ">
          {sizeList.map((size) => {
            return (
              <div
                onClick={() => deleteSize(size.name)}
                className="size"
                key={size.name}
              >
                {size.name}
              </div>
            );
          })}
        </div>
      </>
    )
  );
};

export default SizesList;
