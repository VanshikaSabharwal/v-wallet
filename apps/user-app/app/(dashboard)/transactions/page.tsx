import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

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

export default async function () {
  const selfTransaction = await getSelfTransaction();
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
          <div className="peerTransactions"></div>
        </div>
      </div>
    </div>
  );
}
