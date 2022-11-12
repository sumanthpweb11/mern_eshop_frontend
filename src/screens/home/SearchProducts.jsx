import React from "react";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";

import { useSearchProductsQuery } from "../../store/services/HomeProducts";

const SearchProducts = () => {
  const { keyword, page = 1 } = useParams();

  const { data, isFetching } = useSearchProductsQuery({
    keyword,
    page: parseInt(page),
  });

  console.log("CATPRODUCTS", data, isFetching);
  return (
    <>
      <Nav />
      <div className="">
        <Header>#{keyword}</Header>
      </div>

      <div className="my-container my-10 ">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700 flex justify-center items-center ">
              {data.count} products found in #{keyword} category
            </p>
            <div className="flex flex-wrap -mx-5 justify-center items-center ">
              {data.products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`search-products/${keyword}`}
              theme="light"
            />
          </>
        ) : (
          <p className="text-base font-medium text-gray-700 flex justify-center items-center">
            No Products found in #{keyword} category
          </p>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
