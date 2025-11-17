import React, { useState, useRef, useEffect } from "react";
import socket from "../socket";
import './Controller.css';

function Controller() {
  const [playerId, setPlayerId] = useState(null);
  const intervalRef = useRef(null);
  const [currentDir, setCurrentDir] = useState(null);
  //const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("assign-id", (id) => {
      console.log("Assigned player ID:", id);
      setPlayerId(id);
    });

    return () => socket.off("assign-id");
  }, []);

  const sendDirection = (direction) => {
    if (playerId !== null) {
      socket.emit("chat message", `${direction}`);
    }
  };

  const startMoving = (dir) => {
    if (currentDir === dir) return;
    setCurrentDir(dir);
    stopMoving();
    sendDirection(dir);
    intervalRef.current = setInterval(() => sendDirection(dir), 100);
  };
  
  const stopMoving = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentDir(null);
  };

  return (
<div className="controller-container">
  <h1 className="controller-title">
    Controller #{playerId ?? "Connecting..."}
  </h1>
      <button
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={() => startMoving("left")}
        onMouseUp={stopMoving}
        onMouseLeave={stopMoving}
        onTouchStart={(e) => { e.preventDefault(); startMoving("left"); }}
        onTouchEnd={stopMoving}
        >
        <img 
          src="image/arrow_left.png" 
          alt="left"
          width="150"
          height="150"
        />
      </button>
      <div>
        <button
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={() => startMoving("up")}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={(e) => { e.preventDefault(); startMoving("up"); }}
          onTouchEnd={stopMoving}
        >
        <img 
          src="image/arrow_up.png"
          alt="up"
          width="150"
          height="150"/>
        </button>
        <button
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={() => startMoving("down")}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={(e) => { e.preventDefault(); startMoving("down"); }}
          onTouchEnd={stopMoving}
          >
          <img 
            src="image/arrow_down.png"
            alt="down"
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
          src="image/arrow_right.png"
          alt="right"
          width="150"
          height="150"/>
      </button>
    </div>
  );
}

export default Controller;



//<input
//value={input}
//onChange={(e) => setInput(e.target.value)}
//placeholder="Type a command"
///>
//<button onClick={sendDirection(input)}>Send</button>