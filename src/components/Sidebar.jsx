import React from "react";
import { Link } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={` z-10 fixed top-0 ${side} sm:left-0  w-64 h-screen bg-gray-800 transition-all `}
    >
      <div className="logoandiconwrapper flex items-center justify-between bg-white">
        <AiOutlineCloseCircle
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-2xl cursor-pointer block sm:hidden"
        />
        <div className=" p-4">ESHOP</div>
      </div>

      <ul className="mt-4">
        <li className=" px-4 py-3 cursor-pointer transition-all text-white flex  items-center hover:bg-gray-600  ">
          <BsCardList className=" mr-2 text-lg " />
          <Link className="text-base capitalize" to="/dashboard/products">
            products
          </Link>
        </li>

        <li className=" px-4 py-3 cursor-pointer transition-all text-white flex  items-center hover:bg-gray-600  ">
          <BiCategoryAlt className=" mr-2 text-lg " />
          <Link className="text-base capitalize" to="/dashboard/categories">
            categories
          </Link>
        </li>

        <li className=" px-4 py-3 cursor-pointer transition-all text-white flex  items-center hover:bg-gray-600  ">
          <BsBag className=" mr-2 text-lg " />
          <Link className="text-base capitalize" to="/dashboard/products">
            orders
          </Link>
        </li>

        <li className=" px-4 py-3 cursor-pointer transition-all text-white flex  items-center hover:bg-gray-600  ">
          <FiUsers className=" mr-2 text-lg " />
          <Link className="text-base capitalize" to="/dashboard/categories">
            customers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
