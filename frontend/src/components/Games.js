import React, { useEffect, useRef, useState } from "react";
import socket from "../socket.js";
import './Game.css';


function GameContainer() {
  const [currentGame, setCurrentGame] = useState("/Games/Tank_shooter/tank_shooter.html");
  const [gameName, setGameName] = useState("Tank Shooter");
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
    var nameDir = nameGame.charAt(0).toUpperCase() + nameGame.slice(1);
    setGameName(nameDir);
    setCurrentGame(`/Games/${nameDir}/${nameGame}.html`);
    var cleanName = nameDir.replace("_", " ");
    setGameName(cleanName);
  };
  
  return (
<div className="game-container">
  <div className="iframe-container">
    <h2 className="game-title">
      {gameName}
    </h2>
    <iframe
      ref={iframeRef}
      src={currentGame}
      width="600"
      height="400"
      title="test Embed"
    />
  </div>
  
  <div className="button-container">
    <button onClick={() => setGame("breakout")} className="button">
      <img
        src="/image/breakout_icon.png"
        alt="Breakout Icon"
        className="icon"
      />
    </button>
    <button onClick={() => setGame("tetris")} className="button">
      <img
        src="/image/tetris_icon.png"
        alt="Tetris Icon"
        className="icon"
      />
    </button>
    <button onClick={() => setGame("tank_shooter")} className="button">
      <img
        src="/image/tank_icon.png"
        alt="Tank Icon"
        className="icon"
      />
    </button>
  </div>
</div>
  );
}

export default GameContainer