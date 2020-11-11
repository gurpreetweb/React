import React from "react";
import Slider from "react-slick";
import axios from "axios";
import Modal from "react-modal";
import * as CONFIG from "../../../config.json";

class Speakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerData: [],
      loading: true,
      name: "",
      image: "",
      desc: "",
      isPopupOpen:false
    };
  }
  componentDidMount = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let event_id = localStorage.getItem("eventId");
      axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

      const speakerData = await axios.get(
        `${CONFIG.BASE_URL}/api/fetch/speaker/${event_id}`
      );
      if (speakerData.data.status == 200) {
        this.setState(
          {
            speakerData: speakerData.data.data.SpeakerData,
            loading: false,
          },
          () => {
            console.log("thios.state=====>", this.state);
          }
        );
      } else {
        throw new Error(speakerData.data.message);
      }
    } catch (error) {
      console.log("error.message=================>", error.message);
      this.setState({
        loading: false,
      });
    }
  };

  handleOpenPopUp = async (name, image, desc) => {
    console.log("handlePopUp");
    this.setState(
      {
        name: name,
        image: image,
        desc: desc,
      },
      () => {
        this.setState({ isPopupOpen: true });
      }
    );
  };

  handleClodePopUp = async () => {
    this.setState({ isPopupOpen: false });
  };

  render() {
    return (
      <section id="speakerNav" className="speakerSec dashSection">
        <div className="dashBoardTtile">
          <h2>SPEAKERS</h2>
        </div>
        <div className="speakerColl">
          <section className="speaker slider">
            {this.state.speakerData.length > 0 ? (
              <Slider
                dots={true}
                className="center"
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                initialSlide={0}
                centerMode={false}
                responsive={[
                  {
                    breakpoint: 1051,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                    }
                  },
                  {
                    breakpoint: 801,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 561,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]}
              >
                {this.state.speakerData.map((speaker) => {
                  return (
                    <div className="sponsorBox">
                      <div className="sponsorImg">
                        <img
                          src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${speaker.profile_img}`}
                        />
                      </div>
                      <div className="sponsorText">
                        <h3>
                          {speaker.first_name} {speaker.last_name}
                        </h3>
                        <div className="sponLernMore">
                          <a
                            data-toggle="modal"
                            data-target="#speakersPopup"
                            href="#"
                            onClick={() => {
                              this.handleOpenPopUp(
                                speaker.first_name + " " + speaker.last_name,
                                speaker.profile_img,
                                speaker.bio
                              );
                            }}
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <div>No speaker Found</div>
            )}

            <Modal
              isOpen={this.state.isPopupOpen}
              className="speker-pop-elevate"
              onRequestClose={this.handleClodePopUp}
            >
              <div className="modal-content sponsorPopContent">
                <span className="sponsorTopBdr" />
                <span className="sponsorbtmBdr" />
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      this.handleClodePopUp();
                    }}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                <div className="modal-body speakerPopBody">
                  <div className="img-txt-wrap">
                    <div className="speaker-gallery">
                      <div className="galler-wrap">
                        <div className="box">
                          <img
                            src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${this.state.image}`}
                            alt="speaker"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="txt-info">
                      <h3>{this.state.name}</h3>
                      <p>{this.state.desc}</p>
                      {/* <a href="#">URL LINK &gt;</a> */}
                    </div>
                  </div>
                  {/* img-txt-wrap #end*/}
                </div>
              </div>
            </Modal>
        
          </section>
        </div>
      </section>
    );
  }
}

export default Speakers;
