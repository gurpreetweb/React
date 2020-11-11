import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "../common/fieldInput";
import renderSelect from "../common/selectInput";

const SignupForm2 = (props) => {
  const { handleSubmit, prevStep, securityQuestions, signupError } = props;
  return (
    <div class="loginRightBox signupRightBox">
      <div class="loginInner">
        <div class="assessment-container">
          <h4>Create an Account - 2/2</h4>
          <div class="form-bottom signFromStep-2">
            <form name="signupForm2" onSubmit={handleSubmit}>
              {securityQuestions.map((Question, index) => {
                if (Question.type == "Textual") {
                  return (
                    <Field
                      name={Question._id}
                      type="text"
                      // placeholder={Question.question}
                      className="form-control max-width"
                      containerClass="form-group"
                      required={true}
                      isLabel={true}
                      label={Question.question}
                      labelClass="signupForm2"
                      component={renderField}
                      title="Must have valid input"
                      pattern = "^(?=.*[\w\d]).+"
                    />
                  );
                } else if (Question.type == "Optional") {
                  // return <div className="radio-groups">
                  //   <label>Lorel ipsum is the dummy text for websites?</label>
                  //   <div className="d-sm-flex">
                  //     <div className="groupss">
                  //       <label>
                  //         <div className="custom-control custom-radio">
                  //         <Field
                  //   name={option}
                  //   type="radio"
                  //   id ="customRadio1"
                  //   placeholder = {Question.question}
                  //   className="form-control max-width"
                  //   containerClass = "form-group"
                  //   required={true}
                  //   component={renderField}
                  // />
                  //           <input type="radio" id="customRadio1" name="option_c" className="custom-control-input" defaultChecked />
                  //           <label className="custom-control-label" htmlFor="customRadio1" />
                  //         </div>Option 1
                  //       </label>
                  //     </div>
                  //   </div>
                  // </div>
                  return (
                    <div className="form-group">
                      <Field
                        name={Question._id}
                        component={renderSelect}
                        required={true}
                        className="form-control max-width"
                        isLabel={true}
                        label={Question.question}
                        labelClass="signupForm2 aa"
                      >
                        {/* <option value="" disabled selected>
                        </option> */}
                        {Question.options.map((Option) => {
                          return <option value={Option}>{Option}</option>;
                        })}
                      </Field>
                    </div>
                  );
                }
              })}

              <div class="signupStep2Btn">
                <button
                  type="button"
                  className="btn btn-previous"
                  onClick={() => {
                    prevStep();
                  }}
                >
                  Previous
                </button>
                <button type="submit" class="btn submitBtn">
                  Submit
                </button>
              </div>

              {signupError != "" && (
                <div className="signupError_msg">{signupError}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (values.firstName) {
    if (values.firstName.trim() == null) {
      errors.firstName = "First name is required";
    }
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }
  if (values.lastName) {
    if (values.lastName.trim() == null) {
      errors.lastName = "Last name is required";
    }
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (values.email) {
    if (values.email.trim() == null) {
      errors.email = "Email is required";
    }
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }
  if (values.password) {
    if (values.password.trim() == "") {
      errors.password = "Enter a valid password";
    }
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is Required";
  }
  if (values.confirmPassword) {
    if (values.confirmPassword.trim() == "") {
      errors.confirmPassword = "Invalid a valid password";
    }
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = "Password dont match";
    }
  }

  return errors;
};

export default reduxForm({
  form: "signupForm2",
  validate: validate,
})(SignupForm2);
