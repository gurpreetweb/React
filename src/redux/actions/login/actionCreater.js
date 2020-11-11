import * as LoginActionConstant from './actions'

export const loginSubmit= () => {
    return {
        type: LoginActionConstant.LOGIN_SUBMIT
    }
}

export const loginSuccess= (data) => {
    return {
        type: LoginActionConstant.LOGIN_SUCCESS,
        payload : data
    }
}

export const loginFailure= (data) => {
    return {
        type: LoginActionConstant.LOGIN_FAILURE,
        payload: {errorMsg:data}
    }
}

export const resetError= (data) => {
    return {
        type: LoginActionConstant.RESET_ERROR
    }
}











