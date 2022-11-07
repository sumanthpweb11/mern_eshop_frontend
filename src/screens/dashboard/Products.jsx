import React, { useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../../store/reducers/globalReducer";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
// import AdminLogin from "../auth/AdminLogin";
import Wrapper from "./Wrapper";
import Pagination from "../../components/Pagination";
import Pagination2 from "../../components/Pagination2";

const Products = () => {
  let { page } = useParams();

  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page);
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
    }

    return () => {
      dispatch(clearMessage);
    };
  }, []);

  const [delProduct, response] = useDeleteProductMutation();

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      delProduct(id);
    }
  };
  return (
    <Wrapper>
      <ScreenHeader>
        <button>
          <Link to="/dashboard/create-product" className="btn-dark">
            <FaLongArrowAltLeft />
            Create Product
          </Link>
        </button>
        <Toaster position="top-right" />
      </ScreenHeader>
      {!isFetching ? (
        data?.products?.length > 0 ? (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-md mt-3 ">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      name
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      price
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      stock
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      image
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      edit
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => {
                    return (
                      <tr className="odd:bg-gray-800" key={product._id}>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">
                          {product.title}
                        </td>

                        <td className="p-3 capitalize text-sm font-normal text-gray-400">
                          ${product.price}.00
                        </td>

                        <td className="p-3 capitalize text-sm font-normal text-gray-400">
                          {product.stock}
                        </td>

                        <td className="p-3 capitalize text-sm font-normal text-gray-400">
                          <img
                            src={`/images/${product.image1}`}
                            alt="images"
                            className="w-20 h-20 rounded-md object-cover"
                          />
                        </td>

                        <td className="p-3 capitalize text-sm font-normal text-gray-400">
                          <Link
                            className="btn btn-warning"
                            to={`/dashboard/edit-product/${product._id}`}
                          >
                            Edit
                          </Link>
                        </td>

                        <td className="p-3 capitalize text-sm font-normal text-gray-400">
                          <span
                            onClick={() => deleteProduct(product._id)}
                            className="btn btn-danger cursor-pointer"
                            to={``}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
          </>
        ) : (
          "No Products"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
