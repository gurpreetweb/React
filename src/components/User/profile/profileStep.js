import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileStepHeader from "./profileStepHeader";
import ProfileStep1Form from "./profileStep1-form";
import ProfileStep2Form from "./profileStep2-form";
import ProfileStep3Form from "./profileStep3-form";
import * as UserApis from "../../../api/user";
import * as UserActionCreators from "../../../redux/actions/userData/actionCreater1";
import Footer from "../../common/footer";

const ProfileSteps = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  
  const [temProfileImage, setTempProfileImage] = useState("");

  const [isProfilePublic, setIsProfilePublic] = useState(
    userData.isProfilePublic
  );
  const [isNotifocationAllowed, setIsNotifocationAllowed] = useState(
    userData.isNotifocationAllowed
  );
  const [isStrangeMessageAllowed, setIsStrangeMessageAllowed] = useState(
    userData.isStrangeMessageAllowed
  );
  const [isVideoChatAllowed, setIsVideoChatAllowed] = useState(
    userData.isVideoChatAllowed
  );
  const [isUserCanRequestMeeting, setIsUserCanRequestMeeting] = useState(
    userData.isUserCanRequestMeeting
  );
  const [isInfoSharedToSponsors, setIsInfoSharedToSponsors] = useState(
    userData.isInfoSharedToSponsors
  );
  const [profileImage, setprofileImage] = useState("");

  const handleImageUpload = async (url) => {
    await UserApis.uploadProfileImage(url).then((res) => {
      setprofileImage(res.data.data);
    });
  };
  const handleStep1 = async (data) => {
    let finalData = data;
    finalData.profile_img = profileImage;
    finalData.user_id = userData.userId;
    finalData.company_name = data.company;
    finalData.url = data.linkedInUrl;
    finalData.job_title = data.jobTitle;
    finalData.time_zone = data.timeZone;

    let response = await UserApis.updateProfileStep1(finalData);
    if (response.status == 200) {
      dispatch(UserActionCreators.updateProfileStep1Success(response.data));
      handleStep2()
    } else {
      dispatch(
        UserActionCreators.updateProfileStep1Failure({
          message: response.message,
        })
      );
    }
  };

  const handleStep2 = async () => {
    let finalData = {
      public_profile: isProfilePublic,
      notification: isNotifocationAllowed,
      message_status: isStrangeMessageAllowed,
      video_status: isVideoChatAllowed,
      meeting_request: isUserCanRequestMeeting,
      info_status: isInfoSharedToSponsors,
    };
    let response = await UserApis.updateProfileStep2(finalData);
    if (response.status == 200) {
      dispatch(UserActionCreators.updateProfileStep2Success(response.data));
    } else {
      dispatch(
        UserActionCreators.updateProfileStep2Failure({
          message: response.message,
        })
      );
    }
  };

  const handleStep3 = async (data) => {
    let response = await UserApis.updateProfileStep3(data);
    if (response.status == 200) {
      dispatch(UserActionCreators.updateProfileStep3Success(response.data));
      props.history.push('/')
    } else {
      dispatch(
        UserActionCreators.updateProfileStep3Failure({
          message: response.message,
        })
      );
    }
  };

  return (
    <div id="page-content-wrapper">
      <div className="innerContentBlock">
        <div class="welcomeProfilePage welcomeProfilePage-2">
          {/* {
            userData.currentProfileStep == 1 ?
            <ProfileStepHeader stepsCompleted={1} />
            :
            <ProfileStepHeader stepsCompleted={2} />
          } */}
          {userData.role != "" && (
            <div>
              {userData.currentProfileStep == 1 ? (
                <ProfileStep1Form
                  errorMsg={userData.step1ApiError}
                  initialValues={{
                    role: userData.userRole,
                    company: userData.company,
                    linkedInUrl: userData.linkedInUrl,
                    jobTitle: userData.jobTitle,
                    department: userData.department,
                    timeZone: userData.timeZone,
                    bio: userData.bio,
                  }}
                  uploadedImage={userData.profilePicId}
                  temProfileImage={temProfileImage}
                  setTempProfileImage={setTempProfileImage}
                  onSubmit={handleStep1}
                  imageUpload={handleImageUpload}
                  userData={userData}
                />
              ) : userData.currentProfileStep == 2 ? (
                // <ProfileStep2Form
                //   isProfilePublic={isProfilePublic}
                //   isNotifocationAllowed={isNotifocationAllowed}
                //   isVideoChatAllowed={isVideoChatAllowed}
                //   isStrangeMessageAllowed={isStrangeMessageAllowed}
                //   isUserCanRequestMeeting={isUserCanRequestMeeting}
                //   isInfoSharedToSponsors={isInfoSharedToSponsors}
                //   setIsProfilePublic={setIsProfilePublic}
                //   setIsVideoChatAllowed={setIsVideoChatAllowed}
                //   setIsStrangeMessageAllowed={setIsStrangeMessageAllowed}
                //   setIsNotifocationAllowed={setIsNotifocationAllowed}
                //   setIsUserCanRequestMeeting={setIsUserCanRequestMeeting}
                //   setIsInfoSharedToSponsors={setIsInfoSharedToSponsors}
                //   onSubmit={handleStep2}
                //   errorMsg={userData.step2ApiError}
                // />
                <ProfileStep3Form
                  errorMsg={userData.step3ApiError}
                  onSubmit={handleStep3}
                  regionData={userData.region}
                  interests={userData.interest}
                  userData={userData}
                />
              ) : userData.currentProfileStep == 3 ? (
                <ProfileStep3Form
                  errorMsg={userData.step3ApiError}
                  onSubmit={handleStep3}
                  regionData={userData.region}
                  interests={userData.interest}
                  userData={userData}
                />
              ) : (
                <ProfileStep1Form
                  errorMsg={userData.step1ApiError}
                  onSubmit={handleStep1}
                  initialValues={{
                    role: userData.userRole,
                    company: userData.company,
                    linkedInUrl: userData.linkedInUrl,
                    jobTitle: userData.jobTitle,
                    department: userData.department,
                    timeZone: userData.timeZone,
                    bio: userData.bio,
                  }}
                  temProfileImage={temProfileImage}
                  setTempProfileImage={setTempProfileImage}
                  userData={userData}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSteps;
