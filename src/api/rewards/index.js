import axios from "axios";
import * as CONFIG from "../../config.json";
import * as UTIL from "../../Utils/util";

export const getRewardsCategory = async () => {
  try {
    const response = await axios.get(
      `${CONFIG.BASE_URL}/api/quest/fetchRewardsCategory`
    );

    if (response.data.status == 200) {
      return {
        status: 200,
        data: response.data.data.rewardsCategoryData,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg Suggested agendas====>", error.message);
    return { status: 400, data: {} };
  }
};

export const getPointData = async () => {
  console.log("api aashish")
  try {
    let userId = JSON.parse(localStorage.getItem("userData"))._id;
    const response = await axios.get(
      `${CONFIG.BASE_URL}/api/quest/fetchPoints/${userId}`
    );

    if (response.data.status == 200) {
      return {
        status: 200,
        data: response.data.data.pointsData,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg pointsdata====>", error.message);
    return { status: 400, data: {} };
  }
};

export const getLeaderBoardData = async () => {
  console.log("api aashish")
  try {
    let userId = JSON.parse(localStorage.getItem("userData"))._id;
    const response = await axios.get(
      `${CONFIG.BASE_URL}/api/quest/fetchLeaderboard/${userId}`
    );

    if (response.data.status == 200) {
      return {
        status: 200,
        data: response.data.data.leaderBoard,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in fetchinhg getLeaderBoardData====>", error.message);
    return { status: 400, data: {} };
  }
};
