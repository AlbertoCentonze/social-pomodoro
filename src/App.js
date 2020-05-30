import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Header from "./components/Header";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";
import { Grid } from "@material-ui/core";
import FlexiblePaperCard from "./components/FlexiblePaperCard";
import { setRecentCodes } from "./services/recentCodes";
import "./App.css";
import RecentCodes from "./components/RecentCodes";

function App() {
  const [timer, setTimer] = useState();
  const [connected, setConnected] = useState(false);

  const newTimerHandler = (newTimerId) => {
    let timerId = newTimerId.toUpperCase();
    socket.emit("addTimer", { id: timerId });
    setRecentCodes(timerId);
    setTimer(timerId);
  };

  //TODO DELETE THE PREVIOUS TIMER? check the hook

  useEffect(() => {
    socket.on("connection", (data) => setConnected(data));
  });

  //const mobile = (
  return (
    <div className="main-div">
      <Header className="header" />
      <div className="data-div">
        <Grid className="container data" container direction="column">
          <FlexiblePaperCard
            title="Ultime novità"
            description="Nuova correzione per il timer in fase di testing, aggiunto anche un primo supporto ai timer recenti"
          />
          <FlexiblePaperCard
            title="Problemi noti"
            description="Purtroppo non è ancora disponibile un layout ottimizzato per i browser PC, ti invito ad utilizzare il cellulare finché non avrò risolto"
          />
          <FlexiblePaperCard
            title="Vuoi collaborare?"
            description="Visita la mia repository su Github per avere maggiori informazioni! AlbertoCentonze/social-pomodoro"
          />
        </Grid>
      </div>
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
          <CreateTimer connected={connected} roomCreator={newTimerHandler} />
        </Grid>
      </div>
    </div>
  );
}

export default App;
