import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import * as CONFIG from "../../config.json";
import * as AGENDA_APIS from "../../api/agenda/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Footer from "../common/footer";

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
      data: {},
      error: {},
      message: "",
      errorMessage: "",
      note_title: "static",
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
        console.log("newMessage 1==========>", data);
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
    console.log("sendQuestion invoked", this.props.match.params);
    if (this.state.myQuestion) {
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
          this.scrollToBottom();
          this.setState({
            myQuestion: "",
          });
        }
      );
    }
  };

  handleQuestionChange = async (event) => {
    console.log("handleeQuestionChange invoked", event);

    this.setState(
      {
        myQuestion: event.target.value,
      },
      () => {
        this.scrollToBottom();
      }
    );
  };

  handleQuestionChange2 = async (event) => {
    console.log("handleeQuestionChange21 invoked", event.keyCode, event.which);
    var code = event.which;

    if (code == 13) {
      // this.sendQuestion()
      this.refs.but.click();
    }
  };

  getPreviousQuestion = async () => {
    try {
      let questionData = await axios.get(
        `${CONFIG.BASE_URL}/api/liveQuestion?agendaId=${this.props.match.params.webinarId}`
      );
      console.log("old Question=======", questionData.data);
      if (questionData.data.status == 200) {
        this.setState(
          {
            questionArr: this.state.questionArr.concat(questionData.data.data),
          },
          () => {
            this.scrollToBottom();
          }
        );
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  scrollToBottom = () => {
    console.log("scrollToBottom");
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  scrollToBottom2 = () => {
    console.log("scrollToBottom");
    var that = this;
    setTimeout(function () {
      that.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  };

  async componentDidMount() {
    await this.getPreviousQuestion();
    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    var agenda_id = match.params.webinarId;
    await AGENDA_APIS.getAgendaById(this.props.match.params.webinarId).then(
      (result) => {
        console.log("result---->", result);
        if (result.status === 200) {
          this.setState({ agendaData: result.data });
          this.setState({ attendees: result.attendees });
          this.setState({ videoUrl: result.data.videos[0] });
        } else {
          console.log("eror===>", result.message);
        }
      }
    );
    var agenda_data = await AGENDA_APIS.createAgendaJoin(
      agenda_id,
      userData._id
    );
    this.setState({ data: agenda_data.data });
  }

  onChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.data[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {}, message: "", errorMessage: "" });
    //console.log(this.state.error.inputName);
  }

  onSubmit(event) {
    event.preventDefault();
    var adengaJoinId = "";
    this.setState({ error: {} });

    if (!this.state.data.note_title) {
      this.setState({ error: { note_title: "Title field is required!" } });
      //createNotification('error','Please fill all fields!','');
    } else if (!this.state.data.note_description) {
      this.setState({
        error: { note_description: "Description field is required!" },
      });
      //createNotification('error','Please fill all fields!','');
    } else {
      this.setState({ loading: true });

      var data = {
        note_title: this.state.data.note_title,
        note_description: this.state.data.note_description,
      };
      axios
        .post(CONFIG.BASE_URL + "/api/add-note/" + this.state.data._id, data)
        .then((res) => {
          this.setState({ loading: false });

          if (res.data.status == 200) {
            toast.success("Notes updated successsfully.");
          } else if (res.data.status == 500) {
            toast.error("Something went wrong, please try again later.");
            this.setState({
              errorMessage: "Something went wrong, please try again later!",
            });
          } else {
            toast.error("Something went wrong, please try again later.");
            this.setState({ errorMessage: res.data.message });
          }
        })
        .catch((err) => {
          toast.error("Something went wrong, please try again later.");
          this.setState({ loading: false });
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
          });
        });
    }
  }

  render() {
    console.log("this.propsssssssssssssssss");
    console.log(this.props);

    return (
      <>
        <ToastContainer />
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
                  <h3>
                    <span className="backBtn">
                      <a href>
                        <i
                          className="fa fa-angle-left"
                          style={{ display: "none" }}
                        />
                      </a>
                    </span>
                    {this.state.agendaData.title}
                  </h3>
                </div>
                {/* <div className="followBtn">
                <i className="fa fa-heart" />
                <span className="followText">Follow</span>
              </div> */}
              </div>
              <div className="shareScreTabingSec">
                <div className="shareScreBlock">
                  <div className="shareScreHead">
                    <div className="screenShareOuter">
                      <img src="/images/icons/screenShare.png" alt="" />
                      <div className="screenInnerTitle">
                        <h5>Thanks for Joining !! Enjoy your Webinar.</h5>
                        {/* <h3>Presenter is not screensharing yet</h3> */}
                      </div>
                    </div>
                    <div className="expandIcon">
                      <img src="/images/icons/expandIcon.png" alt="" />
                    </div>
                  </div>
                  <div className="PresentedCamera">
                    {/* <img src="images/icons/cameraImage.jpg" alt="" /> */}
                    <iframe
                      width="100%"
                      src={
                        "https://event.hospitalityliving.com/static/stream.html?streamKey=" +
                        this.props.match.params.webinarId
                      }
                      style={{ height: "calc(100vh - 7px)" }}
                    />
                  </div>
                </div>
                <div className="liveTabbingBlock">
                  <div className="liveTabbingInner">
                    <ul className="nav nav-tabs agendaTab">
                      <li className>
                        <a
                          data-toggle="tab"
                          href="#audienceTab"
                          className="active"
                        >
                          Audience
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          this.scrollToBottom2();
                        }}
                      >
                        <a data-toggle="tab" href="#qandaTab">
                          Q &amp; A
                        </a>
                      </li>
                      <li>
                        <a data-toggle="tab" href="#notesTab">
                          Notes
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content agendaContent">
                      <div id="audienceTab" className="tab-pane fade in active">
                        <div className="audienceTabSection">
                          <div className="audienceTitle">
                            <h3>
                              <i className="fa fa-users" aria-hidden="true" />{" "}
                              Attendies
                            </h3>
                          </div>
                          <div className="liveAttendiesList">
                            {this.state.attendees.map((attendee, index) => {
                              if (attendee.user && attendee.user.role == 3) {
                                return (
                                  <div className="liveAttendPeople">
                                    <div className="liveAttendImg">
                                      <img
                                        src={
                                          CONFIG.BASE_URL +
                                          "/uploads/" +
                                          attendee.user.profile_img
                                        }
                                        alt
                                      />
                                    </div>
                                    <div className="liveAttendDetail">
                                      <h3>
                                        {attendee.user.first_name +
                                          " " +
                                          attendee.user.last_name}
                                      </h3>
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
                                        {question.userData && (
                                          <img
                                            src={`${process.env.REACT_APP_PROFILE_IMG_URL}/${question.userData.profile_img}`}
                                            alt=""
                                          />
                                        )}
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
                                onKeyPress={(e) => {
                                  this.handleQuestionChange2(e);
                                }}
                                onChange={(e) => {
                                  this.handleQuestionChange(e);
                                }}
                              />
                            </div>
                            <div className="questionSend">
                              <button
                                type="button"
                                className="btn"
                                ref="but"
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
                            <h3><i class="fa fa-file-text" aria-hidden="true"></i> Note</h3>
                          </div>
                          <div className="liveNotesSave">
                            <div className="liveNotesBox">
                              {/* <div className="liveNotesTitle">
                                <label>Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Title"
                                  value={this.state.data.note_title}
                                  name="note_title"
                                  id="note_title"
                                  onChange={this.onChange.bind(this)}
                                />
                                <span className="form-error">
                                  {this.state.error.note_title}
                                </span>
                              </div> */}
                              <div className="liveNotesDescription">
                                {/* <label>Content</label> */}

                                <textarea
                                  className="form-control"
                                  rows={5}
                                  id="comment"
                                  placeholder="Write your question"
                                  defaultValue={""}
                                  value={this.state.data.note_description}
                                  name="note_description"
                                  id="note_description"
                                  onChange={this.onChange.bind(this)}
                                />
                                <span className="form-error">
                                  {this.state.error.note_description}
                                </span>
                              </div>
                              <div className="notesSaveColl">
                                <button
                                  type="button"
                                  onClick={this.onSubmit}
                                  className="btn btn-primary mb-2"
                                >
                                  Save Note
                                </button>
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
          <Footer />
        </div>
      </>
    );
  }
}

export default Conference;
