import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import axios from "axios";

import Speakers from "../speakers";
import BoothSlot from "../booth-slots";
import Footer from "../../common/Footer";

import * as userActions from "../../../redux/actions/userData/actionCreater1";
import * as CONFIG from "../../../config.json";
import { login, chatInitialization, logoutChat } from "../../../api/chat";
import { updateProfileVisibility } from "../../../api/user";

const ExpoDashboard = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    // slidesToScroll: 2,
    initialSlide: 0,
    responsive: [],
  };

  let user_data = JSON.parse(localStorage.getItem("userData"));
  let eventData = JSON.parse(localStorage.getItem("eventData"));

  const userData = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState("");
  const [isChatInit, setChatInit] = useState(false);
  const [sideNavOpen, setSideNav] = useState(true);
  const [playDashVideo, setplayDashVideo] = useState(false);
  const [pauseDashVideo, setPauseDashVideo] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(userActions.loadUserDataToStore());
    })();
    Scroll.animateScroll.scrollTo(10, { smooth: false, duration: 0 });
  }, []);

  useEffect(() => {
    (async () => {
      // setLoading(true)
      const data = await chatInitialization();
      console.log("data------ aashi", data);
      if (data != "") {
        setChatInit(true);
        setLoading(false);
      }
      setLoading(false);
      if (user_data) {
        axios.defaults.headers.common["token"] =
          "Bearer" + " " + user_data.token;
        var data12 = {
          event: localStorage.getItem("eventId"),
          user_id: user_data._id,
        };
        await axios
          .post(CONFIG.BASE_URL + "/api/add-friends", data12)
          .then(async (res) => {})
          .catch((err) => {});
      }
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
  // let userData = JSON.parse(localStorage.getItem("userData"));

  const handleLoader = (status) => {
    console.log("handleLoader invoked====", status);
    setLoading(status);
  };

  return (
    <React.Fragment>
      <div>
        <div className="siteHeader">
          <div className="siteInnerHeader">
            <nav className="navbar navbar-expand-lg">
              <div className="headLeftContent">
                <div className="headerLogo">
                  <Link to="/">
                    <img src="/elevate-theme/images/elevateLogo.png" alt />
                  </Link>
                </div>
              </div>
              <div className="headerRightContant" id="headProfile">
                <div className="headerSocial">
                  <ul>
                    <li>
                      <a href={eventData && eventData.facebook ? eventData.facebook : "#"}>
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href={eventData && eventData.twitter ? eventData.twitter : "#"}>
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href={eventData && eventData.instagram ? eventData.instagram : "#"}>
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href={eventData && eventData.linkdin ? eventData.linkdin : "#"}>
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
                <button
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
                </button>
                <span className="rightToggleHead">
                  <a
                    className="headerToggleMenu"
                    onClick={() => {
                      setSideNav(!sideNavOpen);
                    }}
                  >
                    <span className="headToggle" />
                  </a>
                </span>
              </div>
            </nav>
          </div>
        </div>
        <div className="siteContainer elevateExpo">
          <div className="d-flex contentSection" id="wrapper">
            <span className="secTopRightBdr" />
            {/* Sidebar */}

            <div
              className={`siteLeftBar ${
                sideNavOpen == true ? "" : "toggleLeftNav"
              }`}
              id="sidebar-wrapper"
            >
              <div className="siteLeftBarInner">
                <div className="sideBarNav list-group list-group-flush boxscroll">
                  <ul>
                    <li id="introId">
                      <Scroll.Link
                        offset={-150}
                        to="intro"
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="list-group-item cursor"
                        activeClass="active"
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
                        <span className="sideBarText">INTRO</span>
                      </Scroll.Link>
                    </li>

                    <li id="inboothId" className>
                      <Scroll.Link
                        offset={-115}
                        to="inboothNav"
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="list-group-item cursor"
                        activeClass="active"
                      >
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
                        <span className="sideBarText">IN-BOOTH&nbsp;SESSIONS</span>
                      </Scroll.Link>
                    </li>

                    {videoData && (
                      <li id="virtualExh" className>
                        <Scroll.Link
                          offset={-115}
                          to="elevatehubNav"
                          spy={true}
                          smooth={true}
                          duration={500}
                          className="list-group-item cursor"
                          activeClass="active"
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
                          <span className="sideBarText">VIRTUAL&nbsp;EXHIIBIT </span>
                        </Scroll.Link>
                      </li>
                    )}

                    <li id="libraryId" className>
                      <Scroll.Link
                        offset={-115}
                        to="speakerNav"
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="list-group-item cursor"
                        activeClass="active"
                      >
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
                        <span className="sideBarText">SPEAKER</span>
                      </Scroll.Link>
                    </li>

                    {/* <li id="schedleMeetId" className>
                      <a href="#" className="list-group-item">
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
                        <span className="sideBarText">SCHEDULE MEETING </span>
                      </a>
                    </li> */}
                    {/* <li id="meetroomId" className>
                      <Scroll.Link
                        offset={-115}
                        to="meetroomNav"
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="list-group-item cursor"
                        activeClass="active"
                      >
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
                        <span className="sideBarText">MEETING ROOMS </span>
                      </Scroll.Link>
                    </li> */}
                    <li id="chatId" className>
                      <a
                        // href="#"
                        onClick={() => {
                          props.history.push("/social-hub");
                        }}
                        className="list-group-item"
                        style={{ cursor: "pointer" }}
                      >
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
                        <span className="sideBarText">CHAT</span>
                      </a>
                    </li>
                    <li id="helpdeskId" className>
                      <a
                        onClick={() => {
                          props.history.push("/help-desk");
                        }}
                        className="list-group-item"
                        style={{ cursor: "pointer" }}
                      >
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
                        <span className="sideBarText">Help&nbsp;Desk</span>
                      </a>
                    </li>
                    <li className="logout">
                      <a
                        onClick={async () => {
                          let data = await logoutChat();
                          if (data == "done") {
                            await localStorage.removeItem("userData");
                            props.history.push("/login");
                          } else {
                            console.log("aashi fail logout");
                          }
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
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <div id="page-content-wrapper" className="elevateDashboard">
              <div className="innerContentBlock">
                {/* Start Video Section */}
                <section className="dashVideoAgenda">
                  <div className="eleDashVideo dashSection" id="intro">
                    <div className="dashboardVideoSec">
                      <div className="dashboardVideo video">
                        <ReactPlayer
                          controls={true}
                          className="dashboardVideoMedia"
                          playing={playDashVideo}
                          light={
                            eventData.images
                              ? CONFIG.BASE_URL +
                                "/uploads/" +
                                eventData.images[eventData.images.length - 1]
                              : ""
                          }
                          width="100%"
                          height="423px"
                          onPause={() => {
                            setPauseDashVideo(true);
                          }}
                          onEnded={() => {
                            setplayDashVideo(true);
                          }}
                          playIcon={
                            <div
                              className="videoControlBtn play-bt fullplayIcon"
                              onClick={() => {
                                setplayDashVideo(true);
                              }}
                            >
                              <img
                                src="/elevate-theme/images/icons/playBtn.png"
                                alt=""
                              />
                            </div>
                          }
                          url={`${CONFIG.BASE_URL}/uploads/${
                            eventData.videos[eventData.videos.length - 1]
                          }`}
                          config={{
                            file: {
                              attributes: {
                                preload: "none",
                              },
                            },
                          }}
                        />
                        {/* {playDashVideo == false && (
                          <div
                            onClick={() => {
                              setplayDashVideo(true);
                            }}
                            className="videoControlBtn play-bt"
                          >
                            <img
                              src="elevate-theme/images/icons/playBtn.png"
                              alt
                            />
                          </div>
                        )} */}
                        {/* {pauseDashVideo == true && (
                        <div
                          className="videoControlBtn pause-bt"
                          style={{ display: pauseDashVideo==true?"":"none" }}
                        >
                          <img
                            src="elevate-theme/images/icons/pauseBtn.png"
                            alt
                          />
                        </div>
                        )} */}
                        {/* <div className="mute-bt" /> */}
                        {playDashVideo == false && (
                          <div className="videoWelcomeText">
                            <h3>WELCOME TO</h3>
                            <div className="welcomeLogo">
                              <img
                                src="/elevate-theme/images/elevateLogo.png"
                                alt
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <BoothSlot {...props} setVideoData={setVideoData} />
                </section>
                {/* End Video Section */}
                {videoData && (
                  <section id="elevatehubNav" className="eventBoothSec">
                    <div className="dashBoardTtile">
                      <h2>ELEVATE’S HUB</h2>
                    </div>
                    <div className="eventBoothControl">
                      <iframe
                        width="100%"
                        src={videoData}
                        style={{ height: "calc(100vh - 7px)" }}
                      />
                    </div>
                  </section>
                )}

                <section className="speSecLouSec">
                  <Speakers />

                  {/* <section
                    id="meetroomNav"
                    className="sessionsSec meetingRoomSec speSecLouSec"
                  >
                    <div className="dashBoardTtile">
                      <h2>MEETING ROOMS</h2>
                    </div>
                    <div className="sessionVideoSec">
                      <div className="sessVideoInner meetingRoomInner">
                        <div className="meetingVideoBox">
                          <div className="sessVideo">
                            <video
                              width
                              poster="/elevate-theme/images/icons/videoPoster.jpg"
                              className="dashboardVideoMedia"
                              id="ban_video"
                            >
                              <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                              />
                              <source
                                src="https://www.w3schools.com/html/mov_bbb.ogg"
                                type="video/ogg"
                              />
                              Your browser does not support HTML video.
                            </video>
                            <div className="videoControlBtn play-bt">
                              <img
                                src="/elevate-theme/images/icons/playBtn.png"
                                alt=""
                              />
                            </div>
                            <div
                              className="videoControlBtn pause-bt"
                              style={{ display: "none" }}
                            >
                              <img
                                src="/elevate-theme/images/icons/pauseBtn.png"
                                alt=""
                              />
                            </div>
                            <div className="mute-bt" />
                          </div>
                          <div className="sessVideoText">
                            <h3>ELEVATE THE VIRTUAL WORK SPACE</h3>
                          </div>
                        </div>
                        <div className="meetingVideoBox">
                          <div className="sessVideo">
                            <video
                              width
                              poster="/elevate-theme/images/icons/videoPoster.jpg"
                              className="dashboardVideoMedia"
                              id="ban_video"
                            >
                              <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                              />
                              <source
                                src="https://www.w3schools.com/html/mov_bbb.ogg"
                                type="video/ogg"
                              />
                              Your browser does not support HTML video.
                            </video>
                            <div className="videoControlBtn play-bt">
                              <img
                                src="/elevate-theme/images/icons/playBtn.png"
                                alt=""
                              />
                            </div>
                            <div
                              className="videoControlBtn pause-bt"
                              style={{ display: "none" }}
                            >
                              <img
                                src="/elevate-theme/images/icons/pauseBtn.png"
                                alt=""
                              />
                            </div>
                            <div className="mute-bt" />
                          </div>
                          <div className="sessVideoText">
                            <h3>ELEVATING VS MAGNIFYING</h3>
                          </div>
                        </div>
                        <div className="meetingVideoBox">
                          <div className="sessVideo">
                            <video
                              width
                              poster="/elevate-theme/images/icons/videoPoster.jpg"
                              className="dashboardVideoMedia"
                              id="ban_video"
                            >
                              <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                              />
                              <source
                                src="https://www.w3schools.com/html/mov_bbb.ogg"
                                type="video/ogg"
                              />
                              Your browser does not support HTML video.
                            </video>
                            <div className="videoControlBtn play-bt">
                              <img
                                src="/elevate-theme/images/icons/playBtn.png"
                                alt=""
                              />
                            </div>
                            <div
                              className="videoControlBtn pause-bt"
                              style={{ display: "none" }}
                            >
                              <img
                                src="/elevate-theme/images/icons/pauseBtn.png"
                                alt=""
                              />
                            </div>
                            <div className="mute-bt" />
                          </div>
                          <div className="sessVideoText">
                            <h3>ELEVATING VIRTUAL SOCIAL SPACES</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
              */}
                  <span className="secbtmLeftBdr" />
                </section>
              </div>
              {/*- Start Fooetr -*/}
              <Footer />
              {/* <footer className="siteFooter">
                <div className="siteContainer">
                  <div className="footerInner">
                    <ul>
                      <li>© 2020 ELEVATE</li>
                      <li className="footerDivider">|</li>
                      <li>
                        <span>POWERED BY:</span>{" "}
                        <img
                          src="/elevate-theme/images/footerPowerLogo.png"
                          alt
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </footer> */}
              {/*- End Fooetr -*/}
            </div>
            {/* /#page-content-wrapper */}
          </div>
        </div>
        {/* /#wrapper */}
      </div>

      {/* <Footer /> */}
    </React.Fragment>
  );
  // }
};

export default ExpoDashboard;
