import React from "react";

const MainDashboard = (props) => {
  return (
    <div
      id="page-content-wrapper"
      // style={{width: "82%",float: "right"}}
    >
      <div className="innerContentBlock">
        <div className="dashboardVideoSec">
          <div className="dashboardVideo video">
            <video
              width=""
              poster="/images/icons/videoPoster.jpg"
              className="dashboardVideoMedia"
              id="ban_video"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              <source
                src="https://www.w3schools.com/html/mov_bbb.ogg"
                type="video/ogg"
              />
              Your browser does not support HTML video.
            </video>
            <div className="videoControlBtn play-bt">
              <img src="/images/icons/playBtn.png" alt="" />
            </div>
            <div
              className="videoControlBtn pause-bt"
              style={{ display: "none" }}
            >
              <img src="/images/icons/pauseBtn.png" alt="" />
            </div>
            <div className="mute-bt"></div>
          </div>
        </div>
        <div className="worldCountriesSec">
          <div className="worldCountriesBlock">
            <div className="countryBlock participantSec">
              <h2>3500+</h2>
              <p>PARTICIPANTS</p>
            </div>
            <div className="countryBlock countriesSec">
              <h2>40</h2>
              <p>COUNTRIES</p>
            </div>
            <div className="countryBlock industriesSec">
              <h2>23</h2>
              <p>INDUSTRIES</p>
            </div>
            <div className="countryBlock exectiveSec">
              <h2>60%</h2>
              <p>
                EXECUTIVES/
                <br />
                SR. MANAGERS
              </p>
            </div>
          </div>
        </div>

        <div className="dashboardSec-3">
          <div className="dashboardSecInner">
            <div className="sec-3Block dashboardArticle">
              <div className="imageTitle">
                <div className="articleImg">
                  <img src="/images/icons/articleImg.jpg" alt="" />
                </div>
                <div className="articleTitle">
                  <h3>Laura Smith in Latest News</h3>
                  <p>7hrs. ago</p>
                </div>
              </div>
              <div className="articleContent">
                <h2>Cras quis nulla commodo, aliquam lectus sed </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam incididunt ut labore et dolore magna
                  aliqua. . .
                </p>
                <div className="dashArticleCommentSec">
                  <div className="dashComments">
                    <span className="comments">890</span>
                  </div>
                  <div className="dashResponses">
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
                    <span className="comments">56 responses</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sec-3Block dashboardNetwork">
              <div className="newworkDropdown">
                <span className="dropdowntext">Network</span>
                <div className="alphaDropdown">
                  <select className="custom-select">
                    <option>Alphabetical</option>
                    <option>A - Z</option>
                    <option>Z - A</option>
                  </select>
                </div>
              </div>
              <div className="dashboardAttendies">
                <section className="regular slider">
                  <div className="attendiesBlock">
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-1.jpg" />
                    </div>
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-2.jpg" />
                    </div>
                  </div>
                  <div className="attendiesBlock">
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-3.jpg" />
                    </div>
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-4.jpg" />
                    </div>
                  </div>
                  <div className="attendiesBlock">
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-5.jpg" />
                    </div>
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-6.jpg" />
                    </div>
                  </div>
                  {/* <div className="attendiesBlock">
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-3.jpg" />
                    </div>
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-4.jpg" />
                    </div>
                  </div>
                  <div className="attendiesBlock">
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-1.jpg" />
                    </div>
                    <div className="userAttendy">
                      <img src="/images/attendeeImg-2.jpg" />
                    </div>
                  </div> */}
                </section>
              </div>
            </div>
            <div className="sec-3Block dashboardSec-3Video">
              <div className="latestNewsVideo">
                <video
                  width=""
                  poster="/images/icons/videoPoster.jpg"
                  className="dashboardVideoMedia"
                  id="ban_video"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.ogg"
                    type="video/ogg"
                  />
                  Your browser does not support HTML video.
                </video>
                <div className="videoControlBtn play-bt">
                  <img src="/images/icons/playBtn.png" alt="" />
                </div>
                <div
                  className="videoControlBtn pause-bt"
                  style={{ display: "none" }}
                >
                  <img src="/images/icons/pauseBtn.png" alt="" />
                </div>
                <div className="mute-bt"></div>
              </div>
              <div className="latestNewsText">
                <h3>John Smith in Latest News</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna{" "}
                </p>
              </div>
              <div className="latestNewsDropdown">
                <span className="dropdowntext">FILTER TRACKS</span>
                <div className="alphaDropdown">
                  <select className="custom-select">
                    <option>Alphabetical</option>
                    <option>A - Z</option>
                    <option>Z - A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboardAgendaSec">
          <h2 className="dashBoardAgendaTitle">
            <span>AGENDA HIGHLIGHTS</span>
          </h2>
          <div className="agendaHighLightInner">
            <div className="sec-4Block agendaVideos">
              <div className="agendaVideoSec">
                <video
                  width=""
                  poster="/images/icons/videoPoster.jpg"
                  className="dashboardVideoMedia"
                  id="ban_video"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.ogg"
                    type="video/ogg"
                  />
                  Your browser does not support HTML video.
                </video>
                <div className="videoControlBtn play-bt">
                  <img src="/images/icons/playBtn.png" alt="" />
                </div>
                <div
                  className="videoControlBtn pause-bt"
                  style={{ display: "none" }}
                >
                  <img src="/images/icons/pauseBtn.png" alt="" />
                </div>
                <div className="mute-bt"></div>
              </div>
              <div className="agendaVideoText">
                <h3>Patrick Ta - Masterclass</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
                <span className="greenDot"></span>
              </div>
            </div>
            <div className="sec-4Block agendaVideos">
              <div className="agendaVideoSec">
                <video
                  width=""
                  poster="/images/icons/videoPoster.jpg"
                  className="dashboardVideoMedia"
                  id="ban_video"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.ogg"
                    type="video/ogg"
                  />
                  Your browser does not support HTML video.
                </video>
                <div className="videoControlBtn play-bt">
                  <img src="/images/icons/playBtn.png" alt="" />
                </div>
                <div
                  className="videoControlBtn pause-bt"
                  style={{ display: "none" }}
                >
                  <img src="/images/icons/pauseBtn.png" alt="" />
                </div>
                <div className="mute-bt"></div>
              </div>
              <div className="agendaVideoText">
                <h3>Patrick Ta - Masterclass</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
                <span className="greenDot"></span>
              </div>
            </div>
            <div className="sec-4Block agendaVideos">
              <div className="agendaVideoSec">
                <video
                  width=""
                  poster="/images/icons/videoPoster.jpg"
                  className="dashboardVideoMedia"
                  id="ban_video"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.ogg"
                    type="video/ogg"
                  />
                  Your browser does not support HTML video.
                </video>
                <div className="videoControlBtn play-bt">
                  <img src="/images/icons/playBtn.png" alt="" />
                </div>
                <div
                  className="videoControlBtn pause-bt"
                  style={{ display: "none" }}
                >
                  <img src="/images/icons/pauseBtn.png" alt="" />
                </div>
                <div className="mute-bt"></div>
              </div>
              <div className="agendaVideoText">
                <h3>Patrick Ta - Masterclass</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
                <span className="greenDot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
