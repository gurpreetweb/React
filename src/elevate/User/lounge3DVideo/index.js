import React from "react";
import axios from "axios";
import * as CONFIG from "../../../config.json";
import { Link } from "react-router-dom";
import SinglePageHeader from "../../common/HeaderSinglePage";

class Lounge3dVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: {},
      agendaPageNo: 1,
      agendaPageLimit: 5,
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    window.scrollTo(0, 0)
  }

  getData = async () => {
    var userData = JSON.parse(localStorage.getItem("userData"));

    axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;
    await axios
      .post(CONFIG.BASE_URL + "/api/video/" + this.props.match.params.id)
      .then((res) => {
        if (res.data.status == 200) {
          this.setState({ data: res.data.data, data_status: true });
        } else if (res.data.status == 500) {
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          });
        } else {
          this.setState({ errorMessage: res.data.message });
        }
      })
      .catch((err) => {
        this.setState({
          errorMessage: "Something went wrong, please try again later!",
          data_status: true,
        });
      });
  };

  render() {
    return (
      <>
        <SinglePageHeader />
        {/* <div className="siteHeader">
          <div className="siteInnerHeader">
            <nav className="navbar navbar-expand-lg">
              <div className="headLeftContent">
                <div className="headerLogo">
                <Link to={"/"}><img src="/elevate-theme/images/elevateLogo.png" alt="" /></Link>
                </div>
              </div>
              <div className="headerRightContant" id="headProfile">
                <div className="headerSocial">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div> */}
        {/* <button
                  className="btn btn-primary sideBarToggle"
                  id="menu-toggle"
                >
                  Toggle Menu
                </button>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <span className="rightToggleHead">
                  <a className="headerToggleMenu">
                    <span className="headToggle" />
                  </a>
                </span> */}
        {/* </div>
            </nav>
          </div>
        </div> */}

        <div className="siteContainer">
          <div className="d-flex contentSection" id="wrapper">
            {/* Sidebar */}
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <div id="page-content-wrapper" className="elevateDashboard">
              <div className="chat-section-wrapper">
              <div
                className="elevateFullWidth"
                style={{ margin: "0 0 20px 0" }}
              >
                <div className="elevateSingleAgenda">
                  <div className="singleAgenTitle">
                    <div className="agendaTitle">
                      <span className="agendaBackBtn">
                        {" "}
                        <Link to={"/"}>
                          <i className="fa fa-angle-left" />
                        </Link>
                      </span>
                      <h3 className="agendaTitleText">LOUNGE VIDEO</h3>
                    </div>
                  </div>
                </div>
              </div>
            
                {/* <div className="back_btn_chat">
                  <a
                    className="back-button"
                    // href="#"
                    onClick={() => {
                      this.props.history.push("/");
                    }}
                  >
                    <span />
                    BACK
                  </a>
                </div> */}
                {/* <div className="chat_heading">
                  {" "}
                  <h1>Lounge Video</h1>
                </div> */}
               
                <div className="chat_box">
                  <div className="chat_message">
                    <div className="frontFullChat">
                      {this.state.data.space_code != "" && (
                        <iframe
                          width="100%"
                          src={this.state.data.space_code}
                          style={{ height: "calc(100vh - 7px)" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <footer className="siteFooter">
                  <div className="siteContainer">
                    <div className="footerInner">
                      <ul>
                        <li>© 2020 ELEVATE</li>
                        <li className="footerDivider">|</li>
                        <li>
                          <span>POWERED BY:</span>{" "}
                          <img
                            src="/elevate-theme/images/footerPowerLogo.png"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
            {/* /#page-content-wrapper */}
          </div>
        </div>
      </>
    );
  }
}

export default Lounge3dVideo;
