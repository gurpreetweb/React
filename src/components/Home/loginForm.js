import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from '../common/fieldInput'
import {
  Link
} from "react-router-dom";
const LoginForm = props => {
  const { handleSubmit, parentProps, errorMsg } = props;
  return (
    <div class="loginRightBox">
      <div class="loginInner">
        <h4>ALREADY REGISTERED</h4>
      <form name="loginForm" onSubmit={handleSubmit}>     
        <Field 
          name="email" 
          type="email"
          placeholder = "Email Address"
          className="form-control max-width"
          containerClass = "form-group"
          component={renderField} 
        />

        <Field 
          name="password" 
          type="password"
          placeholder = "Password"
          className="form-control max-width "
          containerClass = "form-group"
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

        <div class="dividerOr">
                <span class="dividerLine"></span>
                <span class="dividerText">Or</span>
                <span class="dividerLine"></span>
        </div>
          <h4>You have registration ID</h4>
          <div class="form-group">
            <Field 
              name="registrationId" 
              type="text"
              placeholder = "Registration ID"
              className="form-control max-width"
              containerClass = "form-group"
              component={renderField} 
            />
        </div>

        <div class="loginSubmitBtn">
          <Link to={"/forget-password"} class="forgetPass">Forgot Password ?</Link>
          <button type="submit" class="submitBtn">Submit</button>
        </div>

        <div class="notRegBlock">
          <h4>NOT REGISTERED YET?</h4>
          <p>Want to join the event but did not register?<br />
            Create an account and join now</p>
          <div class="regBlock">
            <a onClick={()=>parentProps.history.push('/signup')}>Register</a>
          </div>
        </div>

        

      </form>
      </div>
    </div>
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

