import {
  LOAD_USERDATA_TO_STORE,
  UPDATE_PROFILE_STEP_1_SUBMIT,
  UPDATE_PROFILE_STEP_1_FAILURE,
  UPDATE_PROFILE_STEP_1_SUCCESS,
  UPDATE_PROFILE_STEP_2_SUBMIT,
  UPDATE_PROFILE_STEP_2_FAILURE,
  UPDATE_PROFILE_STEP_2_SUCCESS,
  UPDATE_PROFILE_STEP_3_SUBMIT,
  UPDATE_PROFILE_STEP_3_FAILURE,
  UPDATE_PROFILE_STEP_3_SUCCESS,
  UPDATE_PROFILE_VISIBILITY_SUCCESS,
  UPDATE_PROFILE_VISIBILITY_FAILURE,
  CHANGE_PROFILE_PAGE
} from "../../actions/userData/actions";

const initialState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  company: "",
  department: "",
  jobTitle: "",
  phone: "",
  userRole: "",
  bio: "",
  province: "",
  profilePicId: "",
  timeZone: "",
  isProfilePublic: true,
  isNotifocationAllowed: false,
  isVideoChatAllowed: true,
  isStrangeMessageAllowed: true,
  isUserCanRequestMeeting: false,
  isInfoSharedToSponsors: true,
  region: "",
  interest: [],
  linkedInUrl: "",
  loadding: false,
  step1ApiError: "",
  step2ApiError: "",
  step3ApiError: "",
  currentProfileStep: 1,
  latitude: "",
  longitude: "",
  country: "",
  updateProfileVisibilityError:"",
  sponsor_name:""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERDATA_TO_STORE: {
      return {
        ...state,
        userId: action.payload._id,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        email: action.payload.email,
        role: action.payload.role,
        company: action.payload.company_name,
        department: action.payload.department,
        jobTitle: action.payload.job_title,
        phone: action.payload.mobile_number,
        bio: action.payload.bio,
        province: action.payload.state,
        profilePicId: action.payload.profile_img,
        timeZone: action.payload.time_zone,
        isProfilePublic: action.payload.public_profile,
        isNotifocationAllowed: action.payload.notification,
        isVideoChatAllowed: action.payload.video_status,
        isStrangeMessageAllowed: action.payload.message_status,
        isUserCanRequestMeeting: action.payload.meeting_request,
        isInfoSharedToSponsors: action.payload.info_status,
        region: action.payload.region,
        interest: action.payload.interests,
        linkedInUrl: action.payload.url,
        currentProfileStep: 1,
        userRole: action.payload.user_role,
        latitude: action.payload.latitude,
        longitude:action.payload.longitude,
        country: action.payload.country,
        sponsor_name:action.payload.sponsor_name
      };
    }
    case UPDATE_PROFILE_STEP_1_SUBMIT: {
      return {
        ...state,
        loading: true,
      };
    }

    case UPDATE_PROFILE_STEP_1_FAILURE: {
      return {
        ...state,
        loading: false,
        step1ApiError: action.payload.errorMsg,
      };
    }
    case UPDATE_PROFILE_STEP_1_SUCCESS: {
      return {
        ...state,
        loading: true,
        currentProfileStep: 2,
        jobTitle: action.payload.job_title,
        company: action.payload.company_name,
        department: action.payload.department,
        timeZone: action.payload.time_zone,
        bio: action.payload.bio,
        linkedInUrl: action.payload.url,
        userRole: action.payload.user_role,
        profilePicId: action.payload.profile_img,
      };
    }
    case UPDATE_PROFILE_STEP_2_SUBMIT: {
      return {
        ...state,
        loading: true,
      };
    }

    case UPDATE_PROFILE_STEP_2_FAILURE: {
      return {
        ...state,
        loading: false,
        step2ApiError: action.payload.errorMsg,
      };
    }
    case UPDATE_PROFILE_STEP_2_SUCCESS: {
      return {
        ...state,
        loading: false,
        currentProfileStep: 3,
        isProfilePublic: action.payload.public_profile,
        isNotifocationAllowed: action.payload.notification,
        isVideoChatAllowed: action.payload.video_status,
        isStrangeMessageAllowed: action.payload.message_status,
        isUserCanRequestMeeting: action.payload.meeting_request,
        isInfoSharedToSponsors: action.payload.info_status,
      };
    }
    case UPDATE_PROFILE_STEP_3_SUBMIT: {
      return {
        ...state,
        loading: true,
      };
    }

    case UPDATE_PROFILE_STEP_3_FAILURE: {
      return {
        ...state,
        loading: false,
        step3ApiError: action.payload.errorMsg,
      };
    }
    case UPDATE_PROFILE_STEP_3_SUCCESS: {
      return {
        ...state,
        loading: true,
        currentProfileStep: 1,
        interest: action.payload.interests,
        region: action.payload.region,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        country: action.payload.country
      };
    }
    case UPDATE_PROFILE_VISIBILITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        isProfilePublic:action.payload.public_profile
      };
    }
    case UPDATE_PROFILE_VISIBILITY_FAILURE: {
      return {
        ...state,
        loading: false,
        updateProfileVisibilityError: action.payload.errorMsg,
      };
    }
    case CHANGE_PROFILE_PAGE: {
      return {
        ...state,
        currentProfileStep: action.payload.pageNo,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default userReducer;
