/*
  Warnings:

  - Added the required column `registrationId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "registrationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "registrationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "registrations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
