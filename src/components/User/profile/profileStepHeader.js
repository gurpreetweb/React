import React, { Component } from "react";

class ProfileStepHeader extends React.Component {
  // const {stepsCompleted} = props
  constructor(props) {
    super(props);
    this.state = {
      stepsCompleted: this.props.stepsCompleted,
    };
    console.log("this.state==========>",this.state)
  }

  render() {
    return (
      <div className="welcomeProHead">
        <h2>Welcome Test User !</h2>
        <p>
          Please begin by filling in your attendee details and uploading a
          profile picture
        </p>
        <ul className="welcomeTab">
          {/* {[1,2,3].map( (value,index)=> { */}
          {[1, 2].map((value, index) => {
            return (
              <li
                className={
                  index + 1 <= this.state.stepsCompleted ? "active" : ""
                }
              >
                <a href="#">{value}</a>
              </li>
            );
          })}
          {/* <li className="active">
          <a href="#">1</a>
        </li>
        <li>
          <a href="#">2</a>
        </li>
        <li>
          <a href="#">3</a>
        </li> */}
        </ul>
      </div>
    );
  }
}

export default ProfileStepHeader;
