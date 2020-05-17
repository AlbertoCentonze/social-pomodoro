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
        label="Inserisci il codice della stanza"
        {...bindRoomCode}
      />
      {/*TODO <CircularProgress />*/}
    </Paper>
  );
};

export default CreateTimer;
