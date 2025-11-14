import React, { useState, useEffect } from "react";
import GameContainer from '../components/Games.js';
import QRCodeComponent from '../components/Qrcode.js';
import socket from "../socket.js";
import './Console.css';

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
    <div className="console-container">
  <h1 className="title">Natendo</h1>

  <div>
    <GameContainer />
    <QRCodeComponent />
  </div>

  <h2>Debug Console:</h2>
  <ul>
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
