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
  const token = (Math.random() * 3000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      token: token,
      userId: Number(session.user.id),
      amount: amount * 100,
      status: "Processing",
      startTime: new Date(),
    },
  });

  return {
    message: "Transaction Done",
  };
}
