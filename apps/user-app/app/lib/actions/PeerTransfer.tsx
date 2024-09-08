"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client"; // Import Prisma types

export async function peerTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while Sending",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Specify the type here
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)}`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      if (!fromBalance) {
        throw new Error("Sender's balance record not found");
      }
      if (fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      let toBalance = await tx.balance.findUnique({
        where: { userId: toUser.id },
      });
      if (!toBalance) {
        await tx.balance.create({
          data: {
            userId: toUser.id,
            amount,
            locked: 0,
          },
        });
      } else {
        await tx.balance.update({
          where: { userId: toUser.id },
          data: { amount: { increment: amount } },
        });
      }

      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return {
      message: "Transfer successful",
    };
  } catch (error) {
    console.error("Error during peer transfer:", error);
    return {
      message: "Failed to complete transfer",
    };
  }
}
