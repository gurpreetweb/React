import axios from "axios";
import { CometChat } from "@cometchat-pro/chat";

import * as CONFIG from "../../config.json";
import * as UserActionCreators from "../../redux/actions/userData/actionCreater1.js";
import * as UTIL from "../../Utils/util";

let API_KEY = CONFIG.COMMET_CHAT.API_KEY;

export const chatInitialization = async () => {
  const appID = CONFIG.COMMET_CHAT.APP_ID;
  const region = CONFIG.COMMET_CHAT.REGION;
  console.log(
    "aashi ============= chat api",
    JSON.parse(localStorage.getItem("userData"))
  );
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  try {
    let result = await CometChat.init(appID, appSetting);
    console.log("result===>", result);
    if (result == true) {
      const signupdata = await cometSignup();
      var userData = JSON.parse(localStorage.getItem("userData"));
      console.log("aashi======>chat api ---->user data---->", userData);
      if (userData && userData.lounge_type == "chat_room") {
        var self = this;
        var GUID = userData._id;
        var groupName = userData.lounge_title;
        var groupType = CometChat.GROUP_TYPE.PUBLIC;
        var password = "";

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(
          (group) => {
            console.log("Group created successfully:", group);
          },
          (error) => {
            console.log("Group creation failed with exception:", error);
          }
        );
      }
      if (signupdata != "") {
        const loginData = await login();
        console.log("loginData===", loginData);
        return loginData;
      } else {
        const loginData = await login();
        console.log("loginData===", loginData);
        return loginData;
      }
    } else {
      throw new Error("Error in chat Initialization");
    }
  } catch (error) {
    console.log("Initialization failed with error:", error.message);
    return "";
  }
};
export const cometSignup = async () => {
  let apiKey = API_KEY;
  let user_data = JSON.parse(localStorage.getItem("userData"));

  try {
    var uid = user_data._id;
    var name = user_data.first_name
      ? user_data.first_name + " " + user_data.last_name
      : user_data.sponsor_name;

    var user = new CometChat.User(uid);

    user.setName(name);

    CometChat.createUser(user, apiKey).then(
      async (user) => {
        console.log("user created", user);
        try {
          let result = await CometChat.login(user_data._id, apiKey);
          console.log("chat login data===>", result);
          return result;
        } catch (error) {
          console.log("Login failed with error:", error.message);
          return "";
        }
      },
      async (error) => {
        console.log("errorr", error);
        try {
          let result = await CometChat.login(user_data._id, apiKey);
          console.log("chat login data===>", result);
          return result;
        } catch (error) {
          console.log("Login failed with error:", error.message);
          return "";
        }
      }
    );
    //return result
  } catch (error) {
    console.log("Login failed with error:", error.message);
    return "";
  }
};
export const login = async () => {
  let apiKey = API_KEY;
  let userData = JSON.parse(localStorage.getItem("userData")) 
  let UID = userData._id;

  console.log("aashi ====> chat ===>login====>userData",userData)

  try {
    let result = await CometChat.login(UID, apiKey);
    console.log("chat login data===>", result);
    return result;
  } catch (error) {
    console.log("Login failed with error:", error.message);
    return "";
  }
};

export const logoutChat = async () =>{
  console.log("aashi => chat => logout")
 try {
   let logoutData= await CometChat.logout()
   console.log("aashi chat logout data ---->",logoutData)
   return "done"
 } catch (error) {
  console.log("aashi chat logout error.message ---->",error.message)
  return ""
 }
}
