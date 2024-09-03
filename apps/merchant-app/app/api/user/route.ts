import { NextResponse } from "next/server";
import PrismaClient from "@repo/db/client";

const client = PrismaClient;

export const GET = async () => {
  await client.user.create({
    data: {
      email: "asd",
      name: "adsads",
      number: "1234567890", // Replace with actual phone number
      password: "your_password", // Replace with a secure password
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
