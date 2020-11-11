import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import * as AGENDA_APIS from "../../../api/agenda/index";
import * as CONFIG from "../../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";
import ChatComponent from "../groupChat";
import Footer from "../../common/footer";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: {
        name: "",
        email: "",
        message: "",
      },
      sponsor_data: {},
      hour_data: [],
      data: {},
      data_status: false,
      error: {},
      agendaPageNo: 1,
      agendaPageLimit: 5,
    };
    this.getData = this.getData.bind(this);
    this.gethourData = this.gethourData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.gethourData();
  }

  gethourData = async () => {
    this.setState({ loading: true });
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

      await axios
        .get(
          CONFIG.BASE_URL + "/api/sponsor-hour-front/" + this.props.match.params.id
        )
        .then((res) => {
          this.setState({ loading: false });

          if (res.data.status == 200) {
            this.setState({
              hour_data: res.data.SponsorHourData,
              sponsor_data: res.data.sponsor_data,
              data_status: true,
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

  getData = async () => {
    var userData = JSON.parse(localStorage.getItem("userData"));

    axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;
    await axios
      .post(CONFIG.BASE_URL + "/api/video/" + this.props.match.params.id)
      .then((res) => {
        if (res.data.status == 200) {
          this.setState({ data: res.data.data, data_status: true });
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
        this.setState({
          errorMessage: "Something went wrong, please try again later!",
          data_status: true,
        });
      });
  };
  onSubmit(event) {
    console.log("helloooooooooooooo");
    var userData = JSON.parse(localStorage.getItem("userData"));
    this.setState({ error: {} });

    if (!this.state.form_data.name) {
      this.setState({ error: { name: "Name field is required!" } });
      //createNotification('error','Please fill all fields!','');
    } else if (!this.state.form_data.email) {
      this.setState({ error: { email: "Email field is required!" } });
      //createNotification('error','Please fill all fields!','');
    } else if (!this.state.form_data.message) {
      this.setState({ error: { message: "Message field is required!" } });
      //createNotification('error','Please fill all fields!','');
    } else {
      if (typeof this.state.form_data.email !== "undefined") {
        let lastAtPos = this.state.form_data.email.lastIndexOf("@");
        let lastDotPos = this.state.form_data.email.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            this.state.form_data.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            this.state.form_data.email.length - lastDotPos > 2
          )
        ) {
          this.setState({ error: { email: "Please enter a valid email!" } });
        } else {
          this.setState({ loading: true });

          var data = {
            user_id: userData._id,
            sponsor_id: this.state.data._id,
            name: this.state.form_data.name,
            email: this.state.form_data.email,
            message: this.state.form_data.message,
          };
          axios
            .post(CONFIG.BASE_URL + "/api/apointment/create", data)
            .then((res) => {
              this.setState({ loading: false });

              if (res.data.status == 200) {
                this.setState({
                  form_data: { name: "", email: "", message: "" },
                });
                this.setState({ message: res.data.message });
                toast.success(res.data.message);
              } else if (res.data.status == 500) {
                this.setState({
                  errorMessage: "Something went wrong, please try again later!",
                });
                toast.error("Something went wrong, please try again later!");
              } else {
                toast.error(res.data.message);
                this.setState({ errorMessage: res.data.message });
              }
            })
            .catch((err) => {
              this.setState({ loading: false });
              this.setState({
                errorMessage: "Something went wrong, please try again later!",
              });
            });
        }
      }
    }
  }

  onChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.form_data[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {}, message: "", errorMessage: "" });
    //console.log(this.state.error.inputName);
  }

  checkForSpeakerAndTime = async (
    id,
    agenda_starttime,
    agenda_endtime,
    timezone
  ) => {
    var participant_count = await AGENDA_APIS.getSponsorParticipantCount(id);
    var total_count = !participant_count.data
      ? 1
      : parseInt(participant_count.data.number_of_participant);
    if (
      moment().tz(timezone).format("HH:mm") >= agenda_starttime &&
      moment().tz(timezone).format("HH:mm") <= agenda_endtime &&
      total_count < 80
    ) {
      window.open("/sponsor-conference/" + id, "_blank");
    } else if (total_count >= 80) {
      toast.error("Conference room is full. Please try again.");
    } else {
      toast.error("You can enter in the conference during the scheduled time.");
    }
  };
  checkdata() {
    toast.error("You can enter in the presentation during the scheduled time.");
  }

  render() {
    var cnt = 0;
    var presentation_btn =
      this.state.hour_data.length > 0 &&
      this.state.hour_data.map((data) => {
        if (
          moment().tz(data.time_zone.timezone).format("HH:mm") >=
            data.start_time &&
          moment().tz(data.time_zone.timezone).format("HH:mm") <= data.end_time
        ) {
          cnt++;
          return (
            <div
              className="presentationBtnSec"
              onClick={() =>
                this.checkForSpeakerAndTime(
                  data._id,
                  data.start_time,
                  data.end_time,
                  data.time_zone.timezone
                )
              }
            >
              <button type="button" className="presentationBtn">
                Click here to join presentation
              </button>
            </div>
          );
        }
      });
    console.log("cntttttttttttttttttttttttttttttt");
    console.log(cnt);
    if (cnt == 0) {
      presentation_btn = (
        <div
          className="presentationBtnSec present_grey"
          onClick={() => this.checkdata()}
        >
          <button type="button" className="presentationBtn">
            Click here to join presentation
          </button>
        </div>
      );
    }
    return (
      <div id="page-content-wrapper">
        <ToastContainer />
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>{this.state.data.sponsor_name}</h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="brandInnerPage">
            <div className="brand360Video">
              {this.state.sponsor_data.lounge_type == "360_space" && (
                <iframe
                  width="100%"
                  src={this.state.sponsor_data.space_code}
                  style={{ height: "calc(100vh - 7px)" }}
                />
              )}

              {/* <img src="/images/360Img.jpg" alt="" /> */}
            </div>
            <div className="hideFooter">
              {this.state.sponsor_data.lounge_type != "360_space" && (
                <ChatComponent />
              )}
            </div>
            <div className="brandOfficeHrsForm">
              <div className="officeHours">
                <h2 className="officehoursTitle">
                  Conference booth office hours
                </h2>
                {this.state.hour_data.length > 0 &&
                  this.state.hour_data.map((data) => (
                    <div className="bgOfficalHour">
                      <div className="weekdaytimeing">
                        <div className="sessionTimeHour">
                          <h3>{`${moment(data.conference_date).format(
                            "dddd MMMM DD, YYYY"
                          )}`}</h3>
                          <p>
                            {`${moment(data.start_time, ["HH:mm"]).format(
                              "h:mm A"
                            )}`}{" "}
                            -{" "}
                            {`${moment(data.end_time, ["HH:mm"]).format(
                              "h:mm A"
                            )}`}{" "}
                            {data.time_zone.timezone}
                          </p>
                        </div>
                        {/* <div className="sessionTimeFollow"><i className="fa fa-heart" aria-hidden="true" /></div> */}
                      </div>
                    </div>
                  ))}
                {this.state.hour_data.length == 0 &&
                  this.state.data_status == true && (
                    <div className="no-data">
                      <p> There is no presentation office hours!</p>
                    </div>
                  )}

                {this.state.hour_data.length > 0 && presentation_btn}
              </div>
              <div className="officeForm">
                <div className="brandAppointment">
                  <h3>Set up an appointment</h3>
                  <div className="formField">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={this.state.form_data.name}
                        name="name"
                        id="name"
                        onChange={this.onChange.bind(this)}
                      />
                      <span className="form-error">
                        {this.state.error.name}
                      </span>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={this.state.form_data.email}
                        name="email"
                        id="email"
                        onChange={this.onChange.bind(this)}
                      />
                      <span className="form-error">
                        {this.state.error.email}
                      </span>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows={5}
                        id="comment"
                        placeholder="Message"
                        name="message"
                        id="message"
                        value={this.state.form_data.message}
                        onChange={this.onChange.bind(this)}
                      />
                      <span className="form-error">
                        {this.state.error.message}
                      </span>
                    </div>
                    <div className="getTouchSec">
                      <button
                        type="button"
                        className="getTouchBtn"
                        onClick={this.onSubmit}
                      >
                        Get in Touch
                      </button>
                    </div>
                  </div>
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
  }
}

export default Video;
