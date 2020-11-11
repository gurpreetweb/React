import React, { useState, useEffect } from "react";
import { addNotes } from "../../../api/notes/index";
import Modal from "react-modal";

const Btn = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [note_title, setNote_Title] = useState(props.noteTitle);
  const [note_description, setNote_Description] = useState(
    props.noteDescription
  );

  return (
    <>
      <button
        onClick={() => {
          return setIsActive(true);
        }}
      >
        {props.btnName}
      </button>

      <Modal ariaHideApp={false} isOpen={isActive} contentLabel="Example Modal">
        <h1>{props.title}</h1>
        <input
          className="form-control"
          onChange={(e) => {
            setNote_Title(e.target.value);
          }}
          value={note_title}
        />
        <textarea
          className="form-control"
          rows={8}
          onChange={(e) => {
            setNote_Description(e.target.value);
          }}
          value={note_description}
          maxLength="500"
        />
        <button
          onClick={() => {
            addNotes(props.adengaJoinId, note_title, note_description).then(
              (res) => {
                return res.data.status === 200 ? props.onPropsChange() : "";
              }
            );
            setIsActive(!isActive);
          }}
        >
          Save Note
        </button>
        <button
          onClick={() => {
            return setIsActive(!isActive);
          }}
        >
          X
        </button>
      </Modal>
    </>
  );
};
export default Btn;
