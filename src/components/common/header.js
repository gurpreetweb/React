import React from "react";
import $ from "jquery";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import * as UserApis from "../../api/user";
import * as UserActionCreators from "../../redux/actions/userData/actionCreater1";
import * as CONFIG from "../../config.json";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getRewardsCategory,
  getPointData,
  getLeaderBoardData,
} from "../../api/rewards/index";

// const Header = (props) => {
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsCompleted: this.props.stepsCompleted,
      rewardsCategory: [],
      totalpoints: 0,
      pointsPerCategory: [],
      myRank: 0,
      leaderboardList: [],
    };
  }

  componentDidMount = async () => {
    this.getRewardsCategory();
    this.getMyPoints();
    this.getLeaderBoardData();
  };

  getRewardsCategory = async () => { 
    console.log("--------getRewardsCategory invoked----");
    try {
      const response = await getRewardsCategory();
      if (response.status != 200) {
        throw new Error(response.message);
      } else {
        this.setState(
          {
            rewardsCategory: response.data,
          },
          () => {
            console.log("reward list fetched ");
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later ");
    }
  };

  getMyPoints = async () => {
    console.log("--------getMyPoint invoked----");
    try {
      const response = await getPointData();
      console.log("aashish response xx", response);

      if (response.status != 200) {
        throw new Error(response.message);
      } else {
        console.log("aashish response", response);
        if(response.data.totalPoint.length>0){
          this.setState(
            {
              totalpoints: response.data.totalPoint[0].totalPoint,
              pointsPerCategory: response.data.pointPerCategory,
            },
            () => {
              console.log("point list fetched ", this.state);
            }
          );
        }
      }
    } catch (error) {
      console.log("error ==xx=",error.message)
      toast.error("Something went wrong. Please try again later ");
    }
  };

  getLeaderBoardData = async () => {
    console.log("--------getLeaderBoardData invoked----");
    try {
      const response = await getLeaderBoardData();
      if (response.status != 200) {
        throw new Error(response.message);
      } else {
        console.log("aashish getLeaderBoardData response", response);
        this.setState(
          {
            myRank: response.data.userRank,
            leaderboardList: response.data.leaderBoardData,
          },
          () => {
            console.log("leaderboard data fetched----->", this.state);
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    }
  };
  ontoggle() {
    $(".siteLeftBar").toggleClass("toggleLeftNav");
  }
  toggle2() {
    $(".d-flex ").toggleClass("toggled");
  }

  render() {
    return (
      <div>
        {" "}
        <Loader
          className="circle_cover"
          type="Rings"
          color="#2b2497"
          height="100"
          width="100"
          visible={this.props.headerProp}
        />
        <div className="siteHeader">
          <div className="siteInnerHeader">
            <nav className="navbar navbar-expand-lg">
              <div className="headLeftContent">
                <a
                  href="javascript:void(0)"
                  className="headerToggleMenu"
                  onClick={this.ontoggle}
                >
                  <span className="headToggle"></span>
                </a>
                <button
                  className="btn btn-primary sideBarToggle menu-toggle"
                  id="menu-toggle"
                  onClick = {this.toggle2}
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
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="headerLogo">
                  <a
                    href="#"
                    onClick={() => {
                      this.props.hanldeLogo()
                    }}
                  >
                    <img src="/images/headerLogo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="headerRightContant" id="headProfile">
                <span className="virExp">The Virtual Experience.</span>
                <div className="headSetIcon">
                  <span className="setICon">
                    <i className="fa fa-cog"></i>
                  </span>
                  <div className="headerSettingBlock">
                    <div className="settingProfileSec">
                      <div className="settingProImg">
                        <img
                          src={
                            this.props.userData.profilePicId
                              ? CONFIG.BASE_URL +
                                "/uploads/" +
                                this.props.userData.profilePicId
                              : "/images/attendeeImg-2.jpg"
                          }
                        />
                      </div>
                      <div className="settingProText">
                        <h2 className="userName">
                          {this.props.userData.role == 4
                            ? this.props.userData.sponsor_name
                            : this.props.userData.firstName +
                              " " +
                              this.props.userData.lastName}
                        </h2>

                        {/* {this.props.userData.role == 3 && (
                          <div className="makeProPublic">
                            <p>Make my profile public</p>
                            <span className="makeProfileBtn siteCheckBox">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={
                                    this.props.profileVisibilityStatus == 1 ||
                                    this.props.profileVisibilityStatus == true
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    this.props.handleProfileVisibility(
                                      !this.props.profileVisibilityStatus
                                    );
                                  }}
                                />
                                <span className="slider round">
                                  <span className="checkTextYes">Yes</span>
                                  <span className="checkTextNo">No</span>
                                </span>
                              </label>
                            </span>
                          </div>
                        )} */}
                        <p>
                          <a
                            href="#"
                            onClick={() => {
                              this.props.handleEditProfile();
                            }}
                          >
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
                          </a>
                        </p>
                      </div>
                    </div>
                    {this.props.userData.role == 3 && (
                      <div className="settingPointSec">
                        <div className="pointSec">
                          <h3>My Points</h3>
                          <p>{this.state.totalpoints}</p>
                        </div>
                        <div className="pointSec">
                          <h3>Position</h3>
                          <p>
                            {this.state.myRank == 0
                              ? " ---"
                              : this.state.myRank}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="settingNetworkBtn">
                      <a
                        href="#"
                        onClick={() => {
                          this.props.handleNetwork();
                        }}
                      >
                         Head to Networking
                      </a>
                    </div>
                    {/* <div className="settingLikeMindSec">
                    <h3>
                      LIKE MINDED
                      INDIVIDUALS
                    </h3>
                    <p>These attendees share similar interests as you!</p>
                  </div>
                  <div className="settingChatSec">
                    <div className="profileChat">
                      <div className="profileChatImg">
                        <img src="/images/attendeeImg-2.jpg" alt="" />
                      </div>
                      <div className="profileChatText">
                        <h3 className="attendeeName">WEIAN SHENG</h3>
                        <p className="attendeeComp">Airbnb</p>
                        <p className="attendeeDes">
                          Prinicipal Software Engineer
                        </p>
                      </div>
                      <span className="ChatImg">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chat-left-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="profileChat">
                      <div className="profileChatImg">
                        <img src="/images/attendeeImg-3.jpg" alt="" />
                      </div>
                      <div className="profileChatText">
                        <h3 className="attendeeName">WEIAN SHENG</h3>
                        <p className="attendeeComp">Airbnb</p>
                        <p className="attendeeDes">
                          Prinicipal Software Engineer
                        </p>
                      </div>
                      <span className="ChatImg">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chat-left-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="profileChat">
                      <div className="profileChatImg">
                        <img src="/images/attendeeImg-4.jpg" alt="" />
                      </div>
                      <div className="profileChatText">
                        <h3 className="attendeeName">WEIAN SHENG</h3>
                        <p className="attendeeComp">Airbnb</p>
                        <p className="attendeeDes">
                          Prinicipal Software Engineer
                        </p>
                      </div>
                      <span className="ChatImg">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chat-left-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                 */}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
