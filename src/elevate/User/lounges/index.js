import React from "react";
import axios from "axios";
import Modal from "react-modal";
import Slider from "react-slick";
import { CometChat } from "@cometchat-pro/chat";
import * as CONFIG from "../../../config.json";

class Lounges extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props aas", this.props);
    this.state = {
      sponsorData: [],
      loading: true,
      activePage: 1,
      agendaPageLimit: 10,
      isPopupOpen: false,
      video360Link: "",
    };
  }

  componentDidMount = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let event_id = localStorage.getItem("eventId");
      axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

      let data = {
        event_id: event_id,
        page: this.state.activePage,
        user_id: userData._id,
        limit: this.state.agendaPageLimit,
      };
      const res = await axios.post(
        CONFIG.BASE_URL + "/api/expo/" + event_id,
        data
      );

      if (res.data.status == 200) {
        this.setState(
          {
            loading: false,
            sponsorData: res.data.sponser_data,
            totalPage: res.data.page,
          },
          () => {
            console.log("sponsor this.state======>", this.state);
          }
        );
      } else if (res.data.status == 500) {
        this.setState(
          {
            loading: false,
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          },
          () => {
            console.log("sponsor this.state======>", this.state);
          }
        );
      } else {
        this.setState(
          {
            loading: false,
            errorMessage: res.data.message,
          },
          () => {
            console.log("sponsor this.state======>", this.state);
          }
        );
      }
    } catch (error) {
      console.log("error.message", error.message);
      this.setState(
        {
          loading: false,
        },
        () => {
          console.log("sponsor this.state======>", this.state);
        }
      );
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

  JoinGroup= (sponsor_id, lounge_title,that) => {
    console.log("joinGroup")
    var self = that;
    var GUID = sponsor_id;
    var groupName = lounge_title;
    var groupType = CometChat.GROUP_TYPE.PUBLIC;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(
      (group) => {
        console.log("Group created successfully:", group);
        self.props.history.push(`/group-chat`);
      },
      (error) => {
        console.log("Group creation failed with exception:", error);
        self.props.history.push(`/group-chat`);
      }
    );
  }

  render() {
    return (
      <section className="loungesSec">
        <div className="dashBoardTtile">
          <h2>LOUNGES</h2>
        </div>
        <div className="loungesIcoSec">
          <div className="loungesInner">
            {this.state.sponsorData.length > 0 && (
              <Slider
                dots={true}
                arrows={false}
                infinite={true}
                speed={500}
                slidesToShow={
                  this.state.sponsorData.length > 5
                    ? 4
                    : this.state.sponsorData.legth
                }
                initialSlide={0}
                className="lounges-slider"
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
                {this.state.sponsorData.map((data, index) => {
                  return (
                    <div
                      className={`loungesBox 
                      ${
                        (index + 1) % 4 == 1
                          ? "redClr"
                          : (index + 1) % 4 == 2
                          ? "yellowClr"
                          : (index + 1) % 4 == 3
                          ? "pinkClr"
                          : "lightRedClr"
                      }`}
                      onClick={() => {
                        data.lounge_type == "chat_room"
                          ? this.JoinGroup(
                              data._id,
                              data.lounge_title,
                              this
                            )
                          : this.setState(
                              { video360Link: data.profile_img },
                              () => {
                                // this.handleOpenPopUp();
                                this.props.history.push(`/lounge-video/${data._id}`)
                              }
                            );
                      }}
                    >
                      <div className="loungeIcon">
                        <img
                          src="elevate-theme/images/icons/loungIcon.png"
                          alt
                        />
                      </div>
                      <h3>{data.lounge_title}</h3>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>

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
                        src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${this.state.video360Link}`}
                        alt="speaker"
                      />
                    </div>
                  </div>
                </div>
                <div className="txt-info">
                  {/* <h3>{this.state.name}</h3>
                  <p>{this.state.desc}</p>
                  <a href="#">URL LINK &gt;</a> */}
                </div>
              </div>
              {/* img-txt-wrap #end*/}
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}

export default Lounges;
