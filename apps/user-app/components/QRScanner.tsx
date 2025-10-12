"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BrowserQRCodeReader } from "@zxing/browser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const router = useRouter();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const initScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const selectedDeviceId = devices[0]?.deviceId;

        if (videoRef.current && selectedDeviceId) {
          codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result, error) => {
              if (result) {
                const scannedText = result.getText();
                setScanResult(scannedText);
                handleRedirect(scannedText);
              }
              if (error) console.error("QR Scan error:", error);
            },
          );
        }
      } catch (err) {
        console.error("Scanner init error:", err);
      }
    };

    initScanner();

    return () => {
      (codeReader as any).reset?.();
    };
  }, []);

  const handleRedirect = (text: string) => {
    // Expected format: userId:12345:amount:100
    const parts = text.split(":");
    const userIdIndex = parts.indexOf("userId");
    const amountIndex = parts.indexOf("amount");

    const userId = userIdIndex !== -1 ? parts[userIdIndex + 1] : null;
    const amount = amountIndex !== -1 ? parts[amountIndex + 1] : null;

    if (userId) {
      const query = amount
        ? `/pay?receiverId=${encodeURIComponent(userId)}&amount=${encodeURIComponent(amount)}`
        : `/pay?receiverId=${encodeURIComponent(userId)}`;
      router.push(query);
    } else {
      toast.error("Invalid QR format. User ID missing.");
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = async () => {
        try {
          const result = await new BrowserQRCodeReader().decodeFromImageElement(
            img,
          );
          const scannedText = result.getText();
          setScanResult(scannedText);
          handleRedirect(scannedText);
        } catch (error) {
          console.error("Failed to decode QR from image:", error);
          toast.error("No QR code found in image.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">QR Code Scanner</h1>

      <video ref={videoRef} style={{ width: "100%" }} />

      <div>
        <label className="block font-medium mb-2">
          Upload a QR Code image:
        </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div>
        <h2 className="mt-4 font-medium">Scanned QR Code:</h2>
        {scanResult ? (
          <p className="text-green-600 font-mono break-all">{scanResult}</p>
        ) : (
          <p className="text-gray-500">No QR code scanned yet.</p>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
