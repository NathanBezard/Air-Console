import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import GameContainer from './components/Games.js';
import QRCodeComponent from './components/Qrcode.js';
import socket from "./socket.js";

function Console() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("chat message");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Console</h1>
      <div>
      <GameContainer />
      <QRCodeComponent />
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export default Console;
