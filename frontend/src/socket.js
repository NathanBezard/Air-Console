// src/socket.js
import { io } from "socket.io-client";

// ⚠️ Replace with your PC's IP each time it changes
const socket = io("http://192.168.83.223:4000");

export default socket;
