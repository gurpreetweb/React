import React from "react";

const Footer = (props) => {
  return (
      <div className="siteFooter">
          <div className="footerAnkLogo">
            <span className="footerLogo"><img src="/images/icons/footerLogo.png" alt="" /></span>
          </div>
          <div className="footerPowerLogo">
            <span className="footerPower">POWERED BY:</span>
            <span className="footerPawerLogo"><img src="/images/icons/footerPowerLogo.png" alt="" /></span>
          </div>
          <div className="footerGoTop">
            <a href="#" id="backToTop">GO TO TOP <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg></a>
          </div>
        </div>
    );
}
 
export default Footer;