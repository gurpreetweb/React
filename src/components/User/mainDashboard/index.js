import React from "react";
import { dashBoard } from "../../../api/dashboard/index";
import * as CONFIG from "../../../config.json";
import Slider from "react-slick";
import Footer from "../../common/footer";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";

class MainDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      newsData: "",
      agendaData: "",
      eventData: { images: [], videos: [] },
      participants: [],
      playDashVideo: false,
    };
    this.carasouselPArticipants = this.carasouselPArticipants.bind(this);
  }

  async componentDidMount() {
    await dashBoard().then((res) => {
      if (res.data.status === 200) {
        return this.setState({
          ...this.state,
          newsData: res.data.news_data,
          agendaData: res.data.agenda_data,
          eventData: res.data.event_data,
          participants: res.data.user_data,
        });
      } else if (res.data.news_data.length === 0) {
        return alert("No News Data Found");
      } else if (res.data.agenda_data.length === 0) {
        return alert("No Agenda Data Found");
      } else if (res.data.event_data.length === 0) {
        return "No Event Data Found";
      } else {
        return alert(res.data.message);
      }
    });
  }

  carasouselPArticipants(startingIndex, endingIndex) {
    var filterParticipants = this.state.participants.filter((val, index) => {
      return index >= startingIndex && index < endingIndex;
    });

    var participants = filterParticipants.map((value, index) => {
      return (
        <li>
          <img src={CONFIG.BASE_URL + "/uploads/" + value.profile_img} alt="" />
        </li>
      );
    });

    return participants;
  }
  render() {
    console.log(this.state.participants, "getting the participants ");
    var filteredCountries =
      this.state.participants &&
      this.state.participants.filter((val, index) => {
        return val.country !== "undefined" ? val.country : "";
      });
    var countriesCount =
      filteredCountries &&
      filteredCountries.map((val, index) => {
        return val.country;
      });
    var totalCountries = [...new Set(countriesCount)];
    console.log(countriesCount, filteredCountries, "in the participants");
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        }
      ],
    };
    // var count = 0;
    // var car = this.state.participants &&
    //   this.state.participants.map((value, index) => (
    //    this.carasouselPArticipants(value,index)

    //   ))
    // var outerIndex = 0;

    //   var car = this.state.participants && this.state.participants.map((value, index) => {
    //     if(outerIndex == index){
    //       outerIndex = outerIndex+6;
    //     }
    //     return this.carasouselPArticipants(value,index,outerIndex)

    //   })
    var totalScreens = 0;
    var ScreensArray = [];

    if (this.state.participants.length > 0) {
      totalScreens = parseInt(this.state.participants.length / 6);

      var counter = 0;

      for (var i = 0; i < totalScreens; i++) {
        ScreensArray.push(counter);
        counter = counter + 6;
      }

      var car =
        ScreensArray.length > 0 &&
        ScreensArray.map((startingIndex) => {
          var endingIndex = startingIndex + 6;

          return (
            <div className="dashboardAttendies">
              <div class="networkHomeAtt"></div>
              <div class="networkAttendyNew">
                <ul class="myAttendyNew">
                  {this.carasouselPArticipants(startingIndex, endingIndex)}
                </ul>
              </div>
            </div>
          );
        });
    }

    return (
      <div
        id="page-content-wrapper"
        // style={{width: "82%",float: "right"}}
      >
        <div className="innerContentBlock">
          <div className="dashboardVideoSec">
            <div className="dashboardVideo video">
              <ReactPlayer
                controls={true}
                className="dashboardVideoMedia"
                playing={this.state.playDashVideo}
                light={
                  this.state.eventData.images
                    ? CONFIG.BASE_URL +
                      "/uploads/" +
                      this.state.eventData.images[
                        this.state.eventData.images.length - 1
                      ]
                    : ""
                }
                playIcon={
                  <div
                    className="videoControlBtn play-bt fullplayIcon"
                    onClick={() => {
                      this.setState({ playDashVideo: true });
                    }}
                  >
                    <img src="/images/icons/playBtn.png" alt="" />
                  </div>
                }
                url={`${CONFIG.BASE_URL}/uploads/${
                  this.state.eventData.videos[
                    this.state.eventData.videos.length - 1
                  ]
                }`}
                config={{
                  file: {
                    attributes: {
                      preload: "none",
                    },
                  },
                }}
              />
              {/* {this.state.eventData.images.length > 0 && (
                <video
                  width=""
                  poster={
                    this.state.eventData.images
                      ? CONFIG.BASE_URL +
                        "/uploads/" +
                        this.state.eventData.images[
                          this.state.eventData.images.length - 1
                        ]
                      : ""
                  }
                  className="dashboardVideoMedia"
                  id="ban_video"
                >
                  <source
                    src={`${CONFIG.BASE_URL}/uploads/${
                      this.state.eventData.videos[
                        this.state.eventData.videos.length - 1
                      ]
                    }`}
                    // src="https://admin.illumeetvirtual.com/uploads/1600403117776-Big_Buck_Bunny_360_10s_1MB.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </video>
              )} */}
              {/* <div className="videoControlBtn play-bt">
                <img src="/images/icons/playBtn.png" alt="" />
              </div>
              <div
                className="videoControlBtn pause-bt"
                style={{ display: "none" }}
              >
                <img src="/images/icons/pauseBtn.png" alt="" />
              </div>
              <div className="mute-bt"></div> */}
            </div>
          </div>
          <div className="worldCountriesSec">
            <div className="worldCountriesBlock">
              <div className="countryBlock participantSec">
                <h2>
                  {this.state.participants ? this.state.participants.length : 0}
                  +
                </h2>
                <p>PARTICIPANTS</p>
              </div>
              <div className="countryBlock countriesSec">
                <h2>{totalCountries && totalCountries.length}</h2>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam incididunt ut labore et
                    dolore magna aliqua. . .
                  </p>
                  {/* <div className="dashArticleCommentSec">
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
                  </div> */}
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
                <Carousel>{car}</Carousel>
              </div>
              <div className="sec-3Block dashboardCarouselnews">
                <Carousel showIndicators={false} showStatus={false}>
                  {this.state.newsData &&
                    this.state.newsData.map((value, index) => {
                      return (
                        <div className="dashboardSec-3Video" key={index}>
                          <div className="latestNewsVideo">
                            <img
                              width=""
                              src={CONFIG.BASE_URL + "/uploads/" + value.image}
                              className="dashboardVideoMedia"
                              id=""
                              alt=""
                            />

                            <div className="mute-bt"></div>
                          </div>
                          <div className="latestNewsText">
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                          </div>
                        </div>
                      );
                    })}
                </Carousel>
              </div>
            </div>
          </div>
          <div className="dashboardAgendaSec">
            <h2 className="dashBoardAgendaTitle">
              <span>AGENDA HIGHLIGHTS</span>
            </h2>
            <Slider {...settings}>
              {this.state.agendaData.length>0 &&
                this.state.agendaData.map((value, index) => {
                  return (
               
                      <div className="agendaHighLightInner" key={index}>
                        <div className="agendaVideos">
                          <div className="agendaVideoSec">
                            <img
                              width=""
                              src={
                                CONFIG.BASE_URL + "/uploads/" + value.images[0]
                              }
                              className="dashboardVideoMedia"
                              id=""
                              alt=""
                            />
                          </div>
                          <div className="agendaVideoText">
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                            <span className="greenDot"></span>
                          </div>
                        </div>
                      </div>
                 
                  );
                })}
            </Slider>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default MainDashboard;
