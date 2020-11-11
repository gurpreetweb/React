import React from "react";
import moment from "moment";
import ReactPlayer from "react-player";
import CONFIG from "../../../config.json";
import * as API from "../../../api/agenda/index";

class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDemandData: [],
      totalRecords: 0,
      loading: false,
      activePage: 1,
      totalPage: 0,
      limit: 4,
      skip: 0,
      alphaSort: "", //asc or dsc
      searchQuery: "",
      totalFilter: 0,
    };
  }

  componentDidMount = async () => {
    await this.getOnDemandData();
  };

  getOnDemandData = async () => {
    console.log("getOnDemandData inoked");
    this.setState({
      loading: true,
    });
    try {
      let options = {};
      if (this.state.alphaSort) {
        options.alphaSort = this.state.alphaSort;
      }
      if (this.state.searchQuery) {
        options.searchQuery = this.state.searchQuery;
      }
      let data = await API.getOnDemandData(
        this.state.skip,
        this.state.limit,
        options
      );
      if (data.status == 200) {
        const pages = Math.ceil(data.data.data.totalReacord / this.state.limit);

        if (pages < this.state.activePage) {
          this.setState(
            {
              skip: 0,
              activePage: 1,
            },
            () => {
              this.getOnDemandData();
            }
          );
        }
        this.setState(
          {
            onDemandData: this.state.onDemandData.concat(
              data.data.data.onDemandData
            ),
            totalRecords: data.data.data.totalReacord,
            totalPage: Math.ceil(
              data.data.data.totalReacord / this.state.limit
            ),
            loading: false,
          },
          () => {
            console.log("setsate====", this.state);
          }
        );
      } else {
        this.setState(
          {
            onDemandData: data.data.data.onDemandData,
            totalRecords: data.data.data.totalReacord,
            totalPage: Math.ceil(
              data.data.data.totalReacord / this.state.limit
            ),
            loading: false,
          },
          () => {
            console.log("setsate====", this.state);
          }
        );
      }
    } catch (error) {}
  };

  resetfilters = async () => {
    console.log("reset Filters invoked");
    this.setState(
      {
        alphaSort: "",
        searchQuery: "",
      },
      () => {
        this.getOnDemandData();
      }
    );
  };

  handleAlphaSort = (event) => {
    this.setState(
      {
        alphaSort: event.target.value,
      },
      () => {
        console.log("this.state=====>", this.state);
        this.getOnDemandData();
      }
    );
  };

  handleSearch = (event) => {
    this.setState(
      {
        searchQuery: event.target.value,
      },
      () => {
        console.log("this.state=====>", this.state);
        this.getOnDemandData();
      }
    );
  };

  handleNextPage = async () => {
    console.log("handleNextpage invoked");
    this.setState(
      {
        skip: this.state.skip + this.state.limit,
        activePage: this.state.activePage + 1,
      },
      () => {
        this.getOnDemandData();
      }
    );
  };

  handlePrePage = async () => {
    console.log("handlePrepage invoked");
    this.setState(
      {
        skip: this.state.skip - this.state.limit,
        activePage: this.state.activePage - 1,
      },
      () => {
        this.getOnDemandData();
      }
    );
  };

  handlePageChange = async (pageNo) => {
    console.log("handlePrepage invoked");
    this.setState(
      {
        skip: this.state.limit * (pageNo - 1),
        activePage: pageNo,
      },
      () => {
        this.getOnDemandData();
      }
    );
  };
  render() {
    const { totalPage, activePage } = this.state;
    return (
      <section id="sessionNav" className="sessionsSec dashSection">
        <div className="dashBoardTtile">
          <h2>SESSIONS</h2>
        </div>
        <div className="sessionVideoSec">
          <div className="sessVideoInner">
            {this.state.onDemandData.length > 0 == true ? (
              this.state.onDemandData.map((videoData) => {
                return (
                  <div className="sessVideoBox">
                    <div className="sessVideo">
                      <ReactPlayer
                        url={`${CONFIG.RECORD_URL}/${videoData.video}`}
                        light={`${process.env.REACT_APP_PROFILE_IMG_URL}/${videoData.agenda.box_image}`}
                        controls={true}
                        width="100%"
                        height="105px"
                        className="dashboardVideoMedia"
                        playIcon={
                          <img
                            src="/images/icons/playBtn.png"
                            style={{ width: "20%", height: "37%!important" }}
                          />
                        }
                      />
                    </div>
                    <div className="sessVideoText">
                      <h3>{videoData.agenda.title}</h3>
                    </div>
                  </div>
                );
              })
            ) : this.state.loading == true ? (
              <div> Loading...</div>
            ) : (
              <div> No record found</div>
            )}
          </div>
          {totalPage > 0 == true &&
            this.state.totalRecords != this.state.onDemandData.length && (
              <div
                className="sessionLoadButton"
                onClick={() => {
                  this.handleNextPage();
                }}
              >
                <button>Load More</button>
              </div>
            )}
        </div>
      </section>
    );
  }
}

export default Sessions;
