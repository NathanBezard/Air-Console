import React, { useState, useEffect } from "react";
import GameContainer from '../components/Games.js';
import QRCodeComponent from '../components/Qrcode.js';
import socket from "../socket.js";

function Console() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for chat messages from any controller
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      console.log("Received message:", msg); // for browser console debugging
    });

    // Cleanup listener when unmounting
    return () => socket.off("chat message");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Console</h1>

      <div>
        <GameContainer />
        <QRCodeComponent />
      </div>

      <h2>Debug Console:</h2>
      <ul style={{
        backgroundColor: "#111",
        color: "#FFF",
        padding: "10px",
        borderRadius: "8px",
        listStyle: "none",
        maxHeight: "300px",
        overflowY: "auto",
        fontFamily: "monospace"
      }}>
        {messages.map((m, i) => (
          <li key={i}>
            {m.id ? (
              <>Player <strong>{m.id}</strong>: {m.message}</>
            ) : (
              <>{m}</>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Console;
