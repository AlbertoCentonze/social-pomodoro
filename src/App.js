import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Header from "./components/Header";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";
import { Container, Grid } from "@material-ui/core";
import FlexiblePaperCard from "./components/FlexiblePaperCard";
import { setRecentCodes } from "./services/recentCodes";
import "./App.css";
import RecentCodes from "./components/RecentCodes";
import { isMobile } from "react-device-detect";

function App() {
  const [timer, setTimer] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connection", (data) => setConnected(data));
  });

  const mobile = (
    <Grid
      className="container"
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <Header />
      {timer === undefined ? (
        <FlexiblePaperCard
          title="Benvenuto sul timer più figo del mondo"
          description="Questo timer ti permette di studiare sfruttando i cicli di studio. Connettiti ad un timer utilizzando un codice a tuo piacimento e studia con i tuoi amici condividendolo"
        />
      ) : (
        <Timer channel={timer} />
      )}
      <RecentCodes />
      <CreateTimer
        connected={connected}
        roomCreator={(newTimerId) => {
          let timerId = newTimerId.toUpperCase();
          socket.emit("addTimer", {
            id: timerId,
            duration: 1500,
            active: false,
            toReset: false,
            mode: "pomodoro",
          });
          setRecentCodes(timerId);
          setTimer(timerId);
        }}
      />
      <FlexiblePaperCard
        title="Ultime novità"
        description="Sto testando una correzione per il sistema del timer, non dovrebbe più bloccarsi ma se dovesse accadere ancora ti prego di farmelo sapere."
      />
      <FlexiblePaperCard
        title="Problemi noti"
        description="1. Purtroppo non è ancora disponibile un layout ottimizzato per i browser PC, ti invito ad utilizzare il cellulare finché non avrò risolto"
      />
      <FlexiblePaperCard
        title="Vuoi collaborare?"
        description="Visita la mia repository su Github per avere maggiori informazioni! AlbertoCentonze/social-pomodoro"
      />
    </Grid>
  );

  const desktop = (
    <Container className="container">
      <p>funonzia</p>
    </Container>
  );

  if (isMobile) {
    return mobile;
  } else {
    return desktop;
  }
}

export default App;
