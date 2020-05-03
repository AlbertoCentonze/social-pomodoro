import React, { useState } from "react";
import { Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Timer from "./components/Timer";
import { socket } from "./services/socket";

function App() {
  const [timers, setTimers] = useState([]);
  return (
    <div>
      {timers.map(id => <Timer key= {id} channel= {id}/>)}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          const newTimerId = "timer" + Math.random();
          socket.emit("addTimer", {
            id: newTimerId,
            duration: 1000,
          });
          setTimers([...timers, newTimerId]);
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default App;
