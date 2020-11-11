import React, { Component } from "react";
import * as CONFIG from '../../config.json'
import axios from "axios";
import * as AGENDA_APIS from "../../api/agenda/index";
import io from "socket.io-client";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Link,
} from "react-router-dom";
import SinglePageHeader from "../../elevate/common/HeaderSinglePage"

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url_data: "",
      agendaData: { time_zone: {} },
      attendees: [{ user: {} }],
      videoUrl: "",
      questionArr: [],
      myQuestion: "",
      loading:false,
      data:{
      },
      error:{},
      message:'',
      errorMessage:'',
    };
    this.onSubmit = this.onSubmit.bind(this);




    if (localStorage.getItem("userData")) {
      this.socket = io("https://admin.illumeetvirtual.com", {
        secure: true,
        query: {
          token: `barier ${JSON.parse(localStorage.getItem("userData")).token}`,
        },
      });
      this.socket.on("connect", function (data) {
        console.log(" socket connection establish");
      });
      this.socket.on("newMessage", async (data) => {
        console.log("newMessage==========>", data);
        this.setState(
          {
            questionArr: this.state.questionArr.concat(data),
          },
          () => {
            console.log("newMess ate", this.state);
            this.scrollToBottom();
          }
        );
      });
    }
  }

  sendQuestion = () => {
    if(this.state.myQuestion)
    {
    console.log("sendQuestion invoked", this.props.match.params);
    this.socket.emit("askQuestion", {
      agendaId: `${this.props.match.params.webinarId}`,
      message: this.state.myQuestion,
    });
    this.setState(
      {
        questionArr: this.state.questionArr.concat({
          userData: JSON.parse(localStorage.getItem("userData")),
          message: this.state.myQuestion,
        }),
      },
      () => {
        this.setState({
          myQuestion: "",
        });
      }
    );
    }
  };

  getPreviousQuestion = async () => {
    try {
      let questionData = await axios.get(
        `${CONFIG.BASE_URL}/api/liveQuestion?agendaId=${this.props.match.params.webinarId}`
      );
      console.log("old Question=======", questionData.data);
      if (questionData.data.status == 200) {
        this.setState({
          questionArr: this.state.questionArr.concat(questionData.data.data),
        });
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  handleQuestionChange = async (event) => {
    console.log("handleeQuestionChange invoked", this.props.match.params);
    this.setState(
      {
        myQuestion: event.target.value,
      },
      () => {
        this.scrollToBottom();
      }
    );
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  async componentDidMount() {
    this.setState({loading:true});

    await this.getPreviousQuestion();
    let user_data = JSON.parse(localStorage.getItem("userData"));
    if (user_data) {
      axios.defaults.headers.common["token"] =
        "Bearer" + " " + user_data.token;
      var data12 = {
        name: user_data.first_name+' '+user_data.last_name,
        uid: user_data._id,
        event: localStorage.getItem('eventId'),
        room: this.props.match.params.title,
        stream_key: this.props.match.params.webinarId,
      };
      await axios
        .post(CONFIG.BASE_URL + "/api/auth-jitsi", data12)
        .then(async (res) => {
         // window.open(res.data.data, "_blank");
         this.setState({url_data:res.data.data.streamLink})
        //  window.open("/webinar/"+agenda_id+"/"+title.replace(/ |-|\.|/g, ""), "_blank");
        })
        .catch((err) => {});
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
    }
    this.setState({loading:false});
    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    var agenda_id = match.params.webinarId;
  var agenda_data =  await AGENDA_APIS.createAgendaJoin(agenda_id, userData._id);
  this.setState({data:agenda_data.data});
 
  }


  onChange(el)
  {
      let inputName = el.target.name;
      let inputValue = el.target.value;
      let statusCopy = Object.assign({}, this.state);
      statusCopy.data[inputName] = inputValue;
      this.setState(statusCopy);
      this.setState({error:{},message:'',errorMessage:''});
      //console.log(this.state.error.inputName);
  }

  onSubmit(event)
{	
  event.preventDefault();
  var adengaJoinId ='';
		this.setState({error:{}});

		if(!this.state.data.note_title)
		{ 
			this.setState({error:{note_title: 'Title field is required!' }});
			//createNotification('error','Please fill all fields!','');
    }
    else if(!this.state.data.note_description)
		{
			this.setState({error:{note_description: 'Description field is required!' }});
			//createNotification('error','Please fill all fields!','');
    }
    else
		{
      this.setState({loading:true});

                var data ={
                            'note_title':this.state.data.note_title,
                            'note_description':this.state.data.note_description,
                          };
              axios.post(CONFIG.BASE_URL+"/api/add-note/"+this.state.data._id, data)
              .then(res => 
              {
                this.setState({loading:false});

                if(res.data.status == 200)
                {
                  toast.success("Notes updated successsfully.");
                }
                else if(res.data.status == 500)
                {
                  toast.error("Something went wrong, please try again later.");
                  this.setState({errorMessage: 'Something went wrong, please try again later!' });
                }
                else{
                  toast.error("Something went wrong, please try again later.");
                  this.setState({errorMessage: res.data.message });
                }
                
                
              }) 
              .catch(err => 
              {	
                toast.error("Something went wrong, please try again later.");
                this.setState({loading:false});
                this.setState({errorMessage: 'Something went wrong, please try again later!' });
          
              });
    }
	
  
  };


  
  render() {
    return (
      <>
       {/* <Loader
          className="circle_cover"
          type="Rings"
          color="#2b2497"
          height="100"
          width="100"
          visible={this.state.loading}
        /> */}
        <div>
        <ToastContainer />
        <SinglePageHeader />
        <div className="siteContainer">
          <div className="d-flex contentSection" id="wrapper">
            {/* <span class="secTopRightBdr"></span> */}
            <div className="elevateFullWidth">
              {/* <div class="elevateBackBtn">
            <a href="#"><img src="images/backBtn.png" alt="" />Back</a>
          </div> */}
              <div className="elevateSingleAgenda">
                <div className="singleAgenTitle">
                  <div className="agendaTitle">
                    <span className="agendaBackBtn">    <Link to={"/"}><i className="fa fa-angle-left" /></Link></span>
                    <h3 className="agendaTitleText"> {this.state.agendaData.title}</h3>
                  </div>
                  {/* <div className="agendaFollow">
                    <i className="fa fa-heart" />
                    <span className="followText">Follow</span>
                  </div> */}
                </div>
              </div>
              <div className="shareScreTabingSec">
                <div className="shareScreBlock">
                  <div className="shareScreHead">
                    <div className="screenShareOuter"><img src="/images/screenShare.png" alt="" />
                      <div className="screenInnerTitle">
                        <h5>Thanks for Joining !! Enjoy your Webinar.</h5>
                        {/* <h3>Presenter is not screensharing yet</h3> */}
                      </div>
                    </div>
                  </div>
                  <div className="PresentedCamera">
                    {/* <img src="images/cameraImage.jpg" alt="" /> */}
                    <iframe
                      width="100%"
                      allow="camera; microphone"
                      src={this.state.url_data}
                      style={{ height: "calc(100vh - 7px)" }}
                    />
                  </div>
                </div>
                <div className="liveTabbingBlock">
                  <div className="liveTabbingInner">
                    <ul className="nav nav-tabs agendaTab">
                      <li className><a data-toggle="tab" href="#audienceTab" className="active">Audience</a></li>
                      <li><a data-toggle="tab" href="#qandaTab">Q &amp; A</a></li>
                      {/* <li><a data-toggle="tab" href="#notesTab">Notes</a></li> */}
                    </ul>
                    <div className="tab-content agendaContent">
                      <div id="audienceTab" className="tab-pane fade in active">
                      
                        <div className="audienceTabSection">
                          <div className="audienceTitle">
                            <h3><i className="fa fa-users" aria-hidden="true" /> Attendies</h3>
                          </div>
                         
                          <div className="liveAttendiesList">
                          {this.state.attendees.map((attendee, index) => {
                              if (attendee.user && attendee.user.role == 3) {
                                return (
                            <div className="liveAttendPeople">
                              <div className="liveAttendImg">
                                <img src={
                                          CONFIG.BASE_URL +
                                          "/uploads/" +
                                          attendee.user.profile_img
                                        } alt="" />
                              </div>
                              <div className="liveAttendDetail">
                                <h3>{attendee.user.first_name +
                                          " " +
                                          attendee.user.last_name}</h3>
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
                            <h3><i class="fa fa-question-circle" aria-hidden="true"></i> Question and Answer</h3>
                          </div>
                          <div className="liveQuestionList">
                            <div className="boxscroll">
                              {this.state.questionArr.length > 0 ? (
                                this.state.questionArr.map((question) => {
                                  return (
                                    <div className="liveQuestionBox">
                                      <div className="questionImg">
                                        {
                                          question.userData &&
                                        <img
                                        src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${question.userData.profile_img}`}
                                        alt=""
                                        />
                                      }
                                      </div>
                                      <div className="questionDetail">
                                        <h3>{question.userData && question.userData.first_name}</h3>
                                        <p>
                                          {question.message}
                                          {/* Should all virtual events be on live
                                        video? */}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div>Be the one to ask question</div>
                              )}
                              {/* <div className="liveQuestionBox">
                                <div className="questionImg">
                                  <img src="/images/attendeeImg-2.jpg" alt="" />
                                </div>
                                <div className="questionDetail">
                                  <h3>Weian Shaeng</h3>
                                  <p>
                                    How do I combine produced video with live
                                    video to maintain audience attention?
                                  </p>
                                </div>
                              </div>
                              <div className="liveQuestionBox">
                                <div className="questionImg">
                                  <img src="/images/attendeeImg-3.jpg" alt="" />
                                </div>
                                <div className="questionDetail">
                                  <h3>Weian Shaeng</h3>
                                  <p>
                                    How can we use live video to promote a
                                    virtual event before and after?
                                  </p>
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
                                  <p>
                                    What should we do to limit the risk involved
                                    with live streaming on the day of the event?
                                  </p>
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
                             */}
                             <div
                                style={{ float: "left", clear: "both" }}
                                ref={(el) => {
                                  this.messagesEnd = el;
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="writeQuestionSend">
                            <div className="writeQuestoinBox">
                              <textarea
                                className="form-control"
                                rows={2}
                                id="comment"
                                placeholder="Write your question"
                                defaultValue={""}
                                value={this.state.myQuestion}
                                onChange={(e) => {
                                  this.handleQuestionChange(e);
                                }}
                              />
                            </div>
                            <div className="questionSend">
                              <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                  this.sendQuestion();
                                }}
                              >
                                <i
                                  className="fa fa-paper-plane"
                                  aria-hidden="true"
                                />
                              </button>
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
                              <input type="text" className="form-control" placeholder="Title" value={this.state.data.note_title} name="note_title" id="note_title" onChange={this.onChange.bind(this)}  />
                    <span className="form-error">{ this.state.error.note_title }</span>
                            </div>
                            <div className="liveNotesDescription">
                              <textarea className="form-control" rows={5} id="note_description" placeholder="Write your question" defaultValue={""} value={this.state.data.note_description} name="note_description" id="note_description" onChange={this.onChange.bind(this)}/>
                              <span className="form-error">{ this.state.error.note_description }</span>
                            </div>
                            <div className="notesSaveColl">
                              <button type="button" onClick={this.onSubmit} className="btn btn-primary mb-2">Save Note</button>
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
          </div>
          <footer className="siteFooter">
            <div className="siteContainer">
              <div className="footerInner">
                <ul>
                  <li>© 2020 ELEVATE</li>
                  <li className="footerDivider">|</li>
                  <li><span>POWERED BY:</span> <img src="/elevate-theme/images/footerPowerLogo.png" alt="" /></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
      
      </>
    );
  }
}

export default Conference;
