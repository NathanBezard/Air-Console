import React, { useState } from "react";
import socket from "./socket";

function Controller() {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      console.log("📤 Sending:", input);
      socket.emit("chat message", input);
      setInput("");
    }
  };

  const sendDirection = (direction) => {
    socket.emit("chat message", direction);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Controller</h1>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <button onClick={() => sendDirection("Up")}>Up</button>
      <div>
      <button onClick={() => sendDirection("Left")}>Left</button>
      <button onClick={() => sendDirection("Right")}>Right</button>
      </div>
      <button onClick={() => sendDirection("Down")}>Down</button>
    </div>
  );
}

export default Controller;
