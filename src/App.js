import React, { useState } from "react";
import Timer from "./components/Timer";
import Header from "./components/Header";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";
import { Grid } from "@material-ui/core";
import FlexiblePaperCard from "./components/FlexiblePaperCard";
import { setRecentCodes } from "./services/recentCodes";
import RecentCodes from "./components/RecentCodes";
import TimerModal from "./components/TimerModal";
import "./App.css";

function App() {
  const [timer, setTimer] = useState();
  const [modal, setModal] = useState(false);

  const newTimerHandler = (newTimerId) => {
    socket.off(timer);
    let timerId = newTimerId.toLowerCase();
    socket.emit("add", {
      id: timerId,
      cycles: { pomodoro: 1500, shortBreak: 300, longBreak: 600 },
    });
    setRecentCodes(timerId);
    setTimer(timerId);
  };

  return (
    <div className="main-div">
      {/* TODO add description, explaination */}

      <Header className="header" />
      <TimerModal open={modal} className="modal" />
      <div className="timer-div">
        <Grid container>
          {timer === undefined ? (
            <FlexiblePaperCard
              elevation={60}
              title="Benvenuto sul timer più figo al mondo!"
              description="Questo timer ti permette di studiare sfruttando i cicli di studio. Connettiti ad un timer utilizzando un codice a tuo piacimento e studia con i tuoi amici condividendolo"
            />
          ) : (
            <Timer channel={timer} />
          )}
          <RecentCodes onRecentClick={newTimerHandler} />
          <CreateTimer roomCreator={newTimerHandler} />
        </Grid>
      </div>
      <div className="data-div">
        <Grid className="container data" container direction="column">
          <FlexiblePaperCard
            title="Ultime novità"
            description="Nuova grafica totalmente rinnovata per gli utenti desktop. Migliorato il supporto ai timer recenti (ancora da migliorare). "
          />
          <FlexiblePaperCard
            title="In programma"
            description="Siamo già al lavoro per aggiungere dei timer con il supporto a durate personalizzate e un sistema di password per rendere le stanze private"
          />
          <FlexiblePaperCard
            title="Vuoi collaborare?"
            description="Visita la mia repository su Github per avere maggiori informazioni! AlbertoCentonze/social-pomodoro"
          />
        </Grid>
      </div>
    </div>
  );
}

export default App;
