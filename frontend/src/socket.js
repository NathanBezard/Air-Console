// src/socket.js
import { io } from "socket.io-client";

// Detect current host (localhost on PC, IP when opened from phone)
const protocol = window.location.protocol;       // "http:" or "https:"
const host = window.location.hostname;           // e.g. "localhost" or "10.10.159.141"
const backendPort = 4000;                        // backend Node.js port

const url = `${protocol}//${host}:${backendPort}`;
console.log("🔌 Connecting to backend:", url);

const socket = io(url);

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