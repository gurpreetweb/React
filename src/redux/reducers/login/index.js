import * as LoginActionCreator from '../../actions/login/actions'

const initialState = {
    isLoggedIn : false,
    errorMsg : "",
    loading : false
}


const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case LoginActionCreator.LOGIN_SUCCESS : {
            return {
                ...state,
                isLoggedIn:true,
                loading:false  ,
                errorMsg:""
            } 
        }

        case LoginActionCreator.LOGIN_FAILURE : {
            return {
                ...state,
                loading:false,
                errorMsg:action.payload.errorMsg
            } 
        }
        case LoginActionCreator.LOGIN_SUBMIT : {
            return {
                ...state,
                loading:true
            } 
        }
        case LoginActionCreator.RESET_ERROR : {
            return {
                ...state,
                errorMsg:""
            } 
        }
        default : {
            return state
        }
    }
}

export default loginReducer