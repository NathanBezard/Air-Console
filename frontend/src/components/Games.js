import React, { useEffect, useRef, useState } from "react";
import socket from "../socket.js";
import './Game.css';


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
    <h2
      className="text">
      {gameName}
    </h2>
    <iframe
      ref={iframeRef}
      src={currentGame}
      width="600"
      height="400"
      title="test Embed"
    />
    <div>
    <button onClick={() => setGame("breakout")}
      className="button">
      <img
        src="/image/breakout_icon.png"
        alt="Breakout Icon"
        className="icon"
      />
    </button>
    <button onClick={() => setGame("breakout2")}
     className="button">
      <img
        src="/image/breakout2_icon.png"
        alt="Breakout Icon"
        className="icon"
      />
    </button>
    <button onClick={() => setGame("tetris")}
     className="button">
      <img
        src="/image/tetris_icon.png"
        alt="Tetris Icon"
        className="icon"
      />
    </button>
    </div>
    </div>
  );
}

export default GameContainer