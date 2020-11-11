import React, { Component, useState, useEffect } from "react";
import $ from "jquery";
import { addReview, getReview } from "../../../api/polls/index";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        isBtnActive: "",
      },
      error: {},
      message: "",
      errorMessage: "",
      loading: false,
      answer_one: 2,
      answer_two: 2,
      answer_three: 2,
      answer_four: 2,
      answer_five: 2,
      userReview: "",
    };
    this.ChangeChecked = this.ChangeChecked.bind(this);
  }
  componentWillMount() {
    const { agendaId, agendaJoinId } = this.props.match.params;
    getReview(agendaId, agendaJoinId).then((res) => {
      return res.data.data
        ? this.setState({
            ...this.state,
            isBtnActive: false,
            userReview: res.data.data,
          })
        : this.setState({ ...this.state, isBtnActive: true });
    });
  }
  ChangeChecked(e) {
    console.log(e);
    console.log(e.target);
    var tar = e.target;
    //$(e.target).addClass("blue");

    if ($(tar).closest("label").hasClass("radio-0")) {
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find("h3")
        .removeClass("show_label");

      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find(".expBad")
        .addClass("show_label");
    } else if ($(tar).closest("label").hasClass("radio-25")) {
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find("h3")
        .removeClass("show_label");
      $(tar)
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find(".expNotBad ")
        .addClass("show_label");
    } else if ($(tar).closest("label").hasClass("radio-50")) {
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find("h3")
        .removeClass("show_label");
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find(".expGood")
        .addClass("show_label");
    } else if ($(tar).closest("label").hasClass("radio-75")) {
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find("h3")
        .removeClass("show_label");
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find(".expAwesome")
        .addClass("show_label");
    } else if ($(tar).closest("label").hasClass("radio-100")) {
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find("h3")
        .removeClass("show_label");
      $(tar)
        .closest("label")
        .parents(".answerSliderResponse")
        .siblings(".answerREsponse")
        .find(".expExcellent")
        .addClass("show_label");
    } else {
    }
  }
  render() {
    var reviews = {
      answer_one: this.state.answer_one,
      answer_two: this.state.answer_two,
      answer_three: this.state.answer_three,
      answer_four: this.state.answer_four,
      answer_five: this.state.answer_five,
    };
    console.log(this.state.userReview, "In the review page props");
    return (
      <div id="page-content-wrapper">
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>Polls Questions</h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="pollsQuestionPage">
            <div className="pollsQuestionSec">
              <div className="pollsQuestionList">
                <div className="pollsQuestionBlock">
                  <div className="pollsQuest">
                    <span className="qTag">Q.</span>
                    <h2>How satisfied were you with the session?</h2>
                  </div>
                  <div className="answerSlider badEmoji">
                    <div className="answerREsponse">
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_one) === 1
                              ? "expBad show_label"
                              : "expBad"
                            : "expBad"
                        }
                      >
                        Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-frown"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_one) === 2
                              ? "expNotBad show_label"
                              : "expNotBad"
                            : "expNotBad show_label"
                        }
                      >
                        Not Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-neutral"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_one) === 3
                              ? "expGood show_label"
                              : "expGood"
                            : "expGood"
                        }
                      >
                        Good{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-smile"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_one) === 4
                              ? "expAwesome show_label"
                              : "expAwesome"
                            : "expAwesome"
                        }
                      >
                        Awesome{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-laughing"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z"
                            />
                            <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_one) === 5
                              ? "expExcellent show_label"
                              : "expExcellent"
                            : "expExcellent"
                        }
                      >
                        Excellent{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-sunglasses"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM6.5 6.497V6.5h-1c0-.568.447-.947.862-1.154C6.807 5.123 7.387 5 8 5s1.193.123 1.638.346c.415.207.862.586.862 1.154h-1v-.003l-.003-.01a.213.213 0 0 0-.036-.053.86.86 0 0 0-.27-.194C8.91 6.1 8.49 6 8 6c-.491 0-.912.1-1.19.24a.86.86 0 0 0-.271.194.213.213 0 0 0-.036.054l-.003.01z"
                            />
                            <path d="M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM9 5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-2-2V5z" />
                          </svg>
                        </span>
                      </h3>
                    </div>
                    <div className="answerSliderResponse">
                      <div className="rangeSlider">
                        <label
                          className="radioBox radio-0"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_one) === 1 ? (
                            <input
                              type="radio"
                              name="answer_one"
                              defaultChecked
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 1 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_one"
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 1 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-25"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_one) === 2 ? (
                            <input
                              type="radio"
                              name="answer_one"
                              defaultChecked
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 2 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_one"
                              defaultChecked
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 2 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-50"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_one) === 3 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_one"
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 3 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_one"
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 3 });
                              }}
                            />
                          )}

                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-75"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_one) === 4 ? (
                            <input
                              type="radio"
                              name="answer_one"
                              defaultChecked
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 4 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_one"
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 4 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-100"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_one) === 5 ? (
                            <input
                              type="radio"
                              name="answer_one"
                              defaultChecked
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 5 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_one"
                              onClick={() => {
                                this.setState({ ...this.state, answer_one: 5 });
                              }}
                            />
                          )}

                          <span className="checkmark" />
                        </label>
                        <div className="slideRow" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pollsQuestionBlock">
                  <div className="pollsQuest">
                    <span className="qTag">Q.</span>
                    <h2>How was the session?</h2>
                  </div>
                  <div className="answerSlider badEmoji">
                    <div className="answerREsponse">
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_two) === 1
                              ? "expBad show_label"
                              : "expBad"
                            : "expBad"
                        }
                      >
                        Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-frown"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_two) === 2
                              ? "expNotBad show_label"
                              : "expNotBad"
                            : "expNotBad show_label"
                        }
                      >
                        Not Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-neutral"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_two) === 3
                              ? "expGood show_label"
                              : "expGood"
                            : "expGood"
                        }
                      >
                        Good{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-smile"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_two) === 4
                              ? "expAwesome show_label"
                              : "expAwesome"
                            : "expAwesome"
                        }
                      >
                        Awesome{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-laughing"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z"
                            />
                            <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? Number(this.state.userReview.answer_two) === 5
                              ? "expExcellent show_label"
                              : "expExcellent"
                            : "expExcellent"
                        }
                      >
                        Excellent{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-sunglasses"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM6.5 6.497V6.5h-1c0-.568.447-.947.862-1.154C6.807 5.123 7.387 5 8 5s1.193.123 1.638.346c.415.207.862.586.862 1.154h-1v-.003l-.003-.01a.213.213 0 0 0-.036-.053.86.86 0 0 0-.27-.194C8.91 6.1 8.49 6 8 6c-.491 0-.912.1-1.19.24a.86.86 0 0 0-.271.194.213.213 0 0 0-.036.054l-.003.01z"
                            />
                            <path d="M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM9 5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-2-2V5z" />
                          </svg>
                        </span>
                      </h3>
                    </div>
                    <div className="answerSliderResponse">
                      <div className="rangeSlider">
                        <label
                          className="radioBox radio-0"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_two) === 1 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 1 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 1 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-25"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_two) === 2 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 2 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_two"
                              defaultChecked
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 2 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-50"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_two) === 3 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 3 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 3 });
                              }}
                            />
                          )}{" "}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-75"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_two) === 4 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 4 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 4 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-100"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_two) === 5 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 5 });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_two"
                              onClick={() => {
                                this.setState({ ...this.state, answer_two: 5 });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <div className="slideRow" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pollsQuestionBlock">
                  <div className="pollsQuest">
                    <span className="qTag">Q.</span>
                    <h2>How was the quality of video?</h2>
                  </div>
                  <div className="answerSlider badEmoji">
                    <div className="answerREsponse">
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_three) === 1
                              ? "expBad show_label"
                              : "expBad"
                            : "expBad"
                        }
                      >
                        Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-frown"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_three) === 2
                              ? "expNotBad show_label"
                              : "expNotBad"
                            : "expNotBad show_label"
                        }
                      >
                        Not Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-neutral"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_three) === 3
                              ? "expGood show_label"
                              : "expGood"
                            : "expGood"
                        }
                      >
                        Good{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-smile"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_three) === 4
                              ? "expAwesome show_label"
                              : "expAwesome"
                            : "expAwesome"
                        }
                      >
                        Awesome{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-laughing"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z"
                            />
                            <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_three) === 5
                              ? "expExcellent show_label"
                              : "expExcellent"
                            : "expExcellent"
                        }
                      >
                        Excellent{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-sunglasses"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM6.5 6.497V6.5h-1c0-.568.447-.947.862-1.154C6.807 5.123 7.387 5 8 5s1.193.123 1.638.346c.415.207.862.586.862 1.154h-1v-.003l-.003-.01a.213.213 0 0 0-.036-.053.86.86 0 0 0-.27-.194C8.91 6.1 8.49 6 8 6c-.491 0-.912.1-1.19.24a.86.86 0 0 0-.271.194.213.213 0 0 0-.036.054l-.003.01z"
                            />
                            <path d="M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM9 5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-2-2V5z" />
                          </svg>
                        </span>
                      </h3>
                    </div>
                    <div className="answerSliderResponse">
                      <div className="rangeSlider">
                        <label
                          className="radioBox radio-0"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_three) === 1 ? (
                            <input
                              type="radio"
                              name="answer_three"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 1,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_three"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 1,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-25 "
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_three) === 2 ? (
                            <input
                              type="radio"
                              name="answer_three"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 2,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_three"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 2,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-50"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_three) === 3 ? (
                            <input
                              type="radio"
                              name="answer_three"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 3,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_three"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 3,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-75"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_three) === 4 ? (
                            <input
                              type="radio"
                              name="answer_three"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 4,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_three"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 4,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-100"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_three) === 5 ? (
                            <input
                              type="radio"
                              name="answer_three"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 5,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_three"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_three: 5,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <div className="slideRow" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pollsQuestionBlock">
                  <div className="pollsQuest">
                    <span className="qTag">Q.</span>
                    <h2>How was the content of the session?</h2>
                  </div>
                  <div className="answerSlider badEmoji">
                    <div className="answerREsponse">
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_four) === 1
                              ? "expBad show_label"
                              : "expBad"
                            : "expBad"
                        }
                      >
                        Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-frown"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_four) === 2
                              ? "expNotBad show_label"
                              : "expNotBad"
                            : "expNotBad show_label"
                        }
                      >
                        Not Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-neutral"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_four) === 3
                              ? "expGood show_label"
                              : "expGood"
                            : "expGood"
                        }
                      >
                        Good{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-smile"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_four) === 4
                              ? "expAwesome show_label"
                              : "expAwesome"
                            : "expAwesome"
                        }
                      >
                        Awesome{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-laughing"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z"
                            />
                            <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_four) === 5
                              ? "expExcellent show_label"
                              : "expExcellent"
                            : "expExcellent"
                        }
                      >
                        Excellent{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-sunglasses"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM6.5 6.497V6.5h-1c0-.568.447-.947.862-1.154C6.807 5.123 7.387 5 8 5s1.193.123 1.638.346c.415.207.862.586.862 1.154h-1v-.003l-.003-.01a.213.213 0 0 0-.036-.053.86.86 0 0 0-.27-.194C8.91 6.1 8.49 6 8 6c-.491 0-.912.1-1.19.24a.86.86 0 0 0-.271.194.213.213 0 0 0-.036.054l-.003.01z"
                            />
                            <path d="M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM9 5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-2-2V5z" />
                          </svg>
                        </span>
                      </h3>
                    </div>
                    <div className="answerSliderResponse">
                      <div className="rangeSlider">
                        <label
                          className="radioBox radio-0"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_four) === 1 ? (
                            <input
                              type="radio"
                              name="answer_four"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 1,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_four"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 1,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-25"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_four) === 2 ? (
                            <input
                              type="radio"
                              name="answer_four"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 2,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_four"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 2,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-50"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_four) === 3 ? (
                            <input
                              type="radio"
                              name="answer_four"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 3,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_four"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 3,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-75"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_four) === 4 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_four"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 4,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_four"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 4,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-100"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_four) === 5 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_four"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 5,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_four"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_four: 5,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <div className="slideRow" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pollsQuestionBlock">
                  <div className="pollsQuest">
                    <span className="qTag">Q.</span>
                    <h2>How satisfied were you with the attendees?</h2>
                  </div>
                  <div className="answerSlider badEmoji">
                    <div className="answerREsponse">
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_five) === 1
                              ? "expBad show_label"
                              : "expBad"
                            : "expBad"
                        }
                      >
                        Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-frown"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_five) === 2
                              ? "expNotBad show_label"
                              : "expNotBad"
                            : "expNotBad show_label"
                        }
                      >
                        Not Bad{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-neutral"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_five) === 3
                              ? "expGood show_label"
                              : "expGood"
                            : "expGood"
                        }
                      >
                        Good{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-smile"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                            />
                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_five) === 4
                              ? "expAwesome show_label"
                              : "expAwesome"
                            : "expAwesome"
                        }
                      >
                        Awesome{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-laughing"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z"
                            />
                            <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg>
                        </span>
                      </h3>
                      <h3
                        className={
                          this.state.userReview
                            ? this.state.userReview &&
                              Number(this.state.userReview.answer_five) === 5
                              ? "expExcellent show_label"
                              : "expExcellent"
                            : "expExcellent"
                        }
                      >
                        Excellent{" "}
                        <span className="ansEmoji">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-emoji-sunglasses"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM6.5 6.497V6.5h-1c0-.568.447-.947.862-1.154C6.807 5.123 7.387 5 8 5s1.193.123 1.638.346c.415.207.862.586.862 1.154h-1v-.003l-.003-.01a.213.213 0 0 0-.036-.053.86.86 0 0 0-.27-.194C8.91 6.1 8.49 6 8 6c-.491 0-.912.1-1.19.24a.86.86 0 0 0-.271.194.213.213 0 0 0-.036.054l-.003.01z"
                            />
                            <path d="M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM9 5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-2-2V5z" />
                          </svg>
                        </span>
                      </h3>
                    </div>
                    <div className="answerSliderResponse">
                      <div className="rangeSlider">
                        <label
                          className="radioBox radio-0"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_five) === 1 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 1,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 1,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-25"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_five) === 2 ? (
                            <input
                              type="radio"
                              name="answer_five"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 2,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_five"
                              defaultChecked
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 2,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-50"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_five) === 3 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 3,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 3,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-75"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_five) === 4 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 4,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 4,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <label
                          className="radioBox radio-100"
                          onClick={this.ChangeChecked}
                        >
                          {Number(this.state.userReview.answer_five) === 5 ? (
                            <input
                              type="radio"
                              defaultChecked
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 5,
                                });
                              }}
                            />
                          ) : (
                            <input
                              type="radio"
                              name="answer_five"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  answer_five: 5,
                                });
                              }}
                            />
                          )}
                          <span className="checkmark" />
                        </label>
                        <div className="slideRow" />
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.isBtnActive ? (
                  <>
                    <div className="pollsSubmit">
                      <button
                        type="button"
                        className="pollsSubmitBtn"
                        onClick={() => {
                          const {
                            agendaId,
                            agendaJoinId,
                          } = this.props.match.params;
                          addReview(reviews, agendaId, agendaJoinId).then(
                            (res) => {
                              if (res.data.status === 200) {
                                const message = res.data.message;
                                return Toastify({
                                  text: `${message}`,
                                  duration: 3000,
                                  newWindow: true,
                                  close: true,
                                  gravity: "top", // `top` or `bottom`
                                  position: "right", // `left`, `center` or `right`
                                  backgroundColor: `${
                                    message === "Added Review"
                                      ? "#008000"
                                      : "#FF0000"
                                  }`,
                                  stopOnFocus: true,
                                  onClick: function () {},
                                }).showToast();
                              }
                            }
                          );
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* End Inner Sec */}

          {/* End Inner Sec */}
          {/* End AGENDA HIGHLIGHTS Section */}
        </div>
      </div>
    );
  }
}

export default Poll;
