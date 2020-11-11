import React, { useState, useEffect } from "react";
import FeedSection from "./feedsSection";
import ChatSection from "./chatSection";

const SocialHub = (props) => {
  return (
    <div id="page-content-wrapper" className="socialPage">
      <div className="innerContentBlock">
        
        {/* End Page Title */}
        {/* Start Inner Sec */}
        <div className="midContentRightBar socialFeedsPage">
          <div className="helpChatSec">
            <FeedSection />
            <ChatSection />
          </div>
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}
      </div>
    </div>
  );
};

export default SocialHub;
