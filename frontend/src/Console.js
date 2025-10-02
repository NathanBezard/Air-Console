import React, { useState, useEffect } from "react";
import GameContainer from './components/Games.js';
import QRCodeComponent from './components/Qrcode.js';

function Console() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Console</h1>
      <div>
      <GameContainer />
      <QRCodeComponent />
      </div>
    </div>
  );
}

export default Console;
