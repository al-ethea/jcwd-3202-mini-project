/*
  Warnings:

  - The values [PAYMENT_DECLINED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `expireAt` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PAYMENT_ACCEPTED', 'WAITING_FOR_PAYMENT', 'EXPIRED');
ALTER TABLE "transactions" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL;
