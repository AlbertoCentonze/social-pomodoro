import io from "socket.io-client";
const test = true;
export const socket = io(
  test ? "localhost:5000" : "https://pomo-server.herokuapp.com/"
);
