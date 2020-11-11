import React from "react";
import Footer from "../../common/footer";
import LiveNowList from "./liveNow-list";

const LiveNow = (props) => {
  return (
    <div
      id="page-content-wrapper"
      // style={{width: "82%",float: "right"}}
    >
      <div className="innerContentBlock">
        <div className="sitePageTitle">
          <h2>Live Now</h2>
        </div>
        <div className="liveNowPage">
          <div className="liveNowDes">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.{" "}
            </p>
          </div>
          <LiveNowList />
        </div>
      </div>
    </div>
  );
};

export default LiveNow;
