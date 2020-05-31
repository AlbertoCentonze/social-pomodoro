import React from "react";
import { Modal } from "@material-ui/core";
import CreateTimer from "./CreateTimer";
import "../App.css";

const TimerModal = (props) => {
  return (
    <Modal open={props.open}>
      <CreateTimer className="modal" />
    </Modal>
  );
};

export default TimerModal;
