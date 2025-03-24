"use client"; // Ensure this runs only on the client side

import React, { useEffect, useState } from "react";

interface RazorpayButtonProps {
  amount: number; // Amount in smallest currency unit (e.g., paise for INR)
  currency: string;
  onSuccess: (response: any) => void;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ amount, currency, onSuccess }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!isScriptLoaded) {
      console.error("Razorpay script not loaded yet!");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Use Razorpay Key ID from env
      amount,
      currency,
      name: "Your Company Name",
      description: "Test Transaction",
      handler: onSuccess,
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment} disabled={!isScriptLoaded}>Pay with Razorpay</button>;
};

export default RazorpayButton;
