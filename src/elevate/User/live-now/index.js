import React from "react";
import moment from "moment-timezone";
import * as AGENDA_APIS from "../../../api/agenda/index";
import AgendaBlock from "./agendaBlock";
class LiveNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agendaPageNo: 1,
      agendaPageLimit: 10,
      agendaList: [],
      totalAgendaPages: 0, 
      data_status: false,
      loading: true,
    };
  }
  componentDidMount = async () => {
    AGENDA_APIS.getLiveAgenda(
      this.state.agendaPageNo,
      this.state.agendaPageLimit
    ).then((agendaListData) => {
      console.log("elevate agendaListData==============>", agendaListData);
      if (agendaListData.status == 200) {
        this.setState(
          {
            agendaList: agendaListData.agendas,
            totalAgendaPages: Math.ceil(
              agendaListData.total / this.state.agendaPageLimit
            ),
            data_status: true,
            loading: false,
          },
          () => {
            console.log(this.state);
          }
        );
      } else {
        console.log("elevate agendaListData error ---->", agendaListData);
      }
    });
  };
  render() {
    return (
      <div id="confrenceNav" className="eleDashAgenda dashSection">
        <div className="dashConBaner">
          <div className="eleConAge">
            <div className="dashConAgeTitle">
              <h2>Conference Agenda</h2>
            </div>
            <div className="dashAgendaSec">
              <div className="eleAgendaBox">
                {
                  this.state.agendaList.length>0
                  ?
                  this.state.agendaList.map((agenda, index) => {
                    if (
                      moment().tz(agenda.time_zones.timezone).format("HH:mm") >=
                        agenda.start_time &&
                      moment().tz(agenda.time_zones.timezone).format("HH:mm") <=
                        agenda.end_time
                    ) {
                      return (
                        <AgendaBlock
                          startDate={moment(agenda.agenda_date * 1000).format(
                            "dddd, MMM DD, YYYY"
                          )}
                          title={agenda.title}
                          description={agenda.description}
                          startTime={agenda.start_time}
                          endTime={agenda.end_time}
                          tags={agenda.tags}
                          agendaId={agenda._id}
                          timezone={agenda.time_zones.timezone}
                          agendaType={agenda.agenda_type}
                          speakers = {agenda.speakers}
                        />
                      );
                    }
                  })
                  :
                  <div>No agenda is live now</div>
                }
              </div>
            </div>
          </div>
          <div className="eleConBanner">
            <div className="agendaBnr">
              <img src="elevate-theme/images/icons/bannerImg.jpg" alt />
            </div>
            <div className="agendaBnr">
              <img src="elevate-theme/images/icons/bannerImg.jpg" alt />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveNow;
