/*
  Warnings:

  - The values [NOT_USED] on the enum `discountStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "discountStatus_new" AS ENUM ('USED', 'ACTIVE', 'EXPIRED');
ALTER TABLE "referrals" ALTER COLUMN "discountStatus" TYPE "discountStatus_new" USING ("discountStatus"::text::"discountStatus_new");
ALTER TYPE "discountStatus" RENAME TO "discountStatus_old";
ALTER TYPE "discountStatus_new" RENAME TO "discountStatus";
DROP TYPE "discountStatus_old";
COMMIT;
