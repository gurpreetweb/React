import React from "react";
// import moment from "moment";
import moment from "moment-timezone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as AGENDA_APIS from "../../../api/agenda/index";
class AgendaBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    console.log("this.props1",this.props)
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
      window.open("/conference/" + agenda_id, "_blank");
    } else if (total_count >= 80) {
      toast.error("Conference room is full. Please try again.");
    } else {
      toast.error("You can enter in the conference during the scheduled time.");
    }
  };

  render() {
    return (
      <div className="eleAgendaText">
        <ToastContainer />

        <div className="eleAgendaTitle">
          <h3>{this.props.startDate}</h3>
          <h4>{this.props.title}</h4>
          <p>{this.props.description}</p>
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
                {this.props.startTime} - {this.props.endTime} AM
              </li>
              <li>
                <span className="agenIcon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-geo-alt"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
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
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AgendaBlock;
