import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from "react";
import { setSuccess } from "../../store/reducers/globalReducer";
import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";

const UpdateCategory = () => {
  const [state, setState] = useState("");
  const { id } = useParams();

  const { data, isFetching } = useFetchCategoryQuery(id);

  console.log("category data", data);

  useEffect(() => {
    data?.category && setState(data?.category?.name);
  }, [data?.category]);

  const [saveCategory, response] = useUpdateCategoryMutation();
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const updateSubmit = (e) => {
    e.preventDefault();

    saveCategory({ name: state, id });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
      navigate("/dashboard/categories");
    }
  }, [response?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <button>
          <Link to="/dashboard/categories" className="btn-dark ">
            <FaLongArrowAltLeft />
            Categories List
          </Link>
        </button>
      </ScreenHeader>

      {!isFetching ? (
        <form className="w-full md:w-8/12 " onSubmit={updateSubmit}>
          <h3 className="text-lg capitalize mb-3 ">Update Category</h3>
          {errors.length > 0 &&
            errors.map((error, idx) => {
              return (
                <p key={idx} className="alert-danger">
                  {error.msg}
                </p>
              );
            })}
          <div className="mb-3 ">
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-control"
              placeholder="Category Name..."
            />
          </div>

          <div className="mb-3">
            <input type="submit" value="Update" className="btn btn-indigo" />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default UpdateCategory;
