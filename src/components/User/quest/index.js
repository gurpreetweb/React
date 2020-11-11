import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getRewardsCategory,
  getPointData,
  getLeaderBoardData,
} from "../../../api/rewards/index";
import Footer from "../../common/footer";

class Quest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      toast.error("Something went wrong. Please try again later");
    }
  };

  getMyPoints = async () => {
    console.log("--------getMyPoint invoked----");
    try {
      const response = await getPointData();
      if (response.status != 200) {
        throw new Error(response.message);
      } else {
        console.log("aashish response", response);
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
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
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

  render() {
    const { rewardsCategory } = this.state;
    return (
      <div id="page-content-wrapper">
        <ToastContainer />
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>
              Summit Quest{" "}
              <span className="siteSubTitle">
                The summit is virtual, the swag is real. Collect points for
                engaging in the conference and earn gear.
              </span>
            </h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="summitQuestPage">
            <div className="questPointPos">
              <ul className="questPointUl">
                <li>
                  <div className="questPointBlock">
                    <p>My Points</p>
                    <h3>{this.state.totalpoints}</h3>
                  </div>
                </li>
                <li>
                  <div className="questPointBlock">
                    <p>Position</p>
                    <h3>
                      {this.state.myRank == 0 ? " ---" : this.state.myRank}
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="pointBlockBlock">
              <div className="earnPointSec">
                <h3>How do I earn point’s</h3>
                <p>
                  Play Summit Quest for Monday, June 22 - Friday, June 26 and
                  earn points for participating in the below activities.
                </p>
                <div className="earnPointList">
                  {rewardsCategory.length > 0 ? (
                    <ul>
                      {rewardsCategory.map((data) => (
                        <li>
                          <div className="pointSecBlcok">
                            <h4>{data.title}</h4>
                            <span className="earcnedPoints">
                              {data.rewardPoints}
                            </span>
                          </div>
                        </li>
                      ))}
                      {/* <li>
                        <div className="pointSecBlcok">
                          <h4>Visit sponsors and lounges</h4>
                          <span className="earcnedPoints">20</span>
                        </div>
                      </li>
                      <li>
                        <div className="pointSecBlcok">
                          <h4>Take a quiz at the Beauty and Glam</h4>
                          <span className="earcnedPoints">20</span>
                        </div>
                      </li>
                      <li>
                        <div className="pointSecBlcok">
                          <h4>Fill out the conference survey</h4>
                          <span className="earcnedPoints">20</span>
                        </div>
                      </li>
                      <li>
                        <div className="pointSecBlcok">
                          <h4>Fill out the survey following a session</h4>
                          <span className="earcnedPoints">20</span>
                        </div>
                      </li> */}
                    </ul>
                  ) : (
                    <div>No list available.</div>
                  )}
                </div>
              </div>
              <div className="canWinSec">
                {/* <h3>What can I win?</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p> */}
                {this.state.pointsPerCategory.length > 0 && (
                  <div className="myPointsSec">
                    <h3>My Point’s</h3>
                    <div className="myPointsBlock">
                      {this.state.pointsPerCategory.map((data) => (
                        <div className="myPointsList">
                          <h4>{data.pointsPerCategory}</h4>
                          <p>{data.CategoryDetail[0].title}</p>
                        </div>
                      ))}
                      {/* <div className="myPointsList">
                      <h4>0</h4>
                      <p>Fill out a survey folowing a session</p>
                    </div>
                    <div className="myPointsList">
                      <h4>50</h4>
                      <p>Take a qaiz at the beauty &amp; glam</p>
                    </div>
                    <div className="myPointsList">
                      <h4>25</h4>
                      <p>Fill out the conference survey</p>
                    </div>
                    <div className="myPointsList">
                      <h4>50</h4>
                      <p>Visit sponsors and industry lounges</p>
                    </div> */}
                    </div>
                  </div>
                )}
                <div className="leaderboardSec">
                  <h3>
                    Leaderboard <span>(Updates every 15 minutes)</span>
                  </h3>
                  <div className="leaderboardBlock">
                    <ul>
                      {this.state.leaderboardList.length > 0 == false ? (
                        <div>No datat Found</div>
                      ) : (
                        this.state.leaderboardList.map((data) => {
                          console.log("data.userdetail=========",data.userDetail[0].first_name)
                          return (
                            <li>
                              <div className="leaderboardList">
                                <h4>
                                  {`${data.userDetail[0].first_name} 
                                  ${data.userDetail[0].last_name}
                                  .`}
                                </h4>
                                <div className="leadboardPoints">
                                  <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    className="bi bi-trophy"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                                    />
                                    <path d="M7 10h2v4H7v-4z" />
                                    <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                                  </svg>
                                  <span className="boardPoints">
                                    {data.totalPoint}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      )}
                      {/* <li>
                        <div className="leaderboardList">
                          <h4>Macatious A.</h4>
                          <div className="leadboardPoints">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-trophy"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                              <path
                                fillRule="evenodd"
                                d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                              />
                              <path d="M7 10h2v4H7v-4z" />
                              <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                            </svg>
                            <span className="boardPoints">20517</span>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="leaderboardList">
                          <h4>Jianneng L.</h4>
                          <div className="leadboardPoints">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-trophy"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                              <path
                                fillRule="evenodd"
                                d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                              />
                              <path d="M7 10h2v4H7v-4z" />
                              <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                            </svg>
                            <span className="boardPoints">20517</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="leaderboardList">
                          <h4>James V.</h4>
                          <div className="leadboardPoints">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-trophy"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                              <path
                                fillRule="evenodd"
                                d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                              />
                              <path d="M7 10h2v4H7v-4z" />
                              <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                            </svg>
                            <span className="boardPoints">20517</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="leaderboardList">
                          <h4>Victoria A.</h4>
                          <div className="leadboardPoints">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-trophy"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                              <path
                                fillRule="evenodd"
                                d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                              />
                              <path d="M7 10h2v4H7v-4z" />
                              <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                            </svg>
                            <span className="boardPoints">20517</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="leaderboardList">
                          <h4>Simson G.</h4>
                          <div className="leadboardPoints">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-trophy"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                              <path
                                fillRule="evenodd"
                                d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                              />
                              <path d="M7 10h2v4H7v-4z" />
                              <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                            </svg>
                            <span className="boardPoints">20517</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="leaderboardList">
                          <h4>Max C.</h4>
                          <div className="leadboardPoints">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-trophy"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
                              <path
                                fillRule="evenodd"
                                d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                              />
                              <path d="M7 10h2v4H7v-4z" />
                              <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
                            </svg>
                            <span className="boardPoints">20517</span>
                          </div>
                        </div>
                      </li>
                    */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}
        <Footer/>
      </div>
    );
  }
}

export default Quest;
