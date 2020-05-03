import React, { useState, useEffect } from "react";
import { Button, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import { socket } from "../services/socket.js";

const Timer = (props) => {
  const [timerState, setTimerState] = useState(false);
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    socket.on(props.channel, (data) => {
      setMinutes(data);
    });
  });
  return (
    <div>
      <p>{minutes}</p>
      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
        RESET
      </Button>
      <Button
        onClick={() => {
          setTimerState(!timerState);
        }}
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        {timerState ? "PAUSE" : "START"}
      </Button>
    </div>
  );
};

export default Timer;
