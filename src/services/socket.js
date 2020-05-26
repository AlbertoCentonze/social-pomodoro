import io from "socket.io-client";
const test = false; //TODO if production
export const socket = io(
  test ? "localhost:5000" : "https://pomo-server.herokuapp.com/"
);
