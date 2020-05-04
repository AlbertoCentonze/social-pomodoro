import React, { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Timer from "./components/Timer";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";

function App() {
  const [timers, setTimers] = useState([]);
  return (
    <div>
      {timers.map((id) => (
        <Timer key={id} channel={id} />
      ))}
      <CreateTimer
        roomCreator={(newTimerId) => {
          socket.emit("addTimer", {
            id: newTimerId,
            duration: 1500,
          });
          setTimers([...timers, newTimerId]);
        }}
      />
      <div className="fab">
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
    </div>
  );
}

export default App;
