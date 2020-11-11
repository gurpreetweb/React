import React, { useState, useEffect } from "react";
import { polls } from "../../../api/polls/index";
import moment from "moment-timezone";
import Btn from "../notes/btn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import Footer from "../../common/footer";

const Notes = (props) => {
  const [agendaData, setAgendaData] = useState();
  const [isLoading, setisLoading] = useState(false);
  useEffect(
    () => {
      polls().then((res) => {
        if (res.status === 200) {
          setAgendaData(res.data.data.reverse());
          setisLoading(!isLoading);
        } else if (res.data.data.length === 0) {
          return toast.error("No Notes Data Found");
        } else {
          return toast.error(res.data.message);
        }
      });
    },
    [isLoading],
    []
  );
  const generatePDF = (title, description) => {
    var doc = new jsPDF("p", "pt");
    doc.setFontSize(14)
    doc.text(20, 30, `Agenda title : ${title}`)

    doc.text(20, 50, `Description :`)
    doc.text(20, 65, description)

    doc.save(`Notes_${title}`);
  };
  return (
    <>
      <div id="page-content-wrapper">
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>
              Note's{" "}
              <span className="siteSubTitle">
                View all your sessions and activities notes here
              </span>
            </h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="notesDownloadPage">
          {agendaData &&
            agendaData.map((val, index) => {
              return (
                <div key={index}>
                    <div class="notesBlock">
                      <div class="notesHead">
                        <div class="notesHeadTilte">
                          <h3>{val.agenda.title}</h3>
                          <div class="sessionTime">
                            <span class="timeIcon">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                class="bi bi-clock"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                                ></path>
                              </svg>
                            </span>
                            <span class="timeText">
                              {moment(val.agenda.start_time, ["HH:mm"]).format(
                                "h:mm A"
                              )}
                              -
                              {moment(val.agenda.end_time, ["HH:mm"]).format(
                                "h:mm A"
                              )}
                              {val.agenda.time_zone.timezone}
                            </span>
                          </div>
                        </div>
                        <div className="notesAddPop">
                          <Btn
                            title={val.agenda.title}
                            adengaJoinId={val._id}
                            btnName={
                              val.note_title ? "Edit Note's" : "Add Note's"
                            }
                            noteTitle={val.note_title}
                            noteDescription={val.note_description}
                            onPropsChange={() => {
                              return setisLoading(!isLoading);
                            }}
                          />
                        </div>
                      </div>
                      <div class="notesContent">
                        {/* <h4>{val.note_title}</h4> */}
                        <p>{val.note_description}</p>
                        <div class="notesDownSec">
                          <button
                            type="button"
                            class="downloadNotsBtn"
                            onClick={() => {
                              return generatePDF(
                                val.agenda.title,
                                val.note_description
                              );
                            }}
                          >
                            <i class="fa fa-download" aria-hidden="true"></i>
                            Download Notes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
            </div>
          <ToastContainer />
          {/* End Inner Sec */}
          {/* End AGENDA HIGHLIGHTS Section */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Notes;
