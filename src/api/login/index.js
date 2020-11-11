import axios from 'axios';
import * as CONFIG from '../../config.json'
import * as LoginActionCreators from '../../redux/actions/login/actionCreater'
import { CometChat } from "@cometchat-pro/chat"


export const login = (loginData,props) => {

    return (dispatch) => {
        dispatch(LoginActionCreators.loginSubmit())
        axios.post(`${CONFIG.BASE_URL}/api/login`,loginData)
        .then(response => {
            console.log("LoginResponse-----------------------",response.data)
            if(response.data.status==200){
                var appID = "APP_ID";
                var region = "us";
                var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
                CometChat.init(appID, appSetting).then(
                () => {
                    console.log("Initialization completed successfully");
                    // You can now call login function.
                },
                error => {
                    console.log("Initialization failed with error:", error);
                    // Check the reason for error and take appropriate action.
                }
                );
                localStorage.setItem("userData",JSON.stringify(response.data.user))
                dispatch(LoginActionCreators.loginSuccess())
               props.history.push('/dashboard')
            //  window.location.href = "/dashboard";
            }
            else{
                throw new Error(response.data.message)
            }
        })
        .catch(error =>{
            console.log("error in login", error.message)
            dispatch(LoginActionCreators.loginFailure(error.message))
        })
    }
}
