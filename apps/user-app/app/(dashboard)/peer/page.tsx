import { SendCard } from "../../../components/SendCard";

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
