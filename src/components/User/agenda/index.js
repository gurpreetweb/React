import React, { useState, useEffect } from "react";
import moment from "moment";
import * as AGENDA_APIS from "../../../api/agenda/index";
import AgendaEvent from "./agendaEvent";
import Footer from "../../common/footer";

const Agenda = (props) => {
  var count = "0";

  const [data_status, setData_status] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const [dateList, setDateList] = useState([]);
  const [datePageNo, setDatePageNo] = useState(1);
  const [datePageLimit] = useState(4);
  const [totalDatePages, setTotalDatePages] = useState(0);

  const [agendaList, setAgendaList] = useState([]);
  const [agendaPageNo, setAgendaPageNo] = useState(1);
  const [agendaPageLimit, setAgendaPageLimit] = useState(5);
  const [totalAgendaPages, setTotalAgendaPages] = useState(0);

  useEffect(() => {
    (async () => {
      AGENDA_APIS.getAgendaDate(datePageNo, datePageLimit).then(
        (agendaDates) => {
          setDateList(agendaDates.agendas);
          setTotalDatePages(Math.ceil(agendaDates.total / datePageLimit));

          if (agendaDates.agendas.length > 0) {
            setSelectedDate(agendaDates.agendas[0]._id.agenda_date);
            AGENDA_APIS.getAgendaByDate(
              agendaDates.agendas[0]._id.agenda_date,
              agendaPageNo,
              agendaPageLimit
            ).then((agendaListData) => {
              setAgendaList(agendaListData.agendas);
              setTotalAgendaPages(
                Math.ceil(agendaListData.total / agendaPageLimit)
              );
              setData_status(true);
            });
          } else {
            setData_status(true);
          }
        }
      );
    })();
  }, []);

  const onDateChange = (date) => {
    AGENDA_APIS.getAgendaByDate(date, agendaPageNo, agendaPageLimit).then(
      (agendaListData) => {
        // console.log("agendaListData date change===>", agendaListData);
        setSelectedDate(date);
        setAgendaList(agendaListData.agendas);
      }
    );
  };

  const loadMoreDate = () => {
    // console.log("aashish------", datePageNo, totalDatePages);
    AGENDA_APIS.getAgendaDate(datePageNo + 1, datePageLimit).then(
      async (agendaDates) => {
        console.log("agendaDates========", agendaDates);
        await setDatePageNo(datePageNo + 1);
        setDateList(dateList.concat(agendaDates.agendas));
        //   console.log("aashish------2", datePageNo);
      }
    );
  };

  return (
    <div id="page-content-wrapper">
      <div className="innerContentBlock">
        <div className="sitePageTitle">
          <h2>Agenda</h2>
          {/* <div className="agendaFilter">
            <button type="button" className="btn btn-primary agendaFilterBtn">
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
              </svg>{" "}
              Filter Agenda
            </button>
          </div> */}
        </div>
        <div className="agendaPage">
          <div className="agendaInner">
            <ul className="nav nav-tabs agendaTab">
              {dateList && dateList.map((date) => {
                return (
                  <li className="">
                    <a
                      data-toggle="tab"
                      className={
                        selectedDate == date._id.agenda_date ? "active" : ""
                      }
                      onClick={() => {
                        onDateChange(date._id.agenda_date);
                      }}
                    >
                      {moment(parseInt(date._id.agenda_date) * 1000).format(
                        "MMMM Do YYYY"
                      )}
                    </a>
                  </li>
                );
              })}
              {/* {datePageNo != totalDatePages && (
                <button id="load-more" onClick={loadMoreDate}>
                  Load More...
                </button>
              )} */}
            </ul>

            <div className="tab-content agendaContent">
              <div className="tab-pane fade active show">
                <div className="agendaTabContent">
                  {agendaList && agendaList.map((agenda, index) => {
                    count++;
                    return (
                      <AgendaEvent
                        serialNo={index + 1}
                        title={agenda.title}
                        agenda_date={agenda.agenda_date}
                        box_image={agenda.box_image}
                        timezone={agenda.time_zones.timezone}
                        category={agenda.agenda_categories.category}
                        time={`
                          ${moment(agenda.start_time, ["HH:mm"]).format(
                            "h:mm A"
                          )}
                          -
                          ${moment(agenda.end_time, ["HH:mm"]).format("h:mm A")}
                          `}
                        agendaId={agenda._id}
                        agenda_type={agenda.agenda_type}
                        description={agenda.description}
                        tags={agenda.tags}
                        agendaStartTime={agenda.start_time}
                        agendaEndTime={agenda.end_time}
                        isFavourite={agenda.is_favourite.length > 0 ? 1 : 0}
                        speakers = {agenda.speakers}
                      />
                    );
                  })}
                  {count == "0" && data_status == true && (
                    <div class="no-data">
                      <p> There is no agenda right now!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agenda;
