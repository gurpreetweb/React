import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
class SinglePageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let eventData = JSON.parse(localStorage.getItem("eventData"));
    return (
      <div className="siteHeader singlePage">
        <div className="siteInnerHeader">
          <nav className="navbar navbar-expand-lg">
            <div className="headLeftContent">
              <div className="headerLogo">
                <Link to="/">
                  <img src="/elevate-theme/images/elevateLogo.png" alt />
                </Link>
              </div>
            </div>
            <div className="headerRightContant" id="headProfile">
              <div className="headerSocial">
                <ul>
                  <li>
                    <a href={eventData && eventData.facebook ? eventData.facebook : "#"}>
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href={eventData && eventData.twitter ? eventData.twitter : "#"}>
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href={eventData && eventData.instagram ? eventData.instagram : "#"}>
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href={eventData && eventData.linkdin ? eventData.linkdin : "#"}>
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default SinglePageHeader;
