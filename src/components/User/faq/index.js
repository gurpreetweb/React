import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faq } from "../../../api/faq/index";
import { Link } from "react-router-dom";
import Footer from "../../common/footer";

class Faq extends Component {
  constructor() {
    super();
    this.state = {
      faqData: "",
    };
  }
  componentDidMount() {
    faq().then((res) => {
      if (res.data.status === 200 && res.data.data.length !== 0) {
        return this.setState({ ...this.state, faqData: res.data.data });
      } else if (res.data.data.length === 0) {
        return toast.error("No Faq Data Found");
      } else {
        return toast.error(res.data.message);
      }
    });
  }
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="innerContentBlock">
          {/* Start Page Title */}
          <div className="sitePageTitle">
            <h2>FAQ</h2>
            <span className="contactAdmin">
              <Link to="/help-desk" className="contactAdminBtn">
                Contact to Admin
              </Link>
            </span>
          </div>
          {/* End Page Title */}
          {/* Start Inner Sec */}
          <div className="faqPage">
            <div className="faqPageInner">
              <div className="faqSection">
                {this.state.faqData &&
                  this.state.faqData.map((value, index) => {
                    return (
                      <div key={index}>
                        <Question
                          question={value.question}
                          answereContent={
                            <div>
                              <p>{value.answer}</p>
                            </div>
                          }
                        />
                      </div>
                    );
                  })}
                <ToastContainer />
              </div>
            </div>
          </div>
          {/* End Inner Sec */}
          {/* End AGENDA HIGHLIGHTS Section */}
        </div>
        <Footer />
      </div>
    );
  }
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const { question, answereContent } = this.props;
    return (
      <div className="faqSectionBlock">
        <button
          className={this.state.show ? "accordion " : "accordion active"}
          onClick={() => {
            this.setState({ ...this.state, show: !this.state.show });
          }}
        >
          {question}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-chevron-down"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
        <div
          className="panel"
          style={{ display: this.state.show == true ? "block" : "none" }}
        >
          {answereContent}
        </div>
      </div>
    );
  }
}

export default Faq;
