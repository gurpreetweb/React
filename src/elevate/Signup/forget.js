import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

import * as CONFIG from "../../config.json";
class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
      },
      error: {},
      message: "",
      errorMessage: "",
      loading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.data[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {}, message: "", errorMessage: "" });
    //console.log(this.state.error.inputName);
  }
  onSubmit(event) {
    console.log('helloooo')
    event.preventDefault();
    this.setState({ error: {} });

    if (!this.state.data.email) {
      this.setState({ error: { email: "Email field is required!" } });
      //createNotification('error','Please fill all fields!','');
    } else {
      if (typeof this.state.data.email !== "undefined") {
        let lastAtPos = this.state.data.email.lastIndexOf("@");
        let lastDotPos = this.state.data.email.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            this.state.data.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            this.state.data.email.length - lastDotPos > 2
          )
        ) {
          this.setState({ error: { email: "Please enter a valid email!" } });
        } else {
          this.setState({ loading: true });

          var data = { email: this.state.data.email };
          axios
            .post(CONFIG.BASE_URL + "/api/forget-password", data)
            .then((res) => {
              this.setState({ loading: false });

              if (res.data.status == 200) {
                this.setState({ message: res.data.message });
                localStorage.setItem(
                  "reset_data",
                  JSON.stringify(this.state.data.email)
                );
                setTimeout(() => {
                  this.props.history.push("/reset-password");
                }, 3000);
              } else if (res.data.status == 500) {
                this.setState({
                  errorMessage: "Something went wrong, please try again later!",
                });
              } else {
                this.setState({ errorMessage: res.data.message });
              }
            })
            .catch((err) => {
              this.setState({ loading: false });
              this.setState({
                errorMessage: "Something went wrong, please try again later!",
              });
            });
        }
      } else {
      }
    }
  }

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
                    <h4>Forgot your password</h4>
                    <div className="form-bottom">
                    {this.state.errorMessage && (
                        <div class="alert alert-danger" role="alert">
                          {this.state.errorMessage}
                        </div>
                      )}
                      {this.state.message && (
                        <div class="alert alert-success" role="alert">
                          {this.state.message}
                        </div>
                      )}
                      <div className="form-group">
                        <label>Enter your email</label>
                        <input type="email" name="email" placeholder="Email" className="form-email form-control"   value={this.state.data.email} id="email" onChange={this.onChange.bind(this)}/>
                        <span className="form-error">
                          {this.state.error.email}
                        </span>
                      </div>
                      <div className="regSubmitBtn">
                        <button type="button"  onClick={this.onSubmit} className="btn btn-next">Next</button>
                      
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
        {/* <form onSubmit={this.onSubmit}>
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
                  <div className="enkLogo">
                    <img src="images/icons/enkLogo.png" alt="" />
                  </div>
                  <p>The Virtual Experience</p>
                </div>

                <div className="loginRightBox">
                  <div className="loginInner">
                    <div className="forgotInner">
                      {this.state.errorMessage && (
                        <div class="alert alert-danger" role="alert">
                          {this.state.errorMessage}
                        </div>
                      )}
                      {this.state.message && (
                        <div class="alert alert-success" role="alert">
                          {this.state.message}
                        </div>
                      )}
                      <div className="form-group">
                        <label>Enter Your Email </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          value={this.state.data.email}
                          name="email"
                          id="email"
                          onChange={this.onChange.bind(this)}
                        />
                        <span className="form-error">
                          {this.state.error.email}
                        </span>
                      </div>
                      <div className="loginSubmitBtn">
                        <Link to="/login" className="forgetPass">
                          Already have an account?
                        </Link>
                        <button type="submit" className="submitBtn">
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="poweredByBlock">
                <span className="powerText">POWERED BY:</span>
                <span className="powerLogo">
                  <img src="images/icons/powerLogo.png" />
                </span>
              </div>
            </div>
          </div>
        </form> */}
        {/* /#wrapper */}
      </>
    );
  }
}

export default Forget;
