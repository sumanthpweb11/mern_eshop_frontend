import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import Categories from "../screens/dashboard/Categories";
import CreateCategory from "../screens/dashboard/CreateCategory";
import Products from "../screens/dashboard/Products";
import Private from "./Private";
import Public from "./Public";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
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

          {/* CATEGORIES ROUTE */}

          <Route
            path="categories"
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
