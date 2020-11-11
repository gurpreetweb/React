import React, { useState, useEffect } from "react";
import { CometChatGroupListScreen } from "./src/react-chat-ui-kit/CometChat/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { login, chatInitialization } from "../../../api/chat";
import SinglePageHeader from "../../common/HeaderSinglePage"

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("chat props===>", props);
  }
  componentWillMount = async () => {
    window.scrollTo(0, 0)
    const data = await chatInitialization();
  };
  render() {
    return (
      <>
      <SinglePageHeader />
        {/* <div className="siteHeader">
          <div className="siteInnerHeader">
            <nav className="navbar navbar-expand-lg">
              <div className="headLeftContent">
                <div className="headerLogo">
                  <Link to="/">
                    <img src="/elevate-theme/images/elevateLogo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="headerRightContant" id="headProfile">
                <div className="headerSocial">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div> */}
                {/* <button
                  className="btn btn-primary sideBarToggle"
                  id="menu-toggle"
                >
                  Toggle Menu
                </button>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button> */}
                {/* <span className="rightToggleHead">
                  <a className="headerToggleMenu">
                    <span className="headToggle" />
                  </a>
                </span> */}
              {/* </div>
            </nav>
          </div>
        </div> */}

        <div className="siteContainer">
          <div className="d-flex contentSection" id="wrapper">
            {/* Sidebar */}
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <div id="page-content-wrapper" className="elevateDashboard">
            <div
                className="elevateFullWidth"
                style={{ margin: "0 0 20px 0" }}
              >
                <div className="elevateSingleAgenda">
                  <div className="singleAgenTitle">
                    <div className="agendaTitle">
                      <span className="agendaBackBtn">
                        {" "}
                        <Link to={"/"}>
                          <i className="fa fa-angle-left" />
                        </Link>
                      </span>
                      <h3 className="agendaTitleText">SOCIAL HUB</h3>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="chat-section-wrapper">
                {/* <div className="back_btn_chat">
                  <a
                    className="back-button"
                    href="#"
                    onClick={() => {
                      this.props.history.push("/");
                    }}
                  >
                    <span />
                    BACK
                  </a>
                </div>
                <div className="chat_heading">
                  {" "}
                  <h1>Group Chat</h1>
                </div> */}
                <div className="chat_box">
                  <div className="chat_message">
                    <div className="frontFullChat">
                      <CometChatGroupListScreen />
                    </div>
                  </div>
                </div>
                <footer className="siteFooter">
                  <div className="siteContainer">
                    <div className="footerInner">
                      <ul>
                        <li>© 2020 ELEVATE</li>
                        <li className="footerDivider">|</li>
                        <li>
                          <span>POWERED BY:</span>{" "}
                          <img src="/elevate-theme/images/footerPowerLogo.png" alt="" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
            {/* /#page-content-wrapper */}
          </div>
        </div>
      </>
    );
  }
}

export default ChatComponent;
