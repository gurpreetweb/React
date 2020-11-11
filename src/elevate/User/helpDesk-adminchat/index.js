import React, { useState, useEffect } from "react";
import { CometChatUnified } from "./src/react-chat-ui-kit/CometChat/index";
import { Link } from "react-router-dom";
import { login, chatInitialization } from "../../../api/chat";
import SinglePageHeader from "../../common/HeaderSinglePage";

class ChatComponent extends React.Component {
  componentWillMount = async () => {
    window.scrollTo(0, 0)
    const data = await chatInitialization();
  };
  render() {
    return (
      <>
        <SinglePageHeader />

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
                      <h3 className="agendaTitleText"> HELP DESK</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="chat-section-wrapper">
                {/* <div className="back_btn_chat">
                  <Link className="back-button" to="/">
                    <span />
                    BACK
                  </Link>
                </div> */}

                <div className="chat_box">
                  <div className="chat_message">
                    <div className="chatWithAdminPage helpDeskChat">
                      <div className="admin-comet-chat">
                        <CometChatUnified />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /#page-content-wrapper */}
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
      </>
    );
  }
}

export default ChatComponent;
