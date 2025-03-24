"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import components to avoid SSR issues
const PayPalButton = dynamic(() => import("../../components/PayPalContainer"), { ssr: false });
const RazorpayButton = dynamic(() => import("../../components/RazorPayButton"), { ssr: false });

const PaymentsPage = () => {
  const [amount] = useState("10.00"); // Example amount

  const handlePayPalSuccess = (details: any) => {
    console.log("PayPal Payment Success:", details);
    alert("Transaction completed by " + details.payer.name.given_name);
  };

  const handleRazorpaySuccess = (response: any) => {
    console.log("Razorpay Payment Success:", response);
    alert("Payment successful!");
  };

  return (
    <div>
      <h1>Payments</h1>
{/* 
      <h2>Pay with Razorpay</h2> */}
      <RazorpayButton amount={parseInt(amount, 10) * 100} currency="INR" onSuccess={handleRazorpaySuccess} />
    </div>
  );
};

export default PaymentsPage;
