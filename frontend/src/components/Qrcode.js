import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import socket from "../socket";

const QRCodeComponent = () => {
  const [localIp, setLocalIp] = useState(null);

  useEffect(() => {
    if (socket.localIp) {
      // already available
      setLocalIp(socket.localIp);
    } else {
      // wait until it arrives
      socket.on("server-ip", (serverIp) => {
        setLocalIp(serverIp);
      });
    }
  }, []);

  if (!localIp) return <p>Loading...</p>;

  // ✅ Both values are now in sync
  const testurl = socket.localIp; // raw IP from socket
  const controllerURL = `http://${localIp}:3000/controller`;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scan to open Controller</h2>
      <p>Test URL: {testurl}</p>
      <QRCodeSVG value={controllerURL} size={200} />
      <p>Controller URL: {controllerURL}</p>
    </div>
  );
};

export default QRCodeComponent;

//import React from 'react';
//import { QRCodeSVG } from 'qrcode.react';
//import socket from '../socket';
//
//const QRCodeComponent = () => {
//  const localIP = "10.84.107.233:3000";
//  const controllerURL = `http://${localIP}/Controller`;
//  const testurl = socket.io.uri;
//
//  return (
//    <div style={{ textAlign: "center", marginTop: "50px" }}>
//      <h2>Scan to open Controller</h2>
//      <QRCodeSVG value={controllerURL} size={200} />
//      <p>{controllerURL}</p>
//      <p>Socket connected to: {testurl}</p>
//    </div>
//  );
//};
//
//export default QRCodeComponent;
//