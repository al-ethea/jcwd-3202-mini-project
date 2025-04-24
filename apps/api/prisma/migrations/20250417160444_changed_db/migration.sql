/*
  Warnings:

  - You are about to drop the column `registrationId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `registrationId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('FREE', 'PAID');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_registrationId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_registrationId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "registrationId",
ADD COLUMN     "type" "Type" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "registrationId",
DROP COLUMN "reviewId",
DROP COLUMN "roleId",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "roles";

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_registrationId_key" ON "transactions"("registrationId");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
