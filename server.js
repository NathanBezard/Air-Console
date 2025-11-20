const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ip = require("ip");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let nextPlayerId = 1;                 // next new ID to assign if no recycled ones
const availableIds = [];              // queue of freed IDs
const players = {};                   // maps socket.id -> playerId

io.on("connection", (socket) => {
  // Assign the smallest available ID, or a new one
  let playerId;
  if (availableIds.length > 0) {
    // use the smallest freed ID
    playerId = availableIds.shift();
  } else {
    playerId = nextPlayerId++;
  }

  players[socket.id] = playerId;
  console.log(`Player ${playerId} connected (socket ${socket.id})`);

  // Send ID to the connected client
  socket.emit("assign-id", playerId);

  // Handle messages
  socket.on("chat message", (msg) => {
    console.log(`Player ${playerId}: ${msg}`);
    io.emit("chat message", { id: playerId, message: msg });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Player ${playerId} disconnected`);
    delete players[socket.id];

    // Recycle the ID (keep list sorted)
    availableIds.push(playerId);
    availableIds.sort((a, b) => a - b);
  });
});

const serverIP = ip.address();
app.get("/api/ip", (req, res) => {
  res.json({ ip: serverIP });
});

server.listen(4000, '0.0.0.0', () => {
  console.log(`✅ Server running on http://${serverIP}:4000`);
});
