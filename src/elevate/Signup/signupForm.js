import React, { useState, useEffect } from "react";

import { Field, reduxForm } from "redux-form";
import renderField from "../../components/common/fieldInput";
//import renderSelect  from '../common/selectInput';
import renderSelect from "../../components/common/selectSignupInput";
import { useSelector, useDispatch } from "react-redux";
import * as COMMON_APIS from "../../api/common";

const SignupForm = (props) => {
  const { handleSubmit } = props;
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    (async () => {
      const designation = await COMMON_APIS.getDesignation();
      console.log("designation======>", designation);
      setDesignation(designation);
    })();
  }, []);

  return (
    <form name="signupForm" onSubmit={handleSubmit}>
      <fieldset>
        <h4>Create an Account - 1/2</h4>
        <div className="form-bottom">
          <div class="RegRow">
            <Field
              name="firstName"
              type="text"
              placeholder="First Name"
              className="form-control max-width"
              containerClass="form-group"
              component={renderField}
            />

            <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="form-control max-width "
              containerClass="form-group"
              component={renderField}
            />
          </div>

          <div class="RegRow">
            <Field
              name="company"
              type="text"
              placeholder="Company"
              className="form-control max-width"
              containerClass="form-group"
              component={renderField}
            />

            <Field
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              className="form-control max-width "
              containerClass="form-group"
              component={renderField}
            />
          </div>

          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="form-control max-width "
            containerClass="form-group"
            component={renderField}
          />

          <div class="RegRow">
            <Field
              name="phone"
              type="text"
              placeholder="Phone"
              className="form-control max-width"
              containerClass="form-group"
              component={renderField}
            />
            <Field
              name="role"
              component={renderSelect}
              className="form-control max-width"
              containerClass="form-group"
            >
              <option value="" disabled selected>
                Role
              </option>
              {designation.map((data) => (
                <option value={data.title.charAt(0).toUpperCase() + data.title.slice(1)}>
                  {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
                </option>
              ))}
            </Field>

            {/* <Field 
                    name="role" 
                    type="text"
                    placeholder = "Role"
                    className="form-control max-width "
                    containerClass = "form-group"
                    component={renderField} 
                  /> */}
          </div>

          {/* <div className="form-group">
            <Field
              name="state"
              component={renderSelect}
              className="form-control max-width"
            >
              <option value="" disabled selected>
                State/Province
              </option>
              <option>New York</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
            </Field>
          </div> */}

          <div class="RegRow">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="form-control max-width"
              containerClass="form-group"
              component={renderField}
            />

            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="form-control max-width "
              containerClass="form-group"
              component={renderField}
            />
          </div>

          <div class="regSubmitBtn">
            <button type="submit" class="btn btn-next">
              Next
            </button>
            <a
              // href="#"
              onClick={() => {
                props.history.push("/login");
              }}
              class="alreadyAccount"
              style={{ cursor: "pointer" }}
            >
              Already have an account ? <span style={{color: "#ff096a",fontWeight:500}}>Login</span>
            </a>
          </div>
        </div>
      </fieldset>

      {/* <div class="RegRow">
                  <Field 
                    name="firstName" 
                    type="text"
                    placeholder = "First Name"
                    className="form-control max-width"
                    containerClass = "form-group"
                    component={renderField} 
                  />

                  <Field 
                    name="lastName" 
                    type="text"
                    placeholder = "Last Name"
                    className="form-control max-width "
                    containerClass = "form-group"
                    component={renderField} 
                  />
                </div> */}

      {/* <div class="RegRow">
                  <Field 
                    name="company" 
                    type="text"
                    placeholder = "Company"
                    className="form-control max-width"
                    containerClass = "form-group"
                    component={renderField} 
                  />

                  <Field 
                    name="jobTitle" 
                    type="text"
                    placeholder = "Job Title"
                    className="form-control max-width "
                    containerClass = "form-group"
                    component={renderField} 
                  />
                </div> */}

      {/* <Field 
                    name="email" 
                    type="email"
                    placeholder = "Email"
                    className="form-control max-width "
                    containerClass = "form-group"
                    component={renderField} 
                />

                <div class="RegRow">
                  <Field 
                    name="phone" 
                    type="text"
                    placeholder = "Phone"
                    className="form-control max-width"
                    containerClass = "form-group"
                    component={renderField} 
                  />
                      <Field
                      name="role"
                      component={renderSelect}
                      className="form-control max-width"
                      containerClass = "form-group"
                    >
                      <option value="" disabled selected>
                        Role
                      </option>
                      {
                        designation.map( data =>
                          <option value={data._id}>{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</option>
                        )
                      }
                    </Field> */}

      {/* <Field 
                    name="role" 
                    type="text"
                    placeholder = "Role"
                    className="form-control max-width "
                    containerClass = "form-group"
                    component={renderField} 
                  /> */}
      {/* </div>

                <div className="form-group">
                  <Field 
                    name="state" 
                    component={renderSelect}
                    className="form-control max-width"
                    
                  >
                      <option value="" disabled selected>State/Province</option>
                      <option>New York</option>
                      <option>New Jersey</option>
                      <option>New Mexico</option>
                      <option>North Carolina</option>
                      <option>North Dakota</option>
                  </Field>
                </div>

                <div class="RegRow">
                  <Field 
                    name="password" 
                    type="password"
                    placeholder = "Password"
                    className="form-control max-width"
                    containerClass = "form-group"
                    component={renderField} 
                  />

                  <Field 
                    name="confirmPassword" 
                    type="password"
                    placeholder = "Confirm Password"
                    className="form-control max-width "
                    containerClass = "form-group"
                    component={renderField} 
                  />
                </div>

                <div class="regSubmitBtn">
                  <button type="submit" class="btn btn-next">Next</button>
                  <a 
                    // href="#"
                    onClick = {()=>{props.history.push('/login')}} 
                    class="alreadyAccount"
                  >
                    Already have an account ?
                  </a>
                </div>
               */}
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "This field is required";
  }
  if (values.firstName) {
    if (values.firstName.trim() == null || values.firstName.trim() == "") {
      errors.firstName = "This field is required";
    }
  }
  if (!values.lastName) {
    errors.lastName = "This field is required";
  }
  if (values.lastName) {
    if (values.lastName.trim() == null || values.lastName.trim() =="") {
      errors.lastName = "This field is required";
    }
  }
  if (!values.email) {
    errors.email = "This field is required";
  }
  if (values.email) {
    if (values.email.trim() == null || values.email.trim() =="") {
      errors.email = "This field is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
  }

  if (!values.company) {
    errors.company = "This field is required";
  }
  if (values.company) {
    if (values.company.trim() == null || values.company.trim() =="") {
      errors.company = "This field is required";
    }
  }

  if (!values.jobTitle ) {
    errors.jobTitle = "This field is required";
  }
  if (values.jobTitle) {
    if (values.jobTitle.trim() == null || values.jobTitle.trim() =="") {
      errors.jobTitle = "This field is required";
    }
  }

  if (!values.phone) {
    errors.phone = "This field is required";
  }
  if (values.phone) {
    if (values.phone.trim() == null) {
      errors.phone = "This field is required";
    }
    if(!/^[0-9]*$/.test(values.phone)){
      errors.phone = "Only Numbers are allowed"
    }

    if(values.phone.length>10){
      errors.phone = "Number must have length less then 10"
    }
  }

  if (!values.role) {
    errors.role = "This field is required";
  }
  if (values.role) {
    if (values.role.trim() == null) {
      errors.role = "This field is required";
    }
  }

  if (!values.password) {
    errors.password = "This field is Required";
  }
  if (values.password) {
    if (values.password.trim() == "") {
      errors.password = "Enter a valid password";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
      
      errors.password = 'Password must contain 1 character, 1 special character 1 Number and minimum length 8.'
    }
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "This field is Required";
  }
  if (values.confirmPassword) {
    if (values.confirmPassword.trim() == "") {
      errors.confirmPassword = "Enter a valid password";
    }
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }
  }
  // if (!values.state) {
  //   errors.state = "This field is required";
  // }
  return errors;
};

export default reduxForm({
  form: "signupForm",
  validate: validate,
})(SignupForm);
