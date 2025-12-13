import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock para la tabla de colecciones
export const collectionsMock: Prisma.collectionCreateManyInput[] = [
	{
		name_collection: "Recetas favoritas",
		user_id: 1,
		description_collection: "Recopilación de artículos y recetas de cocina",
		slug_collection: "recetas-favoritas",
		coverImage_url: "https://example.com/covers/recetas.png",
		is_public: true
	},
	{
		name_collection: "Artículos UX",
		user_id: 2,
		description_collection: "Enlaces sobre diseño de experiencia de usuario",
		slug_collection: "articulos-ux",
		coverImage_url: null,
		is_public: false
	},
	{
		name_collection: "APIs útiles",
		user_id: 5,
		description_collection: null,
		slug_collection: "apis-utiles",
		coverImage_url: "https://example.com/covers/apis.png",
		is_public: true
	},
	{
		name_collection: "Noticias Tech",
		user_id: 7,
		description_collection: "Fuentes y análisis sobre tecnología",
		slug_collection: "noticias-tech",
		coverImage_url: null,
		is_public: true
	},
	{
		name_collection: "Proyectos Open Source",
		user_id: 9,
		description_collection: "Repositorios y recursos para contribuir",
		slug_collection: "proyectos-oss",
		coverImage_url: "https://example.com/covers/oss.png",
		is_public: false
	}
]