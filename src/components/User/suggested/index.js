import React, { useState, useEffect } from "react";
const Notes = (props) => {
  return (
    <>
      <div id="page-content-wrapper">
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>
              Suggested For Me{" "}
              <span className="siteSubTitle">
                Connect with like-minded attendees and view programming tailored
                to you
              </span>
            </h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="suggested4MePage">
            <div className="interestHangSec">
              <div className="suggInterestSec">
                <h3>Sessions of interest</h3>
                <div className="liveNowSecInner">
                  <div ulassName="liveNowBlock suggInterestSess">
                    <div className="LiveSrNo">01</div>
                    <div className="agendaTimeImage">
                      <div className="agendaTimeTag">
                        <h2>
                          <a href="#">
                            Saving energy in homes with unified approach to data
                            and AI -3
                          </a>
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
                          <span className="timeText">
                            02:30PM - 04:30PM US/Pacific | 02:30PM - 04:30PM PDT
                          </span>
                        </div>
                        <div className="sessionTime">
                          <span className="timeIcon">
                            <img src="images/icons/impactPin.png" alt="" />
                          </span>
                          <span className="timeText">
                            Impact and Innovation
                          </span>
                        </div>
                        <div className="agendaTag">
                          <ul className="agendaTagUl">
                            <li>
                              <a href="#">Deep Learning</a>
                            </li>
                            <li className="intermediateBtn">
                              <a href="#">Intermediate</a>
                            </li>
                          </ul>
                          <div className="liveConfrence">
                            <a href="#">
                              <span className="playIcon">
                                <i className="fa fa-play" />
                              </span>{" "}
                              Webinar{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="agendaImage">
                        <img src="./images/agendaImage.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="liveNowSecInner">
                  <div className="liveNowBlock suggInterestSess">
                    <div className="LiveSrNo">02</div>
                    <div className="agendaTimeImage">
                      <div className="agendaTimeTag">
                        <h2>
                          <a href="#">
                            Saving energy in homes with unified approach to data
                            and AI -3
                          </a>
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
                          <span className="timeText">
                            02:30PM - 04:30PM US/Pacific | 02:30PM - 04:30PM PDT
                          </span>
                        </div>
                        <div className="sessionTime">
                          <span className="timeIcon">
                            <img src="images/icons/impactPin.png" alt="" />
                          </span>
                          <span className="timeText">
                            Impact and Innovation
                          </span>
                        </div>
                        <div className="agendaTag">
                          <ul className="agendaTagUl">
                            <li>
                              <a href="#">Deep Learning</a>
                            </li>
                            <li className="intermediateBtn">
                              <a href="#">Intermediate</a>
                            </li>
                          </ul>
                          <div className="liveConfrence">
                            <a href="#">
                              <span className="playIcon">
                                <i className="fa fa-play" />
                              </span>{" "}
                              Webinar{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="agendaImage">
                        <img src="./images/agendaImage.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="liveNowSecInner">
                  <div className="liveNowBlock suggInterestSess">
                    <div className="LiveSrNo">03</div>
                    <div className="agendaTimeImage">
                      <div className="agendaTimeTag">
                        <h2>
                          <a href="#">
                            Saving energy in homes with unified approach to data
                            and AI -3
                          </a>
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
                          <span className="timeText">
                            02:30PM - 04:30PM US/Pacific | 02:30PM - 04:30PM PDT
                          </span>
                        </div>
                        <div className="sessionTime">
                          <span className="timeIcon">
                            <img src="images/icons/impactPin.png" alt="" />
                          </span>
                          <span className="timeText">
                            Impact and Innovation
                          </span>
                        </div>
                        <div className="agendaTag">
                          <ul className="agendaTagUl">
                            <li>
                              <a href="#">Deep Learning</a>
                            </li>
                            <li className="intermediateBtn">
                              <a href="#">Intermediate</a>
                            </li>
                          </ul>
                          <div className="liveConfrence">
                            <a href="#">
                              <span className="playIcon">
                                <i className="fa fa-play" />
                              </span>{" "}
                              Webinar{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="agendaImage">
                        <img src="./images/agendaImage.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="suggHangSec">
                <h3>Hang Out</h3>
                <ul className="suggHandUl">
                  <li>
                    <a href="#">
                      Lounges
                      <span className="rightArrow">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chevron-right"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Activations
                      <span className="rightArrow">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chevron-right"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Exploration spaces
                      <span className="rightArrow">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chevron-right"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End Inner Sec */}
          {/* End AGENDA HIGHLIGHTS Section */}
        </div>
      </div>
    </>
  );
};

export default Notes;
