import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = () => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    // Build the URL dynamically based on where the frontend is running
    const backendURL = `http://${window.location.hostname}:4000/api/ip`;

    fetch(backendURL)
      .then(res => res.json())
      .then(data => {
        console.log("✅ Fetched IP from backend:", data.ip);
        setIp(data.ip);
      })
      .catch(err => {
        console.error("❌ Failed to fetch IP:", err);
        setIp(window.location.hostname); // fallback to hostname if needed
      });
  }, []);

  if (!ip) return <p>Loading QR...</p>;

  const controllerURL = `http://10.84.106.233:3000/Controller`;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Scan to open Controller</h2>
      <QRCodeSVG value={controllerURL} size={200} />
      <p>{controllerURL}</p>
    </div>
  );
};

export default QRCodeComponent;
