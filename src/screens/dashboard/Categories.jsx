import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from "../../store/services/categoryService";
import { BiPlus } from "react-icons/bi";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import Pagination2 from "../../components/Pagination2";

const Categories = () => {
  let { page } = useParams();

  if (!page) {
    page = 1;
  }
  console.log("Your page", page);
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const { data = [], isFetching } = useGetQuery(page ? page : 1);

  const [removeCategory, response] = useDeleteCategoryMutation();

  console.log(response);

  const deleteCat = (id) => {
    if (window.confirm("Are you sure you want to Delete This Category?")) {
      removeCategory(id);
    }
  };
  console.log(data);

  // Delete Category
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  }, [response?.data?.message]);

  useEffect(() => {
    dispatch(setSuccess(success));
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  return (
    <Wrapper>
      <ScreenHeader>
        {success && <div className="alert-success">{success}</div>}
        <button>
          <Link to="/dashboard/create-category" className="btn-dark ">
            Add Categories
            <BiPlus className="text-xl" />
          </Link>
        </button>

        {!isFetching ? (
          data?.categories?.length > 0 && (
            <>
              <div>
                <table className="w-full bg-gray-900 rounded-md mt-3 ">
                  <thead>
                    <tr className="border-b border-gray-800 text-left">
                      <th className="p-3 uppercase text-sm font-medium text-gray-500">
                        name
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
                    {data?.categories?.map((category) => {
                      return (
                        <tr className="odd:bg-gray-800" key={category._id}>
                          <td className="p-3 capitalize text-sm font-normal text-gray-400">
                            {category.name}
                          </td>
                          <td className="p-3 capitalize text-sm font-normal text-gray-400">
                            <Link
                              className="btn btn-warning"
                              to={`/dashboard/update-category/${category._id}`}
                            >
                              Edit
                            </Link>
                          </td>
                          <td className="p-3 capitalize text-sm font-normal text-gray-400">
                            <button
                              onClick={() => deleteCat(category._id)}
                              className="btn btn-danger"
                            >
                              delete
                            </button>
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
                path="dashboard/categories"
              />
            </>
          )
        ) : (
          <Spinner />
        )}
      </ScreenHeader>
    </Wrapper>
  );
};

export default Categories;
