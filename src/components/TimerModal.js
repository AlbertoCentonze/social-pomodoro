import React from "react";
import { Modal } from "@material-ui/core";
import CreateTimer from "./CreateTimer";

const TimerModal = (props) => {
  return (
    <Modal open={props.open}>
      <CreateTimer />
    </Modal>
  );
};

export default TimerModal;
