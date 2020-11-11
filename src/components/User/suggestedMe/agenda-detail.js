import React, { useState, useEffect } from "react";
import moment from "moment";
import ReactPlayer from "react-player";
import CONFIG from "../../../config.json";
import * as AGENDA_APIS from "../../../api/agenda/index";

const AgendaDetails = (props) => {
  const [agendaData, setAgendaData] = useState({});
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    AGENDA_APIS.getAgendaById(props.match.params.agendaId).then((result) => {
      console.log("result---->", result);
      if (result.status === 200) {
        setAgendaData(result.data[0]);
        setVideoUrl(result.data[0].videos[0]);
      } else {
        console.log("eror===>", result.message);
      }
    });
  }, []);

  return (
    <div id="page-content-wrapper">
      <div className="innerContentBlock">
        {/* Start Inner Sec */}
        <div className="sitePageTitle">
          <h2>
            Agenda Details <span className="siteSubTitle"></span>
          </h2>
        </div>
        <div className="singleAgendaPage">
          <div className="singleAgenTitle">
            <div className="agendaTitle">
              <span className="agendaBackBtn">
                <a href="agenda.html">
                  <i className="fa fa-angle-left" />
                </a>
              </span>
              <h3 className="agendaTitleText">
                {agendaData.title}
                {/* TidyForms Informal Team Meeting */}
              </h3>
            </div>
            <div className="agendaFollow">
              <i className="fa fa-heart" />
              <span className="followText">Follow</span>
            </div>
          </div>
          <div className="agendaCheckSec">
            <label className="customCheckBox">
              <input type="checkbox" defaultChecked="checked" />
              <span className="checkmark" />
              <p className="checkText">
                Check into session and summit quest points
              </p>
              <span className="checkSubText">Enables session discussion</span>
            </label>
            <div className="singleAgenBtn">
              <a href="#">Ask me</a>
            </div>
          </div>
          <div className="singleAgenSec-4">
            <div className="singleAgenVdoChtSec">
              <div className="singleAgenVideo">
                  <ReactPlayer
                    url={`${CONFIG.BASE_URL}/uploads/${videoUrl}`}
                    controls="true"
                    style={{ width: "100%" }}
                    width="100%"
                    height="100%"
                    // light="/images/icons/videoPoster.jpg"
                  />

                
                {/* <video
                  width
                  poster="/images/icons/videoPoster.jpg"
                  className="dashboardVideoMedia"
                  id="ban_video"
                  controls={true}
                  preload="auto"
                >
                  <source
                  // src="http://13.59.30.160:7700/uploads/1597128297378-Big_Buck_Bunny_1080_10s_2MB.mp4"
                    src={`${CONFIG.BASE_URL}/uploads/${videoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </video> */}
                {/* <div className="videoControlBtn play-bt">
                  <img src="/images/icons/playBtn.png" alt />
                </div>
                <div
                  className="videoControlBtn pause-bt"
                  style={{ display: "none" }}
                >
                  <img src="/images/icons/pauseBtn.png" alt />
                </div>
                <div className="mute-bt" /> */}
              </div>
              <div className="singleAgenDes">
                <div className="singleAgcalTime">
                  <div className="singleAgeSche">
                    <span className="sinAgenCal">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-calendar2-check"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M14 2H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                      </svg>
                      {moment(parseInt(agendaData.agenda_date) * 1000).format(
                        "MMMM Do YYYY"
                      )}
                    </span>
                    <span className="sinAgenTime">
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
                      {`
                          ${moment(agendaData.start_time, ["HH:mm"]).format(
                            "h:mm A"
                          )}
                          -
                          ${moment(agendaData.end_time, ["HH:mm"]).format(
                            "h:mm A"
                          )}
                          `}
                    </span>
                  </div>
                  <div className="singleAgeLike">
                    <i className="fa fa-heart" />
                  </div>
                </div>
                <div className="singAgeDesText">
                  <p>{agendaData.description}</p>
                </div>
              </div>
            </div>
            <div className="singleAgenChat">
              <div className="singleAgenText">
                <h3>Event Attendees:</h3>
              </div>
              <div className="singleAgeAttenChat">
                <div className="profileChat">
                  <div className="profileChatImg">
                    <img src="/images/attendeeImg-1.jpg" alt />
                  </div>
                  <div className="profileChatText">
                    <h3 className="attendeeName">Weian Sheng</h3>
                    <p className="attendeeComp">Airbnb</p>
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
                    <img src="/images/attendeeImg-2.jpg" alt />
                  </div>
                  <div className="profileChatText">
                    <h3 className="attendeeName">Weian Sheng</h3>
                    <p className="attendeeComp">Airbnb</p>
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
                    <img src="/images/attendeeImg-3.jpg" alt />
                  </div>
                  <div className="profileChatText">
                    <h3 className="attendeeName">Weian Sheng</h3>
                    <p className="attendeeComp">Airbnb</p>
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
                    <img src="/images/attendeeImg-4.jpg" alt />
                  </div>
                  <div className="profileChatText">
                    <h3 className="attendeeName">Weian Sheng</h3>
                    <p className="attendeeComp">Airbnb</p>
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
            </div>
          </div>
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}
      </div>
    </div>
  );
};

export default AgendaDetails;
