// src/socket.js
import { io } from "socket.io-client";

const backendUrl = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : `http://${window.location.hostname}:4000`;

const socket = io(backendUrl, { transports: ["websocket"] });

export default socket;

//import { io } from "socket.io-client";
//
//const socket = io("http://localhost:4000");
//
//// create a custom property for IP
//socket.localIp = null;
//
//// when backend sends it, store it
//socket.on("server-ip", (serverIp) => {
//  console.log("Server IP received:", serverIp);
//  socket.localIp = serverIp;
//});
//
//export default socket;