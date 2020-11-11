import React, { Component } from "react";
import * as CONFIG from '../../config.json'
import axios from "axios";
import * as AGENDA_APIS from "../../api/agenda/index";

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {url_data:''};
  }



  async componentDidMount() {
    let user_data = JSON.parse(localStorage.getItem("userData"));
    if (user_data) {
      axios.defaults.headers.common["token"] =
        "Bearer" + " " + user_data.token;
      var data12 = {
        room: this.props.match.params.title,
        stream_key: this.props.match.params.webinarId,
      };
      await axios
        .post(CONFIG.BASE_URL + "/api/auth-jitsi", data12)
        .then(async (res) => {
         // window.open(res.data.data, "_blank");
         this.setState({url_data:res.data.data})
        //  window.open("/webinar/"+agenda_id+"/"+title.replace(/ |-|\.|/g, ""), "_blank");
        })
        .catch((err) => {});
    }
    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    var agenda_id = match.params.webinarId;
   //await AGENDA_APIS.createAgendaJoin(agenda_id, userData._id);
 
  }


  
  render() {

   
    return (
   <>
   <iframe  width="100%" allow="camera; microphone" src ={this.state.url_data} style={{height: 'calc(100vh - 7px)'}}/>
   </>
    );
  }
}

export default Conference;
