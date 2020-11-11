import React, { Component } from "react";
import moment from "moment";
import CONFIG from "../../../config.json";
import * as API from "../../../api/agenda/index";
import VideoPreview from "./videoPreview";
import Footer from "../../common/footer";

class Expo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDemandData: [],
      totalRecords: 0,
      loading: false,
      activePage: 1,
      totalPage: 0,
      limit: 3,
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
      <div id="page-content-wrapper">
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>
              On Demand{" "}
              <span className="siteSubTitle">
                Access past keynotes and breakout sessions 24/7
              </span>
            </h2>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="onDemandPage">
            <div className="demandVideo">
              <div className="demandTitleFilter">
                <div className="demandTitle">
                  <h3>All Video’s</h3>
                </div>
                <div className="demandFilter">
                  {/* <div className="filterBtn">
                    <button type="button" className="fiterTag">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-funnel"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
                        />
                      </svg>{" "}
                      Filter Tag (0)
                    </button>
                  </div> */}
                  <div className="filterBtn">
                    <div className="selectDropDown">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          this.handleAlphaSort(e);
                        }}
                      >
                        <option>Alphabetical</option>
                        <option value="asc">A - Z</option>
                        <option value="dsc">Z - A</option>
                      </select>
                    </div>
                  </div>
                  <div className="filterBtn">
                    <div className="filterBtnSearch">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Live keyword"
                        onChange={(e) => {
                          this.handleSearch(e);
                        }}
                        value={this.state.searchQuery}
                      />
                    </div>
                  </div>
                  <div className="filterBtn">
                    <button
                      type="button"
                      className="removeTag"
                      onClick={() => {
                        this.resetfilters();
                      }}
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-funnel"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
                        />
                      </svg>{" "}
                      Clear Filter’s
                    </button>
                  </div>
                </div>
              </div>
              <div className="filterVideoSec">
                {this.state.onDemandData.length > 0 == true ? (
                  this.state.onDemandData.map((videoData) => {
                    return (
                      <VideoPreview
                        title={videoData.agenda.title}
                        date={moment(videoData.created_at).format(
                          "MMM Do YYYY"
                        )}
                        url={`${CONFIG.RECORD_URL}/${videoData.video}`}
                        thumbnail={`${process.env.REACT_APP_PROFILE_IMG_URL}/${videoData.agenda.box_image}`}
                      />
                    );
                  })
                ) : this.state.loading == true ? (
                  <div> Loading...</div>
                ) : (
                  <div> No record found</div>
                )}
              </div>
            </div>
          </div>
          {totalPage > 0 == true && (
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
        <Footer />
      </div>
    );
  }
}

export default Expo;
