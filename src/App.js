import React, { useEffect } from "react";
import io from "socket.io-client";
import { Provider } from "react-redux";
import Loader from "react-loader-spinner";
import store from "./redux/store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import CONFIG from "./config.json";
import { chatInitialization } from "./api/chat/index";
import Home from "./components/Home/home";
import Signup from "./components/Signup/signup";
import Forget from "./components/Signup/forget";
import Order from "./components/Signup/order";
import Reset from "./components/Signup/reset";
import UserDashboard from "./components/User/dashBoard";
import Video from "./components/User/expo/video";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AfterLoginRoute from "./components/common/AfterLoginRoute";
import Webinar from "./components/Conference/WebinarElevate";
import WebinarLive from "./components/Conference/Webinar-live";
import WebinarLiveElevate from "./components/Conference/Webinar-liveElevate";
import HomeElevate from "./elevate/Home/home";
import SignupElevate from "./elevate/Signup/signup";
import DashboardElevate from "./elevate/User/dashBoard";
import ExpoElevate from "./elevate/User/expo/expo";
import AgendaDetailsComponent from "./elevate/User/live-now/agenda-detail";
import SocialHubElevate from "./elevate/User/socialHub";
import HelpDeskElevate from "./elevate/User/helpDesk-adminchat";
import GroupElevate from "./elevate/User/groupChat";
import ForgetElevate from "./elevate/Signup/forget";
import ProfileSteps from "./elevate/User/profile/profileStep";
import ResetElevate from "./elevate/Signup/reset";
import OrderElevate from './elevate/Signup/order'
import Lounge3dVideo from "./elevate/User/lounge3DVideo";
import Conference from "./components/Conference/Conference";
import ConferenceSponsor from "./components/ConferenceSponsor/Conference";
import history from "./Utils/dolby/history";
import "@voxeet/react-components/dist/voxeet-react-components.css";
import * as API from "./api/common";
import "./App.scss";
import "./responsiveEnkindle.scss";
import "./customEnkindle.scss";
import "./AppElevate.scss";
import "./customElevate.scss";
import "./responsiveElevate.scss";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "ENKINDLE",
      loader: false,
      eventApiResponse: false,
    };
  }

  componentWillMount = async () => {
    let eventData = await API.getEventDeatil();
    if (eventData) {
      localStorage.setItem("eventId", eventData._id);
      localStorage.setItem("eventData", JSON.stringify(eventData));
      this.setState(
        {
          theme: eventData.theme.toUpperCase(),
          // theme: "ELEVATE",
        },
        async () => {
          switch (this.state.theme) {
            case "ELEVATE":
              await this.loadElevateCss();
              break;
            case "ENKINDLE": {
              // import("./App.scss");
              // await import("./App.scss");
              await this.loadEnkindleCss();
              break;
            }
            default:
              // await import("./App.scss");
              await this.loadEnkindleCss();
          }
        }
      );
    } else {
      await import("./App.scss");
      await this.loadEnkindleCss();
      this.setState({
        eventApiResponse: true,
      });
    }
    this.setState({
      loader: false,
    });
  };

  loadElevateCss = async () => {
    console.log("loadElevateCss invoked");

    document.getElementById("body").style["background-image"] =
      "url(/elevate-theme/images/bgimage.jpg)";
    document.getElementById("body").style["background-attachment"] = "fixed";
    document.getElementById("body").style["background-size"] = "cover";
    document.getElementById("body").style["background-repeat"] = "no-repeat";

    // const link1 = document.createElement("link");
    // const link2 = document.createElement("link");
    // const link3 = document.createElement("link");
    // const link4 = document.createElement("link");
    // const link5 = document.createElement("link");
    // const link6 = document.createElement("link");
    // const link7 = document.createElement("link");
    // const link8 = document.createElement("link");

    // link1.href = "/elevate-theme/vendor/bootstrap/css/bootstrap.min.css";
    // link2.href = "/elevate-theme/css/simple-sidebar.css";
    // link3.href = "/elevate-theme/css/style.css";
    // link4.href = "/elevate-theme/css/responsive.css";
    // link5.href = "/elevate-theme/css/slick.css";
    // link6.href = "/elevate-theme/css/slick-theme.css";
    // link8.href = "/elevate-theme/css/custom.css";
    // link7.href =
    //   "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

    // link1.rel = "stylesheet";
    // link2.rel = "stylesheet";
    // link3.rel = "stylesheet";
    // link4.rel = "stylesheet";
    // link5.rel = "stylesheet";
    // link6.rel = "stylesheet";
    // link7.rel = "stylesheet";
    // link8.rel = "stylesheet";

    // link1.async = false;
    // link2.async = false;
    // link3.async = false;
    // link4.async = false;
    // link5.async = false;
    // link6.async = false;
    // link7.async = false;
    // link8.async = false;

    // link5.type = "text/css";
    // link6.type = "text/css";
    // link8.type = "text/css";
    // link7.crossorigin = "anonymous";

    // await document.head.appendChild(link1);
    // await document.head.appendChild(link2);
    // await document.head.appendChild(link3);
    // await document.head.appendChild(link4);
    // await document.head.appendChild(link5);
    // await document.head.appendChild(link6);
    // await document.head.appendChild(link7);
    // await document.head.appendChild(link8);

    this.setState({
      eventApiResponse: true,
    });
  };

  loadEnkindleCss = async () => {
    console.log("loadEnkindleCss invoked");
    document.getElementById("body").style["background-image"] =
      "url(/images/bgimage.jpg)";

    // const link1 = document.createElement("link");
    // const link2 = document.createElement("link");
    // const link3 = document.createElement("link");
    // const link4 = document.createElement("link");
    // const link5 = document.createElement("link");
    // const link6 = document.createElement("link");
    // const link7 = document.createElement("link");
    // const link8 = document.createElement("link");

    // link1.href = "/vendor/bootstrap/css/bootstrap.min.css";
    // link2.href = "/css/simple-sidebar.css";
    // link3.href = "/css/style.css";
    // link4.href = "/css/responsive.css";
    // link5.href = "/css/slick.css";
    // link6.href = "/css/slick-theme.css";
    // link7.href =
    //   "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
    // link8.href = "/css/custom.css";

    // link1.rel = "stylesheet";
    // link2.rel = "stylesheet";
    // link3.rel = "stylesheet";
    // link4.rel = "stylesheet";
    // link5.rel = "stylesheet";
    // link6.rel = "stylesheet";
    // link7.rel = "stylesheet";
    // link8.rel = "stylesheet";

    // link1.async = false;
    // link2.async = false;
    // link3.async = false;
    // link4.async = false;
    // link5.async = false;
    // link6.async = false;
    // link7.async = false;
    // link8.async = false;

    // link5.type = "text/css";
    // link6.type = "text/css";
    // link7.crossorigin = "anonymous";

    // await document.head.appendChild(link1);
    // await document.head.appendChild(link2);
    // await document.head.appendChild(link3);
    // await document.head.appendChild(link4);
    // await document.head.appendChild(link5);
    // await document.head.appendChild(link6);
    // await document.head.appendChild(link7);
    // await document.head.appendChild(link8);

    this.setState({
      eventApiResponse: true,
    });

    // setTimeout(
    //   this.setState({
    //     eventApiResponse: true,
    //   }),
    //   2000
    // );
  };

  render() {
    if (this.state.eventApiResponse) {
      switch (this.state.theme) {
        case "ELEVATE":
          return (
            <Provider store={store}>
              <div className="app_elevate">
                <Router history={history}>
                  <Switch>
                    <AfterLoginRoute
                      exact
                      path="/login"
                      component={HomeElevate}
                    />
                    <AfterLoginRoute path="/signup" component={SignupElevate} />
                    <AfterLoginRoute
                      path="/forget-password"
                      component={ForgetElevate}
                    />
                    <AfterLoginRoute
                      path="/reset-password"
                      component={ResetElevate}
                    />
                    <ProtectedRoute
                      exact
                      path="/sponsor-conference/:conferenceId"
                      component={ConferenceSponsor}
                    />
                    <ProtectedRoute
                      exact={true}
                      path="/conference/:conferenceId"
                      component={Conference}
                    />
                    {/* <ProtectedRoute psath="/order-complete" component={Order} /> */}
                    <ProtectedRoute
                      path="/expo/:sponsorId"
                      component={ExpoElevate}
                    />
                    <ProtectedRoute
                      path="/social-hub"
                      component={SocialHubElevate}
                    />
                    <ProtectedRoute
                      path="/help-desk"
                      component={HelpDeskElevate}
                    />
                    <ProtectedRoute path="/profile" component={ProfileSteps} />
                    <ProtectedRoute path="/complete-profile" component={ProfileSteps} />
                    <ProtectedRoute
                      path="/group-chat"
                      component={GroupElevate}
                    />
                    <ProtectedRoute
                      path="/lounge-video/:id"
                      component={Lounge3dVideo}
                    />
                    <ProtectedRoute
                      exact={true}
                      path="/agenda-details/:agendaId"
                      component={AgendaDetailsComponent}
                    />
                    <ProtectedRoute 
                      path="/order-complete" 
                      component={OrderElevate} 
                    />
                    <ProtectedRoute
                      path="/group-chat"
                      component={GroupElevate}
                    />
                    <ProtectedRoute
                      path="/webinar/:webinarId/:title"
                      component={Webinar}
                    />
                    <ProtectedRoute
                      path="/webinar-live/:webinarId"
                      component={WebinarLiveElevate}
                    />
                    <ProtectedRoute path="/" component={DashboardElevate} />
                    <Route path="*" component={HomeElevate} />
                  </Switch>
                </Router>
              </div>
            </Provider>
          );
        default:
          //defalt route
          return (
            <>
              {/* <Loader
        className="circle_cover app_cover"
        type="Rings"
        color="#2b2497"
        height="100"
        width="100"
        visible={this.state.loader}
      /> */}
              <Provider store={store}>
                <div className="app_enkindle">
                  <Router history={history}>
                    <Switch>
                      <AfterLoginRoute exact path="/login" component={Home} />
                      <AfterLoginRoute path="/signup" component={Signup} />
                      <AfterLoginRoute
                        path="/forget-password"
                        component={Forget}
                      />
                      <AfterLoginRoute
                        path="/reset-password"
                        component={Reset}
                      />
                        <ProtectedRoute
                  exact={true}
                  path="/sponsor-conference/:conferenceId"
                  component={ConferenceSponsor}
                />
                      {/* <ProtectedRoute
                      path="/webinar/:webinarId/:title"
                      component={Webinar}
                    />
                    <ProtectedRoute
                      path="/webinar-live/:webinarId"
                      component={WebinarLive}
                    /> */}
                      <ProtectedRoute
                        path="/order-complete"
                        component={Order}
                      />
                      <ProtectedRoute path="/" component={UserDashboard} />
                      <Route path="*" component={Home} />
                    </Switch>
                  </Router>
                </div>
              </Provider>
            </>
          );
      }
    } else {
      return "";
    }
  }
}

export default App;
