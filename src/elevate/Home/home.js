import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import { login } from "../../api/login/index";
import LoginForm from "./loginForm";
// import arrowGroup from '/images/icons/arrowGroup.png'

function HomeElevate(props) {
  const LoginStore = useSelector((state) => state.login);
  console.log("LoginStore=======>", LoginStore);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const Login = async (data) => {
    console.log("coupon----->", data);
    dispatch(login(data, props));
  };

  return (
    <div className="login-wrapper">
       <Loader
        className="circle_cover"
        type="Rings"
        color="#2b2497"
        height="100"
        width="100"
        visible={LoginStore.loading}
      />
      <div className="siteContainer">
        <div className="login-logo">
          <img src="/elevate-theme/images/login-logo.png" alt="login-logo" />
        </div>
        {/* Login section */}
        <LoginForm
            onSubmit={Login}
            parentProps={props}
            errorMsg={LoginStore.errorMsg}
            {...props}
          />
      </div>
      {/* /#wrapper */}
    </div>
  );

}

export default HomeElevate;
