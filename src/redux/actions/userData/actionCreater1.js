import * as UserDataActionConstant from './actions'

export const loadUserDataToStore = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    return {
        type: UserDataActionConstant.LOAD_USERDATA_TO_STORE,
        payload : userData
    }
}

export const updateProfileStep1= () => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_1_SUBMIT
    }
}

export const updateProfileStep1Success= (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_1_SUCCESS,
        payload : data
    }
}

export const updateProfileStep1Failure = (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_1_FAILURE,
        payload: {errorMsg:data}
    }
}

export const updateProfileStep2= () => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_2_SUBMIT
    }
}

export const updateProfileStep2Success= (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_2_SUCCESS,
        payload : data
    }
}

export const updateProfileStep2Failure = (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_2_FAILURE,
        payload: {errorMsg:data}
    }
}

export const updateProfileStep3= () => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_3_SUBMIT
    }
}

export const updateProfileStep3Success= (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_3_SUCCESS,
        payload : data
    }
}

export const updateProfileStep3Failure = (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_STEP_3_FAILURE,
        payload: {errorMsg:data}
    }
}

export const updateProfileVisibilitySuccess= (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_VISIBILITY_SUCCESS,
        payload : data
    }
}

export const updateProfileVisibilityFailure= (data) => {
    return {
        type: UserDataActionConstant.UPDATE_PROFILE_VISIBILITY_FAILURE,
        payload: {errorMsg:data}
    }
}

export const changeProfilePage= (pageNo) => {
    return {
        type: UserDataActionConstant.CHANGE_PROFILE_PAGE,
        payload: {pageNO:pageNo}
    }
}













