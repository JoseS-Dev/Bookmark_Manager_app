import { prisma } from "../../config/prisma.client.ts";
import dotenv from "dotenv";
import {
    bookmarkTagRelationalMock,
    bookmarksMock,
    collectionsMock,
    commentsMock,
    likesMock,
    tagsMock,
    usersMock,
    sessionsMock
} from '../../src/mocks/index.ts';
dotenv.config();
// Función para la semilla de datos de prueba en la base de datos
export async function seedDatabase() {
    // Inserto los usuarios
    await prisma.users.createMany({
        data: usersMock,
        skipDuplicates: true
    });
    console.log("Usuarios insertados");
    // Inserto las sesiones
    await prisma.session.createMany({
        data: sessionsMock,
        skipDuplicates: true
    });
    console.log("Sesiones insertadas");
    // Inserto las colecciones
    await prisma.collection.createMany({
        data: collectionsMock,
        skipDuplicates: true
    });
    console.log("Colecciones insertadas");
    // Inserto los bookmarks
    await prisma.bookmark.createMany({
        data: bookmarksMock,
        skipDuplicates: true
    });
    console.log("Bookmarks insertados");
    // Inserto los tags
    await prisma.tag.createMany({
        data: tagsMock,
        skipDuplicates: true
    });
    console.log("Tags insertados");
    // Inserto las relaciones bookmark_tag
    await prisma.bookmark_tag.createMany({
        data: bookmarkTagRelationalMock,
        skipDuplicates: true
    });
    console.log("Relaciones bookmark_tag insertadas");
    // Inserto los comentarios
    await prisma.comment_bookmark.createMany({
        data: commentsMock,
        skipDuplicates: true
    });
    console.log("Comentarios insertados");
    // Inserto los likes
    await prisma.like_bookmark.createMany({
        data: likesMock,
        skipDuplicates: true
    });
    console.log("Likes insertados");
    console.log("Base de datos sembrada con datos de prueba");
}

seedDatabase();