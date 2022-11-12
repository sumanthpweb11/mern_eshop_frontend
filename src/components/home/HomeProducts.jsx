import React from "react";
import { Link } from "react-router-dom";
import { useCatProductsQuery } from "../../store/services/HomeProducts";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const HomeProducts = ({ category }) => {
  const { data, isFetching } = useCatProductsQuery({
    name: category.name,
    page: "",
  });

  console.log("home products", data?.products);
  return isFetching ? (
    <ProductSkeleton />
  ) : (
    data?.products?.length > 0 && (
      <>
        <div className="flex justify-between ">
          <span className="text-lg font-medium capitalize">
            {category.name}
          </span>
          <span className="capitalize">
            <Link to={`/cat-products/${category.name}`}>See All</Link>
          </span>
        </div>
        <div className="flex flex-wrap -mx-5">
          {data?.products.map((item) => {
            return <ProductCard product={item} key={item._id} />;
          })}
        </div>
      </>
    )
  );
};

export default HomeProducts;
