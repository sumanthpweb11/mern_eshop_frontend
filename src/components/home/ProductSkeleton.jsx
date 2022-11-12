import React from "react";
import Skeleton from "../skeleton/Skeleton";
import Thumbnail from "../skeleton/Thumbnail";
import Text from "../skeleton/Text";

const ProductSkeleton = () => {
  return (
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
  );
};

export default ProductSkeleton;
