import React, { useState, useEffect } from "react";
import * as CONFIG from "../../../config.json";
import { Link } from "react-router-dom";
import { login, chatInitialization } from "../../../api/chat";
import Footer from "../../common/footer";

const Helpdesk = (props) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const chatWithAdmin = () => {
    props.history.push("admin-chat");
  };

  useEffect(() => {
    (async () => {
      const data = await chatInitialization();
    })();
  }, []);

  return (
    <div id="page-content-wrapper" class="helpDeskPage">
      <div className="innerContentBlock">
        {/* Start Inner Sec */}
        <div className="chatWithAdminPage">
          <div className="chatWithAdmin">
            {/* Start Page Title */}
            <div className="sitePageTitle">
              <h2>
                Help Desk{" "}
                <span className="siteSubTitle">Chat with a support agent</span>
              </h2>
            </div>
            {/* End Page Title */}
            <div className="adminNameBlock">
              <div className="adminNameSec">
                <h3>
                  Hi {userData.first_name} {userData.last_name}
                </h3>
                <p>
                  Welcome to Technical Support, If you need any help. <br />
                  Please click on Chat button.
                </p>
                <button
                  onClick={() => {
                    chatWithAdmin();
                  }}
                  type="button"
                  className="adminChatBtn"
                >
                  Chat with Admin
                </button>
              </div>
              <div className="signedWith">
                <h3>You are signed in with </h3>
                <p>{userData.email}</p>
              </div>
              <div className="adminChatDec">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida.
                </p>
              </div>
            </div>
          </div>

          <div className="helpUserRight">
            <div className="helpUserProfile">
              <div className="helpusrImg">
                <img
                  src={CONFIG.BASE_URL + "/uploads/" + userData.profile_img}
                  alt
                />
              </div>
              <div className="helpusrInfo">
                <h3>
                  {userData.first_name} {userData.last_name}
                </h3>
                <span className="helpusrEdit">
                  <Link to="/complete-profile">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-pencil-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>{" "}
                    Edit Profile
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}
      </div>
      <Footer />
    </div>
  );
};

export default Helpdesk;
