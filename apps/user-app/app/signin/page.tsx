"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

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
        // Handle error
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      phone,
      password,
      otp,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <>
          <h1>Sign In</h1>
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
        <button type="submit">Verify OTP & Sign In</button>
      )}
    </form>
  );
}
