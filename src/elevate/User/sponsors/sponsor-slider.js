import React from "react";
import Slider from "react-slick";
import Modal from "react-modal";

class SponsorsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      desc: "",
      membership: "",
      sponsorId: "",
      isPopupOpen: false,
    };
  }

  handleOpenPopUp = async (name, image, membership, desc, id) => {
    console.log("handlePopUp");
    this.setState(
      {
        name: name,
        image: image,
        membership: membership,
        desc: desc,
        sponsorId: id,
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
      <section className="regular slider ">
        {this.props.sponsorData && (
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            
            slidesToShow={5}
            initialSlide={0}
            responsive={[
              {
                breakpoint: 1051,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 3,
                  // infinite: true,
                  // dots: true,
                },
              },
              {
                breakpoint: 801,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint:480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ]}
          >
            {this.props.sponsorData.map((data) => {
              return (
                <div
                  onClick={() => {
                    this.handleOpenPopUp(
                      data.sponsor_name,
                      data.profile_img,
                      data.membership_type.membership,
                      data.description,
                      data._id
                    );
                  }}
                  // onClick={() => {
                  //   this.props.history.push(`expo/${data._id}`);
                  // }}
                >
                  <img
                    src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${data.profile_img}`}
                  />
                </div>
              );
            })}
          </Slider>
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
            <div className="modal-body sponsorPopBody">
              <section className="goldSlider">
                <div className="goldSliderInner">
                  <h3>{this.state.membership} SPONSORS</h3>
                  <div className="sponsorImage">
                    <img
                      src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${this.state.image}`}
                      alt
                    />
                  </div>
                  <div className="txt-info">
                    <h2>{this.state.name}</h2>
                    <p>{this.state.desc}</p>
                    <div className="urlLink">
                      <a
                        onClick={() => {
                          this.props.history.push(
                            `expo/${this.state.sponsorId}`
                          );
                        }}
                      >
                        URL LINK 
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}

export default SponsorsSlider;
