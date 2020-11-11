import React, { Component } from "react";
// import {
// Link,
// Redirect,
// } from "react-router-dom";
import axios from "axios";
import * as AGENDA_APIS from "../../../api/agenda/index";
import * as CONFIG from "../../../config.json";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { CometChat } from "@cometchat-pro/chat";

class Booth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: {},
      edit_data: [],
      timezone_data: [],
      hour_data: [],
      message: "",
      errorMessage: "",
      data_status: false,
      isActive: false,
      isActiveNew: false,
      loading: false,
      activePage: 1,
      totalPage: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
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

  onChangeNew(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.edit_data[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {}, message: "", errorMessage: "" });
    //console.log(this.state.error.inputName);
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ error: {} });
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      if (!this.state.data.conference_date) {
        this.setState({
          error: { conference_date: "Date field is required!" },
        });
        //createNotification('error','Please fill all fields!','');
      } else if (!this.state.data.start_time) {
        this.setState({
          error: { start_time: "Start time field is required!" },
        });
        //createNotification('error','Please fill all fields!','');
      } else if (!this.state.data.end_time) {
        this.setState({ error: { end_time: "End time field is required!" } });
        //createNotification('error','Please fill all fields!','');
      } else if (this.state.data.end_time <= this.state.data.start_time) {
        this.setState({
          error: { end_time: "End time must be greater than start time!" },
        });
        //createNotification('error','Please fill all fields!','');
      } else if (!this.state.data.time_zone) {
        this.setState({ error: { time_zone: "Timezone field is required!" } });
        //createNotification('error','Please fill all fields!','');
      } else {
        this.setState({ loading: true });

        var data = {
          event: localStorage.getItem("eventId"),
          sponsor_id: userData._id,
          conference_date: this.state.data.conference_date,
          start_time: this.state.data.start_time,
          end_time: this.state.data.end_time,
          time_zone: this.state.data.time_zone,
        };
        axios
          .post(CONFIG.BASE_URL + "/api/hour/create", data)
          .then((res) => {
            if (res.data.status == 200) {
              this.gethourData();
              this.setState({ isActive: !this.state.isActive });
              this.setState({
                data: {
                  conference_date: "",
                  start_time: "",
                  end_time: "",
                  time_zone: "",
                },
              });
              toast.success("Slot Added Successfully");
            } else {
              this.setState({ errorMessage: res.data.message });
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            this.setState({ loading: false });
            this.setState({
              errorMessage: "Something went wrong, please try again later!",
            });
            toast.error("Something went wrong, please try again later");
          });
      }
    }
  }
  onSubmitEdit(event) {
    event.preventDefault();
    this.setState({ error: {} });
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      if (!this.state.edit_data.conference_date) {
        this.setState({
          error: { conference_date: "Date field is required!" },
        });
        //createNotification('error','Please fill all fields!','');
      } else if (!this.state.edit_data.start_time) {
        this.setState({
          error: { start_time: "Start time field is required!" },
        });
        //createNotification('error','Please fill all fields!','');
      } else if (!this.state.edit_data.end_time) {
        this.setState({ error: { end_time: "End time field is required!" } });
        //createNotification('error','Please fill all fields!','');
      } else if (
        this.state.edit_data.end_time <= this.state.edit_data.start_time
      ) {
        this.setState({
          error: { end_time: "End time must be greater than start time!" },
        });
        //createNotification('error','Please fill all fields!','');
      } else if (!this.state.edit_data.time_zone) {
        this.setState({ error: { time_zone: "Timezone field is required!" } });
        //createNotification('error','Please fill all fields!','');
      } else {
        this.setState({ loading: true });

        var data = {
          conference_date: this.state.edit_data.conference_date,
          start_time: this.state.edit_data.start_time,
          end_time: this.state.edit_data.end_time,
          time_zone: this.state.edit_data.time_zone,
        };
        axios
          .post(
            CONFIG.BASE_URL + "/api/update/hour/" + this.state.edit_data._id,
            data
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.gethourData();
              this.setState({ isActiveNew: !this.state.isActiveNew });

              toast.success("Slot Updated Successfully");
            } else {
              this.setState({ errorMessage: res.data.message });
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            this.setState({ loading: false });
            this.setState({
              errorMessage: "Something went wrong, please try again later!",
            });
            toast.error("Something went wrong, please try again later.");
          });
      }
    }
  }

  onOpen() {
    this.setState({
      isActive: !this.state.isActive,
      error: {},
      message: "",
      errorMessage: "",
    });
  }

  onOpenNew() {
    this.setState({
      isActiveNew: !this.state.isActiveNew,
      error: {},
      message: "",
      errorMessage: "",
    });
  }
  JoinGroup = () => {
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.lounge_type == "chat_room") {
      var self = this;
      var GUID = userData._id;
      var groupName = userData.lounge_title;
      var groupType = CometChat.GROUP_TYPE.PUBLIC;
      var password = "";

      var group = new CometChat.Group(GUID, groupName, groupType, password);

      CometChat.createGroup(group).then(
        (group) => {
          console.log("Group created successfully:", group);
        },
        (error) => {
          console.log("Group creation failed with exception:", error);
        }
      );
    }
  };

  componentDidMount() {
    this.getData();
    this.gethourData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

      await axios
        .get(CONFIG.BASE_URL + "/api/timezones")
        .then((res) => {
          this.setState({ loading: false });

          if (res.data.status == 200) {
            this.setState({ timezone_data: res.data.data, data_status: true });
          } else {
            this.setState({
              errorMessage: res.data.message,
              data_status: true,
            });
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          });
        });
    }
  };

  gethourData = async () => {
    this.setState({ loading: true });
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

      await axios
        .get(
          CONFIG.BASE_URL +
            "/api/sponsor-hour/" +
            userData._id +
            "?pageNo=" +
            this.state.activePage
        )
        .then((res) => {
          this.setState({ loading: false });

          if (res.data.status == 200) {
            this.setState({
              hour_data: res.data.data.SponsorHourData,
              data_status: true,
              totalPage: res.data.data.totalPage,
            });
          } else {
            this.setState({
              errorMessage: res.data.message,
              data_status: true,
            });
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          });
        });
    }
  };
  onChangeEdit(id) {
    this.setState({ error: {}, message: "", errorMessage: "" });
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

      axios
        .get(CONFIG.BASE_URL + "/api/edit/hour/" + id)
        .then((res) => {
          this.setState({ loading: false });

          if (res.data.status == 200) {
            this.setState({ edit_data: res.data.data });
          } else {
            this.setState({ errorMessage: res.data.message });
          }
        })
        .catch((err) => {
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
          });
        });
    }
    this.setState({ isActiveNew: !this.state.isActiveNew });
  }

  handleNextPage = async () => {
    console.log("handleNextpage invoked");
    this.setState(
      {
        activePage: this.state.activePage + 1,
      },
      () => {
        this.gethourData();
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
        this.gethourData();
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
        this.gethourData();
      }
    );
  };

  handleDelete = async (hourId) => {
    console.log("handleDelete  invoked -> id", hourId);
    try {
      const response = await axios.get(
        `${CONFIG.BASE_URL}/api/hour/delete/${hourId}`
      );

      if (response.data.status == 200) {
        toast.success("Slot Deleted Successfully");
        this.gethourData();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("error.message--------", error.message);
      toast.error("Something went wron. Try again later.");
    }
  };

  checkForSpeakerAndTime = async (
    id,
    agenda_starttime,
    agenda_endtime,
    timezone,
    agenda_date
  ) => {
    var participant_count = await AGENDA_APIS.getSponsorParticipantCount(id);
    var total_count = !participant_count.data
      ? 1
      : parseInt(participant_count.data.number_of_participant);
      var cur_date = moment().tz(timezone).format("DD-MM-YYYY");
    var agendaDate = moment.unix(agenda_date).format("DD-MM-YYYY");

    if (cur_date == agendaDate) {
    if (
      moment().tz(timezone).format("HH:mm") >= agenda_starttime &&
      moment().tz(timezone).format("HH:mm") <= agenda_endtime &&
      total_count < 80
    ) {
      window.open("/sponsor-conference/" + id, "_blank");
    } else if (total_count >= 80) {
      toast.error("Webinar room is full. Please try again.");
    } else {
      toast.error("You can enter in the conference during the scheduled time.");
    }
  } else {
    console.log("sas");
    toast.error("You can enter in the conference during the scheduled time.");
  }
  };

  render() {
    const { totalPage, activePage } = this.state;
    return (
      <>
        <ToastContainer />
        <div id="page-content-wrapper">
          <div className="innerContentBlock">
            {/* Start Page Section */}
            <div className="sponsorDashboard">
              <div className="sitePageTitle">
                <h2>Conference Booth Slots</h2>
                <div className="addConference">
                  <button
                    type="button"
                    className="btn btn-primary addConferenceBtn"
                    onClick={this.onOpen.bind(this)}
                  >
                    Add Hour Slot{" "}
                  </button>
                </div>
              </div>
              <div className="conferenceListing">
                <div className="speakerEventLising">
                  <h2>Office hours </h2>
                  <div className="speakerListBox">
                    <div className="agendaInner">
                      {/* <ul className="nav nav-tabs agendaTab">
                      <li className><a data-toggle="tab" href="#agenda1" className="active">Monday, 25 June</a></li>
                      <li><a data-toggle="tab" href="#agenda2">Wednesday, 27 June</a></li>
                      <li><a data-toggle="tab" href="#agenda3">Thursday, 28 June</a></li>
                      <li><a data-toggle="tab" href="#agenda4">Saturday, 1 July</a></li>
                    </ul> */}
                      <div className="tab-content agendaContent speakerEventContent">
                        <div id="agenda1" className="tab-pane fade in active">
                          <div className="bgOfficalHourBox">
                            {this.state.hour_data.map((data) => (
                              <div className="bgOfficalHour">
                                <div className="weekdaytimeing">
                                  <div className="sessionTimeHour">
                                    <h3>{`${moment(data.conference_date).format(
                                      "dddd MMMM DD, YYYY"
                                    )}`}</h3>
                                    <p>
                                      {`${moment(data.start_time, [
                                        "HH:mm",
                                      ]).format("h:mm A")}`}{" "}
                                      -{" "}
                                      {`${moment(data.end_time, [
                                        "HH:mm",
                                      ]).format("h:mm A")}`}{" "}
                                      {data.time_zone.timezone}
                                    </p>
                                  </div>
                                  <div
                                    className="liveConfrence sponsor_panel"
                                    onClick={() =>
                                      this.checkForSpeakerAndTime(
                                        data._id,
                                        data.start_time,
                                        data.end_time,
                                        data.time_zone.timezone,
                                        data.conference_date
                                      )
                                    }
                                  >
                                    <a href="javascript:void(0)">
                                      <span className="playIcon">
                                        <i className="fa fa-play" />
                                      </span>{" "}
                                      Conference
                                    </a>
                                  </div>
                                  <div className="sessionTimeFollow">
                                    <ul className="speakerControl">
                                      <li>
                                        <button
                                          type="button"
                                          className="contIco"
                                          onClick={this.onChangeEdit.bind(
                                            this,
                                            data._id
                                          )}
                                        >
                                          <i
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="button"
                                          className="contIco"
                                          onClick={() => {
                                            this.handleDelete(data._id);
                                          }}
                                        >
                                          <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}

{this.state.hour_data.length ==0 && <div class="no-data">
                      <p> There is no Office hour!</p>
                    </div>}
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
                                {Array.apply(null, Array(totalPage)).map(
                                  (x, i) => {
                                    return (
                                      <li
                                        className={`page-item ${
                                          this.state.activePage == i + 1
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          this.handlePageChange(i + 1);
                                        }}
                                      >
                                        <span className="page-link">
                                          {i + 1}
                                        </span>
                                      </li>
                                    );
                                  }
                                )}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Page Section */}
          </div>
        </div>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.isActive}
          contentLabel="Example Modal"
          className="addNotesModel addNotesModel-2"
        >
          <div className="addNotesBody">
            <button className="closeBtn" onClick={this.onOpen.bind(this)}>
              +
            </button>
            <h1>Add Hour Slot</h1>
            <div className="add-hour-slot">
              <label>Conference Date</label>
              <input
                type="date"
                min={ new Date().toISOString().split("T")[0]}
                className="form-control"
                placeholder="Enter Conference date"
                name="conference_date"
                value={this.state.data.conference_date}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <span className="form-error">
              {this.state.error.conference_date}
            </span>

            <div className="add-hour-slot">
              <label>Start Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter Start time"
                name="start_time"
                value={this.state.data.start_time}
                onChange={this.onChange.bind(this)}
              />
              <span className="form-error">{this.state.error.start_time}</span>
            </div>

            <div className="add-hour-slot">
              <label>End Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter End time"
                name="end_time"
                value={this.state.data.end_time}
                onChange={this.onChange.bind(this)}
              />
              <span className="form-error">{this.state.error.end_time}</span>
            </div>

            <div className="add-hour-slot">
              <label>Timezone</label>
              <select
                className="form-control"
                name="time_zone"
                value={this.state.data.time_zone}
                onChange={this.onChange.bind(this)}
              >
                <option value="">Select Timezone</option>
                {this.state.timezone_data.map((data) => (
                  <option value={data._id}>{data.timezone}</option>
                ))}
              </select>
              <span className="form-error">{this.state.error.time_zone}</span>
            </div>
            <div className="submitNotes">
              <button className="submitNotsBtn" onClick={this.onSubmit}>
                Save Slot
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.isActiveNew}
          contentLabel="Example Modal"
          className="addNotesModel addNotesModel-2"
        >
          <div className="addNotesBody ">
            <button className="closeBtn" onClick={this.onOpenNew.bind(this)}>
              +
            </button>
            <h1>Edit Hour Slot</h1>

            <div className="add-hour-slot">
              <label>Conference Date</label>
              <input
                type="date"
                min={ new Date().toISOString().split("T")[0]}
                className="form-control"
                placeholder="Enter Conference date"
                name="conference_date"
                value={this.state.edit_data.conference_date}
                onChange={this.onChangeNew.bind(this)}
              />
              <span className="form-error">
                {this.state.error.conference_date}
              </span>
            </div>

            <div className="add-hour-slot">
              <label>Stat Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter Start time"
                name="start_time"
                value={this.state.edit_data.start_time}
                onChange={this.onChangeNew.bind(this)}
              />
              <span className="form-error">{this.state.error.start_time}</span>
            </div>

            <div className="add-hour-slot">
              <label>End Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter End time"
                name="end_time"
                value={this.state.edit_data.end_time}
                onChange={this.onChangeNew.bind(this)}
              />
              <span className="form-error">{this.state.error.end_time}</span>
            </div>

            <div className="add-hour-slot">
              <label>Timezone</label>
              <select
                className="form-control"
                name="time_zone"
                value={this.state.edit_data.time_zone}
                onChange={this.onChangeNew.bind(this)}
              >
                <option value="">Select Timezone</option>
                {this.state.timezone_data.map((data) => (
                  <option value={data._id}>{data.timezone}</option>
                ))}
              </select>
              <span className="form-error">{this.state.error.time_zone}</span>
            </div>
            <div className="submitNotes">
              <button className="submitNotsBtn" onClick={this.onSubmitEdit}>
                Update Slot
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Booth;
