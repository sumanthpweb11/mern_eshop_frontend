import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUserLoginMutation } from "../../../store/services/authService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/reducers/authReducer";

import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";

const Login = () => {
  const [errors, setErrors] = useState([]);

  const { state, onChange } = useForm({
    email: "",
    password: "",
  });

  const [loginUser, response] = useUserLoginMutation();

  console.log(response);

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(state);
  };

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      navigate("/user");
    }
  }, [response.isSuccess]);

  return (
    <>
      <Nav />
      <div className=" pb-[80px] ">
        <Header>Sign In</Header>

        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full p-6 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12"
          >
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg -mt-12 border border-gray-200 p-10  "
            >
              <h1 className="heading mb-5 ">Sign In</h1>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email..."
                  className={`form-input ${
                    showError(errors, "email")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  value={state.email}
                  onChange={onChange}
                />

                {showError(errors, "email") && (
                  <span className="error">{showError(errors, "email")}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${
                    showError(errors, "password")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="password..."
                  value={state.password}
                  onChange={onChange}
                />
                {showError(errors, "password") && (
                  <span className="error">{showError("password")}</span>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="submit"
                  value={`${response.isLoading ? "loading..." : "Sign In"}`}
                  className="btn btn-indigo w-full"
                  disabled={response.isLoading ? true : false}
                />
              </div>

              <div>
                <p>
                  Don't have an Account?
                  <span className="capitalize font-medium text-base text-black">
                    <Link to="/register"> Register</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
