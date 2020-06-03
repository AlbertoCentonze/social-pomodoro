import React, { useEffect } from "react";
import { Button, Grid, ButtonGroup, Paper } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { usePomodoro } from "../hooks/usePomodoro";
import { socket } from "../services/socket.js";
import "./Timer.css";
import UIfx from "uifx";
import alarm from "../audio/piano2.wav";

const piano = new UIfx(alarm, { volume: 1 });

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
    if (minutes === "00" && seconds === "00") {
      piano.play();
      socket.close();
      socket.connect();
    }
    socket.once(props.channel, ({ active, duration }) => {
      setActive(active);
      setTime(duration);
    });
  });

  return (
    <Paper className="timerContainer">
      <ButtonGroup variant="outlined">
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
          variant="outlined"
          color="primary"
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
          variant="outlined"
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
