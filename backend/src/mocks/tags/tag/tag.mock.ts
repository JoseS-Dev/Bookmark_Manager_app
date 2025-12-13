import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock para la tabla de tag
export const tagsMock: Prisma.tagCreateManyInput[] = [
	{
		name_tag: "Desarrollo",
		icon_tag: "💻"
	},
	{
		name_tag: "Diseño",
		icon_tag: "🎨"
	},
	{
		name_tag: "Recetas",
		icon_tag: "🍳"
	},
	{
		name_tag: "APIs",
		icon_tag: "🔌"
	},
	{
		name_tag: "Noticias",
		icon_tag: "📰"
	},
	{
		name_tag: "Open Source",
		icon_tag: "🌐"
	},
	{
		name_tag: "Seguridad",
		icon_tag: "🔒"
	},
	{
		name_tag: "Productividad",
		icon_tag: "✅"
	},
	{
		name_tag: "Frontend",
		icon_tag: "⚛️"
	},
	{
		name_tag: "Bases de datos",
		icon_tag: "🗄️"
	}
]