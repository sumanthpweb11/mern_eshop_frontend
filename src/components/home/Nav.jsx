import React from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { useSelector } from "react-redux";

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  return (
    <div className="nav">
      <div className="my-container">
        <div className="flex justify-between items-center">
          <Link to="/">ESHOP</Link>

          <ul className="flex items-center">
            <li className="nav-li cursor-pointer">
              <BiSearch size={22} />
            </li>

            {userToken ? (
              <li className="nav-li">
                <Link className="nav-link" to="/user">
                  {user?.name}
                </Link>
              </li>
            ) : (
              <li className="nav-li">
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              </li>
            )}

            <li className="nav-li relative">
              <Link to="/cart">
                <BsBag size={20} />
                <span className="nav-circle">10</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
