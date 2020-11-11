import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import { login } from "../../api/login/index";
import LoginForm from "./loginForm";
// import arrowGroup from '/images/icons/arrowGroup.png'

function Home(props) {
  const LoginStore = useSelector((state) => state.login);
  console.log("LoginStore=======>",LoginStore)
  const dispatch = useDispatch();

  const Login = async (data) => {
    console.log("coupon----->", data);
    dispatch(login(data, props));
  };

  return (
    <div class="loginDetailPage">
      <Loader
        className="circle_cover"
        type="Rings"
        color="#2b2497"
        height="100"
        width="100"
        visible={LoginStore.loading}
      />
      <div className="siteContainer">
        <div class="loginHeader">
          <div class="arrowLogo">
            <img src="/images/icons/arrowGroup.png" alt="" />
          </div>
          <div class="headerGreenSec"></div>
        </div>

        <div class="loginMidSec">
          <div class="loginLeftText">
            <h3>Welcome to </h3>
            <div class="enkLogo">
              <img src="images/icons/enkLogo.png" alt="" />
            </div>
            <p>The Virtual Experience</p>
          </div>

          <LoginForm
            onSubmit={Login}
            parentProps={props}
            errorMsg={LoginStore.errorMsg}
          />
        </div>

        <div class="poweredByBlock">
          <span class="powerText">POWERED BY:</span>
          <span class="powerLogo">
            <img src="images/icons/powerLogo.png" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
