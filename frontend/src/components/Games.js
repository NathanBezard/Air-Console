import React, { useEffect, useRef, useState } from "react";
import socket from "../socket.js";

function GameContainer() {
  const [currentGame, setCurrentGame] = useState("/Games/Breakout/breakout.html");
  const iframeRef = useRef(null);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      if (iframeRef.current) {
        const formatted = `${msg.id} ${msg.message}`;
        iframeRef.current.contentWindow.postMessage({ type: formatted }, "*");
      }
    });
    
    return () => socket.off("chat message");
  }, []);
  
  return (
    <div>
    <iframe
      ref={iframeRef}
      src={currentGame}
      width="600"
      height="400"
      title="test Embed"
    />
    <button onClick={() => setCurrentGame("/Games/Breakout/breakout.html")}>
      Breakout
    </button>
    <button onClick={() => setCurrentGame("/Games/Breakout2/breakout2.html")}>
      Breakout2
    </button>
    <h2>Current game: {currentGame}</h2>
    </div>
  );
}

export default GameContainer