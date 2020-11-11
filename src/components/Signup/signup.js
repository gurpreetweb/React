import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { signupForm1Submit,resetError } from "../../redux/actions/signup/actionCreater";
import {
  fetchSecurityQuestions,
  finalRegistration,
} from "../../api/signup/index";
import SignupForm from "./signupForm";
import SignupForm2 from "./signupForm-step2";
import * as CONFIG from "../../config.json";

function Home(props) {
  const dispatch = useDispatch();

  //values from redux-store
  const signupFormStep1 = useSelector((state) => state.signup);
  console.log("signupFormStep1====================>",signupFormStep1)
  const securityQuestions = useSelector(
    (state) => state.signup.securityQuestion
  );

  //local states
  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log("------signupFormStep1-----", signupFormStep1);
    dispatch(fetchSecurityQuestions());
  }, []);

  const handleSignup1 = async (data) => {
    console.log("handleSignup1----->", data);
    data.state="static"
    dispatch(signupForm1Submit(data));
    setStep(2);
  };

  const handleSignup2 = async (data) => {
    console.log("handleSignup2----->", data);
    let QuestionArray = [];

    let questionIds = Object.keys(data);
    for (let x = 0; x < questionIds.length; x++) {
      QuestionArray.push({
        question_id: questionIds[x],
        answer: data[questionIds[x]],
      });
    }
    let registrationData = signupFormStep1;
    registrationData.questions = QuestionArray;
    registrationData.first_name = signupFormStep1.firstName;
    registrationData.last_name = signupFormStep1.lastName;
    registrationData.mobile_number = signupFormStep1.phone;
    registrationData.job_title = signupFormStep1.jobTitle;
    registrationData.user_role = signupFormStep1.role;
    registrationData.state = signupFormStep1.province;
    registrationData.company_name = signupFormStep1.company;
    registrationData.company_name = signupFormStep1.company;
    registrationData.event = localStorage.getItem('eventId');

    console.log("registrationData------", registrationData);
    dispatch(finalRegistration(registrationData, props,"enkindle"));
  };

  const prevStep = async () => {
    console.log("prevStep");
    dispatch(resetError())
    setStep(1);
  };

  return (
    <div class="loginDetailPage registrationDetail">
      <Loader
        className="circle_cover"
        type="Rings"
        color="#2b2497"
        height="100"
        width="100"
        visible={signupFormStep1.loading}
      />
      <div className="siteContainer">
        <div class="loginHeader">
          <div class="arrowLogo">
            <img src="/images/icons/arrowGroup.png" alt="" />
          </div>
          <div class="headerGreenSec"></div>
        </div>

        <div class="loginMidSec">
          <div class="loginLeftText signupLeftText">
            <h3>Welcome to </h3>
            <div class="enkLogo">
              <img src="images/icons/enkLogo.png" alt="" />
            </div>
            <p>The Virtual Experience</p>
          </div>

          {step == 1 && (
            <SignupForm
              onSubmit={handleSignup1}
              initialValues={signupFormStep1}
              history={props.history}
            />
          )}

          {step == 2 && (
            <SignupForm2
              onSubmit={handleSignup2}
              prevStep={prevStep}
              securityQuestions={securityQuestions}
              signupError={signupFormStep1.apiErrorMessage}
            />
          )}
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
