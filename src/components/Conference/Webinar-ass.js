import React, { Component } from "react";



class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  async componentDidMount() {

    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    var agenda_id = match.params.webinarId;
   // await AGENDA_APIS.createAgendaJoin(agenda_id, userData._id);
  }


  
  render() {
  console.log('this.propsssssssssssssssss');
  console.log(this.props);
   
    return (
   <>
   {/* <iframe  width="100%" src ={`https://event-staging.hospitalityliving.com/static/stream.html?streamKey=/${this.props.match.params.webinarId}`} style={{height: 'calc(100vh - 7px)'}}/> */}
   <iframe  width="100%" src ={"https://event-staging.hospitalityliving.com/static/stream.html?streamKey="+this.props.match.params.webinarId} style={{height: 'calc(100vh - 7px)'}}/>
   </>
    );
  }
}

export default Conference;
