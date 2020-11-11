import axios from "axios";
import * as CONFIG from "../../config.json";
import * as UTIL from "../../Utils/util";

export const getTimeZone = async () => {
  try {
    const reqConfig = await UTIL.getHeader();
    const response = await axios.get(
      `${CONFIG.BASE_URL}/api/timezones`,
      reqConfig
    );
    console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return [];
  }
};

export const getDesignation = async () => {
  try {
    //  const reqConfig = await UTIL.getHeader()
    const response = await axios.get(`${CONFIG.BASE_URL}/api/designation`);
    console.log("response designation------>", response);
    if (response.data.status == 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg designation====>", error.message);
    return [];
  }
};

export const getTags = async (eventId) => {
  try {
    const reqConfig = await UTIL.getHeader();
    const response = await axios.get(
      `${CONFIG.BASE_URL}/api/fetch-tags/${eventId}`,
      reqConfig
    );
    console.log("response tags------>", response);
    if (response.data.status == 200) {
      return response.data.data.tagsList;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg designation====>", error.message);
    return [];
  }
};

export const getEventDeatil = async () => {
  console.log("Api ==> getEventDeatil===>invoked")
  try {
    // const event_url = window.lo/cation.hostname
    // const event_url = "illumeetvirtual.com"
    const event_url = "elevate.illumeetvirtual.com"
    const response = await axios.get(
    `${CONFIG.BASE_URL}/api/event-theme/${event_url}`
    )
    console.log("reponse============>",response)
    if(response.data.status==200){
    console.log("reponse if============>",response)

      return response.data.data
    }
    else{
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.log("error=====>",error.message)
    return ""
  }
}
