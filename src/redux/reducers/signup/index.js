//signup reducer
import { 
    SIGNUP_STEP_1_SUBMIT,
    FETCH_SECURITY_QUESTIONS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUBMIT,
    RESET_ERROR
} from '../../actions/signup/actions'

const initialState = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    province:"",
    company:"",
    jobTitle:"",
    phone:"",
    role:"",
    securityQuestion:[],
    apiErrorMessage:"",
    loading:false
}


const signupReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNUP_STEP_1_SUBMIT : {
            return {
                ...state,
                firstName:action.payload.firstName,
                lastName:action.payload.lastName,
                email:action.payload.email,
                password:action.payload.password,
                confirmPassword:action.payload.confirmPassword,
                province:action.payload.state,
                company:action.payload.company,
                jobTitle:action.payload.jobTitle,
                phone:action.payload.phone,
                role:action.payload.role
            } 
        }

        case SIGNUP_SUBMIT : {
            return {
                ...state,
                loading:true
            } 
        }

        case SIGNUP_SUCCESS : {
            return {
                ...state,
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                confirmPassword:"",
                province:"",
                company:"",
                jobTitle:"",
                phone:"",
                role:"",
                apiErrorMessage:"",
                loading:false
            } 
        }
        case SIGNUP_FAILURE : {
            return {
                ...state,
                loading:false,
                apiErrorMessage:action.payload.message
            } 
        }
        case FETCH_SECURITY_QUESTIONS : {
            return {
                ...state,
                securityQuestion : action.payload
            } 
        }
        case RESET_ERROR : {
            return {
                ...state,
                apiErrorMessage : ""
            } 
        }
        default : {
            return state
        }

    }
}

export default signupReducer