import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { senderId, receiverId, amount } = body;

  // Parse to numbers
  const sId = parseInt(senderId, 10);
  const rId = parseInt(receiverId, 10);
  const rupees = parseFloat(amount);

  // Validate the input data after parse
  if (
    Number.isNaN(sId) ||
    Number.isNaN(rId) ||
    Number.isNaN(rupees) ||
    rupees <= 0
  ) {
    console.error("Invalid input after parsing:", { senderId, receiverId, amount, sId, rId, rupees });
    return NextResponse.json(
      { message: "Invalid input: IDs must be integers, amount must be a positive number" },
      { status: 400 }
    );
  }

  // Convert rupees to paise
  const amountInPaise = Math.round(rupees * 100);

  // Prevent sending to self
  if (sId === rId) {
    console.warn("Sender and receiver are the same:", sId);
    return NextResponse.json(
      { message: "Sender and receiver cannot be the same" },
      { status: 400 }
    );
  }

  try {
    // Ensure both users exist
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: sId } }),
      prisma.user.findUnique({ where: { id: rId } }),
    ]);

    if (!sender || !receiver) {
      console.error("User not found:", { sender, receiver });
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch sender's balance (in paise)
    const senderBalance = await prisma.balance.findUnique({
      where: { userId: sId },
    });

    if (!senderBalance || senderBalance.amount < amountInPaise) {
      console.error("Insufficient balance:", { senderBalance, amountInPaise });
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Perform transaction in a single atomic operation
    await prisma.$transaction([
      // 1) Decrement sender's balance in paise
      prisma.balance.update({
        where: { userId: sId },
        data: { amount: senderBalance.amount - amountInPaise },
      }),

      // 2) Increment receiver's balance (or create it if missing)
      prisma.balance.upsert({
        where: { userId: rId },
        update: { amount: { increment: amountInPaise } },
        create: {
          userId: rId,
          amount: amountInPaise,
          locked: 0,
        },
      }),

      // 3) Record the p2pTransfer (amount stored in paise)
      prisma.p2pTransfer.create({
        data: {
          amount: amountInPaise,
          timestamp: new Date(),
          fromUserId: sId,
          toUserId: rId,
        },
      }),
    ]);

    return NextResponse.json({ message: "Payment successful" });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { message: "Internal server error", detail: error.message },
      { status: 500 }
    );
  }
}
