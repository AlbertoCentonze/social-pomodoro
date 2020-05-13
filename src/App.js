import React, { useState } from "react";
import Timer from "./components/Timer";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FlexiblePaperCard from "./components/FlexiblePaperCard";
import "./App.css";

function App() {
  const [timer, setTimer] = useState();

  return (
    <Container className="container">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {timer === undefined ? (
          <FlexiblePaperCard
            title="Benvenuto sul timer più figo del mondo"
            description="Questo timer ti permette di studiare sfruttando i cicli di studio. Connettiti ad un timer utilizzando un ID che puoi scegliere a piacere e studia con i tuoi amici condividendolo"
          />
        ) : (
          <Timer channel={timer} />
        )}
        <CreateTimer
          roomCreator={(newTimerId) => {
            socket.emit("addTimer", {
              id: newTimerId,
              duration: 1500,
              active: false,
              toReset: false,
              mode: "pomodoro",
            });
            setTimer(newTimerId);
          }}
        />
        <FlexiblePaperCard title="Informazioni di servizio" description="1. Purtroppo non è ancora disponibile un layout ottimizzato per i browser PC, ti invito ad utilizzare il cellulare finché non avrò risolto 2. Il timer potrebbe bloccarsi da solo, è normale e sto lavorando per correggerlo. Se si blocca ancora segnalamelo 3. Non sto riuscendo a centrare i bottoni start e reset, da fastidio anche a me tranquillo" />
        <FlexiblePaperCard title="Vuoi collaborare?" description="Visita la mia repository su github per avere maggiori informazioni! AlbertoCentonze/social-pomodoro" />
      </Grid>
    </Container>
  );
}

export default App;
