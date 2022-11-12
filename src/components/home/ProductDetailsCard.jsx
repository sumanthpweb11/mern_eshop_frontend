import React from "react";
import currencyFormatter from "currency-formatter";
import h2p from "html2plaintext";
// import htmlFormat from "html-to-formatted-text";
import htmlParser from "html-react-parser";
import ProductDetailsImage from "./ProductDetailsImage";
import Quantity from "./Quantity";
import { useState } from "react";
import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/reducers/cartReducer";
import { discount } from "../../utils/Discount";

const ProductDetailsCard = ({ product }) => {
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 && product.sizes[0].name
  );

  const [colorsState, setColorsState] = useState(
    product?.colors?.length > 0 && product.colors[0].color
  );

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        return prev - 1;
      });
    }
  };

  const dispatch = useDispatch();
  const addToCart = () => {
    const {
      ["colors"]: colors,
      ["sizes"]: sizes,
      ["createdAt"]: createdAt,
      ["updatedAt"]: updatedAt,
      ...newProduct
    } = product;

    newProduct["size"] = sizeState;
    newProduct["color"] = colorsState;
    newProduct["quantity"] = quantity;

    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];

    const checkItem = cartItems.find((item) => item._id === newProduct._id);

    if (!checkItem) {
      dispatch(addCart(newProduct));
      cartItems.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      toast.error(`${newProduct.title} is already in Cart`);
      return;
    }

    // console.log(newProduct);
  };

  // DISCOUNT PRICE FUNCTION UTIL

  const discountPrice = discount(product.price, product.discount);

  let desc = h2p(product.description);
  desc = htmlParser(desc);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap -mx-5"
    >
      <Toaster />
      {/* Product Images Column */}
      <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
        <div className="flex flex-wrap -mx-1">
          <ProductDetailsImage image={product.image1} />

          <ProductDetailsImage image={product.image2} />

          <ProductDetailsImage image={product.image3} />
        </div>
      </div>

      {/* Product Details Column */}
      <div className="w-full order-1 md:order-2 md:w-6/12 p-5">
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
                    onClick={() => setSizeState(size.name)}
                    key={size.name}
                    className={`first-letter:p-2 mx-1 border border-gray-300 rounded cursor-pointer ${
                      sizeState === size.name && "bg-indigo-600"
                    }  `}
                  >
                    <span
                      className={`text-sm font-semibold uppercase text-gray-900
                       ${
                         sizeState === size.name
                           ? "text-white"
                           : "text-gray-900"
                       }
                    
                     `}
                    >
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
                    onClick={() => setColorsState(color.color)}
                    className="border border-gray-300 rounded m-1 p-1 cursor-pointer "
                  >
                    <span
                      className="rounded w-10 h-10 border flex items-center justify-center  "
                      style={{ backgroundColor: color.color }}
                    >
                      {colorsState === color.color && (
                        <BsCheck2 className="text-white" size={20} />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* DISPLAY QUANTITY  */}
        <div className="flex -mx-3 items-center">
          <div className="w-full sm:w-6/12 p-3">
            <Quantity quantity={quantity} inc={inc} dec={dec} />
          </div>

          <div className="w-full sm:w-6/12 p-3">
            <button onClick={addToCart} className="btn btn-indigo">
              Add to Cart
            </button>
          </div>
        </div>

        {/* DISPLAY DESCRIPTION  */}
        <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
          Description
        </h3>
        <div className="mt-4 leading-[27px] description">{desc}</div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsCard;
