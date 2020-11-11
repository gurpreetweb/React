import React, { Component } from "react";

import * as CONFIG from '../../config.json'
import * as AGENDA_APIS from "../../api/agenda/index";
import Loader from "react-loader-spinner";


class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {url_data:'',agendaData:{time_zone:{}},attendees:[{user:{}}],videoUrl:"",loader:true};
  }





  async componentDidMount() {

    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    var agenda_id = match.params.webinarId;
    await  AGENDA_APIS.getAgendaById(this.props.match.params.webinarId).then((result) => {
      console.log("result---->", result);
      if (result.status === 200) {
        this.setState({agendaData:result.data});
        this.setState({attendees:result.attendees});
        this.setState({videoUrl:result.data.videos[0]});
      } else {
        console.log("eror===>", result.message);
      }
    });
   await AGENDA_APIS.createAgendaJoin(agenda_id, userData._id);
this.setState({loader:false})
  }


  
  render() {
  console.log('this.propsssssssssssssssss');
  console.log(this.props);
   
    return (
   <>
   <Loader
        className="circle_cover"
        type="Rings"
        color="#2b2497"
        height="100"
        width="100"
        visible={this.state.loader}
      />
   <div id="page-content-wrapper">
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>Webinar</h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="livemeetingPage">
            <div className="liveMeetTitle">
              <div className="meetingTitle">
                <h3><span className="backBtn"><a href><i className="fa fa-angle-left" /></a></span>{this.state.agendaData.title}</h3>
              </div>
              {/* <div className="followBtn">
                <i className="fa fa-heart" />
                <span className="followText">Follow</span>
              </div> */}
            </div>
            <div className="shareScreTabingSec">
              <div className="shareScreBlock">
                <div className="shareScreHead">
                  <div className="screenShareOuter"><img src="/images/icons/screenShare.png" alt="" />
                    <div className="screenInnerTitle">
                      <h5>Screensharing</h5>
                      <h3>Presenter is not screensharing yet</h3>
                    </div>
                  </div>
                  <div className="expandIcon"><img src="/images/icons/expandIcon.png" alt="" /></div>
                </div>
                <div className="PresentedCamera">
                  {/* <img src="images/icons/cameraImage.jpg" alt="" /> */}
                  <iframe  width="100%" src ={"https://event.hospitalityliving.com/static/stream.html?streamKey="+this.props.match.params.webinarId} style={{height: 'calc(100vh - 7px)'}}/>
                </div>
              </div>
              <div className="liveTabbingBlock">
                <div className="liveTabbingInner">
                  <ul className="nav nav-tabs agendaTab">
                    <li className><a data-toggle="tab" href="#audienceTab" className="active">Audience</a></li>
                    <li><a data-toggle="tab" href="#qandaTab">Q &amp; A</a></li>
                    <li><a data-toggle="tab" href="#notesTab">Notes</a></li>
                  </ul>
                  <div className="tab-content agendaContent">
                    <div id="audienceTab" className="tab-pane fade in active">
                      <div className="audienceTabSection">
                        <div className="audienceTitle">
                          <h3><i className="fa fa-users" aria-hidden="true" /> Attendies</h3>
                        </div>
                        <div className="liveAttendiesList">
                        {this.state.attendees.map((attendee, index) => {
              if(attendee.user.role == 3)
              {
                return (
                          <div className="liveAttendPeople">
                            <div className="liveAttendImg">
                            <img src={CONFIG.BASE_URL+"/uploads/"+attendee.user.profile_img} alt />
                            </div>
                            <div className="liveAttendDetail">
                              <h3>{attendee.user.first_name+' '+attendee.user.last_name}</h3>
                              <h5>{attendee.user.company_name}</h5>
                            </div>
                          </div>
                           );
                          }
                          })} 
                          
                          
                        </div>
                      </div>
                    </div>
                    <div id="qandaTab" className="tab-pane fade">
                      <div className="liveQuestionTab">
                        <div className="audienceTitle">
                          <h3> Question and Answer</h3>
                        </div>
                        <div className="liveQuestionList">
                          <div className="boxscroll">
                            <div className="liveQuestionBox">
                              <div className="questionImg">
                                <img src="/images/attendeeImg-1.jpg" alt="" />
                              </div>
                              <div className="questionDetail">
                                <h3>Weian Shaeng</h3>
                                <p>Should all virtual events be on live video?</p>
                              </div>
                            </div>
                            <div className="liveQuestionBox">
                              <div className="questionImg">
                                <img src="/images/attendeeImg-2.jpg" alt="" />
                              </div>
                              <div className="questionDetail">
                                <h3>Weian Shaeng</h3>
                                <p>How do I combine produced video with live video to maintain audience attention?</p>
                              </div>
                            </div>
                            <div className="liveQuestionBox">
                              <div className="questionImg">
                                <img src="/images/attendeeImg-3.jpg" alt="" />
                              </div>
                              <div className="questionDetail">
                                <h3>Weian Shaeng</h3>
                                <p>How can we use live video to promote a virtual event before and after?</p>
                              </div>
                            </div>
                            <div className="liveQuestionBox">
                              <div className="questionImg">
                                <img src="/images/attendeeImg-3.jpg" alt="" />
                              </div>
                              <div className="questionDetail">
                                <h3>Weian Shaeng</h3>
                                <p>How did you find out about the webinar?</p>
                              </div>
                            </div>
                            <div className="liveQuestionBox">
                              <div className="questionImg">
                                <img src="/images/attendeeImg-4.jpg" alt="" />
                              </div>
                              <div className="questionDetail">
                                <h3>Weian Shaeng</h3>
                                <p>What should we do to limit the risk involved with live streaming on the day of the event?</p>
                              </div>
                            </div>
                            <div className="liveQuestionBox">
                              <div className="questionImg">
                                <img src="/images/attendeeImg-5.jpg" alt="" />
                              </div>
                              <div className="questionDetail">
                                <h3>Weian Shaeng</h3>
                                <p>How did you find out about the webinar?</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="writeQuestionSend">
                          <div className="writeQuestoinBox">
                            <textarea className="form-control" rows={2} id="comment" placeholder="Write your question" defaultValue={""} />
                          </div>
                          <div className="questionSend">
                            <button type="button" className="btn"><i className="fa fa-paper-plane" aria-hidden="true" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="notesTab" className="tab-pane fade">
                      <div className="liveNotesTab">
                        <div className="audienceTitle">
                          <h3>My Notes</h3>
                        </div> 
                        <div className="liveNotesSave">
                          <div className="liveNotesBox">
                            <div className="liveNotesTitle">
                              <input type="text" className="form-control" id placeholder="Title" />
                            </div>
                            <div className="liveNotesDescription">
                              <textarea className="form-control" rows={5} id="comment" placeholder="Write your question" defaultValue={""} />
                            </div>
                            <div className="notesSaveColl">
                              <button type="submit" className="btn btn-primary mb-2">Save Note</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </div>
          {/* End Inner Sec */}
        </div>
      </div>
  
   
  
   </>
    );
  }
}

export default Conference;
