-- DropIndex
DROP INDEX "Balance_userId_idx";

-- DropIndex
DROP INDEX "Merchant_auth_type_idx";

-- DropIndex
DROP INDEX "Merchant_email_idx";

-- DropIndex
DROP INDEX "OnPeerTransaction_fromPeerId_idx";

-- DropIndex
DROP INDEX "OnPeerTransaction_timestamp_idx";

-- DropIndex
DROP INDEX "OnPeerTransaction_toPeerId_idx";

-- DropIndex
DROP INDEX "OnRampTransaction_startTime_idx";

-- DropIndex
DROP INDEX "OnRampTransaction_status_idx";

-- DropIndex
DROP INDEX "OnRampTransaction_userId_idx";

-- DropIndex
DROP INDEX "Otp_email_idx";

-- DropIndex
DROP INDEX "Otp_expiresAt_idx";

-- DropIndex
DROP INDEX "Otp_phone_idx";

-- DropIndex
DROP INDEX "Transaction_createdAt_idx";

-- DropIndex
DROP INDEX "Transaction_paymentId_idx";

-- DropIndex
DROP INDEX "Transaction_status_idx";

-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_number_idx";

-- DropIndex
DROP INDEX "p2pTransfer_fromUserId_idx";

-- DropIndex
DROP INDEX "p2pTransfer_timestamp_idx";

-- DropIndex
DROP INDEX "p2pTransfer_toUserId_idx";

-- AlterTable
ALTER TABLE "OnPeerTransaction" ALTER COLUMN "timestamp" DROP DEFAULT;

-- AlterTable
ALTER TABLE "p2pTransfer" ALTER COLUMN "timestamp" DROP DEFAULT;
