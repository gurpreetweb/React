import axios from "axios";

import * as CONFIG from "../../config.json";
import * as UTIL from "../../Utils/util";

export const addNotes = async (adengaJoinId, note_title, note_description) => {
  const data = {
    note_title: note_title,
    note_description: note_description,
  };
  console.log(data, adengaJoinId, "sdfghjk");
  const reqConfig = await UTIL.getHeader();
  let response = await axios.post(
    `${CONFIG.BASE_URL}/api/add-note/${adengaJoinId}`,
    data,
    reqConfig
  );
  console.log(response);
  return response;
};
