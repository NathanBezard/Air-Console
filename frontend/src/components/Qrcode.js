import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeComponent = () => {
  const localIP = "192.168.83.223:3000";
  const controllerURL = `http://${localIP}/Controller`;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Scan to open Controller</h2>
      <QRCodeSVG value={controllerURL} size={200} />
      <p>{controllerURL}</p>
    </div>
  );
};

export default QRCodeComponent;
