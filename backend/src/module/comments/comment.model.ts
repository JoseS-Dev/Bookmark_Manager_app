import { prisma } from "../../../config/prisma.client.ts";
import type { CreateCommentData, UpdateCommentData } from "../../interfaces/comment/comment.interface.ts";
import { selectAllWithoutTimestamps } from "../../core/utils/function.utils.ts";

// Modelo que interactúa con la tabla comment en la base de datos
export class ModelComment {
    // Método para obtener todos los comentarios de un bookmark
    getCommentsByBookmarkId = async (BookmarkId: number) => {
        if(!BookmarkId) return { error: "El ID del bookmark es requerido" };
        // Se verifica si existe el bookmark
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { id: BookmarkId }
        });
        if(!existingBookmark) return { error: "El bookmark no existe" };
        // Si existe, se obtienen los comentarios
        const comments = await prisma.comment.findMany({
            where: { bookmark_id: BookmarkId },
            select: selectAllWithoutTimestamps(prisma.comment)
        });
        if(!comments || comments.length === 0) {
            return { error: "No hay comentarios para este bookmark", comments: [] };
        }
        return {
            message: "Comentarios obtenidos exitosamente",
            comments: comments
        }
    }

    // Método para obtener todos los comentarios de un usuario en distintos bookmarks
    getCommentsByUserId = async (userId: number) => {
        if(!userId) return { error: "El ID del usuario es requerido" };
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: { id: userId }
        });
        if(!existingUser) return { error: "El usuario no existe" };
        // Si existe, se obtienen los comentarios
        const comments = await prisma.comment.findMany({
            where: { user_id: userId },
            select: selectAllWithoutTimestamps(prisma.comment)
        });
        if(!comments || comments.length === 0) {
            return { error: "No hay comentarios para este usuario", comments: [] };
        }
        return {
            message: "Comentarios obtenidos exitosamente",
            comments: comments
        }
    }

    // Método para obtener un comentario por su ID
    getCommentById = async (commentId: number) => {
        if(!commentId) return { error: "El ID del comentario es requerido" };
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: selectAllWithoutTimestamps(prisma.comment)
        });
        if(!comment) return { error: "El comentario no existe" };
        return {
            message: "Comentario obtenido exitosamente",
            comment: comment
        }
    }

    // Método para crear un nuevo comentario
    createComment = async (data: CreateCommentData) => {
        if(!data) return { error: "Los datos para crear el comentario son requeridos" };
        // Se verifica si existe el bookmark y el usuario
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { id: data.bookmark_id }
        });
        const existingUser = await prisma.users.findUnique({
            where: { id: data.user_id }
        });
        if(!existingUser || !existingBookmark) {
            return { error: "El bookmark o el usuario no existen" };
        }
        // Si existen, se crea el comentario
        const newComment = await prisma.comment.create({
            data: data,
            select: selectAllWithoutTimestamps(prisma.comment)
        });
        if(!newComment) return { error: "No se pudo crear el comentario" };
        return {
            message: "Comentario creado exitosamente",
            comment: newComment
        }
    }

    // Método para actualizar un comentario
    updateComment = async (commentId: number, data: UpdateCommentData) => {
        if(!commentId || !data) return { error: "El ID del comentario y los datos para actualizar son requeridos" };
        // Se verifica si existe el comentario
        const existingComment = await prisma.comment.findUnique({
            where: { id: commentId }
        });
        if(!existingComment) return { error: "El comentario no existe" };
        // Si existe, se actualiza el comentario
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: {
                ...data,
                updated_at: new Date()
            },
            select: selectAllWithoutTimestamps(prisma.comment)
        });
        if(!updatedComment) return { error: "No se pudo actualizar el comentario" };
        return {
            message: "Comentario actualizado exitosamente",
            comment: updatedComment
        }
    }

    // Método para eliminar un comentario
    deleteComment = async (commentId: number) => {
        if(!commentId) return { error: "El ID del comentario es requerido" };
        // Se verifica si existe el comentario
        const existingComment = await prisma.comment.findUnique({
            where: { id: commentId }
        });
        if(!existingComment) return { error: "El comentario no existe" };
        // Si existe, se elimina el comentario
        const deletedComment = await prisma.comment.delete({
            where: { id: commentId }
        });
        if(!deletedComment) return { error: "No se pudo eliminar el comentario" };
        return {
            message: "Comentario eliminado exitosamente"
        }
    }
}