import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@repo/db/client"; // Adjust the import path

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP via email
async function sendOtp(email: string, phone: string, otp: string) {
  // Generate a 6-digit OTP
  const otpNum = Math.floor(100000 + Math.random() * 900000).toString();

  // Send OTP via email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP verification for V Wallet",
    text: `Your OTP is ${otpNum}`,
  });

  // Store OTP in the database with expiration time
  await db.otp.create({
    data: {
      phone,
      email,
      otp: otpNum,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expires OTP in 10 minutes
    },
  });

  return otpNum;
}

// Named export for POST requests
export async function POST(request: Request) {
  const { email, phone } = await request.json();

  if (!email || !phone) {
    return NextResponse.json(
      { message: "Email and phone number are required" },
      { status: 400 }
    );
  }

  try {
    const otp = await sendOtp(email, phone, ""); // OTP is generated and sent by `sendOtp`
    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
