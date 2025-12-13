/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_bookmark_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_bookmark_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropTable
DROP TABLE "public"."Like";

-- DropTable
DROP TABLE "public"."comment";

-- CreateTable
CREATE TABLE "Like_bookmark" (
    "id" SERIAL NOT NULL,
    "bookmark_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_bookmark" (
    "id" SERIAL NOT NULL,
    "bookmark_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content_comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comment_bookmark_bookmark_id_user_id_content_comment_key" ON "comment_bookmark"("bookmark_id", "user_id", "content_comment");

-- AddForeignKey
ALTER TABLE "Like_bookmark" ADD CONSTRAINT "Like_bookmark_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_bookmark" ADD CONSTRAINT "Like_bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_bookmark" ADD CONSTRAINT "comment_bookmark_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_bookmark" ADD CONSTRAINT "comment_bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
