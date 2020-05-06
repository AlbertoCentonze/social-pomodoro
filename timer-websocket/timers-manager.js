const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const timers = [];
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.join("clocks")
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    console.log(timers);
    timers.forEach((timer) => {
      socket.on(timer.id, (newTimerState) => {
        timer.active = newTimerState.active;
        timer.toReset = newTimerState.toReset;
      });
      if (timer.active) {
        timer.duration -= 1;
      } else if (timer.toReset) {
        timer.toReset = false;
        timer.duration = 1500;
      }
      socket.to("clocks").emit(timer.id, timer);
    });
  }, 1000);
  socket.on("addTimer", (data) => {
    let isNew = true;
    for (let i = 0; i < timers.length; i++)
      if (timers[i].id === data.id) {
        console.log("New user connected to timer" + data.id);
        isNew = false;
        break;
      }
    if (isNew) {
      console.log("New timer added");
      timers.push({
        id: data.id,
        duration: data.duration,
        active: false,
        toReset: false,
      });
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
