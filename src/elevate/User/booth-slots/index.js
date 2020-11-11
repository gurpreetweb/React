import React from "react";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as AGENDA_APIS from "../../../api/agenda/index";
import * as CONFIG from "../../../config.json";
import AgendaBlock from "./agendaBlock";

class BoothSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour_data: [],
      data: {},
      data_status: false,
      error: {},
      agendaPageNo: 1,
      agendaPageLimit: 5,
    };
  }
  componentDidMount = async () => {
    this.gethourData();
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
            this.props.match.params.sponsorId
        )
        .then((res) => {
          this.setState({ loading: false });

          if (res.data.status == 200) {
            this.setState(
              {
                hour_data: res.data.data.SponsorHourData,
                data_status: true,
              },
              () => {
                console.log("booth- 1--->,",res.data.sponsor_data);
                if(res.data.sponsor_data.space_code){
                  this.props.setVideoData(res.data.sponsor_data.space_code)
                }
              }
            );
          } else {
            this.setState(
              {
                errorMessage: res.data.message,
                data_status: true,
              },
              () => {
                console.log("booth- 21--->,", this.state);
              }
            );
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState(
            {
              errorMessage: "Something went wrong, please try again later!",
              data_status: true,
            },
            () => {
              console.log("booth---->,", this.state);
            }
          );
        });
    }
  };

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

  render() {
    return (
      <div id="inboothNav" className="eleDashAgenda">
        <ToastContainer />
        <div className="dashConBaner">
          <div className="eleConAge">
            <div className="dashConAgeTitle">
              <h2>IN - BOOTH PRESENTATIONS</h2>
            </div>
            <div className="dashAgendaSec">
              <div className="eleAgendaBox">
                {this.state.hour_data.length > 0 &&
                  this.state.hour_data.map((data) => (
                    <div className="eleAgendaText">
                      <div className="eleAgendaTitle">
                        <h3>{`${moment(data.conference_date).format(
                          "dddd MMMM DD, YYYY"
                        )}`}</h3>
                        {/* <h4>Live Stream Keynote - The Future of Virtual Events</h4>
                      <p>Transform the Attendee Experience</p> */}
                      </div>
                      <div className="agendaSponsorsAdd">
                        <div className="agendaSponsors">
                          {/* <h3>Sponsored By: AWS</h3> */}
                          <ul>
                            <li>
                              <span className="agenIcon">
                                <svg
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-stopwatch"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07A7.001 7.001 0 0 1 8 16 7 7 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3zm0 2.1a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 0 1 .5-.5z"
                                  />
                                </svg>
                              </span>
                              {`${moment(data.start_time, ["HH:mm"]).format(
                                "h:mm A"
                              )}`}{" "}
                              -{" "}
                              {`${moment(data.end_time, ["HH:mm"]).format(
                                "h:mm A"
                              )}`}{" "}
                              {data.time_zone.timezone}
                            </li>
                          </ul>
                        </div>
                        <div className="eleAgendaBtn">
                          <button 
                            type="button" 
                            className="addAgendaBtn"
                            onClick={() =>
                              this.checkForSpeakerAndTime(
                                data._id,
                                data.start_time,
                                data.end_time,
                                data.time_zone.timezone
                              )
                            }
                          >
                            Conference
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                {this.state.hour_data.length == 0 &&
                  this.state.data_status == true && (
                    <div className="no-data">
                      <p> There is no presentation office hours!</p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="eleConBanner schedulerBox">
            <div className="schedulerInnerBox"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoothSlot;
