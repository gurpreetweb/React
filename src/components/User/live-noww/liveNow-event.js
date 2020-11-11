import React from "react";

const LiveNowEvent = (props) => {
  const { serialNo, title, discription }= props
  return (
          <div className="liveNowSecInner">
            <div className="liveNowBlock">
              <div className="LiveSrNo">{serialNo}</div>
              <h2><a href="#">{title}</a></h2>
              <p className="shortDes">{discription}</p>
              <div className="sessionTime">
                <span className="timeIcon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
                    <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </span>
              <span className="timeText">02:30PM - 04:30PM US/Pacific | 02:30PM - 04:30PM PDT</span>
            </div>
            </div>
            <div className="liveRightArrow">
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
    );
}

export default LiveNowEvent;