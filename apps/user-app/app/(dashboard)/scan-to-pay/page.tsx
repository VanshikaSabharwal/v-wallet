"use client";
import React from "react";
import QRDisplay from "../../../components/QRDisplay";
import QRScanner from "../../../components/QRScanner";
import BackArrow from "../../../components/BackArrow";

const Scan = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center">
          <BackArrow />
          <h1 className="ml-4 text-3xl font-bold">QR Dashboard</h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* QR Generator Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Generate QR</h2>
            <QRDisplay />
          </div>

          {/* QR Scanner Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Scan & Pay</h2>
            <QRScanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
