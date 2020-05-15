import { socket } from "./services/socket";

test("socket is online", () => {
  let connected = false;
  socket.on("connection", (data) => {
    console.log(data);
    connected = data;
  });
  expect(connected).toBe(true);
});

test("timer won't get stuck for 25min", () => {
  socket.emit("newTimer", "test1");
  let currentDuration = 1495;
  let stucked = false;
  setInterval(() => {
    currentDuration -= 1;
  });
  socket.on("test1", (data) => {
    while (currentDuration > 1300) {
      stucked = currentDuration < data.duration;
    }
  });
  expect(stucked).toBe(false);
});
