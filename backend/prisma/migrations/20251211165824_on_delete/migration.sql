-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_bookmark_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookmark" DROP CONSTRAINT "bookmark_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookmark_tag" DROP CONSTRAINT "bookmark_tag_bookmark_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookmark_tag" DROP CONSTRAINT "bookmark_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."collection" DROP CONSTRAINT "collection_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_bookmark_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_stats" DROP CONSTRAINT "user_stats_user_id_fkey";

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_tag" ADD CONSTRAINT "bookmark_tag_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_tag" ADD CONSTRAINT "bookmark_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
