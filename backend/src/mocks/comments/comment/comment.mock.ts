import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock para la tabla de comment_bookmarks
export const commentsMock: Prisma.comment_bookmarkCreateManyInput[] = [
	{
		bookmark_id: 1,
		user_id: 2,
		content_comment: "¡Gran receta! La probé y quedó espectacular."
	},
	{
		bookmark_id: 2,
		user_id: 3,
		content_comment: "Muy buen artículo sobre pruebas de usabilidad."
	},
	{
		bookmark_id: 3,
		user_id: 5,
		content_comment: "Útil para prototipos rápidos."
	},
	{
		bookmark_id: 4,
		user_id: 7,
		content_comment: "Interesante enfoque para crear APIs REST a partir de Postgres."
	},
	{
		bookmark_id: 5,
		user_id: 1,
		content_comment: "Gracias por el resumen diario, muy práctico."
	},
	{
		bookmark_id: 6,
		user_id: 9,
		content_comment: "Buena guía para empezar a contribuir."
	}
]