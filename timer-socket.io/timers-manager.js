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
let addSecond = 0;

io.on("connection", (socket) => {
  socket.setMaxListeners(0);
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    console.log(timers);
    timers.forEach((timer) => {
      socket.on(timer.id, (newState) => {
        addSecond = newState.active ? 0 : 1;
        timer.duration = newState.reset ? 25 * 60 : timer.duration;
      });
      timer.duration -= addSecond;
      if (timer.duration < 0) {
        const index = timers.indexOf(timer);
        if (index !== -1) timers.splice(index, 1);
        socket.emit(timer.id, () => {
          return { dead: true };
        });
      }
      socket.emit(timer.id, timer.duration);
    });
  }, 1000);
  socket.on("addTimer", (data) => {
    let isNew = true;
    for (let i = 0; i < timers.length; i++)
      if (timers[i].id === data.id) {
        console.log(timers[i].id + " " + data.id);
        isNew = false;
        break;
      }
    if (isNew) {
      console.log("no duplicati");
      timers.push({
        id: data.id,
        duration: data.duration,
        state: false,
        toReset: false,
      });
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getMinutes = (duration) => Math.floor(duration / 60);
const getSeconds = (duration) => duration % 60;

server.listen(port, () => console.log(`Listening on port ${port}`));
