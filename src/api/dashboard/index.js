import axios from "axios";
import * as CONFIG from "../../config.json";
import * as UTIL from "../../Utils/util";

export const dashBoard = async () => {
  const reqConfig = await UTIL.getHeader();
  let response = await axios.get(
    `${CONFIG.BASE_URL}/api/dashboard/${localStorage.getItem('eventId')}`,
    reqConfig
  );
  return response;
};
