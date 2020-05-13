import React from "react";
import TextField from "@material-ui/core/TextField";
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
    <Paper className="paperContainer">
      <TextField
        className="textField"
        onKeyPress={(press) => {
          if (press.key === "Enter") {
            props.roomCreator(roomCode);
            resetRoomCode();
          }
        }}
        label="Inserisci l'id della stanza"
        {...bindRoomCode}
      />
    </Paper>
  );
};

export default CreateTimer;
