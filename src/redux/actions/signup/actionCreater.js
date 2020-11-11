import {
  SIGNUP_STEP_1_SUBMIT,
  FETCH_SECURITY_QUESTIONS,
  SIGNUP_SUBMIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_ERROR,
} from "./actions";

export const signupForm1Submit = (data) => {
  return {
    type: SIGNUP_STEP_1_SUBMIT,
    payload: data,
  };
};

export const fetchSecurityQuestions = (data) => {
  return {
    type: FETCH_SECURITY_QUESTIONS,
    payload: data,
  };
};

export const signupSubmit = () => {
  return {
    type: SIGNUP_SUBMIT,
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signupFailure = (errorMsg) => {
  return {
    type: SIGNUP_FAILURE,
    payload: errorMsg,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};
