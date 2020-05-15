import React, { useEffect } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import RestoreIcon from "@material-ui/icons/Restore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { usePomodoro } from "../hooks/usePomodoro";
import { socket } from "../services/socket.js";
import Paper from "@material-ui/core/Paper";
import "./Timer.css";

const Timer = (props) => {
  const [seconds, minutes, setTime, active, setActive, timerMode] = usePomodoro(
    1500
  );

  const resetHandler = () => {
    setActive(false);
    socket.emit(props.channel, {
      active: false,
      toReset: true,
      mode: timerMode.current,
    });
  };

  const modeHandler = (mode) => {
    timerMode.current = mode;
    socket.emit(props.channel, { mode: timerMode.current });
  };

  useEffect(() => {
    socket.on(props.channel, (newTimer) => {
      setActive(newTimer.active);
      setTime(newTimer.duration);
    });
  });

  return (
    <Paper elevation={3} className="TimerContainer">
      <ButtonGroup variant="contained" color="primary">
        <Button
          onClick={() => {
            modeHandler("pomodoro");
            resetHandler();
          }}
        >
          pomodoro
        </Button>
        <Button
          onClick={() => {
            modeHandler("shortBreak");
            resetHandler();
          }}
        >
          Short Break
        </Button>
        <Button
          onClick={() => {
            modeHandler("longBreak");
            resetHandler();
          }}
        >
          Long Break
        </Button>
      </ButtonGroup>
      <p className="roomText">{"ID stanza: " + props.channel}</p>
      <p className="timeText">{minutes + ":" + seconds}</p>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Button
          onClick={() => {
            setActive(false);
            socket.emit(props.channel, {
              active: false,
              toReset: true,
              mode: timerMode.current,
            });
          }}
          variant="contained"
          color="default"
          startIcon={<RestoreIcon />}
        >
          RESET
        </Button>
        <Button
          onClick={() => {
            setActive(!active);
            socket.emit(props.channel, {
              active: !active, // la variabile viene aggiornata solo dopo il rerender, quindi devo mettere !
              toReset: false,
            });
          }}
          variant="contained"
          color={active ? "secondary" : "primary"}
          endIcon={active ? <PauseIcon /> : <PlayArrowIcon />}
        >
          {active ? "PAUSE" : "START"}
        </Button>
      </Grid>
    </Paper>
  );
};

export default Timer;
