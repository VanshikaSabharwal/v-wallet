import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

// async function getPeerTransaction() {
//   const session = getServerSession(authOptions);
//   const transactions = await prisma.onPeerTransaction.findMany({
//     where: {
//       userId: Number(session?.user?.id),
//     },
//   });
// }

export default async function () {
  // const peerTransaction = await getPeerTransaction();
  return (
    <div className="w-full">
      <SendCard />
    </div>
  );
}
