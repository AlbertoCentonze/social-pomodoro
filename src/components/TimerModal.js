import React from "react";
import { Modal } from "@material-ui/core";
import CreateTimer from "./CreateTimer";
import "../App.css";

const TimerModal = (props) => {
  return (
    <Modal className="modal" open={props.open}>
      <CreateTimer />
    </Modal>
  );
};

export default TimerModal;
