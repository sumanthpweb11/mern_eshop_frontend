import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useCreateMutation } from "../../store/services/categoryService";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from "react";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateCategory = () => {
  const [state, setState] = useState("");

  const [saveCategory, data] = useCreateMutation();
  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];

  const submitCategory = (e) => {
    e.preventDefault();

    saveCategory({ name: state });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.isSuccess) {
      dispatch(setSuccess(data?.data?.message));
      navigate("/dashboard/categories");
    }
  }, [data?.isSuccess]);
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

      <form onSubmit={submitCategory} className="w-full md:w-8/12 ">
        <h3 className="text-lg capitalize mb-3 ">Create Category</h3>
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
          <input
            type="submit"
            value={data.isLoading ? "Loading..." : "Create Category"}
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
