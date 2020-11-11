import React, { Component,useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat"

  class ExpoNetwork extends Component {
    constructor(props) {
      super(props);
      this.state = 
      {
      }
    };
    componentDidMount()
    {
      this.props.history.push(`/group-chat`);
    }
    JoinGroup()
    {
      var self =this;
      var GUID = this.props.sponsor_id;
      var groupName = this.props.lounge_title;
      var groupType = CometChat.GROUP_TYPE.PUBLIC;
      var password = "";

      var group = new CometChat.Group(GUID, groupName, groupType, password);

      CometChat.createGroup(group).then(
      group => {
          console.log("Group created successfully:", group);
          self.props.history.push(`/group-chat`);
      },
      error => {
          console.log("Group creation failed with exception:", error);
          self.props.history.push(`/group-chat`);

      }
      );
      }

  render() {
  return (
    
          <li>
            {(this.props.lounge_type=="360_space")?<Link to={"/sponsor/video/"+this.props.sponsor_id}>{this.props.lounge_title}</Link>:<a onClick={this.JoinGroup.bind(this)} href="javascript:void(0)">{this.props.lounge_title}</a>}
          </li>
        
        );
      }
      };
      
export default ExpoNetwork;
