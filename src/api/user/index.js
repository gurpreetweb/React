import axios from "axios";
import * as CONFIG from "../../config.json";
import * as UserActionCreators from "../../redux/actions/userData/actionCreater1.js";
import * as UTIL from "../../Utils/util";

export const uploadProfileImage = async (data) => {
  const reqConfig = await UTIL.getHeader();
  try {
    const formData = new FormData();
    formData.append("image", data);

    let response = await axios.post(
      `${CONFIG.BASE_URL}/api/upload`,
      formData,
      reqConfig
    );
    return response;
  } catch (error) {
    return { status: 400, message: error.message, data: "" };
  }
};

export const updateProfileStep1 = async (data) => {
  try {
    const reqConfig = await UTIL.getHeader();
    console.log("-----------header------", reqConfig, data);

    let response = await axios.post(
      `${CONFIG.BASE_URL}/api/user/step-one`,
      data,
      reqConfig
    );
    if (response.data.status == 200) {
      const responseData = response.data.data;

      let userData = JSON.parse(localStorage.getItem("userData"));
      userData.company_name = responseData.company_name;
      userData.url = responseData.url;
      userData.role = responseData.role;
      userData.job_title = responseData.job_title;
      userData.department = responseData.department;
      userData.bio = responseData.bio;
      userData.profile_img = responseData.profile_img;
      userData.time_zone = responseData.time_zone;
      localStorage.setItem("userData", JSON.stringify(userData));

      return {
        status: 200,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in Updateing step 1", error.message);
    return { status: 400, message: error.message, data: "" };
  }
};

export const updateProfileStep2 = async (data) => {
  try {
    const finalData = await UTIL.addUserIdToData(data);
    const reqConfig = await UTIL.getHeader();
    console.log("api------>", finalData, reqConfig);

    let response = await axios.post(
      `${CONFIG.BASE_URL}/api/user/step-two`,
      finalData,
      reqConfig
    );
    if (response.data.status == 200) {
      let data = response.data.data;
      console.log("response data step 2 ====>", data);
      let userData = JSON.parse(localStorage.getItem("userData"));
      userData.public_profile = data.public_profile;
      userData.notification = data.notification;
      userData.message_status = data.message_status;
      userData.meeting_request = data.meeting_request;
      userData.info_status = data.info_status;
      userData.video_status = data.video_status;
      console.log("new userData--->", userData);
      localStorage.setItem("userData", JSON.stringify(data));

      return {
        status: 200,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in Updateing step 1", error.message);
    return { status: 400, message: error.message, data: "" };
  }
};

export const updateProfileStep3 = async (data) => {
  try {
    const finalData = await UTIL.addUserIdToData(data);
    const reqConfig = await UTIL.getHeader();
    console.log("api------>", finalData, reqConfig);

    let response = await axios.post(
      `${CONFIG.BASE_URL}/api/user/step-three`,
      finalData,
      reqConfig
    );
    if (response.data.status == 200) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      userData.interests = response.data.data.interests;
      userData.region = response.data.data.region;
      localStorage.setItem("userData", JSON.stringify(userData));

      return {
        status: 200,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in Updateing step 1", error.message);
    return { status: 400, message: error.message, data: "" };
  }
};

export const updateProfilePicture = (profilePicData) => {
  const formData = new FormData();
  formData.append("image", profilePicData);
  // return async (dispatch) => {
  //     axios.post(`${CONFIG.BASE_URL}/api/user/step-three`,finalData,reqConfig)
  //     .then(response => {
  //         console.log("updateProfileStep3",response.data)
  //         if(response.data.status==200){

  //             let userData = JSON.parse(localStorage.getItem('userData'))
  //             userData.interests=response.data.data.interests
  //             userData.region=response.data.data.region
  //             localStorage.setItem("userData",JSON.stringify(userData))

  //             dispatch(UserActionCreators.updateProfileStep3Success(response.data.data))
  //         }
  //         else{
  //             throw new Error(response.data.message)
  //         }
  //     })
  //     .catch(error =>{
  //         console.log("error in  updating profile step 3", error.message)
  //         dispatch(UserActionCreators.updateProfileStep3Failure(error.message))
  //     })
  // }
};

export const updateProfileVisibility = async (data) => {
  console.log("api updateProfileVisibility invoked-------->".data);
  try {
    const finalData = await UTIL.addUserIdToData(data);
    finalData.userId = finalData.user_id
    const reqConfig = await UTIL.getHeader();
    console.log("api------>", finalData, reqConfig);

    let response = await axios.post(
      `${CONFIG.BASE_URL}/api/user/updateProfileVisibility`,
      finalData,
      reqConfig
    );
    console.log("api response===================>", response.data);
    if (response.data.status == 200) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      // if(response.data.data.userData.public_profile==0){
      // }
      // else{
      //   userData.public_profile = 1;
      // }
      userData.public_profile = response.data.data.userData.public_profile;
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("userDta-------------------",userData)

      return {
        status: 200,
        message: response.data.message,
        data: userData,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in Updateing step 1", error.message);
    return { status: 400, message: error.message, data: "" };
  }
};
