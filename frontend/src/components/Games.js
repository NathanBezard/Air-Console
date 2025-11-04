import React, { useEffect, useRef, useState } from "react";
import socket from "../socket.js";

function GameContainer() {
  const [currentGame, setCurrentGame] = useState("/Games/Breakout/breakout.html");
  const [gameName, setGameName] = useState("Breakout");
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

  const setGame = (nameGame) => {
    const nameDir = nameGame.charAt(0).toUpperCase() + nameGame.slice(1);
    setGameName(nameDir);
    setCurrentGame(`/Games/${nameDir}/${nameGame}.html`);
  };
  
  return (
    <div>
    <iframe
      ref={iframeRef}
      src={currentGame}
      width="600"
      height="400"
      title="test Embed"
    />
    <button onClick={() => setGame("breakout")}>
      Breakout
    </button>
    <button onClick={() => setGame("breakout2")}>
      Breakout2
    </button>
    <h2>{gameName}</h2>
    </div>
  );
}

export default GameContainer