import React from "react";
import { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../store/services/authService";
import { setAdminToken } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setSate] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setSate({ ...state, [e.target.name]: e.target.value });
  };

  const [login, response] = useAuthLoginMutation();
  console.log("my resposne", response);

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const adminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("admin-token", response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate("/dashboard/products");
    }
  }, [response.isSuccess]);

  return (
    <div className=" bg-black2 h-screen flex justify-center items-center ">
      <form
        onSubmit={adminLoginFunction}
        className="p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded "
      >
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          Dashboard Login
        </h3>

        {errors.length > 0 &&
          errors.map((error, index) => {
            return (
              <div key={index}>
                <p className="alert-danger">{error.msg}</p>
              </div>
            );
          })}

        <div className="mb-4 mt-4 ">
          <input
            onChange={handleInputs}
            value={state.email}
            className="w-full bg-black1 p-4 rounded outline-none text-white "
            type="email"
            name="email"
            placeholder="Enter Email..."
          />
        </div>
        <div className="mb-4 ">
          <input
            onChange={handleInputs}
            value={state.password}
            className="w-full bg-black1 p-4 rounded outline-none text-white "
            type="password"
            name="password"
            placeholder="Enter Password..."
          />
        </div>

        <div className="mb-4">
          <input
            type="submit"
            value={response.isLoading ? "loading..." : "Sign In"}
            className=" bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer hover:bg-indigo-700 "
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
