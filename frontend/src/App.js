import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Console from "./Console";
import Controller from "./Controller";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Console</Link> | <Link to="/controller">Controller</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Console />} />
        <Route path="/controller" element={<Controller />} />
      </Routes>
    </div>
  );
}

export default App;



//import React, { useEffect, useState } from "react";
//import { io } from "socket.io-client";
//import GameContainer from './components/Games.js';
//
//
//// connect to backend
//const socket = io("http://localhost:4000");
//
//  function App() {
//    const [messages, setMessages] = useState([]);
//    const [input, setInput] = useState("");
//  
//    useEffect(() => {
//    socket.on("connect", () => {
//      console.log("✅ Connected to backend with ID:", socket.id);
//    });
//  
//    socket.on("chat message", (msg) => {
//      setMessages((prev) => [...prev, msg]);
//    });
//  
//    return () => {
//      socket.off("connect");
//      socket.off("chat message");
//    };
//  }, []);
//
//  const sendMessage = () => {
//    if (input.trim()) {
//      socket.emit("chat message", input);
//      setInput("");
//    }
//  };
//
//  const sendDirection = (direction) => {
//    socket.emit("chat message", direction);
//  };
//
//  return (
//    <div>
//      <div style={{ padding: "20px" }}>
//        <h1>React + Socket.IO Test</h1>
//        <ul>
//          {messages.map((m, i) => (
//            <li key={i}>{m}</li>
//          ))}
//        </ul>
//        <input
//          value={input}
//          onChange={(e) => setInput(e.target.value)}
//          placeholder="Type a message"
//        />
//        <button onClick={sendMessage}>Send</button>
//      </div>
//      <GameContainer />
//      <button onClick={() => sendDirection("Left")}>Left</button>
//      <button onClick={() => sendDirection("Right")}>Right</button>
//      <button onClick={() => sendDirection("Up")}>Up</button>
//      <button onClick={() => sendDirection("Down")}>Down</button>
//    </div>
//  );
//}
//
//export default App;
//