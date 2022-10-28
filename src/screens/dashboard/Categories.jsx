import React from "react";
import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { BiPlus } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";

const Categories = () => {
  return (
    <Wrapper>
      <ScreenHeader>
        <button>
          <Link to="/dashboard/create-category" className="btn-dark ">
            Add Categories
            <BiPlus className="text-xl" />
          </Link>
        </button>
      </ScreenHeader>
    </Wrapper>
  );
};

export default Categories;
