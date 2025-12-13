import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock para la tabla like_bookmarks
export const likesMock: Prisma.like_bookmarkCreateManyInput[] = [
	{
		bookmark_id: 1,
		user_id: 2
	},
	{
		bookmark_id: 1,
		user_id: 5
	},
	{
		bookmark_id: 2,
		user_id: 3
	},
	{
		bookmark_id: 4,
		user_id: 7
	},
	{
		bookmark_id: 5,
		user_id: 1
	},
	{
		bookmark_id: 6,
		user_id: 9
	},
	{
		bookmark_id: 4,
		user_id: 10
	}
]