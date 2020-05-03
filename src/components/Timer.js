import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import RestoreIcon from "@material-ui/icons/Restore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import { socket } from "../services/socket.js";
import "./Timer.css";

const Timer = (props) => {
  const [timerState, setTimerState] = useState(false);
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    socket.on(props.channel, (data) => {
      setMinutes(data);
    });
  });

  return (
    <div className="TimerContainer">
      <div style={styles.textContainer}>
        <p>{minutes}</p>
      </div>

      <div style={styles.buttonContainer}>
        <Button variant="contained" color="default" startIcon={<RestoreIcon />}>
          RESET
        </Button>
        <Button
          onClick={() => {
            setTimerState(!timerState);
          }}
          variant="contained"
          color={timerState ? "secondary" : "primary"}
          endIcon={timerState ? <PauseIcon /> : <PlayArrowIcon />}
        >
          {timerState ? "PAUSE" : "START"}
        </Button>
      </div>
    </div>
  );
};

const styles = {
  textContainer: {},

  buttonContainer: {},
};

export default Timer;
