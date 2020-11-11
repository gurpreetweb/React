import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as AGENDA_APIS from "../../../api/agenda/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";
import * as CONFIG from "../../../config.json";

const AgendaEvent = (props) => {
  const {
    agendaId,
    serialNo,
    title,
    time,
    tags,
    isFavourite,
    agenda_type,
    box_image,
    timezone,
    category,
    agendaStartTime,
    agendaEndTime,
    speakers
  } = props;
  const [fav_no, setFav_no] = useState("0");
  const [isFav, setIsFav] = useState(isFavourite);

  //console.log('111111111111')
  // console.log(isFavourite)

  useEffect(() => {
    //console.log('hello')
    //console.log(isFavourite)

    setIsFav(isFavourite);
    if (isFavourite == 1) {
      setFav_no("1");
    }
  }, [isFavourite]);

  const toggleFavourite = () => {
    let status = 0;
    if (isFav == 0) {
      status = 1;
    }

    AGENDA_APIS.markAgendaAsFavourite(agendaId, status).then((result) => {
      if (result.status === 200) {
        setIsFav(status);
        if (status == 1) {
          toast.success("Agenda added into favourite.");
        } else {
          toast.success("Agenda removed from favourite.");
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    });
  };

  const checkForSpeakerAndTime = async (
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
  const checkForJitsiSpeakerAndTime = async (
    title,
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
      if (speakers.includes(JSON.parse(localStorage.getItem("userData"))._id)) {
        window.open(
          "/webinar/" + agenda_id + "/" + title.replace(/ |-|\.|/g, ""),
          "_blank"
        );
      } else {
        window.open("/webinar-live/" + agendaId, "_blank");
      }
    } else if (total_count >= 80) {
      toast.error("Conference room is full. Please try againn.");
    } else {
      toast.error("You can enter in the conference during the scheduled time.");
    }
  };
  let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="liveNowSecInner">
      <ToastContainer />
      <div className="liveNowBlock agendaBlock">
        <div className="LiveSrNo">{serialNo}</div>
        <div className="agendaTimeImage">
          <div className="agendaTimeTag">
            <h2>
              <Link to={`/agenda-details/${agendaId}`}>{title}</Link>
            </h2>
            <div className="sessionTime">
              <span className="timeIcon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-clock"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </span>
              <span className="timeText">{time + " " + timezone}</span>
            </div>
            <div className="sessionTime">
              <span className="timeIcon">
                <img src="/images/icons/impactPin.png" alt="" />
              </span>
              <span className="timeText">{category}</span>
            </div>
            <div className="agendaTag">
              <ul className="agendaTagUl">
                {tags.map((tag) => {
                  return (
                    <li>
                      <a href="#">{tag}</a>
                    </li>
                  );
                })}

                <li className="followAgenda">
                  <span
                    className="agendaLike"
                    onClick={() => toggleFavourite()}
                  >
                    <i
                      id={isFav}
                      className={isFav == 1 ? "fa fa-heart" : "fa fa-heart-o"}
                    ></i>
                  </span>
                </li>
              </ul>
              {agenda_type == "video" && (
                <div
                  className="liveConfrence"
                  onClick={() =>
                    checkForSpeakerAndTime(
                      agendaId,
                      agendaStartTime,
                      agendaEndTime,
                      timezone
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
              )}
              {userData.role == "6" && agenda_type == "normal" && (
                <div
                  className="liveConfrence"
                  onClick={() =>
                    checkForJitsiSpeakerAndTime(
                      title,
                      agendaId,
                      agendaStartTime,
                      agendaEndTime,
                      timezone
                    )
                  }
                >
                  <a href="javascript:void(0)">
                    <span className="playIcon">
                      <i className="fa fa-play" />
                    </span>{" "}
                    Webinar
                  </a>
                </div>
              )}

              {userData.role == "3" && agenda_type == "normal" && (
                <div className="liveConfrence">
                  <a href={"/webinar-live/" + agendaId} target="_blank">
                    <span className="playIcon">
                      <i className="fa fa-play" />
                    </span>{" "}
                    Webinar
                  </a>
                </div>
              )}
              <ToastContainer />
            </div>
          </div>
          <div className="agendaImage">
            <img src={CONFIG.BASE_URL + "/uploads/" + box_image} alt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaEvent;
