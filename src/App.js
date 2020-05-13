import React, { useState } from "react";
import Timer from "./components/Timer";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { isMobile, isBrowser } from "react-device-detect";
import "./App.css";

console.log( "mobile" + isMobile + "browser" + isBrowser)

function App() {
  const [timers, setTimers] = useState([]);

  return (
    <div className="container">
      <Container>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          {timers.map((id) => (
            <Timer key={id} channel={id} />
          ))}
        </Grid>
        <Container>
          <CreateTimer
            roomCreator={(newTimerId) => {
              socket.emit("addTimer", {
                id: newTimerId,
                duration: 1500,
                active: false,
                toReset: false,
                mode: "pomodoro",
              });
              setTimers([...timers, newTimerId]);
            }}
          />
        </Container>
      </Container>
    </div>
  );
}

export default App;
