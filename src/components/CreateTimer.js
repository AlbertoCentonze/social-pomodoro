import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

const CreateTimer = (props) => {
  const [room, setRoom] = useState("");
  return (
    <TextField
      onChange={() => {
        setRoom();
      }}
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
    />
  );
};

export default CreateTimer;
