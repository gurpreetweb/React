import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="siteFooter">
        <div className="siteContainer">
          <div className="footerInner">
            <ul>
              <li>© 2020 ELEVATE</li>
              <li className="footerDivider">|</li>
              <li>
                <span>POWERED BY:</span>{" "}
                <img src="/elevate-theme/images/footerPowerLogo.png" alt />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}


export default Footer;
