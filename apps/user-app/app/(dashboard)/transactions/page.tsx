import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { PeerTransactions } from "../../../components/PeerTransactions";

async function getSelfTransaction() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getPeerTransaction() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: Number(session?.user?.id),
        },
        {
          toUserId: Number(session?.user?.id),
        },
      ],
    },
  });
  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    // toUserId: t.toUserId,
  }));
}

export default async function () {
  const selfTransaction = await getSelfTransaction();
  const peerTransaction = await getPeerTransaction();
  return (
    <div>
      <div className="w-screen">
        <div className="text-4xl pt-8 mb-8 font-bold text-[#6a51a6]">
          Transactions
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div className="selfTransfer">
            <h1>Self Transactions History</h1>
            {selfTransaction.length > 0 ? (
              <OnRampTransactions transactions={selfTransaction} />
            ) : (
              <p>No Transaction Available</p>
            )}
          </div>
          <div className="peerTransactions">
            <h1>Peer Transaction History</h1>
            {peerTransaction.length > 0 ? (
              <div>
                <h1>hello</h1>
                <PeerTransactions transactions={peerTransaction} />
              </div>
            ) : (
              <p>No Transaction Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
