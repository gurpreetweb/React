import React, { Component } from "react";
import { ConferenceRoom } from "@voxeet/react-components";
import { Provider } from "@voxeet/react-redux-5.1.1";
import store from "../../redux/store";
import * as AGENDA_APIS from "../../api/agenda/index";
import "@voxeet/react-components/dist/voxeet-react-components.css";

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Things to do before unloading/closing the tab
  doSomethingBeforeUnload = () => {
    this.handleOnLeave();
  };

  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    setTimeout(function () {
      window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.doSomethingBeforeUnload();
      });
    }, 2000);
  };

  async componentDidMount() {
    console.log("sssssssssssssssasasasasasasasasas1111111111111111111");
    console.log(this.setupBeforeUnloadListener());
    this.setupBeforeUnloadListener();
    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    var agenda_id = match.params.conferenceId;
    await AGENDA_APIS.createAgendaJoin(agenda_id, userData._id);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUnload);
  }

  handleOnConnect = (data) => {
    const { match } = this.props;
    const agenda_id = match.params.conferenceId;
    console.log(data);

    AGENDA_APIS.participantCount(agenda_id, "increment").then((result) => {
      if (result.status == 200) {
        console.log("Participant added in db.");
        console.log("sssssssssssssssssssssss");
        console.log(this.props);
        console.log(ConferenceRoom);
      } else {
        console.log("Participant not added in db");
      }
    });
  };

  handleOnLeave = () => {
    console.log("leaving meeting -------");

    const { match } = this.props;
    const agenda_id = match.params.conferenceId;
    AGENDA_APIS.participantCount(agenda_id, "decrement").then((result) => {
      if (result.status == 200) {
        console.log("Participant removed from db.");
      } else {
        console.log("Participant not added in db");
      }
    });
    console.log("Participant disconnected");
    this.props.history.push("/");
  };

  get settings() {
    return {
      consumerKey: process.env.REACT_APP_VOX_KEY,
      consumerSecret: process.env.REACT_APP_VOX_SECRET,
      constraints: {
        audio: true,
        video: {
          width: {
            min: "320",
            max: "1920",
          },
          height: {
            min: "240",
            max: "1080",
          },
        },
      },
      videoRatio: {
        width: 1920,
        height: 1080,
      },
      videoCodec: "H264",
    };
  }

  render() {
    const { match } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    let Full_name = userData.first_name + " " + userData.last_name;
    const userInfo = {
      name:
        typeof Full_name !== "undefined"
          ? Full_name
          : "Guest" + Math.floor(Math.random() * 100 + 1),
      externalId: userData._id,
      avatarUrl: process.env.REACT_APP_PROFILE_IMG_URL + userData.profile_img,
    };
    return (
      <Provider store={store}>
        <div id="page-content-wrapper">
          <div className="innerContentBlock">
            <div className="singleAgendaPage">
              <div className="singleAgenTitle">
                <div className="agendaTitle">Conference</div>
                <ConferenceRoom
                  isWidget={false}
                  isListener={false}
                  isWebinar={false}
                  autoJoin={true}
                  isModal={false}
                  displayActions={[
                    "mute",
                    "video",
                    "share",
                    "live",
                    "attendees",
                    "chat",
                  ]}
                  displayModes={["speaker", "list", "tiles"]}
                  userInfo={userInfo}
                  handleOnLeave={this.handleOnLeave}
                  handleOnConnect={this.handleOnConnect.bind(this)}
                  {...this.settings}
                  conferenceAlias={match.params.conferenceId}
                />
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Conference;
