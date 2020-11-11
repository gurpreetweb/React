import React from "react";

const ProfileStep2Form = (props) => {
  const {
    isProfilePublic,
    setIsStrangeMessageAllowed,
    setIsUserCanRequestMeeting,
    setIsInfoSharedToSponsors,
    setIsNotifocationAllowed,
    isStrangeMessageAllowed,
    isUserCanRequestMeeting,
    isInfoSharedToSponsors,
    isNotifocationAllowed,
    setIsVideoChatAllowed,
    isVideoChatAllowed,
    setIsProfilePublic,
    onSubmit,
    errorMsg,
    handleSubmit,
  } = props;

  return (
    <div className="welcomeProForm">
      {
        console.log("props========================<",props)
      }
      <form name="profileStep1Form" onSubmit={handleSubmit}>
        <div className="welcomeProInner">
          <div className="welcomeQuestionLeft">
            <div className="welcmQuesBlock">
              <h3 className="questH3">
                <span className="iIcon">i</span>Make my profile public
              </h3>
              <div className="questoinOnOff">
                <span className="siteCheckBox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked = {isProfilePublic==1?true:false}
                      onChange={(e) => {
                        let value 
                        if(isProfilePublic==1){
                          value=2
                        }else{
                          value=1
                        }
                        setIsProfilePublic(value);
                      }}
                    />
                    <span className="slider round">
                      <span className="checkTextYes">Yes</span>
                      <span className="checkTextNo">No</span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
            <div className="welcmQuesBlock">
              <h3 className="questH3">
                <span className="iIcon">i</span>Allow users to video chat with
                me
              </h3>
              <div className="questoinOnOff">
                <span className="siteCheckBox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={isVideoChatAllowed==1?true:false}
                      onChange={(e) => {
                        let value 
                        if(isVideoChatAllowed==1){
                          value=2
                        }else{
                          value=1
                        }
                        setIsVideoChatAllowed(value);
                      }}
                    />
                    <span className="slider round">
                      <span className="checkTextYes">Yes</span>
                      <span className="checkTextNo">No</span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
            <div className="welcmQuesBlock">
              <h3 className="questH3">
                <span className="iIcon">i</span>Allow users to send me meeting
                requests
              </h3>
              <div className="questoinOnOff">
                <span className="siteCheckBox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={isUserCanRequestMeeting==1?true:false}
                      onChange={(e) => {
                        let value 
                        if(isUserCanRequestMeeting==1){
                          value=2
                        }else{
                          value=1
                        }
                        setIsUserCanRequestMeeting(value);
                      }}
                    />
                    <span className="slider round">
                      <span className="checkTextYes">Yes</span>
                      <span className="checkTextNo">No</span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
          </div>
          <div className="welcomeQuestionRight">
            <div className="welcmQuesBlock">
              <h3 className="questH3">
                <span className="iIcon">i</span>Allow notifications
              </h3>
              <div className="questoinOnOff">
                <span className="siteCheckBox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={isNotifocationAllowed==1?true:false}
                      onChange={(e) => {
                        let value 
                        if(isNotifocationAllowed==1){
                          value=2
                        }else{
                          value=1
                        }
                        setIsNotifocationAllowed(value);
                      }}
                    />
                    <span className="slider round">
                      <span className="checkTextYes">Yes</span>
                      <span className="checkTextNo">No</span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
            <div className="welcmQuesBlock">
              <h3 className="questH3">
                <span className="iIcon">i</span>Allow users to send me messages
              </h3>
              <div className="questoinOnOff">
                <span className="siteCheckBox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={isStrangeMessageAllowed==1?true:false}
                      onChange={(e) => {
                        let value 
                        if(isStrangeMessageAllowed==1){
                          value=2
                        }else{
                          value=1
                        }
                        setIsStrangeMessageAllowed(value);
                      }}
                    />
                    <span className="slider round">
                      <span className="checkTextYes">Yes</span>
                      <span className="checkTextNo">No</span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
            <div className="welcmQuesBlock">
              <h3 className="questH3">
                <span className="iIcon">i</span>Provide my information to
                sponsors
              </h3>
              <div className="questoinOnOff">
                <span className="siteCheckBox">
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={isInfoSharedToSponsors==1?true:false}
                      onChange={(e) => {
                        let value 
                        if(isInfoSharedToSponsors==1){
                          value=2
                        }else{
                          value=1
                        }
                        setIsInfoSharedToSponsors(value);
                      }}
                    />
                    <span className="slider round">
                      <span className="checkTextYes">Yes</span>
                      <span className="checkTextNo">No</span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="profileSaveButton">
          <div className="profilePages">
            {/* <ul className="profileInnerPages">
              <li>
                <a href="#">View your profile</a>
              </li>
              <li>
                <a href="#">View privacy policy</a>
              </li>
              <li>
                <a href="#">Forget me</a>
              </li>
            </ul> */}
          </div>
          <button
            type="button"
            className="saveContNew"
            onClick={() => onSubmit()}
          >
            Save and continue
          </button>
        </div>
      </form>
      {errorMsg != "" && <div className="signupError_msg">{errorMsg}</div>}
    </div>
  );
};

export default ProfileStep2Form;
