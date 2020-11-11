import React, { useEffect, useState } from "react";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../redux/actions/userData/actionCreater1";
import axios from "axios";
import * as CONFIG from "../../config.json";

import Header from "../common/header";
import Footer from "../common/footer";
import ProtectedRoute from "../common/ProtectedRoute";

import MainDashboard from "./mainDashboard";
import AgendaComponent from "./agenda";
import myEventsComponent from "./myEvents";
import AgendaDetailsComponent from "./agenda/agenda-detail";
import LiveNowComponent from "./live-now";
import SuggestMeComponent from "./suggestedMe";
import ProfileStepsComponent from "./profile/profileStep";
import OnDemandComponent from "./onDemand";
import ExpoComponent from "./expo";
import Video from "./expo/video";
import SponsorDetail from "./expo/sponsor_detail";
import Webinar from "../Conference/Webinar";
import WebinarLive from "../Conference/Webinar-live";

import SocialHubComponent from "./socialHub";
import groupChatComponent from "./groupChat";
import NotesComponent from "./notes";
import suggestedComponent from "./suggested";
import PollComponent from "./polls";
import SubmitReview from "./polls/submitReview";
import FaqComponent from "./faq";
import QuestComponent from "./quest";
import ChatComponent from "./chat";
import Helpdesk from "./helpDesk";
import HelpdeskAdminChat from "./helpDesk-adminchat";
import { login, chatInitialization, logoutChat } from "../../api/chat";
import { updateProfileVisibility } from "../../api/user";
import Conference from "../Conference/Conference";

import ConferenceSponsor from "../ConferenceSponsor/Conference";

import conferenceBoothComponent from "./conferenceBooth";
import apponitmentsComponent from "./appointments";

// apponitmentsComponent

