/*
  Warnings:

  - You are about to drop the column `userId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `points` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referralId]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pointsHistoryId]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizerProfileId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsHistoryId` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralId` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountToBePaid` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPoints` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `referralCode` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'WAITING_FOR_PAYMENT', 'EXPIRED');

-- CreateEnum
CREATE TYPE "discountStatus" AS ENUM ('USED', 'NOT_USED');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_userId_fkey";

-- DropForeignKey
ALTER TABLE "points" DROP CONSTRAINT "points_userId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "userId",
ADD COLUMN     "organizerProfileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "discountUsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pointsHistoryId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "referralId" INTEGER NOT NULL,
ADD COLUMN     "tax" INTEGER NOT NULL,
ADD COLUMN     "usedPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "status",
ADD COLUMN     "amountToBePaid" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "totalPoints" INTEGER NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'ATTENDEE',
ALTER COLUMN "referralCode" SET NOT NULL;

-- DropTable
DROP TABLE "points";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "organizer_profiles" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "organizer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" SERIAL NOT NULL,
    "discountCode" TEXT NOT NULL,
    "discountStatus" "discountStatus" NOT NULL,
    "referralGiverUserId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "pointsHistoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points_history" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizer_profiles_userId_key" ON "organizer_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_pointsHistoryId_key" ON "referrals"("pointsHistoryId");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_referralId_key" ON "registrations"("referralId");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_pointsHistoryId_key" ON "registrations"("pointsHistoryId");

-- AddForeignKey
ALTER TABLE "organizer_profiles" ADD CONSTRAINT "organizer_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referralGiverUserId_fkey" FOREIGN KEY ("referralGiverUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_pointsHistoryId_fkey" FOREIGN KEY ("pointsHistoryId") REFERENCES "points_history"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "referrals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_pointsHistoryId_fkey" FOREIGN KEY ("pointsHistoryId") REFERENCES "points_history"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerProfileId_fkey" FOREIGN KEY ("organizerProfileId") REFERENCES "organizer_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
