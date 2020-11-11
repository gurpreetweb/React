import React from "react";
import Slider from "react-slick";
import axios from "axios";
import _ from "lodash";
import SponsorsSlider from "./sponsor-slider";
import * as CONFIG from "../../../config.json";

class Sponsors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsorData: [],
      loading: true,
      activePage: 1,
      agendaPageLimit: 10,
      sponsorType: [],
      sponsorDataByCat: [],
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
        this.setState({
            loading: false,
            sponsorData: res.data.sponser_data,
            totalPage: res.data.page,
          },() => {
            this.getMemeberShipData();
            console.log("sponsor this.state======>", this.state);
          });
      } else if (res.data.status == 500) {
        this.setState({
            loading: false,
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          },() => {
            console.log("sponsor this.state======>", this.state);
          });
      } else {
        this.setState({
            loading: false,
            errorMessage: res.data.message,
          },() => {
            console.log("sponsor this.state======>", this.state);
          });
      }
    } catch (error) {
      console.log("error.message", error.message);
      this.setState({
          loading: false,
        },() => {
          console.log("sponsor this.state======>", this.state);
        });
    }
  };

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    initialSlide: 0,
    responsive: [],
  };

  getMemeberShipData = async () => {
    console.log("getMemeberShipData invoked===>");
    let sponsorType = [];
    for (let sponsor of this.state.sponsorData) {
      if (sponsorType.indexOf(sponsor.membership_type.membership) == -1) {
        sponsorType.push(sponsor.membership_type.membership);
      }
    }
    this.setState({
        sponsorType: sponsorType,
      },() => {
        console.log("sponsorType======>", this.state);
        this.getSponsorByCategory();
      });
  };

  getSponsorByCategory = async () => {
    console.log("getSponsorByCategory===>");
    const data = _.groupBy(this.state.sponsorData, function (sponsor) {
      return sponsor.membership_type.membership;
    });
    this.setState({
        sponsorDataByCat: data,
      },() => {
        console.log("final state=======", this.state);
      });
  };

  render() {
    return (
      <section id="sponsorNav" className="sponsorSec dashSection">
        <div className="dashBoardTtile">
          <h2>SPONSORS</h2>
        </div>
        <div className="sponsorType">
          {this.state.sponsorType.map((sponsorType) => {
            return (
              <div className="sponsorTypeBox">
                <div className="sponsorTypeTtile platinumSponsor">
                  <h3>{sponsorType}</h3>
                </div>
                <div className="sponsorBrands">
                  <SponsorsSlider
                    {...this.props}
                    sponsorData={this.state.sponsorDataByCat[sponsorType]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Sponsors;
