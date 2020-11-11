import axios from "axios";
import * as CONFIG from "../../config.json";
import * as LoginActionCreators from "../../redux/actions/login/actionCreater";
import * as SignupActionCreators from "../../redux/actions/signup/actionCreater";
import { CometChat } from "@cometchat-pro/chat";

export const fetchSecurityQuestions = () => {
  return (dispatch) => {
    axios
      .get(`${CONFIG.BASE_URL}/api/questions/${localStorage.getItem('eventId')}`)
      .then((response) => {
        console.log("Questions-----------------------", response.data);
        if (response.data.status == 200) {
          const securityQuestions = response.data.data;
          dispatch(
            SignupActionCreators.fetchSecurityQuestions(securityQuestions)
          );
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error in fetching security questions", error.message);
        // dispatch(couponFetchedFailure(error.message))
      });
  };
};

export const finalRegistration = (registrationData, props, theme) => {
  return (dispatch) => {
    dispatch(SignupActionCreators.signupSubmit());
    console.log("registartionDataAPI------", registrationData);
    axios
      .post(`${CONFIG.BASE_URL}/api/user/create`, registrationData)
      .then((response) => {
        console.log("finalRegistration===========>", response.data);
        if (response.data.status == 200) {
          const securityQuestions = response.data.data;
          dispatch(SignupActionCreators.signupSuccess());

          const loginData = {
            email: registrationData.email,
            password: registrationData.confirmPassword,
          };
          localStorage.setItem("loginData", JSON.stringify(loginData));
          axios
            .post(`${CONFIG.BASE_URL}/api/login`, loginData)
            .then((response) => {
              console.log(
                "LoginResponse-----------------------",
                response.data
              );
              if (response.data.status == 200) {
                var appID = "APP_ID";
                var region = "us";
                var appSetting = new CometChat.AppSettingsBuilder()
                  .subscribePresenceForAllUsers()
                  .setRegion(region)
                  .build();
                CometChat.init(appID, appSetting).then(
                  () => {
                    console.log("Initialization completed successfully");
                    // You can now call login function.
                  },
                  (error) => {
                    console.log("Initialization failed with error:", error);
                    // Check the reason for error and take appropriate action.
                  }
                );
                localStorage.setItem(
                  "userData",
                  JSON.stringify(response.data.user)
                );
                dispatch(LoginActionCreators.loginSuccess());
                props.history.push("/order-complete");
                // if(theme=="enkindle"){
                // }else{
                //   props.history.push("/login");
                // }
              } else {
                throw new Error(response.data.message);
              }
            });
          // props.history.push("/")
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error in creating account", error.message);
        dispatch(
          SignupActionCreators.signupFailure({ message: error.message })
        );
      });
  };
};
