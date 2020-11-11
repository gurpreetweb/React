import React, { useState, useEffect } from "react";
import { addNotes } from "../../../api/notes/index";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Btn = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [note_title, setNote_Title] = useState(props.noteTitle);
  const [note_description, setNote_Description] = useState(
    props.noteDescription
  );
  const handleOnClick = async () => {
    if (!note_description) {
      return toast.error("Note Feilds Can't Be Empty");
    }
    await addNotes(props.adengaJoinId, note_title, note_description).then(
      (res) => {
        return res.data.status === 200
          ? props.onPropsChange()
          : toast.error(res.data.message);
      }
    );
    setIsActive(!isActive);
  };

  return (
    <>
      <button
        className="btn btn-primary addNotesPop"
        onClick={() => {
          return setIsActive(true);
        }}
      >
        {props.btnName}
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={isActive}
        contentLabel="Example Modal"
        className="addNotesModel"
      >
        <div className="addNotesBody">
          <button
            className="closeBtn"
            onClick={() => {
              return setIsActive(!isActive);
            }}
          >
            +
          </button>
          <h1>{props.title}</h1>
          {/* <input
            className="form-control"
            placeholder="Enter Title"
            onChange={(e) => {
              setNote_Title(e.target.value);
            }}
            value={note_title}
          /> */}
          <textarea
            className="form-control"
            placeholder="Enter Description"
            rows={8}
            onChange={(e) => {
              setNote_Description(e.target.value);
            }}
            value={note_description}
            maxLength="500"
          />
          <div className="submitNotes">
            <button
              className="submitNotsBtn"
              onClick={() => {
                handleOnClick();
              }}
            >
              Save Note
            </button>
          </div>
        </div>
      </Modal>
        <ToastContainer />
    </>
  );
};
export default Btn;
