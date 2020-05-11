import React, { useState } from "react";
import Timer from "./components/Timer";
import { socket } from "./services/socket";
import CreateTimer from "./components/CreateTimer";
import "./App.css";

//react device detect

function App() {
  const [timers, setTimers] = useState([]);

  return (
    <div className="container">
      {timers.map((id) => (
        <Timer key={id} channel={id} />
      ))}
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
    </div>
  );
}

export default App;
