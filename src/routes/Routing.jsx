import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import Categories from "../screens/dashboard/Categories";
import CreateCategory from "../screens/dashboard/CreateCategory";
import CreateProduct from "../screens/dashboard/CreateProduct";
import EditProduct from "../screens/dashboard/EditProduct";
import Products from "../screens/dashboard/Products";
import UpdateCategory from "../screens/dashboard/UpdateCategory";
import Private from "./Private";
import Public from "./Public";
import Home from "../screens/home/Home";
import Login from "../screens/home/auth/Login";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* User Login */}
        <Route path="/login" element={<Login />} />

        {/* auth/admin-login */}
        <Route path="/auth">
          <Route
            path="admin-login"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
          />
        </Route>

        <Route path="dashboard">
          {/* PRODUCTS ROUTE */}
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />

          {/* PRODUCTS ROUTE Ig it has page */}
          <Route
            path="products/:page"
            element={
              <Private>
                <Products />
              </Private>
            }
          />

          {/* edit pRODUCT */}
          <Route
            path="edit-product/:id"
            element={
              <Private>
                <EditProduct />
              </Private>
            }
          />

          {/* CATEGORIES ROUTE  */}
          <Route
            path="categories"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />

          {/* CATEGORIES ROUTE With Page */}

          <Route
            path="categories/:page"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />

          {/*CREATE CATEGORIES  */}

          <Route
            path="create-category"
            element={
              <Private>
                <CreateCategory />
              </Private>
            }
          />

          {/*UPDATE CATEGORY  */}

          <Route
            path="update-category/:id"
            element={
              <Private>
                <UpdateCategory />
              </Private>
            }
          />

          {/*CREATE PRODUCT */}

          <Route
            path="create-product"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
