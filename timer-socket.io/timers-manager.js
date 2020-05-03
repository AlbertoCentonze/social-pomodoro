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
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    console.log(timers)
    timers.forEach((timer) => {
      timer.duration -= 1;
      if (timer.duration < 0) {
        const index = timers.indexOf(timer);
        if (index !== -1) timers.splice(index, 1);
      }
      socket.emit(timer.id, timer.duration)
    });
  }, 1000);
  socket.on("addTimer", (data) => {
    timers.push({ id: data.id, duration: data.duration });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
