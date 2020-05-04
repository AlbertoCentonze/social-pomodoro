import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { useTimer } from "../hooks/useTimer";
import { socket } from "../services/socket.js";
import Paper from "@material-ui/core/Paper";
import "./Timer.css";

const Timer = (props) => {
  const [timerState, setTimerState] = useState(false);
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    socket.on(props.channel, (newTimer) => {
      setTimerState(newTimer.active);
      setMinutes(newTimer.duration);
    });
  });

  return (
    <Paper elevation={3} className="TimerContainer">
      <div>
        <p>{props.channel}</p>
      </div>
      <div>
        <p>{minutes}</p>
      </div>

      <div className="TimerButtonContainer">
        <Button
          onClick={() => {
            setTimerState(false);
            socket.emit(props.channel, { active: false, toReset: true });
          }}
          variant="contained"
          color="default"
          startIcon={<RestoreIcon />}
        >
          RESET
        </Button>
        <Button
          onClick={() => {
            setTimerState(!timerState);
            socket.emit(props.channel, {
              active: !timerState, // la variabile viene aggiornata solo dopo il rerender, quindi devo mettere !
              toReset: false,
            });
          }}
          variant="contained"
          color={timerState ? "secondary" : "primary"}
          endIcon={timerState ? <PauseIcon /> : <PlayArrowIcon />}
        >
          {timerState ? "PAUSE" : "START"}
        </Button>
      </div>
    </Paper>
  );
};

export default Timer;
