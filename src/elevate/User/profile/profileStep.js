import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePageHeader from "../../common/HeaderSinglePage";
import ProfileStepHeader from "./profileStepHeader";
import ProfileStep1Form from "./profileStep1-form";
import ProfileStep2Form from "./profileStep2-form";
import ProfileStep3Form from "./profileStep3-form";
import * as UserApis from "../../../api/user";
import { Link } from "react-router-dom";
import * as UserActionCreators from "../../../redux/actions/userData/actionCreater1";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(UserActionCreators.loadUserDataToStore());
    })();
  }, []);

  const handleImageUpload = async (url) => {
    await UserApis.uploadProfileImage(url).then((res) => {
      setprofileImage(res.data.data);
    });
  };

  const hanldePageChange = async (pageNo) => {
    console.log("pageNo ============", pageNo)
    dispatch(UserActionCreators.changeProfilePage(pageNo));
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
      handleStep2();
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
      props.history.push("/");
    } else {
      dispatch(
        UserActionCreators.updateProfileStep3Failure({
          message: response.message,
        })
      );
    }
  };

  return (
    <>
      <SinglePageHeader />
      <div class="siteContainer profileElevate">
        <div class="d-flex contentSection" id="wrapper">
          <div id="page-content-wrapper" class="elevateDashboard">
            <div className="elevateFullWidth" style={{ margin: "0 0 20px 0" }}>
              <div className="elevateSingleAgenda">
                <div className="singleAgenTitle">
                  <div className="agendaTitle">
                    <span className="agendaBackBtn">
                      {" "}
                      <Link to={"/"}>
                        <i className="fa fa-angle-left" />
                      </Link>
                    </span>
                    <h3 className="agendaTitleText"> MY PROFILE</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* <div
              class="backBtn"
              onClick={() => {
                props.history.push("/");
              }}
            >
              <a href="#">
                <i class="fa fa-chevron-left"></i> Back
              </a>
            </div> */}

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
                        hanldePageChange = {hanldePageChange}
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
                        hanldePageChange = {hanldePageChange}
                        
                      />
                    ) : userData.currentProfileStep == 3 ? (
                      <ProfileStep3Form
                        errorMsg={userData.step3ApiError}
                        onSubmit={handleStep3}
                        regionData={userData.region}
                        interests={userData.interest}
                        hanldePageChange = {hanldePageChange}
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
                        userData={userData}
                        hanldePageChange = {hanldePageChange}
                        setTempProfileImage={setTempProfileImage}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <footer className="siteFooter">
              <div className="siteContainer">
                <div className="footerInner">
                  <ul>
                    <li>© 2020 ELEVATE</li>
                    <li className="footerDivider">|</li>
                    <li>
                      <span>POWERED BY:</span>{" "}
                      <img src="elevate-theme/images/footerPowerLogo.png" alt />
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSteps;
