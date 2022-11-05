import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authReducer";

const AccountList = () => {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink to="/user" className="account-list">
        <AiOutlineUser size={22} />
        <span className="account-list-title">My Account</span>
      </NavLink>

      <NavLink to="/orders" className="account-list">
        <BsCart size={22} />
        <span className="account-list-title">Orders</span>
      </NavLink>

      <span
        onClick={() => dispatch(logout("userToken"))}
        className="account-list cursor-pointer "
      >
        <AiOutlineLogout size={22} />
        <span className="account-list-title">Logout</span>
      </span>
    </>
  );
};

export default AccountList;
