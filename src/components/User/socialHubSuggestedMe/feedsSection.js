import React, { useState, useEffect } from "react";

const FeedSection = (props) => {
  return (
    <div className="helpChatLeft socialFeedLeft">
      <div className="sitePageTitle">
        <h2>Social Hub</h2>
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-facebook-official" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-linkedin" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-twitter" />
            </a>
          </li>
        </ul>
      </div>
      <div className="getSocialFeeds">
        <div className="socialFeedsSec">
          <FeedPreview
            text="#GoProHERO8 Black now works as an HD webcam with a simple beta firmware update + desktop utility installation - no third party accessories required"
            userProfile="/images/attendeeImg-2.jpg"
            userName="James Le (@)le_jam. . ."
            postTime="20 minutes age"
          />
          <FeedPreview
            text="#GoProHERO8 Black now works as an HD webcam with a simple beta firmware update + desktop utility."
            userProfile="/images/attendeeImg-2.jpg"
            userName="James Le (@)le_jam. . ."
            postTime="20 minutes age"
          />
          <FeedPreview
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
            userProfile="/images/attendeeImg-2.jpg"
            userName="a James Le (@)le_jam. . ."
            postTime="20 minutes age"
          />
          <FeedPreview
            imageUrl="/images/icons/feedImg.jpg"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
            userProfile="/images/attendeeImg-2.jpg"
            userName="James Le (@)le_jam. . ."
            postTime="20 minutes age"
          />
        </div>
      </div>
    </div>
  );
};

const FeedPreview = (props) => {
  const { imageUrl, text, userProfile, userName, postTime } = props;
  return (
    <div className="getFeedsBlock">
      <div className="getFeedsBlockInner">
        {imageUrl != undefined && 
          <div className="feedsImg">
            <img src={imageUrl} alt />
          </div>
        }
        <div className="feedsText">
          <p>{text}</p>
        </div>
        <div className="feedsUserDetail">
          <div className="feedsUserImgText">
            <img src={userProfile} alt />
            <div className="feedsUserText">
              <h4>{userName}</h4>
              <p className="mintsAgo">{postTime}</p>
            </div>
          </div>
          <div className="feedsLogo">
            <i className="fa fa-twitter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSection;
