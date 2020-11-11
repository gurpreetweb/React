import React, { useState, useEffect } from "react";

const ChatSection = (props) => {
  return (
    <div className="helpChatRight">
      <div className="helpChatRightInner">
        <div className="adminChatingOnline">
          <div className="onlineChatSearch">
            <input
              className="form-control"
              type="search"
              placeholder="Search user"
            />
          </div>
          <div className="onlinePersonChat boxscroll">
            <div className="chatPerson">
              <div className="chatImgName">
                <div className="chatPersonImg">
                  <img src="/images/attendeeImg-3.jpg" alt />
                </div>
                <div className="chatPersonName">
                  <h4>James Smith</h4>
                  <p>Lorem ipsum dolor sit . . .</p>
                </div>
              </div>
              <div className="attendeeStatus">
                <span className="onlineStatus" />
              </div>
            </div>
            <div className="chatPerson active">
              <div className="chatImgName">
                <div className="chatPersonImg">
                  <img src="/images/attendeeImg-1.jpg" alt />
                </div>
                <div className="chatPersonName">
                  <h4>James Smith</h4>
                  <p>Lorem ipsum dolor sit . . .</p>
                </div>
              </div>
              <div className="attendeeStatus">
                <span className="onlineStatus" />
              </div>
            </div>
            <div className="chatPerson">
              <div className="chatImgName">
                <div className="chatPersonImg">
                  <img src="/images/attendeeImg-4.jpg" alt />
                </div>
                <div className="chatPersonName">
                  <h4>James Smith</h4>
                  <p>Lorem ipsum dolor sit . . .</p>
                </div>
              </div>
              <div className="attendeeStatus">
                <span className="onlineStatus" />
              </div>
            </div>
            <div className="chatPerson">
              <div className="chatImgName">
                <div className="chatPersonImg">
                  <img src="/images/attendeeImg-5.jpg" alt />
                </div>
                <div className="chatPersonName">
                  <h4>James Smith</h4>
                  <p>Lorem ipsum dolor sit . . .</p>
                </div>
              </div>
              <div className="attendeeStatus">
                <span className="onlineStatus" />
              </div>
            </div>
            <div className="chatPerson">
              <div className="chatImgName">
                <div className="chatPersonImg">
                  <img src="/images/attendeeImg-6.jpg" alt />
                </div>
                <div className="chatPersonName">
                  <h4>James Smith</h4>
                  <p>Lorem ipsum dolor sit . . .</p>
                </div>
              </div>
              <div className="attendeeStatus">
                <span className="onlineStatus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
