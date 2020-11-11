import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from '../../components/common/fieldInput'
import {
  Link
} from "react-router-dom";
const LoginForm = props => {
  const { handleSubmit, parentProps, errorMsg } = props;
  return (
    <section className="login">
    <div className="box-wrap">
      <div className="login-box">
        <div className="hding">
          <h3>Already Registered?</h3>
        </div>
        <form className="loginFormEle" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <Field 
              name="email" 
              type="email"
              className="form-control"
              placeholder="Enter email"
              required = {true} 
              id="email"
              component={renderField} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <Field 
              name="password" 
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="pwd"
              required = {true} 
          component={renderField} 
            />
            {
          errorMsg!=""
          &&
          <div className="signupError_msg">
            {errorMsg}
          </div>
        }

          </div>
          <div className="loginBtnEle">
            <button type="submit" className="btn btn-comman">
              Login
            </button>
          </div>
          <div class="forgotPassLink"><a onClick={()=>{props.history.push("/forget-password")}}>Forgot Password?</a></div>
        </form>
      </div>
      <div className="join-now">
        <div className="hding">
          <h3>Join Now</h3>
        </div>
        <div className="content-data">
          <span>Not registered yet?</span>
          <p>Want to join the event but did not register?</p>
          <p>Create an account and join now</p>
          <a onClick={()=>{props.history.push('signup')}} className="get-started" style={{cursor:"pointer"}}> 
            Get Started
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};

const validate = values => {
  const errors = {};
  console.log("values a--------",values)
  if (!values.email) {
    errors.email = "Email Is Required";    
  }
  if(values.email ){
    if(values.email.trim()==null){
      errors.email = "Email Is Required";    
    }
  }
  if(values.email ){
    if(values.email.trim()==null){
      errors.email = "Email Is Required";    
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
  }
  if (!values.password) {
    errors.password = "Password is Required";    
  }
  if(values.password){
    if(values.password.trim()==""){
      errors.password = "Enter a valid password";    
    }
  }
    return errors;
};

export default reduxForm({
  form: "loginForm",
  validate: validate
})(LoginForm);

