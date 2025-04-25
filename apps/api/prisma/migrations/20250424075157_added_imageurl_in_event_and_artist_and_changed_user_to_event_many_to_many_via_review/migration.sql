/*
  Warnings:

  - A unique constraint covering the columns `[referralCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "bannerUrl" TEXT;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "referralCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "users"("referralCode");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
