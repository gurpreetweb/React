import React, { useState, useEffect } from "react";
import { CometChatGroupListScreen } from "./src/react-chat-ui-kit/CometChat/index";
import { login, chatInitialization } from "../../../api/chat";
import Footer from "../../common/footer";

class ChatComponent extends React.Component {
  componentWillMount = async () => {
    const data = await chatInitialization();
  };
  render() {
    return (
      <div className="frontFullChat">
        <CometChatGroupListScreen />
        <Footer />
      </div>
    );
  }
}

export default ChatComponent;
