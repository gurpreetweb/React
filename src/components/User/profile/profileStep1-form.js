import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as COMMON_APIS from "../../../api/common";
import renderField from "../../common/fieldInput";
import renderSelect from "../../common/selectInput";
import textareaField from "../../common/textareaInput";
import * as CONFIG from "../../../config.json";
const ProfileStep1Form = (props) => {
  const {
    errorMsg,
    handleSubmit,
    // temProfileImage,
    uploadedImage,
    // setTempProfileImage,
    imageUpload,
  } = props;

  const [temProfileImage, setTempProfileImage] = useState("");
  const [timeZone, setTimeZone] = useState([]);

  useEffect(() => {
    (async () => {
      const timeZone = await COMMON_APIS.getTimeZone();
      console.log("timeZone======>", timeZone);
      setTimeZone(timeZone);
    })();
  }, []);
  return (
    <>
      <ToastContainer />

      <div className="welcomeProHead">
        <h2>
          Welcome {props.userData.firstName} {props.userData.lastName}!
        </h2>
        {/* <p>
          Please begin by filling in your attendee details and uploading a
          profile picture
        </p> */}
        <ul className="welcomeTab">
          <li className="active">
            <a href="#">{1}</a>
          </li>
          <li className="">
            <a href="#">{2}</a>
          </li>
        </ul>
      </div>
      <div className="welcomeProForm">
        <form name="profileStep1Form" onSubmit={handleSubmit}>
          <div className="welcomeProInner">
            <div className="welProfileLeft">
              <div className="welcomeImageSec">
                <div className="atteProfileImage">
                  <img
                    src={
                      temProfileImage
                        ? temProfileImage
                        : uploadedImage
                        ? CONFIG.BASE_URL + "/uploads/" + uploadedImage
                        : "/images/attendeeImg-2.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="uploadProImage">
                  <input
                    type="file"
                    id="uploadImg"
                    accept="image/png, image/jpeg"
                    name="profilePic"
                    onChange={(e) => {
                      console.log("img ", e.target.files[0]);
                      if (
                        ["image/png", "image/jpeg"].includes(
                          e.target.files[0].type
                        )
                      ) {
                        setTempProfileImage(
                          URL.createObjectURL(e.target.files[0])
                        );
                        imageUpload(e.target.files[0]);
                      } else {
                        toast.error("Only jpg or png image are allowed");
                      }
                    }}
                  />
                  <span className="uploadImgText">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-image"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.002 2h-12a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12z"
                      />
                      <path d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z" />
                      <path
                        fillRule="evenodd"
                        d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                      />
                    </svg>{" "}
                    Upload Profile Picture
                  </span>
                </div>
              </div>

              <div className="formField">
                <Field
                  name="linkedInUrl"
                  type="text"
                  placeholder="Linkedin"
                  className="form-control"
                  containerClass="form-group"
                  component={renderField}
                />
                <div className="selectDropDown">
                <Field
                  name="role"
                  type="text"
                  placeholder="Role"
                  className="form-control"
                  containerClass="form-group"
                  component={renderField}
                />
                </div>
              </div>
            </div>

            <div className="welProfileDetail">
              <div className="profileAttenDetail">
                <h3>Attendee Details</h3>
                <div className="formField">
                  <Field
                    name="jobTitle"
                    type="text"
                    isLabel={false}
                    placeholder="Title"
                    className="form-control"
                    containerClass="form-group"
                    component={renderField}
                  />
                  <Field
                    name="company"
                    type="text"
                    placeholder="Comapny"
                    className="form-control"
                    containerClass="form-group"
                    component={renderField}
                    isLabel={false}
                  />

                  <Field
                    name="department"
                    type="text"
                    isLabel={false}
                    placeholder="Department"
                    className="form-control"
                    containerClass="form-group"
                    component={renderField}
                  />

                  <div className="form-group">
                    <div className="selectDropDown">
                      <Field
                        name="timeZone"
                        component={renderSelect}
                        className="form-control max-width"
                      >
                        <option value="" disabled selected>
                          Time Zone
                        </option>
                        {timeZone.map((data) => (
                          <option value={data._id}>{data.timezone}</option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <Field
                    name="bio"
                    rows={5}
                    id="comment"
                    placeholder="Write Bio"
                    isLabel={false}
                    className="form-control"
                    containerClass="form-group"
                    component={textareaField}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="profileSaveButton">
            <button
              type="submit"
              className="saveContNew"
              // onClick={() => setStep(2)}
            >
              Save and continue
            </button>
          </div>
          {errorMsg != "" && <div className="signupError_msg">{errorMsg}</div>}
        </form>
      </div>
    </>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.linkedInUrl) {
    errors.linkedInUrl = "This field is required";
  }
  if (values.linkedInUrl) {
    if (values.linkedInUrl.trim() == null) {
      errors.linkedInUrl = "This field is required";
    }
  }
  if (!values.role) {
    errors.role = "This field is required";
  }
  // if (values.role) {
  //   if (values.role.trim() == null) {
  //     errors.role = "This field is required";
  //   }
  // }
  if (!values.jobTitle) {
    errors.jobTitle = "This field is required";
  }
  if (values.jobTitle) {
    if (values.jobTitle.trim() == null) {
      errors.jobTitle = "This field is required";
    }
  }

  if (!values.company) {
    errors.company = "This field is required";
  }
  if (values.company) {
    if (values.company.trim() == null) {
      errors.company = "This field is required";
    }
  }

  if (!values.jobTitle) {
    errors.jobTitle = "This field is required";
  }
  if (values.jobTitle) {
    if (values.jobTitle.trim() == null) {
      errors.jobTitle = "This field is required";
    }
  }

  if (!values.department) {
    errors.department = "This field is required";
  }
  if (values.department) {
    if (values.department.trim() == null) {
      errors.department = "This field is required";
    }
  }

  if (!values.timeZone) {
    errors.timeZone = "This field is required";
  }
  if (values.timeZone) {
    if (values.timeZone.trim() == null) {
      errors.timeZone = "This field is required";
    }
  }

  if (!values.bio) {
    errors.bio = "This field is Required";
  }
  if (values.bio) {
    if (values.bio.trim() == "") {
      errors.bio = "Enter a valid password";
    }
  }

  return errors;
};

export default reduxForm({
  form: "profileStep1Form",
  validate: validate,
})(ProfileStep1Form);
