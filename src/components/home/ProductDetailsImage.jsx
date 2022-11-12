import React from "react";

const ProductDetailsImage = ({ image }) => {
  return (
    <div className="w-full sm:w-6/12 p-1">
      <img
        className="w-full h-auto object-cover"
        src={`/images/${image}`}
        alt="image1"
      />
    </div>
  );
};

export default ProductDetailsImage;
