import React from "react"
import TextField from "@material-ui/core/TextField";
import { useInput } from "../hooks/useInput";

const CreateTimer = (props) => {
  const {
    value: roomCode,
    bind: bindRoomCode,
    reset: resetRoomCode,
  } = useInput("");
  return (
    <div>
      <TextField
        onKeyPress={(press) => {
          if (press.key === "Enter") {
            props.roomCreator(roomCode);
            resetRoomCode();
          }
        }}
        label="Inserisci l'id della stanza"
        variant="outlined"
        {...bindRoomCode}
      />
    </div>
  );
};

export default CreateTimer;
