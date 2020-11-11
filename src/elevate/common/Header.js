import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="loginHeader">
      <div className="arrowLogo">
        <img src="elevate-theme/images/elevateLogo.png" alt />
      </div>
    </div>
    );
  }
}


export default Header;
