import React, { useState, useEffect } from "react";
// import moment from "moment";
import moment from "moment-timezone";
import * as AGENDA_APIS from "../../../api/agenda/index";
import AgendaEvent from "./agendaEvent";
import Footer from "../../common/footer";

const Agenda = (props) => {
  console.log("props=========>", props);
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
  //   console.log('moment().format');
  // console.log(moment().tz('America/Los_Angeles').format('HH:mm'));
  // console.log(moment().tz('Africa/Accra').format('HH:mm'));
  // console.log(moment().tz('Africa/Tripoli').format('HH:mm'));
  useEffect(() => {
    (async () => {
      props.handleLoader(true);

      AGENDA_APIS.getLiveAgenda(agendaPageNo, agendaPageLimit).then(
        (agendaListData) => {
          setAgendaList(agendaListData.agendas);
          setTotalAgendaPages(
            Math.ceil(agendaListData.total / agendaPageLimit)
          );
          setData_status(true);
          props.handleLoader(false);
        }
      );
    })();
  }, []);

  // const onDateChange = (date) => {
  //   AGENDA_APIS.getLiveAgenda(date, agendaPageNo, agendaPageLimit).then(
  //     (agendaListData) => {
  //       // console.log("agendaListData date change===>", agendaListData);
  //       setSelectedDate(date);
  //       setAgendaList(agendaListData.agendas);
  //     }
  //   );
  // };

  return (
    <div id="page-content-wrapper">
      <div className="innerContentBlock">
        <div className="sitePageTitle">
          <h2>
            Live Now <span className="siteSubTitle"></span>
          </h2>
        </div>
        <div className="agendaPage">
          <div className="agendaInner">
            <ul className="nav nav-tabs agendaTab">
              <li className="">
                <a data-toggle="tab" className="active">
                  {moment().format("MMMM Do YYYY")}
                </a>
              </li>
            </ul>
            <div className="tab-content agendaContent">
              <div className="tab-pane fade active show">
                <div className="agendaTabContent">
                  {agendaList && agendaList.map((agenda, index) => {
                    if (
                      moment().tz(agenda.time_zones.timezone).format("HH:mm") >=
                        agenda.start_time &&
                      moment().tz(agenda.time_zones.timezone).format("HH:mm") <=
                        agenda.end_time
                    ) {
                      count++;

                      return (
                        <AgendaEvent
                          serialNo={index + 1}
                          title={agenda.title}
                          box_image={agenda.box_image}
                          timezone={agenda.time_zones.timezone}
                          category={agenda.agenda_categories.category}
                          time={`
                             ${moment(agenda.start_time, ["HH:mm"]).format(
                               "h:mm A"
                             )}
                             -
                             ${moment(agenda.end_time, ["HH:mm"]).format(
                               "h:mm A"
                             )}
                             `}
                          agendaId={agenda._id}
                          agenda_type={agenda.agenda_type}
                          description={agenda.description}
                          tags={agenda.tags}
                          agendaStartTime={agenda.start_time}
                          agendaEndTime={agenda.end_time}
                          isFavourite={agenda.is_favourite.length > 0 ? 1 : 0}
                          speakers={agenda.speakers}
                        />
                      );
                    }
                  })}
                  {count == "0" && data_status == true && (
                    <div class="no-data">
                      <p> There is no live event right now!</p>
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
