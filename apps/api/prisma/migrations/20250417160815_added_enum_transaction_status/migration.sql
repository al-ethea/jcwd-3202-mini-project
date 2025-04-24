/*
  Warnings:

  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAYMENT_ACCEPTED', 'PAYMENT_DECLINED');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "status" "Status" NOT NULL;
