import React, { useState, useEffect } from "react";
import moment from "moment";
import ReactPlayer from "react-player";
import CONFIG from "../../../config.json";
import * as AGENDA_APIS from "../../../api/agenda/index";
import {
  Link,
} from "react-router-dom";
const AgendaDetails = (props) => {
  const [agendaData, setAgendaData] = useState({time_zone:{}});
  const [attendees, setAttendeesData] = useState([{user:{}}]);
  const [videoUrl, setVideoUrl] = useState("");

  window.scrollTo(0, 0)

  useEffect(() => {
    AGENDA_APIS.getAgendaById(props.match.params.agendaId).then((result) => {
      console.log("result---->", result);
      if (result.status === 200) {
        setAgendaData(result.data);
        setAttendeesData(result.attendees);
        setVideoUrl(result.data.videos[0]);
      } else {
        console.log("eror===>", result.message);
      }
    });
  }, []);

  return (
    <div>
    <div className="siteHeader">
      <div className="siteInnerHeader">
        <nav className="navbar navbar-expand-lg">
          <div className="headLeftContent">
            <div className="headerLogo">
              <a href="#"><img src="/elevate-theme/images/elevateLogo.png" alt="" /></a>
            </div>
          </div>
          <div className="headerRightContant" id="headProfile">
            <div className="headerSocial">
              <ul>
                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                <li><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
                <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
              </ul>
            </div>
            {/* <button className="btn btn-primary sideBarToggle" id="menu-toggle">Toggle Menu</button>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <span className="rightToggleHead"><a className="headerToggleMenu"><span className="headToggle" /></a></span> */}
          </div>
        </nav>
      </div>
    </div>
    <div className="siteContainer">
      <div className="d-flex contentSection" id="wrapper">
        {/* <span class="secTopRightBdr"></span> */}
        <div className="elevateFullWidth">
          {/* <div class="elevateBackBtn">
        <a href="#"><img src="images/backBtn.png" alt="" />Back</a>
      </div> */}
       
          <div className="elevateSingleAgenda">
            <div className="singleAgenTitle">
              <div className="agendaTitle">
                <span className="agendaBackBtn">   <Link to={"/"}>
                  <i className="fa fa-angle-left" />
                </Link></span>
                <h3 className="agendaTitleText">   {agendaData.title}</h3>
              </div>
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
                          {agendaData.time_zone.timezone}
                    </span>
                  </div>
                  {/* <div className="singleAgeLike">
                    <i className="fa fa-heart" />
                  </div> */}
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
              {attendees.map((attendee, index) => {
              if(attendee.user && attendee.user.role == 3)
              {
                    return (
                <div className="profileChat">
                  <div className="profileChatImg">
                    <img src={CONFIG.BASE_URL+"/uploads/"+attendee.user.profile_img} alt />
                  </div>
                  <div className="profileChatText">
                    <h3 className="attendeeName">{attendee.user.first_name+' '+attendee.user.last_name}</h3>
                    <p className="attendeeComp">{attendee.user.company_name}</p>
                  </div>
                  {/* <span className="ChatImg">
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
                  </span> */}
                </div>
                
                );
              }
              })} 
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="siteFooter">
        <div className="siteContainer">
          <div className="footerInner">
            <ul>
              <li>© 2020 ELEVATE</li>
              <li className="footerDivider">|</li>
              <li><span>POWERED BY:</span> <img src="images/footerPowerLogo.png" alt="" /></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default AgendaDetails;
