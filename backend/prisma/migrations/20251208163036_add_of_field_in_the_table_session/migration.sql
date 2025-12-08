-- AlterTable
ALTER TABLE "session" ADD COLUMN     "looged_in_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "looged_out_at" TIMESTAMP(3);
