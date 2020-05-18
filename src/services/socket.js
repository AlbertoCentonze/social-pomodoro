import socketIOClient from "socket.io-client";
const test = true
export const socket = socketIOClient(
  test ? "localhost:5000" : "https://pomo-server.herokuapp.com/"
);
