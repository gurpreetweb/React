import React from "react";
// import moment from "moment";
import moment from "moment-timezone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import * as AGENDA_APIS from "../../../api/agenda/index";
class AgendaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: {} };
    console.log("this.props1", this.props);
    this.checkForSpeakerAndTime = this.checkForSpeakerAndTime.bind(this);
  }

  checkForSpeakerAndTime = async (
    agenda_id,
    agenda_starttime,
    agenda_endtime,
    timezone
  ) => {
    //  const current_time = moment().format('HH:mm');
    var participant_count = await AGENDA_APIS.getParticipantCount(agenda_id);
    var total_count =
      typeof participant_count.data == "undefined"
        ? 1
        : parseInt(participant_count.data.number_of_participant);
    if (
      moment().tz(timezone).format("HH:mm") >= agenda_starttime &&
      moment().tz(timezone).format("HH:mm") <= agenda_endtime &&
      total_count < 80
    ) {
      console.log("11111111111111111");
      window.open("/conference/" + agenda_id, "_blank");
    } else if (total_count >= 80) {
      console.log("22222222222222222222");
      toast.error("Conference room is full. Please try again.");
      toast.error("Conference room is full. Please try again.");
    } else {
      console.log("3333333333333");
      toast.error("You can enter in the conference during the scheduled time.");
      toast.error("You can enter in the conference during the scheduled time.");
    }
  };

  checkForJitsiSpeakerAndTime = async (
    title,
    agenda_id,
    agenda_starttime,
    agenda_endtime,
    timezone
  ) => {
    var participant_count = await AGENDA_APIS.getParticipantCount(agenda_id);
    var total_count =
      typeof participant_count.data == "undefined"
        ? 1
        : parseInt(participant_count.data.number_of_participant);
    if (
      moment().tz(timezone).format("HH:mm") >= agenda_starttime &&
      moment().tz(timezone).format("HH:mm") <= agenda_endtime &&
      total_count < 80
    ) {
      if (
        this.props.speakers.includes(
          JSON.parse(localStorage.getItem("userData"))._id
        )
      ) {
        window.open(
          "/webinar/" + agenda_id + "/" + title.replace(/ |-|\.|/g, ""),
          "_blank"
        );
      } else {
        window.open("/webinar-live/" + agenda_id, "_blank");
      }
    } else if (total_count >= 80) {
      toast.error("Conference room is full. Please try againn.");
      toast.error("Conference room is full. Please try again.");
    } else {
      toast.error("You can enter in the conference during the scheduled time.");
      toast.error("You can enter in the conference during the scheduled time.");
    }
  };
  componentDidMount() {
    this.setState({ userData: JSON.parse(localStorage.getItem("userData")) });
  }

  render() {
    return (
      <>
        <ToastContainer />
        <div className="eleAgendaText">
          <div className="eleAgendaTitle">
            <h3>{this.props.startDate}</h3>
            <h4>
              {" "}
              <Link to={`/agenda-details/${this.props.agendaId}`}>
                {this.props.title}
              </Link>
            </h4>
            <p>{this.props.description.substr(0, 100) + "..."}</p>
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
                  {`${moment(this.props.startTime, ["HH:mm"]).format(
                    "h:mm A"
                  )}`}{" "}
                  -{" "}
                  {`${moment(this.props.endTime, ["HH:mm"]).format("h:mm A")}`}{" "}
                  {this.props.timezone}
                </li>
                <li>
                  <span className="agenIcon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-tag-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                      />
                    </svg>
                  </span>
                  {this.props.tags.map((tag, index) => {
                    if (index + 1 < this.props.tags.length) {
                      return tag + " " + "|" + " ";
                    } else {
                      return tag;
                    }
                  })}
                  {/* General Session */}
                </li>
              </ul>
            </div>
            <div className="eleAgendaBtn">
              {this.props.agendaType == "video" && (
                <button
                  type="button"
                  className="addAgendaBtn"
                  onClick={() =>
                    this.checkForSpeakerAndTime(
                      this.props.agendaId,
                      this.props.startTime,
                      this.props.endTime,
                      this.props.timezone
                    )
                  }
                >
                  Conference
                </button>
              )}

              {this.state.userData.role == "6" &&
                this.props.agendaType == "normal" && (
                  <button
                    type="button"
                    className="addAgendaBtn"
                    onClick={() =>
                      this.checkForJitsiSpeakerAndTime(
                        this.props.title,
                        this.props.agendaId,
                        this.props.startTime,
                        this.props.endTime,
                        this.props.timezone
                      )
                    }
                  >
                    Webinar
                  </button>
                )}

              {this.state.userData.role == "3" &&
                this.props.agendaType == "normal" && (
                  <a
                    href={"/webinar-live/" + this.props.agendaId}
                    target="_blank"
                  >
                    <button type="button" className="addAgendaBtn">
                      Webinar
                    </button>{" "}
                  </a>
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AgendaBlock;
