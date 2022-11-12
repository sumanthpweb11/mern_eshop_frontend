import React from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/home/Nav";
import { BsArrowRightShort } from "react-icons/bs";
import { useGetProductQuery } from "../../store/services/productService";
import ProductDetailsCard from "../../components/home/ProductDetailsCard";
import ProductLoader from "../../components/home/ProductLoader";

const ProductDetail = () => {
  const { name } = useParams();
  const { data, isFetching } = useGetProductQuery(name);
  return (
    <>
      <Nav />
      <div className="my-container mt-6">
        {isFetching ? (
          <ProductLoader />
        ) : (
          // BreadCrummbs
          <>
            <ul className="flex items-center">
              <li className="capitalize text-sm text-gray-600">
                <Link to="/">Home</Link>
              </li>
              <BsArrowRightShort className="block mx-2 " />

              <li className="capitalize text-sm text-gray-600">
                <Link to={`/cat-products/${data.category}`}>
                  {data.category}
                </Link>
              </li>
              <BsArrowRightShort className="block mx-2 " />

              <li className="capitalize text-sm text-gray-600">
                <Link to={`/product/${data._id}`}>{data.title}</Link>
              </li>
            </ul>

            <ProductDetailsCard product={data} />
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
