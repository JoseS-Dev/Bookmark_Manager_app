/*
  Warnings:

  - You are about to drop the `Like_bookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Like_bookmark" DROP CONSTRAINT "Like_bookmark_bookmark_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like_bookmark" DROP CONSTRAINT "Like_bookmark_user_id_fkey";

-- DropTable
DROP TABLE "public"."Like_bookmark";

-- CreateTable
CREATE TABLE "like_bookmark" (
    "id" SERIAL NOT NULL,
    "bookmark_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "like_bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "like_bookmark" ADD CONSTRAINT "like_bookmark_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_bookmark" ADD CONSTRAINT "like_bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