const UserDashboard = (props) => {
  let user_data = JSON.parse(localStorage.getItem("userData"));
  const userData = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isChatInit, setChatInit] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(userActions.loadUserDataToStore());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // setLoading(true)
      const data = await chatInitialization();
      console.log("data------ aashi", data);
      if (data != "") {
        setChatInit(true);
        // setLoading(false);
      }
      //  setLoading(false);
      if (user_data) {
        axios.defaults.headers.common["token"] =
          "Bearer" + " " + user_data.token;
        var data12 = {
          event: localStorage.getItem('eventId'),
          user_id: user_data._id,
        };
        await axios
          .post(CONFIG.BASE_URL + "/api/add-friends", data12)
          .then(async (res) => {})
          .catch((err) => {});
      }
      setLoading(false);
    })();
  }, []);

  const handleProfileVisibility = async (status) => {
    console.log("----handleProfileVisibility invoked------", status);
    let data = 1;
    if (status == false) {
      data = 2;
    }
    const response = await updateProfileVisibility({ status: data });
    if (response.status == 200) {
      console.log("before dispath======", response.data);
      dispatch(userActions.updateProfileVisibilitySuccess(response.data));
    } else {
      dispatch(userActions.updateProfileVisibilityFailure(response.message));
    }
  };

  const handleEditProfile = () => {
    console.log("handleEditProfile invoked");
    props.history.push("/complete-profile");
  };
  const handleNetwork = () => {
    props.history.push("/social-hub");
  };
  // let userData = JSON.parse(localStorage.getItem("userData"));

  const handleLoader = (status) => {
    console.log("handleLoader invoked====", status);
    setLoading(false);
    // setLoading(status);
  };

  const hanldeLogo = async () => {
    props.history.push("/");
  };

  const toggleClose = () => {
    console.log('hellooooooooooo');
    $(".d-flex ").removeClass( "toggled" );
  }

  if (user_data.role == 4) {
    return (
      <React.Fragment>
        <Header
          headerProp={loading}
          profileVisibilityStatus={
            userData.isProfilePublic == true || userData.isProfilePublic == 1
              ? true
              : false
          }
          userData={userData}
          handleProfileVisibility={handleProfileVisibility}
          handleEditProfile={handleEditProfile}
          handleNetwork={handleNetwork}
          hanldeLogo={hanldeLogo}
        />

        <Router>
          <div className="siteContainer">
            <div className="d-flex contentSection" id="wrapper">
              {/*-------------------------- sideNav---------------------- */}
              <div className="siteLeftBar" id="sidebar-wrapper">
                <div className="siteLeftBarInner">
                  <div className="sideBarNav list-group list-group-flush boxscroll">
                    <ul >
                      <li className="" onClick= {toggleClose}>
                        <NavLink
                          className="list-group-item"
                          to="/sponsor-dashboard"
                        >
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-house-door-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z" />
                              <path
                                fillRule="evenodd"
                                d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText" >Dashboard</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/appointments">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-grid-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">
                            Appointments Listing
                          </span>
                        </NavLink>
                      </li>
                      {user_data.lounge_type == "chat_room" && (
                        <li className="" onClick= {toggleClose}>
                          <NavLink className="list-group-item" to="/group-chat">
                            <span className="sideBarIcon">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="bi bi-grid-fill"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"
                                />
                              </svg>
                            </span>
                            <span className="sideBarText">Group Chat</span>
                          </NavLink>
                        </li>
                      )}

                      <li className="loglogout" onClick= {toggleClose}>
                        <a
                          onClick={async () => {
                            let data = await logoutChat();
                            await localStorage.removeItem("userData");
                            props.history.push("/login");
                          }}
                          className="list-group-item"
                          style={{ cursor: "pointer" }}
                        >
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-power"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
                              />
                              <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z" />
                            </svg>
                          </span>
                          <span className="sideBarText">Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/*-------------------------- sideNav---------------------- */}

              {/*-------------------------- body---------------------- */}
              <Switch>
                <Route
                  exact={true}
                  path="/sponsor-dashboard"
                  component={conferenceBoothComponent}
                />
                <Route
                  exact={true}
                  path="/appointments"
                  component={apponitmentsComponent}
                />
                <Route
                  exact={true}
                  path="/group-chat"
                  component={groupChatComponent}
                />
                <Route render={() => <Redirect to="/sponsor-dashboard" />} />
              </Switch>
              {/* <MainDashboard/> */}
              {/* <Agenda/> */}
              {/*-------------------------- body---------------------- */}
            </div>
          </div>
        </Router>
        <Footer />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header
          headerProp={loading}
          profileVisibilityStatus={
            userData.isProfilePublic == true || userData.isProfilePublic == 1
              ? true
              : false
          }
          userData={userData}
          handleProfileVisibility={handleProfileVisibility}
          handleEditProfile={handleEditProfile}
          handleNetwork={handleNetwork}
          hanldeLogo={hanldeLogo}
        />

        <Router>
          <div className="siteContainer">
            <div className="d-flex contentSection" id="wrapper">
              {/*-------------------------- sideNav---------------------- */}
              <div className="siteLeftBar" id="sidebar-wrapper">
                <div className="siteLeftBarInner">
                  <div className="sideBarNav list-group list-group-flush boxscroll">
                    <ul>
                      <li className=""  onClick= {toggleClose}>
                        <NavLink className="list-group-item hello" to="/dashboard">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-house-door-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z" />
                              <path
                                fillRule="evenodd"
                                d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Dashboard</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/live-now">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-display-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 12c0 .667-.083 1.167-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75c-.167-.333-.25-.833-.25-1.5h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h4z" />
                            </svg>
                          </span>
                          <span className="sideBarText">Live Now</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink
                          className="list-group-item"
                          to="/agenda"
                          // "/agenda"
                        >
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-calendar-week-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm9.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Agenda</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/my-events">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-calendar2-check-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm-2 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-1zm8.854 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">My Events</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/suggested-me">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-droplet-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Suggested Me</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/on-demand">
                          <span className="sideBarIcon">
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 16 16"
                              className="bi bi-play-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                            </svg>
                          </span>
                          <span className="sideBarText">On Demand</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/expo">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-grid-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Expo</span>
                        </NavLink>
                      </li>
                      {user_data.role == "3" && (
                        <li className="" onClick= {toggleClose}>
                          <NavLink className="list-group-item" to="/quest">
                            <span className="sideBarIcon">
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
                              </svg>
                            </span>
                            <span className="sideBarText">Quest</span>
                          </NavLink>
                        </li>
                      )}
                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/social-hub">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-share-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.024 3.797L4.499 7.56l-.448-.895 7.525-3.762.448.894zm-.448 9.3L4.051 9.335 4.5 8.44l7.525 3.763-.448.894z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M13.5 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-11-5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Social Hub</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/notes">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-file-earmark-text-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 3a2 2 0 0 1 2-2h5.293a1 1 0 0 1 .707.293L13.707 5a1 1 0 0 1 .293.707V13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm7 2V2l4 4h-3a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Notes</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/polls">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-ui-checks"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z" />
                              <path
                                fillRule="evenodd"
                                d="M2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646l2-2a.5.5 0 1 0-.708-.708L2.5 4.293l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0zm0 8l2-2a.5.5 0 0 0-.708-.708L2.5 12.293l-.646-.647a.5.5 0 0 0-.708.708l1 1a.5.5 0 0 0 .708 0z"
                              />
                              <path d="M7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z" />
                              <path
                                fillRule="evenodd"
                                d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Polls</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/faq">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-question-circle-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">FAQ</span>
                        </NavLink>
                      </li>

                      <li className="" onClick= {toggleClose}>
                        <NavLink className="list-group-item" to="/help-desk">
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-share-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.024 3.797L4.499 7.56l-.448-.895 7.525-3.762.448.894zm-.448 9.3L4.051 9.335 4.5 8.44l7.525 3.763-.448.894z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M13.5 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-11-5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                              />
                            </svg>
                          </span>
                          <span className="sideBarText">Help Desk</span>
                        </NavLink>
                      </li>

                      <li className="logout" onClick= {toggleClose}>
                        <a
                          onClick={async () => {
                            let data = await logoutChat();
                            await localStorage.removeItem("userData");
                            props.history.push("/login");
                          }}
                          className="list-group-item"
                          style={{ cursor: "pointer" }}
                        >
                          <span className="sideBarIcon">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-power"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
                              />
                              <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z" />
                            </svg>
                          </span>
                          <span className="sideBarText">Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/*-------------------------- sideNav---------------------- */}

              {/*-------------------------- body---------------------- */}
              <Switch>
                <Route
                  exact={true}
                  path="/dashboard"
                  component={MainDashboard}
                />
                <Route
                  exact={true}
                  path="/agenda"
                  component={AgendaComponent}
                  loading={true}
                />

                <Route
                  exact={true}
                  path="/polls/submit-review/:agendaJoinId/:agendaId"
                  component={SubmitReview}
                />
                <Route
                  exact={true}
                  path="/my-events"
                  component={myEventsComponent}
                />
                <Route
                  exact={true}
                  path="/agenda-details/:agendaId"
                  component={AgendaDetailsComponent}
                />
                <Route
                  exact={true}
                  path="/live-now"
                  render={(props) => (
                    <LiveNowComponent handleLoader={handleLoader} {...props} />
                  )}
                  // component={LiveNowComponent}
                  // handleLoader={handleLoader}
                />
                <Route
                  exact={true}
                  path="/complete-profile"
                  component={ProfileStepsComponent}
                />
                <Route
                  exact={true}
                  path="/on-demand"
                  component={OnDemandComponent}
                />
                <Route exact={true} path="/expo" component={ExpoComponent} />
                <Route
                  exact={true}
                  path="/social-hub"
                  component={SocialHubComponent}
                />
                <Route
                  exact={true}
                  path="/group-chat"
                  component={groupChatComponent}
                />
                <Route exact={true} path="/notes" component={NotesComponent} />
                <Route
                  exact={true}
                  path="/suggested-me"
                  component={SuggestMeComponent}
                />
                <Route exact={true} path="/polls" component={PollComponent} />
                <Route
                  exact={true}
                  path="/polls/submit-review/:agendaJoinId/:agendaId"
                  component={SubmitReview}
                />
                <Route path="/webinar/:webinarId/:title" component={Webinar} />
                <Route
                  path="/webinar-live/:webinarId"
                  component={WebinarLive}
                />
                <Route exact={true} path="/faq" component={FaqComponent} />
                <Route exact={true} path="/quest" component={QuestComponent} />
                <Route
                  exact={true}
                  path="/sponsor/video/:id"
                  component={Video}
                />
                <Route
                  exact={true}
                  path="/sponsor/detail/:id"
                  component={SponsorDetail}
                />

                {/* <Route
                  exact={true}
                  path="/dashboard/chat"
                  component={()=><ChatComponent isChatInit={isChatInit}/>}
                /> */}
                <Route exact={true} path="/help-desk" component={Helpdesk} />
                <Route
                  exact={true}
                  path="/admin-chat"
                  component={() => (
                    <HelpdeskAdminChat isChatInit={isChatInit} />
                  )}
                />
                <Route
                  exact={true}
                  path="/conference/:conferenceId"
                  component={Conference}
                />

              

                <Route render={() => <Redirect to="/dashboard" />} />
              </Switch>
              {/* <MainDashboard/> */}
              {/* <Agenda/> */}
              {/*-------------------------- body---------------------- */}
            </div>
          </div>
        </Router>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
};

export default UserDashboard;
