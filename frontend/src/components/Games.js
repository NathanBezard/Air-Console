import React, { useEffect, useRef } from "react";
import socket from "../socket.js";

function GameContainer() {


  const iframeRef = useRef(null);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow.postMessage({ type: msg }, "*");
      }
    });
    return () => socket.off("chat message");
  }, []);
  


  return (
    <div>
    <iframe
      ref={iframeRef}
      src="/Games/Breakout/breakout.html"
      width="600"
      height="400"
      title="test Embed"
    />
    </div>
  );
}

export default GameContainer