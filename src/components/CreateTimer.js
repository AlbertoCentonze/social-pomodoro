import React from "react";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "./createTimer.css";
import { useInput } from "../hooks/useInput";

const CreateTimer = (props) => {
  const {
    value: roomCode,
    bind: bindRoomCode,
    reset: resetRoomCode,
  } = useInput("");

  return (
    <Paper elevation={3} className="paperContainer">
      <TextField
        className="textField"
        onKeyPress={(press) => {
          if (press.key === "Enter" && props.connected) {
            props.roomCreator(roomCode);
            resetRoomCode();
          }
        }}
        id="outlined-textarea"
        label="Inserisci il codice della stanza"
        placeholder="Ad esempio: latino"
        {...bindRoomCode}
      />
    </Paper>
  );
};

export default CreateTimer;
