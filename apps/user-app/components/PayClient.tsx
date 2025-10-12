// components/PayClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import BackArrow from "./BackArrow";
import toast from "react-hot-toast";

export default function PayClient() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const amountFromQuery = searchParams.get("amount");

  const [amount, setAmount] = useState<string>(amountFromQuery || "");
  const { data: session, status } = useSession();
  const senderId = session?.user?.id || "";

  useEffect(() => {
    if (amountFromQuery) setAmount(amountFromQuery);
  }, [amountFromQuery]);

  if (status === "loading") {
    return <div className="p-4 text-center">Loading session…</div>;
  }

  const handlePayment = async () => {
    if (!senderId || !receiverId || !amount) {
      return toast.error("Missing sender, receiver, or amount.");
    }
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId, amount }),
      });
      const { message } = await res.json();
      toast.success(
        message === "Payment successful"
          ? `₹${amount} paid!`
          : `Error: ${message}`,
      );
    } catch {
      toast.error("Payment failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <BackArrow />
          <h1 className="text-2xl font-bold">Make a Payment</h1>
        </div>
        <hr className="border-gray-200" />

        <div>
          <p className="text-sm text-gray-600">Paying to:</p>
          <p className="font-mono text-gray-800">{receiverId}</p>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-3 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
