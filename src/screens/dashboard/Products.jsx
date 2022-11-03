import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
// import AdminLogin from "../auth/AdminLogin";
import Wrapper from "./Wrapper";

const Products = () => {
  return (
    <Wrapper>
      <ScreenHeader>
        <button>
          <Link to="/dashboard/create-product" className="btn-dark">
            <FaLongArrowAltLeft />
            Create Product
          </Link>
        </button>
      </ScreenHeader>
    </Wrapper>
  );
};

export default Products;
