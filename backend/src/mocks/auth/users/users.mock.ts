import { prisma } from "../../../../config/prisma.client.ts"
import { Prisma } from "../../../../generated/prisma/client.ts"
// Defino el mock para la tabla de users
export const usersMock: Prisma.usersCreateManyInput[] = [
    {
        name_user: "Carlos Pérez",
        email_user: "carlos.perez@example.com",
        username_user: "carlosp",
        password_user: "$2b$10$examplehashforcarlos",
        avatar_url: "https://example.com/avatars/carlos.png",
        bio: "Frontend developer and bookmark collector."
    },
    {
        name_user: "Ana Gómez",
        email_user: "ana.gomez@example.com",
        username_user: "anag",
        password_user: "$2b$10$examplehashforana",
        avatar_url: "https://example.com/avatars/ana.jpg",
        bio: "Product designer who saves great articles."
    },
    {
        name_user: "Miguel Ruiz",
        email_user: "miguel.ruiz@example.com",
        username_user: "miguelr",
        password_user: "$2b$10$examplehashformiguel",
        avatar_url: null,
        bio: null
    },
    {
        name_user: "Lucía Morales",
        email_user: "lucia.morales@example.com",
        username_user: "luciam",
        password_user: "$2b$10$examplehashforlucia",
        avatar_url: "https://example.com/avatars/lucia.png",
        bio: "Tech writer and avid reader."
    },
    {
        name_user: "Diego Fernández",
        email_user: "diego.fernandez@example.com",
        username_user: "diegoF",
        password_user: "$2b$10$examplehashfordiego",
        avatar_url: "https://example.com/avatars/diego.jpg",
        bio: "Backend engineer — loves APIs and databases."
    },
    {
        name_user: "Sofía Álvarez",
        email_user: "sofia.alvarez@example.com",
        username_user: "sofiaa",
        password_user: "$2b$10$examplehashforsofia",
        avatar_url: null,
        bio: "Designer and UX researcher."
    },
    {
        name_user: "Javier Torres",
        email_user: "javier.torres@example.com",
        username_user: "javiert",
        password_user: "$2b$10$examplehashforjavier",
        avatar_url: "https://example.com/avatars/javier.png",
        bio: "Full-stack dev and open-source contributor."
    },
    {
        name_user: "Elena Castro",
        email_user: "elena.castro@example.com",
        username_user: "elenac",
        password_user: "$2b$10$examplehashforelena",
        avatar_url: "https://example.com/avatars/elena.jpg",
        bio: "Researcher and lifelong learner."
    },
    {
        name_user: "Roberto Díaz",
        email_user: "roberto.diaz@example.com",
        username_user: "robertod",
        password_user: "$2b$10$examplehashforroberto",
        avatar_url: null,
        bio: "Cybersecurity enthusiast.",
    },
    {
        name_user: "Paula Herrera",
        email_user: "paula.herrera@example.com",
        username_user: "paulah",
        password_user: "$2b$10$examplehashforpaula",
        avatar_url: "https://example.com/avatars/paula.png",
        bio: "Product manager who curates useful links.",
    }
]