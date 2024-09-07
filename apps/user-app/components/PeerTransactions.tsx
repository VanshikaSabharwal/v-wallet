import { Card } from "@repo/ui/card";

export const PeerTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    toUserId: number;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((txn) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {txn.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {txn.amount / 100}
            </div>
            <div className="receivedFrom">
              <div className="text-sm">{txn.toUserId}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
