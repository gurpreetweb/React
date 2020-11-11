import React, { useState, useEffect } from "react";
import {CometChatUnified } from "./src/react-chat-ui-kit/CometChat/index"
import {login,chatInitialization} from '../../../api/chat'

const ChatComponent = (props) => {

  return (
    <div className="frontFullChat">
        <CometChatUnified />
    </div>
)
};

export default ChatComponent;
