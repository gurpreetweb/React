import React, { useState, useEffect } from "react";
//import moment from "moment";
import moment from "moment-timezone";
import * as SUGGESTED_AGENDA_APIS from "../../../api/suggestedMe";
import AgendaEvent from "./agendaEvent";
import Footer from "../../common/footer";
import ChatComponent from "../socialHubSuggestedMe";

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_status: false,
      totalRecords: 0,
      agendaList: [],
      limit: 10,
      skip: 0,
      totalPage: 0,
      activePage: 1,
    };
  }

  componentDidMount = async () => {
    await this.fetchSuggestedAgenda();
  };

  fetchSuggestedAgenda = () => {
    console.log("fetchSuggestedAgenda");
    SUGGESTED_AGENDA_APIS.getSuggestedAgendas(
      this.state.limit,
      (this.state.activePage - 1) * this.state.limit
    ).then((response) => {
      if (response.status == 200) {
        this.setState(
          {
            agendaList: response.data.agendaData,
            totalRecords: response.data.totalAgendas,
            totalPage: Math.ceil(response.data.totalAgendas / this.state.limit),
            data_status: true,
          },
          () => {
            console.log("aashish  this.state--------", this.state);
          }
        );
      } else {
        console.log("res.error in fetching data------------");
      }
    });
  };

  handleNextPage = async () => {
    console.log("handleNextpage invoked");
    this.setState(
      {
        activePage: this.state.activePage + 1,
      },
      () => {
        this.fetchSuggestedAgenda();
      }
    );
  };

  handlePrePage = async () => {
    console.log("handlePrepage invoked");
    this.setState(
      {
        activePage: this.state.activePage - 1,
      },
      () => {
        this.fetchSuggestedAgenda();
      }
    );
  };

  handlePageChange = async (pageNo) => {
    console.log("handlePrepage invoked");
    this.setState(
      {
        activePage: pageNo,
      },
      () => {
        this.fetchSuggestedAgenda();
      }
    );
  };

  render() {
    const {
      data_status,
      totalRecords,
      agendaList,
      limit,
      skip,
      totalPage,
      activePage,
    } = this.state;
    return (
      <div id="page-content-wrapper">
        <div className="innerContentBlock">
          <div className="sitePageTitle">
            <h2>
              Suggested For Me{" "}
              {/* <span className="siteSubTitle">Sessions Of Interests</span> */}
            </h2>
          </div>

          <div className="agendaPage">
            <div className="agendaInner">
              <div className="tab-content agendaContent">
                <div className="suggestedMe-chat">
                  <ChatComponent />
                </div>
                <div className="tab-pane fade active show">
                  <div className="sitePageTitle">
                    <h2>
                      {/* Suggested Agendas{" "} */}
                      <span className="siteSubTitle">
                        Sessions Of Interests
                      </span>
                    </h2>
                  </div>
                  {agendaList.length > 0 && (
                    <div className="agendaTabContent">
                      {agendaList.map((agenda, index) => (
                        <AgendaEvent
                          serialNo={index + 1}
                          title={agenda.title}
                          box_image={agenda.box_image}
                          agenda_date={agenda.agenda_date}
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
                          speakers={agenda.speakers}
                          isFavourite={agenda.is_favourite.length > 0 ? 1 : 0}
                        />
                      ))}
                    </div>
                  )}
                  {data_status == true && agendaList.length == 0 && (
                    <div class="no-data">
                      <p> There is no suggested event right now!</p>
                    </div>
                  )}
                  {data_status == true && agendaList.length > 0 && (
                    <div className="pagination">
                      <li
                        className="page-item"
                        onClick={() => {
                          if (activePage > 1) {
                            this.handlePrePage();
                          }
                        }}
                      >
                        <span className="page-link">Pre</span>
                      </li>
                      {Array.apply(null, Array(totalPage)).map((x, i) => {
                        return (
                          <li
                            className={`page-item ${
                              this.state.activePage == i + 1 ? "active" : ""
                            }`}
                            onClick={() => {
                              this.handlePageChange(i + 1);
                            }}
                          >
                            <span className="page-link">{i + 1}</span>
                          </li>
                        );
                      })}
                      <li
                        onClick={() => {
                          if (activePage < totalPage) {
                            this.handleNextPage();
                          }
                        }}
                      >
                        <span className="page-link">Next</span>
                      </li>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Agenda;
