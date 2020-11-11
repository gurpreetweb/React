import React, { useState, useEffect } from "react";
import { polls } from "../../../api/polls/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../common/footer";
import moment from "moment-timezone";

const Poll = (props) => {
  const [pollsData, setPollsData] = useState();
  useEffect(() => {
    polls().then((res) => {
      if (res.status === 200 && res.data.data.length !== 0) {
        return setPollsData(res.data.data.reverse());
      } else if (res.data.data.length === 0) {
        return toast.error("No Polls Data Found");
      }
    });
  }, []);
  const handleWriteReview = (adengaJoinId, agendaId) => {
    return props.history.push(
      `/polls/submit-review/${adengaJoinId}/${agendaId}`
    );
  };
  return (
    <div id="page-content-wrapper">
      <div className="innerContentBlock">
        {/* Start Page Title */}
        <div className="sitePageTitle">
            <h2>
            Polls Listing{" "}
              <span className="siteSubTitle">Here are the list of all Agendas, please give us your feedback.</span>
            </h2>
          </div>
        {/* End Page Title */}
        {/* Start Inner Sec */}
        <div className="liveNowPage">
          {/* <div className="liveNowDes">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.{" "}
            </p>
          </div> */}
          <div className="liveNowSections pollsQuestionPage">
            {pollsData &&
              pollsData.map((val, index) => {
                console.log(pollsData, "in the valof polls");

                return (
                  <>
                    <PollPreview
                      adengaJoinId={val._id}
                      agendaId={val.agenda._id}
                      sessionId="test-SessionID-mkhgf"
                      serialNo={index + 1}
                      title={val.agenda.title}
                      description={val.agenda.description}
                      time={`
                      ${moment(val.agenda.start_time, ["HH:mm"]).format(
                        "h:mm A"
                      )}
                      -
                      ${moment(val.agenda.end_time, ["HH:mm"]).format(
                        "h:mm A"
                      )}  ${val.agenda.time_zone.timezone}
                      `}
                      handleWriteReview={handleWriteReview}
                      status={val.status}
                    />
                    <ToastContainer />
                  </>
                );
              })}
          </div>
        </div>
        {/* End Inner Sec */}
        {/* End AGENDA HIGHLIGHTS Section */}
      </div>
      <Footer />
    </div>
  );
};

const PollPreview = (props) => {
  const {
    status,
    serialNo,
    title,
    time,
    description,
    handleWriteReview,
    adengaJoinId,
    agendaId,
  } = props;

  return (
    <div className="liveNowSecInner">
      <div className="liveNowBlock agendaBlock pollsQBlock">
        <div className="LiveSrNo">{serialNo}</div>
        <div className="agendaTimeImage">
          <div className="agendaTimeTag">
            <h2>
              <a href="#">{title}</a>
            </h2>
            <p>{description}</p>
            <div className="sessionTime">
              <span className="timeIcon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-clock"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </span>
              <span className="timeText">{time}</span>
            </div>
            <div className="writeReview">
              <button
                type="button"
                className="writeReviewBtn"
                onClick={() => {
                  handleWriteReview(adengaJoinId, agendaId);
                }}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-card-checklist"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
                  />
                </svg>{" "}
                {status === "done" ? "Show Review" : "Write a Review"}
                {/* 
                Write a Review */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
