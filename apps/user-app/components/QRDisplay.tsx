"use client";
import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useSession } from "next-auth/react";

const QRDisplay = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || "unknown"; // Fallback if session is not ready
  const [amount, setAmount] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!userId || !canvasRef.current) return;

    const qrData = `userId:${userId}:amount:${amount}`;
    QRCode.toCanvas(canvasRef.current, qrData, function (error) {
      if (error) console.error(error);
      else console.log("QR code generated!");
    });
  }, [userId, amount]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "your-qr-code.png";
      link.click();
    }
  };

  return (
    <div>
      <h1>Your QR Code</h1>
      <canvas ref={canvasRef}></canvas>

      <div className="my-4">
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="border px-2 py-1"
        />
      </div>

      <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded">
        Download QR Code
      </button>
    </div>
  );
};

export default QRDisplay;
