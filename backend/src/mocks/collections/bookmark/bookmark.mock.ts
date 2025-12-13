import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock para la tabla de bookmarks
export const bookmarksMock: Prisma.bookmarkCreateManyInput[] = [
	{
		collection_id: 1,
		title_bookmark: "Tarta de manzana casera",
		description_bookmark: "Receta paso a paso para una tarta de manzana clásica.",
		url_bookmark: "https://example.com/recetas/tarta-manzana",
		image_url: "https://example.com/images/tarta-manzana.jpg",
		author_bookmark: "Cocina Fácil",
		published_at: new Date("2023-05-10T08:00:00.000Z"),
		is_archived: false,
		is_favorite: true
	},
	{
		collection_id: 2,
		title_bookmark: "Principios de diseño centrado en el usuario",
		description_bookmark: "Artículo sobre investigación de usuarios y tests de usabilidad.",
		url_bookmark: "https://uxplanet.org/user-centered-design",
		image_url: "https://example.com/images/ux-article.jpg",
		author_bookmark: "UX Planet",
		published_at: new Date("2024-02-14T12:00:00.000Z"),
		is_archived: false,
		is_favorite: false
	},
	{
		collection_id: 3,
		title_bookmark: "JSONPlaceholder API",
		description_bookmark: null,
		url_bookmark: "https://jsonplaceholder.typicode.com/",
		image_url: "https://example.com/images/jsonplaceholder.png",
		author_bookmark: null,
		published_at: new Date("2020-01-01T00:00:00.000Z"),
		is_archived: false,
		is_favorite: false
	},
	{
		collection_id: 3,
		title_bookmark: "PostgREST — API for Postgres",
		description_bookmark: "Convierte tu base de datos Postgres en una API RESTful automáticamente.",
		url_bookmark: "https://postgrest.org/",
		image_url: "https://example.com/images/postgrest.png",
		author_bookmark: "PostgREST Team",
		published_at: new Date("2021-07-20T09:30:00.000Z"),
		is_archived: false,
		is_favorite: true
	},
	{
		collection_id: 4,
		title_bookmark: "Resumen diario: Lo último en tecnología",
		description_bookmark: "Fuente confiable con resúmenes de noticias tecnológicas.",
		url_bookmark: "https://technews.example.com/daily",
		image_url: "https://example.com/images/technews.jpg",
		author_bookmark: "TechNews",
		published_at: new Date("2025-11-01T07:00:00.000Z"),
		is_archived: false,
		is_favorite: false
	},
	{
		collection_id: 5,
		title_bookmark: "Cómo contribuir a proyectos Open Source",
		description_bookmark: "Guía práctica para encontrar issues y enviar PRs.",
		url_bookmark: "https://opensource.guide/",
		image_url: "https://example.com/images/oss-guide.png",
		author_bookmark: "Open Source Guides",
		published_at: new Date("2019-04-15T10:00:00.000Z"),
		is_archived: false,
		is_favorite: true
	}
];