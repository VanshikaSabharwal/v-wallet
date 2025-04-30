"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; 
import BackArrow from "./BackArrow";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  
  // Get receiverId and amount from URL parameters
  const receiverId = searchParams.get("receiverId");
  const amountFromQuery = searchParams.get("amount");

  // State to store the amount and ensure it's editable
  const [amount, setAmount] = useState<string>(amountFromQuery || "");
  
  // Get senderId from the session (assuming you're using NextAuth)
  const { data: session } = useSession();
  const senderId = session?.user?.id || "";  // Ensure it's a string
  console.log(senderId);
  console.log("receiverId",receiverId);
  console.log("amountFromQuery", amountFromQuery);

  useEffect(() => {
    // If the URL has an amount query, set it as default
    if (amountFromQuery) {
      setAmount(amountFromQuery);
    }
  }, [amountFromQuery]);

  const handlePayment = async () => {
    if (!senderId || !receiverId || !amount) {
      alert("Sender ID, Receiver ID, or Amount is missing.");
      return;
    }

    // Send the payment request to the backend
    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId, amount }),
      });

      const data = await response.json();
      if (data.message === "Payment successful") {
        alert(`Payment of ₹${amount} successful!`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center">
          <BackArrow />
          <h1 className="flex-1 text-2xl font-bold text-center">Make a Payment</h1>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Paying to User ID:</p>
          <p className="font-mono text-gray-800 mb-4">{receiverId}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="amount">
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
};

export default PaymentPage;
