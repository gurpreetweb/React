import React, { Component } from 'react';
import {
    Link,
    Redirect,
  } from "react-router-dom";
  import axios from 'axios';
  import * as CONFIG from '../../config.json'
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
        <div>
     <form onSubmit={this.onSubmit}>
<div className="loginDetailPage">
        <div className="siteContainer">
          <div className="loginHeader">
            <div className="arrowLogo">
              <img src="images/icons/arrowGroup.png" alt="" />
            </div>
            <div className="headerGreenSec" />
          </div>
          <div className="loginMidSec forgotPassPage">
            <div className="loginLeftText">
              <h3>Welcome to </h3>
              <div className="enkLogo"><img src="images/icons/enkLogo.png" alt="" /></div>
              <p>The Virtual Experience</p>
            </div>
       
            <div className="loginRightBox">
          
              <div className="loginInner">
                <div className="forgotInner">
                {this.state.errorMessage&&<div class="alert alert-danger" role="alert">
          {this.state.errorMessage}
          </div>}
         {this.state.message && <div class="alert alert-success" role="alert">
         {this.state.message}
          </div>}
                  <div className="form-group">
                    <label>Enter Your Otp </label>
                    <input type="text" className="form-control" placeholder="Email otp" value={this.state.data.otp} name="otp" id="otp" onChange={this.onChange.bind(this)}  />
                    <span className="form-error">{ this.state.error.otp }</span>
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" placeholder="New Password"  value={this.state.data.new_password} name="new_password" id="new_password" onChange={this.onChange.bind(this)} />
                    <span className="form-error">{ this.state.error.new_password }</span>
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password </label>
                    <input type="password" className="form-control" placeholder="Confirm New Password"  value={this.state.data.password_confirmation} name="password_confirmation" id="password_confirmation" onChange={this.onChange.bind(this)} />
                    <span className="form-error">{ this.state.error.password_confirmation }</span>
                  </div>
                  <div className="loginSubmitBtn">
                    <Link to="/login" className="forgetPass">Already have an account?</Link>
                    <button type="submit" className="submitBtn">Update Password</button>
                  </div>
                </div>
              </div>
            </div>
     
          </div>
          <div className="poweredByBlock">
            <span className="powerText">POWERED BY:</span>
            <span className="powerLogo"><img src="images/icons/powerLogo.png" /></span>
          </div>
        </div>
      </div>
      </form>
      {/* /#wrapper */}
        </div>
        );
    }
}

export default Forget;