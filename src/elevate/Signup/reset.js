import React, { Component } from 'react';
import {
    Link,
    Redirect,
  } from "react-router-dom";
  import axios from 'axios';
  import * as CONFIG from '../../config.json'
  import Loader from "react-loader-spinner";

class Forget extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
    data:{
      email: '',
      otp: '',
      new_password: '',
      password_confirmation: '',
    },
    error:{},
    message:'',
    errorMessage:'',
    loading:false
    }
    this.onSubmit = this.onSubmit.bind(this);
  };
  componentDidMount() {
    var reset_data =JSON.parse(localStorage.getItem('reset_data'));
  
    if(!reset_data)
    {
      //console.log(reset_data);
      this.props.history.push("/login");
    }
    
    
  }

  onChange(el)
  {
      let inputName = el.target.name;
      let inputValue = el.target.value;
      let statusCopy = Object.assign({}, this.state);
      statusCopy.data[inputName] = inputValue;
      this.setState(statusCopy);
      this.setState({error:{},message:'',errorMessage:''});
      //console.log(this.state.error.inputName);
  }
onSubmit(event)
{	
  event.preventDefault();
  var reset_data =JSON.parse(localStorage.getItem('reset_data'));
		this.setState({error:{}});

		if(!this.state.data.otp)
		{ 
			this.setState({error:{otp: 'Otp field is required!' }});
			//createNotification('error','Please fill all fields!','');
    }
    else if(!this.state.data.new_password)
		{
			this.setState({error:{new_password: 'New password field is required!' }});
			//createNotification('error','Please fill all fields!','');
    }
    else if(!this.state.data.password_confirmation)
		{
			this.setState({error:{password_confirmation: 'Confirm password field is required!' }});
			//createNotification('error','Please fill all fields!','');
		}
    else
		{
      this.setState({loading:true});

                var data ={'email':reset_data,
                            'new_password':this.state.data.new_password,
                            'password_confirmation':this.state.data.password_confirmation,
                            'otp':this.state.data.otp,
                          };
              axios.post(CONFIG.BASE_URL+"/api/reset-password", data)
              .then(res => 
              {
                this.setState({loading:false});

                if(res.data.status == 200)
                {
                  this.setState({message: res.data.message });
                  localStorage.removeItem("reset_data");
                  setTimeout(() => {
                    this.props.history.push("/login");
                  }, 3000);
                }
                else if(res.data.status == 500)
                {
                  this.setState({errorMessage: 'Something went wrong, please try again later!' });
                }
                else{
                  this.setState({errorMessage: res.data.message });
                }
                
                
              }) 
              .catch(err => 
              {	
                this.setState({loading:false});
                this.setState({errorMessage: 'Something went wrong, please try again later!' });
          
              });
    }
	
  
  };
   
    render() {
     
        return (
        <>
        <Loader
        className="circle_cover"
        type="Rings"
        color="#2b2497"
        height="100"
        width="100"
        visible={this.state.loading}
      />
        <div className="loginDetailPage registrationDetail">
        <div className="siteContainer">
          <div className="loginHeader">
            <div className="arrowLogo">
              <img src="/elevate-theme/images/elevateLogo.png" alt="" />
            </div>
          </div>
          <div className="loginMidSec forgotPassword">
            <div className="loginRightBox signupRightBox">
              <div className="loginInner">
                <div className="assessment-container">
                  <form role="form" className="registration-form">
                    <h4>Confirm OTP and new password</h4>
                    {this.state.errorMessage&&<div class="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                    </div>}
                    {this.state.message && <div class="alert alert-success" role="alert">
                    {this.state.message}
                    </div>}
                    <div className="form-bottom confirmPassword">
                      <div className="otpBox">
                        <div className="form-group">
                          <label>Enter OTP</label>
                          <input type="text" placeholder="OTP" className="form-email form-control"  value={this.state.data.otp} name="otp" id="otp" onChange={this.onChange.bind(this)}  autocomplete="off"/>
                    <span className="form-error">{ this.state.error.otp }</span>
                        </div>
                      </div>
                      <hr className="borderHr" />
                      <div className="confirmPasswordBox">
                        <div className="form-group">
                          <label>Enter old Password</label>
                          <input type="password"  placeholder="New password" className="form-email form-control" value={this.state.data.new_password} name="new_password" id="new_password" onChange={this.onChange.bind(this)} />
                    <span className="form-error">{ this.state.error.new_password }</span>
                        </div>
                        <div className="form-group">
                          <label>Enter new Password</label>
                          <input type="password" placeholder="Confirm New Password" className="form-email form-control" value={this.state.data.password_confirmation} name="password_confirmation" id="password_confirmation" onChange={this.onChange.bind(this)} />
                    <span className="form-error">{ this.state.error.password_confirmation }</span>
                        </div>
                      </div>
                      <div className="regSubmitBtn">
                        <button onClick={this.onSubmit} type="button" className="btn btn-next">Submit</button>
                        <Link to="/login" className="alreadyAccount">
                          Already have an account?
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="siteFooter">
          <div className="siteContainer">
            <div className="footerInner">
              <ul>
                <li>© 2020 ELEVATE</li>
                <li className="footerDivider">|</li>
                <li><span>POWERED BY:</span> <img src="/elevate-theme/images/footerPowerLogo.png" alt="" /></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    
      {/* /#wrapper */}
        </>
        );
    }
}

export default Forget;