import React, { useState, useRef } from "react";
import socket from "./socket";

function Controller() {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  const sendDirection = (direction) => {
    socket.emit("chat message", direction);
  };


  const intervalRef = useRef(null);

  const startMoving = (dir) => {
    sendDirection(dir);

    intervalRef.current = setInterval(() => {
      sendDirection(dir);
    }, 100);
  };

  const stopMoving = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Controller, Turn youre phone</h1>
      </div>
      <button
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={() => startMoving("left")}
        onMouseUp={stopMoving}
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving("left"); }}
        onTouchEnd={stopMoving}
        >
        <img 
          src="image/arrow_up.png" 
          width="150"
          height="150"
        />
      </button>
      <div>
        <button
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={() => startMoving("down")}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={(e) => { e.preventDefault(); startMoving("down"); }}
          onTouchEnd={stopMoving}
        >
        <img 
          src="image/arrow_left.png"
          width="150"
          height="150"/>
        </button>
        <button
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={() => startMoving("up")}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={(e) => { e.preventDefault(); startMoving("up"); }}
          onTouchEnd={stopMoving}
          >
          <img 
            src="image/arrow_right.png"
            width="150"
            height="150"/>
        </button>
      </div>
      <button
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={() => startMoving("right")}
        onMouseUp={stopMoving}
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving("right"); }}
        onTouchEnd={stopMoving}
      >
        <img 
          src="image/arrow_down.png"
          width="150"
          height="150"/>
      </button>
    </div>
  );
}

export default Controller;


//<input
//          value={input}
//          onChange={(e) => setInput(e.target.value)}
//          placeholder="Type a command"
//        />
//        <button onClick={sendMessage}>Send</button>