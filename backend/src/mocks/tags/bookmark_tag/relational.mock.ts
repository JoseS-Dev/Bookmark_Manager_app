import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock para la tabla de bookmark_tag (relacional)
export const bookmarkTagRelationalMock: Prisma.bookmark_tagCreateManyInput[] = [
	{ bookmark_id: 1, tag_id: 3 }, // Recetas
	{ bookmark_id: 1, tag_id: 1 }, // Desarrollo (ej. receta con tutorial de código?)
	{ bookmark_id: 2, tag_id: 2 }, // Diseño
	{ bookmark_id: 2, tag_id: 8 }, // Productividad
	{ bookmark_id: 3, tag_id: 4 }, // APIs
	{ bookmark_id: 3, tag_id: 10 }, // Bases de datos
	{ bookmark_id: 4, tag_id: 4 }, // APIs
	{ bookmark_id: 4, tag_id: 1 }, // Desarrollo
	{ bookmark_id: 5, tag_id: 5 }, // Noticias
	{ bookmark_id: 6, tag_id: 6 }, // Open Source
	{ bookmark_id: 6, tag_id: 1 }  // Desarrollo
]