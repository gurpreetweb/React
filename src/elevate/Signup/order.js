import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import * as CONFIG from "../../config.json";
class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      error: {},
      message: "",
      errorMessage: "",
      loading: false,
    };
    this.Summit = this.Summit.bind(this);
  }

  componentDidMount() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    this.setState({ data: loginData });
    if (!loginData) {
      //console.log(reset_data);
      this.props.history.push("/login");
    }
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
  Summit() {
    localStorage.removeItem("loginData");
    this.props.history.push("/complete-profile");
  }

  render() {
    return (
      <div class="loginDetailPage registrationDetail">
        {/*================== Start order Complete ==================*/}
        <div className="siteHeader">
          <div className="orderCompleteHead">
            <div className="orderCompLogo">
              <img src="/elevate-theme/images/elevateLogo.png" alt />
            </div>
            <div className="orderCompEvent">
              <h3>
                The Virtual Event  <br />
                For Data teams
              </h3>
              <p>Organized by: Beauty &amp; Glam</p>
            </div>
          </div>
        </div>

        {/*================== End order Complete ==================*/}
        {/*================== Start dashboard - 2 mid Content ==================*/}
        
        <div className="orderCompleteSec">
          <div className="orderCompInner">
            <div className="orderCompSign">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-check-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
              </svg>
            </div>
            <div className="orderCompContent">
              <h3>Your order is complete </h3>
              <div className="orderCompBlock">
                <div className="orderCompSummit">
                  <div className="orderCompButton">
                    <button
                      type="button"
                      className="orderSummitBtn"
                      onClick={this.Summit}
                      style={{textAlign:"center"}}
                    >
                      Enter Summit Now
                    </button>
                  </div>
                  <div className="orderCompUsrPass">
                    <p>
                      <span className="orderUsrPass">User name:</span>
                      {this.state.data.email}
                    </p>
                    <p>
                      <span className="orderUsrPass">Password:</span>
                      {this.state.data.password}
                    </p>
                  </div>
                </div>
                <div className="orderCompSummit">
                  <div className="orderCompButton">
                    <button
                      type="button"
                      className="orderSummitBtn printConfirm"
                      onClick={()=>{window.print()}}
                      style={{textAlign:"center"}}
                    >
                      Print Confirmation
                    </button>
                  </div>
                  <div className="orderCompUsrPass">
                    <p>
                      Print your confirmation and check the email you provided
                      for additional information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*================== End dashboard - 2 mid Content ==================*/}
        {/* Start Footer Section */}
        <footer className="siteFooter">
          <div className="siteContainer">
            <div className="footerInner">
              <ul>
                <li>© 2020 ELEVATE</li>
                <li className="footerDivider">|</li>
                <li>
                  <span>POWERED BY:</span>{" "}
                  <img src="/elevate-theme/images/footerPowerLogo.png" alt />
                </li>
              </ul>
            </div>
          </div>
        </footer>

        {/* End Footer Section */}
      </div>
    );
  }
}

export default Forget;
