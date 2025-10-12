-- AlterTable
ALTER TABLE "OnPeerTransaction" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "p2pTransfer" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Balance_userId_idx" ON "Balance"("userId");

-- CreateIndex
CREATE INDEX "Merchant_email_idx" ON "Merchant"("email");

-- CreateIndex
CREATE INDEX "Merchant_auth_type_idx" ON "Merchant"("auth_type");

-- CreateIndex
CREATE INDEX "OnPeerTransaction_fromPeerId_idx" ON "OnPeerTransaction"("fromPeerId");

-- CreateIndex
CREATE INDEX "OnPeerTransaction_toPeerId_idx" ON "OnPeerTransaction"("toPeerId");

-- CreateIndex
CREATE INDEX "OnPeerTransaction_timestamp_idx" ON "OnPeerTransaction"("timestamp");

-- CreateIndex
CREATE INDEX "OnRampTransaction_userId_idx" ON "OnRampTransaction"("userId");

-- CreateIndex
CREATE INDEX "OnRampTransaction_status_idx" ON "OnRampTransaction"("status");

-- CreateIndex
CREATE INDEX "OnRampTransaction_startTime_idx" ON "OnRampTransaction"("startTime");

-- CreateIndex
CREATE INDEX "Otp_email_idx" ON "Otp"("email");

-- CreateIndex
CREATE INDEX "Otp_phone_idx" ON "Otp"("phone");

-- CreateIndex
CREATE INDEX "Otp_expiresAt_idx" ON "Otp"("expiresAt");

-- CreateIndex
CREATE INDEX "Transaction_paymentId_idx" ON "Transaction"("paymentId");

-- CreateIndex
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_number_idx" ON "User"("number");

-- CreateIndex
CREATE INDEX "p2pTransfer_fromUserId_idx" ON "p2pTransfer"("fromUserId");

-- CreateIndex
CREATE INDEX "p2pTransfer_toUserId_idx" ON "p2pTransfer"("toUserId");

-- CreateIndex
CREATE INDEX "p2pTransfer_timestamp_idx" ON "p2pTransfer"("timestamp");
