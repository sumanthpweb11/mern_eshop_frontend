import React from "react";
import currencyFormatter from "currency-formatter";
import h2p from "html2plaintext";

const ProductDetailsCard = ({ product }) => {
  const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
  return (
    <div className="flex flex-wrap -mx-5">
      {/* Product Images Column */}
      <div className="w-full sm:w-6/12 p-5">
        <div className="flex flex-wrap -mx-1">
          <div className="w-full sm:w-6/12 p-1">
            <img
              className="w-full h-auto object-cover"
              src={`/images/${product.image1}`}
              alt="image1"
            />
          </div>

          <div className="w-full sm:w-6/12 p-1">
            <img
              className="w-full h-auto object-cover"
              src={`/images/${product.image2}`}
              alt="image2"
            />
          </div>

          <div className="w-full sm:w-6/12 p-1">
            <img
              className="w-full h-auto object-cover"
              src={`/images/${product.image3}`}
              alt="image3"
            />
          </div>
        </div>
      </div>

      {/* Product Details Column */}
      <div className="w-full sm:w-6/12 p-5">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {[product.title]}
        </h1>
        <div className="flex justify-between my-5">
          <span className="text-2xl font-bold text-gray-900">
            {currencyFormatter.format(discountPrice, {
              code: "USD",
            })}
          </span>

          <span className="text-xl font-medium text-gray-500 line-through ">
            {currencyFormatter.format(product.price, {
              code: "USD",
            })}
          </span>
        </div>

        {/* DISPLAY SIZES  */}
        {product.sizes.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-3">
              Sizes
            </h3>
            <div className="flex flex-wrap -mx-1 ">
              {product.sizes.map((size) => {
                return (
                  <div
                    key={size.name}
                    className="p-2 mx-1 border border-gray-300 rounded cursor-pointer"
                  >
                    <span className="text-sm font-semibold uppercase text-gray-900">
                      {size.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* DISPLAY COLORS  */}
        {product.colors.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
              Colors
            </h3>

            <div className="flex flex-wrap -mx-1">
              {product.colors.map((color) => {
                return (
                  <div
                    key={color.color}
                    className="border border-gray-300 rounded m-1 p-1 cursor-pointer "
                  >
                    <span
                      className="rounded w-10 h-10 border block  "
                      style={{ backgroundColor: color.color }}
                    ></span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* DISPLAY DESCRIPTION  */}
        <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
          Description
        </h3>
        <p>{h2p(product.description)}</p>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
