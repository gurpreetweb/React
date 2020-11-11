import axios from "axios";
import moment from "moment";
import * as CONFIG from "../../config.json";
import * as UserActionCreators from "../../redux/actions/userData/actionCreater1.js";
import * as UTIL from "../../Utils/util";

export const getAgendaDate = async (page, limit) => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      user_id: userData._id,
      page: page,
      limit: limit,
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/dates`,
      data,
      reqConfig
    );
    console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return [];
  }
};

export const getAgendaByDate = async (date, page, limit) => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData"));
    //console.log("date================", date, page, limit);
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      date: moment(parseInt(date) * 1000).format("DD-MM-YYYY"),
      page: page,
      user_id: userData._id,
      limit: limit,
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/databy-date`,
      data,
      reqConfig
    );
    // console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return [];
  }
};

export const getFavAgendaByDate = async (date, page, limit) => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData"));
    //console.log("date================", date, page, limit);
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      date: moment(parseInt(date) * 1000).format("DD-MM-YYYY"),
      page: page,
      user_id: userData._id,
      limit: limit,
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/fav/databy-date`,
      data,
      reqConfig
    );
    // console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return [];
  }
};

export const getLiveAgenda = async (page, limit) => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData"));
    //console.log("date================", date, page, limit);
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      page: page,
      user_id: userData._id,
      limit: limit,
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/live-now`,
      data,
      reqConfig
    );
    // console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return [];
  }
};

export const getAgendaById = async (agenda_id) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      agenda_id: agenda_id,
      event_id: localStorage.getItem('eventId'),
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/databy-id`,
      data,
      reqConfig
    );
    console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in eventDeaitl====>", error.message);
    return { status: 400, message: error.message, data: {} };
  }
};

export const markAgendaAsFavourite = async (agendaId, status) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      agenda_id: agendaId,
      status: status,
    };
    const finalData = await UTIL.addUserIdToData(data);
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/add-as-favourite`,
      finalData,
      reqConfig
    );
    console.log("response------>", response);
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return { status: 400 };
  }
};

export const participantCount = async (agendaId, action) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      agenda_id: agendaId,
      action: action,
    };
    const finalData = await UTIL.addUserIdToData(data);
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/participant_count`,
      finalData,
      reqConfig
    );
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error);
    return { status: 400 };
  }
};

export const AddSponsorparticipantCount = async (agendaId, action) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem('eventId'),
      agenda_id: agendaId,
      action: action,
      userId: JSON.parse(localStorage.getItem("userData"))._id,
    };
    const finalData = await UTIL.addUserIdToData(data);
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/sponsor-participant-count`,
      finalData,
      reqConfig
    );
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error);
    return { status: 400 };
  }
};

export const getParticipantCount = async (agendaId) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      agenda_id: agendaId,
      event_id: localStorage.getItem('eventId'),
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/participants_count`,
      data,
      reqConfig
    );
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error);
    return { status: 400 };
  }
};

export const getSponsorParticipantCount = async (agendaId) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      agenda_id: agendaId,
      event_id: localStorage.getItem('eventId'),
    };
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendas/participants-count-sponsor`,
      data,
      reqConfig
    );
    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error);
    return { status: 400 };
  }
};

export const createAgendaJoin = async (agendaId, userId) => {
  try {
    const reqConfig = await UTIL.getHeader();
    let data = {
      agendaId: agendaId,
      eventId: localStorage.getItem('eventId'),
      userId: userId,
      status: true,
    };
    //console.log(data,"in the agenda join data")
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/agendajoin`,
      data,
      reqConfig
    );

    if (response.data.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error);
    return { status: 400 };
  }
};

export const getOnDemandData = async (skip, limit, option) => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const reqConfig = await UTIL.getHeader();
    let data = {
      event_id: localStorage.getItem("eventId"),
      user_id: userData._id,
      skip: skip,
      limit: limit,
    };
    if (option.alphaSort) {
      data.alphaSort = option.alphaSort;
    }
    if (option.searchQuery) {
      data.search = option.searchQuery;
    }

    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/fetch/on-demand`,
      data,
      reqConfig
    );
    console.log("response------>", response);
    if (response.data.status == 200) {
      return {
        status: 200,
        message: response.data.message,
        data: response.data,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg timeZones====>", error.message);
    return {
      stats: 400,
      message: error.message,
      data: [],
    };
  }
};
