import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer";
import { BsFilterLeft } from "react-icons/bs";

const AdminNav = ({ openSidebar }) => {
  const dispatch = useDispatch();

  const adminLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="fixed left-0 sm:left-64  top-4 right-0 mx-4 ">
      <div className="bg-gray-800 w-full flex justify-between items-center p-4 sm:justify-end  ">
        <BsFilterLeft
          onClick={openSidebar}
          className="text-white block sm:hidden text-2xl cursor-pointer"
        />
        <button
          onClick={adminLogout}
          className="py-2 px-4 bg-indigo-600 text-white rounded-md capitalize"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
