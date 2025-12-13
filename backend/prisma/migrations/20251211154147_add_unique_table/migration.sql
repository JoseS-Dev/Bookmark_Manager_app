/*
  Warnings:

  - A unique constraint covering the columns `[bookmark_id,user_id,content_comment]` on the table `comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comment_bookmark_id_user_id_content_comment_key" ON "comment"("bookmark_id", "user_id", "content_comment");
