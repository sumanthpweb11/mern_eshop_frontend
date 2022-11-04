import React from "react";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";

const Login = () => {
  return (
    <>
      <Nav />
      <div className="  ">
        <Header>Sign In</Header>

        <div className="flex flex-wrap">
          <div className="w-full">
            <form className="bg-white "></form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
