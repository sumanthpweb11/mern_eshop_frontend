import React from "react";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import { Link, useParams } from "react-router-dom";
import { useCatProductsQuery } from "../../store/services/HomeProducts";
import Text from "../../components/skeleton/Text";
import Skeleton from "../../components/skeleton/Skeleton";
import Thumbnail from "../../components/skeleton/Thumbnail";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";

const CatProducts = () => {
  const { name, page = 1 } = useParams();

  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });

  console.log("CATPRODUCTS", data, isFetching);
  return (
    <>
      <Nav />
      <div className="">
        <Header>#{name}</Header>
      </div>

      <div className="my-container my-10 ">
        {isFetching ? (
          <div className="flex flex-wrap justify-center items-center -mx-4 mb-10 ">
            {[1, 2, 3].map((item) => {
              return (
                <div
                  key={item}
                  className=" w-6/12 p-4 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12  "
                >
                  <Skeleton>
                    <Thumbnail height="320px " />
                    <Text mt="15px" />
                    <Text mt="15px" />
                  </Skeleton>
                </div>
              );
            })}
          </div>
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700 flex justify-center items-center ">
              {data.count} products found in #{name} category
            </p>
            <div className="flex flex-wrap -mx-5 justify-center items-center ">
              {data.products.map((product) => {
                return <ProductCard product={product} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`cat-products/${name}`}
              theme="light"
            />
          </>
        ) : (
          <p className="text-base font-medium text-gray-700 flex justify-center items-center">
            No Products found in #{name} category
          </p>
        )}
      </div>
    </>
  );
};

export default CatProducts;
