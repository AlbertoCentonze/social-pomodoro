const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expresServer = app.listen(9000);
const io = socketio(expresServer);

const timers = [];
let interval;

io.on("connection", (socket) => {
  socket.join("clocks")
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = TimersHandler(socket, timers);
  newTimerHandler(socket, timers);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const TimersHandler = (socket, timersList) => {
  return setInterval(() => {
    console.log(timersList);
    timersList.forEach((timer) => {
      socket.on(timer.id, (newTimerState) => {
        timer.active = newTimerState.active;
        timer.toReset = newTimerState.toReset;
      });
      if (timer.active) {
        timer.duration -= 1;
      } else if (timer.toReset) {
        timer.toReset = false;
        timer.duration = timer.duration;
      }
      io.of("/").to("clocks").emit(timer.id, timer);
    });
  }, 1000);
};

const newTimerHandler = (socket, timersList) => {
  socket.on("addTimer", (data) => {
    let isNew = true;
    for (let i = 0; i < timersList.length; i++)
      if (timersList[i].id === data.id) {
        console.log("New user connected to timer " + data.id);
        isNew = false;
        break;
      }
    if (isNew) {
      console.log("New timer added");
      timersList.push({
        id: data.id,
        duration: data.duration,
        active: false,
        toReset: false,
      });
    }
  });
};
