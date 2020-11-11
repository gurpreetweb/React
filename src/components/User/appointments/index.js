import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import * as CONFIG from "../../../config.json";
import Footer from "../../common/footer";

class Booth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
      },
      appointment_data: [],
      error: {},
      message: "",
      errorMessage: "",
      loading: false,
      activePage: 1,
      totalPage: 0,
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.data[inputName] = inputValue;
    this.setState(statusCopy);
    this.setState({ error: {}, message: "", errorMessage: "" });
    //console.log(this.state.error.inputName);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    var userData = JSON.parse(localStorage.getItem("userData"));
    var event_id = localStorage.getItem("eventId");
    axios.defaults.headers.common["token"] = "Bearer" + " " + userData.token;

    await axios
      .get(
        `${CONFIG.BASE_URL}/api/apointments/${userData._id}?pageNo=${this.state.activePage}`
      )
      .then((res) => {
        this.setState({ loading: false });

        if (res.data.status == 200) {
          this.setState({
            appointment_data: res.data.data.AppointmentsData,
            data_status: true,
            totalPage: res.data.data.totalPage,
          });
        } else if (res.data.status == 500) {
          this.setState({
            errorMessage: "Something went wrong, please try again later!",
            data_status: true,
          });
        } else {
          this.setState({ errorMessage: res.data.message });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({
          errorMessage: "Something went wrong, please try again later!",
          data_status: true,
        });
      });
  };

  handleNextPage = async () => {
    console.log("handleNextpage invoked");
    this.setState(
      {
        activePage: this.state.activePage + 1,
      },
      () => {
        this.getData();
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
        this.getData();
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
        this.getData();
      }
    );
  };

  render() {
    const { totalPage, activePage } = this.state;

    console.log(this.state);
    return (
      <>
        <div id="page-content-wrapper">
          <div className="innerContentBlock">
            {/* Start Page Section */}
            <div className="sponsorDashboard">
              <div className="sitePageTitle">
                <h2>Appointments List</h2>
              </div>
              <div className="appointmentList">
                <div className="appointListTable">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.appointment_data.map((value, index) => {
                        return (
                          <tr>
                            <th scope="row" className="listSr">
                              {index + 1}
                            </th>
                            <td className="listName">{value.name}</td>
                            <td className="listEmail">{value.email}</td>
                            <td className="listMsg">{value.message}</td>
                            {/* <td className="listMsg">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document <span className="readMore">Read More</span></td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

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
              </div>
            </div>
            {/* End Page Section */}
          </div>
          {/* <Footer /> */}
        </div>
      </>
    );
  }
}

export default Booth;
