import React from "react";

class ElevateBooth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id="highlightNav" className="eventBoothSec dashSection">
        <div className="dashBoardTtile">
          <h2>ELEVATE BOOTH</h2>
        </div>
        <div className="eventBoothControl">
          <img src="elevate-theme/images/icons/eventBooth.jpg" alt />
        </div>
      </section>
    );
  }
}

export default ElevateBooth;
