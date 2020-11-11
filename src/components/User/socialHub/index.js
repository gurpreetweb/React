import React, { useState, useEffect } from "react";
import {CometChatUnified } from "./src/react-chat-ui-kit/CometChat/index"
import {login,chatInitialization} from '../../../api/chat'
import Footer from "../../common/footer";

class ChatComponent extends React.Component {
  componentWillMount = async () => {
    console.log("-------componentWillMount  aashi chat  invoked")
    const data = await chatInitialization();
    console.log("data------ aashi", data);
  }
  render() {
    return (
      <div className="frontFullChat">
         <div className="sitePageTitle">
            <h2>
              Social Hub{" "}
              {/* <span className="siteSubTitle">
                Access past keynotes and breakout sessions 24/7
              </span> */}
            </h2>
          </div>
          <CometChatUnified />
          <Footer />
      </div>
  )
  }
}

// const ChatComponent = (props) => {

//   useEffect(() => {
//     (async () => {
//       // setLoading(true)
//       const data = await chatInitialization();
     
//     })();
//   }, []);
//   return (
//     <div className="frontFullChat">
//         <CometChatUnified />
//     </div>
// )
// };

export default ChatComponent;
