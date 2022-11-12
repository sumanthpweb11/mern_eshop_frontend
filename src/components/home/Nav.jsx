import React from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);

  const { searchBar } = useSelector((state) => state.globalReducer);

  const { items, total } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  return (
    <>
      <nav className="nav">
        <div className="my-container">
          <div className="flex justify-between items-center">
            <Link to="/">ESHOP</Link>

            <ul className="flex items-center">
              <li className="nav-li cursor-pointer">
                <BiSearch
                  size={22}
                  onClick={() => dispatch(toggleSearchBar())}
                />
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
                  <span className="nav-circle">{items}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default Nav;
