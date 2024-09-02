// File: /components/SignUpForm.tsx

"use client";
import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      if (response.ok) {
        setIsOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, password, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("User created successfully");
        // Redirect to sign-in or home page
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <>
          <h1>Sign Up</h1>
        </>

        <label>Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="1231231231"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {isOtpSent && (
        <div>
          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
      )}
      {!isOtpSent ? (
        <button type="button" onClick={handleSendOtp}>
          Send OTP
        </button>
      ) : (
        <button type="submit">Sign Up</button>
      )}
    </form>
  );
}
