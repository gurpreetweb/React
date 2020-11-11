import axios from "axios";

import * as CONFIG from "../../config.json";
import * as UTIL from "../../Utils/util";

export const polls = async () => {
  const reqConfig = await UTIL.getHeader();
  let userData = JSON.parse(localStorage.getItem("userData"));
  let response = await axios.get(
    `${CONFIG.BASE_URL}/api/agendajoin/${userData._id}`,
    reqConfig
  );
  return response;
};

export const addReview = async (reviews, agendaId, agendaJoinId) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  var data = {
    userId: userData._id,
    agendaId: agendaId,
    joinedAgendaId: agendaJoinId,
    answer_one: reviews.answer_one,
    answer_two: reviews.answer_two,
    answer_three: reviews.answer_three,
    answer_four: reviews.answer_four,
    answer_five: reviews.answer_five,
  };
  const reqConfig = await UTIL.getHeader();
  let response = await axios.post(
    `${CONFIG.BASE_URL}/api/add-review/`,
    data,
    reqConfig
  );
  return response;
};

export const getReview = async (agendaId, joinedAgendaId) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  var data = {
    userId: userData._id,
    agendaId: agendaId,
    joinedAgendaId: joinedAgendaId,
  };
  console.log(data, "in the api data");
  const reqConfig = await UTIL.getHeader();
  let response = await axios.get(
    `${CONFIG.BASE_URL}/api/review/${userData._id}/${agendaId}/${joinedAgendaId}`,
    data,
    reqConfig
  );
  console.log(response, "in the response");
  return response;
};
