import React from "react";
import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { FaLongArrowAltLeft } from "react-icons/fa";

const CreateCategory = () => {
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

      <form className="w-full md:w-8/12 ">
        <h3 className="text-lg capitalize mb-3 ">Create Category</h3>
        <div className="mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name..."
          />
        </div>

        <div className="mb-3">
          <input
            type="submit"
            value="create category "
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
