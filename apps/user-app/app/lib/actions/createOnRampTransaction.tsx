"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  try {
    // Ensure the user exists before creating the transaction
    const userExists = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
    });

    if (!userExists) {
      return {
        message: "User does not exist",
      };
    }

    const token = (Math.random() * 3000).toString();

    await prisma.onRampTransaction.create({
      data: {
        provider,
        token,
        userId: Number(session.user.id),
        amount: amount * 100, // Convert to smallest currency unit (e.g., cents)
        status: "Processing",
        startTime: new Date(),
      },
    });

    return {
      message: "Transaction Done",
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return {
      message: "Failed to create transaction",
    };
  }
}
