import React, { Component, useState, useEffect } from "react";
import FeaturedEvent from "./featuredEvent";
import ExpoNetwork from "./expoNetwork";
import Exhibitors from "./exhibitors";
import axios from "axios";
import * as CONFIG from "../../../config.json";
import moment from "moment";
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Footer from "../../common/footer";

class Expo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_status: false,
      data: [],
      sponser_data: [],
      error: {},
      message: "",
      errorMessage: "",
      agendaPageNo: 1,
      agendaPageLimit: 2,
      loading: false,
      activePage: 1,
      totalPage: 0,
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var userData = JSON.parse(localStorage.getItem("userData"));
    var event_id = localStorage.getItem("eventId");
    axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

    let data = {
      event_id: localStorage.getItem("eventId"),
      page: this.state.activePage,
      user_id: userData._id,
      limit: this.state.agendaPageLimit,
    };
    await axios
      .post(CONFIG.BASE_URL + "/api/expo/" + event_id, data)
      .then((res) => {
        this.setState({ loading: false });

        if (res.data.status == 200) {
          this.setState({
            data: res.data.data,
            sponser_data: res.data.sponser_data,
            totalPage: res.data.page,
            data_status: true,
          });
        } else if (res.data.status == 500) {
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          });
        } else {
          this.setState({ errorMessage: res.data.message });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({
          errorMessage: "Something went wrong, please try again later!",
          data_status: true,
        });
      });
  };

  JoinGroup(sponsor_id, lounge_title) {
    var self = this;
    var GUID = sponsor_id;
    var groupName = lounge_title;
    var groupType = CometChat.GROUP_TYPE.PUBLIC;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(
      (group) => {
        console.log("Group created successfully:", group);
        self.props.history.push(`/group-chat`);
      },
      (error) => {
        console.log("Group creation failed with exception:", error);
        self.props.history.push(`/group-chat`);
      }
    );
  }

  handleNextPage = async () => {
    console.log("handleNextpage invoked");
    this.setState(
      {
        activePage: this.state.activePage + 1,
      },
      () => {
        this.getData();
      }
    );
  };

  handlePrePage = async () => {
    console.log("handlePrepage invoked");
    this.setState(
      {
        activePage: this.state.activePage - 1,
      },
      () => {
        this.getData();
      }
    );
  };

  handlePageChange = async (pageNo) => {
    console.log("handlePrepage invoked");
    this.setState(
      {
        activePage: pageNo,
      },
      () => {
        this.getData();
      }
    );
  };

  render() {
    const { totalPage, activePage } = this.state;

    console.log("dsadadsa");
    console.log(this.state.data);

    return (
      <div id="page-content-wrapper">
        <Loader
          className="circle_cover"
          type="Rings"
          color="#2b2497"
          height="100"
          width="100"
          visible={this.state.loading}
        />
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>
              Expo{" "}
              <span className="siteSubTitle">
                Explore featured talks, networking opportunties, advisory
                lounge, sponsor booths and more!
              </span>
            </h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="devExpoPage">
            <div className="expoFeatureNetwork">
              <div className="expoFeature">
                <h3 className="expoSecTtile">Featured</h3>
                <div className="expoSessions">
                  {this.state.data.map((agenda, index) => {
                    return (
                      <FeaturedEvent
                        serialNo={index + 1}
                        title={agenda.title}
                        agenda_date={agenda.agenda_date}
                        box_image={agenda.box_image}
                        timezone={agenda.time_zones.timezone}
                        category={agenda.agenda_categories.category}
                        time={`
                          ${moment(agenda.start_time, ["HH:mm"]).format(
                            "h:mm A"
                          )}
                          -
                          ${moment(agenda.end_time, ["HH:mm"]).format("h:mm A")}
                          `}
                        agendaId={agenda._id}
                        agenda_type={agenda.agenda_type}
                        description={agenda.description}
                        tags={agenda.tags}
                        agendaStartTime={agenda.start_time}
                        agendaEndTime={agenda.end_time}
                        isFavourite={agenda.is_favourite.length > 0 ? 1 : 0}
                        speakers={agenda.speakers}
                      />
                    );
                  })}
                  {totalPage > 0 == true && (
                    <div className="pagination">
                      <li
                        className="page-item"
                        onClick={() => {
                          if (activePage > 1) {
                            this.handlePrePage();
                          }
                        }}
                      >
                        <span className="page-link">Pre</span>
                      </li>
                      {Array.apply(null, Array(totalPage)).map((x, i) => {
                        return (
                          <li
                            className={`page-item ${
                              this.state.activePage == i + 1 ? "active" : ""
                            }`}
                            onClick={() => {
                              this.handlePageChange(i + 1);
                            }}
                          >
                            <span className="page-link">{i + 1}</span>
                          </li>
                        );
                      })}
                      <li
                        onClick={() => {
                          if (activePage < totalPage) {
                            this.handleNextPage();
                          }
                        }}
                      >
                        <span className="page-link">Next</span>
                      </li>
                    </div>
                  )}
                  {this.state.data.length == "0" &&
                    this.state.data_status == true && (
                      <div class="no-data">
                        <p> There is no featured agenda!</p>
                      </div>
                    )}
                </div>
              </div>
              {/* {this.state.data && <FeaturedEvent featured_data={this.state.data} data_status={this.state.data_status}/>} */}
              <div className="expoNetwork">
                <h3 className="expoSecTtile">
                  Industry Lounges and Networking
                </h3>
                <div className="networkBtn">
                  <ul>
                    {this.state.sponser_data.map((data, index) => (
                      <li>
                        {data.lounge_type == "360_space" ? (
                          <Link to={"/sponsor/video/" + data._id}>
                            {data.lounge_title}
                          </Link>
                        ) : (
                          <a
                            onClick={this.JoinGroup.bind(
                              this,
                              data._id,
                              data.lounge_title
                            )}
                            href="javascript:void(0)"
                          >
                            {data.lounge_title}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {this.state.sponser_data && (
              <Exhibitors sponser_data={this.state.sponser_data} />
            )}
          </div>
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}\
        <Footer />
      </div>
    );
  }
}

export default Expo;
