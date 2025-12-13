import {prisma} from '../../../config/prisma.client.ts';
import type { CreateLikeData } from '../../interfaces/Like/like.interface.ts';
import { selectAllWithoutTimestamps } from '../../core/utils/function.utils.ts';

// Modelo que maneja las operaciones relacionadas con la tabla like de la base de datos
export class ModelLike {
    
    // Método que obtiene todos los likes de un bookmark
    getLikesByBookmarkId = async (bookmarkId: number) => {
        if(!bookmarkId) return { error: "No se proporcionó el ID del bookmark" };
        // Se verifica si existe el bookmark
        const existingBookmark = await prisma.bookmark.findFirst({
            where: { id: bookmarkId }
        });
        if(!existingBookmark) return { error: "No existe un bookmark con ese ID" };
        // Si existe, se obtienen los likes asociados al bookmark
        const likes = await prisma.like.findMany({
            where: { bookmark_id: bookmarkId },
        });
        if(!likes || likes.length === 0){
            return { error: "No se encontraron likes para ese bookmark"};
        }
        return {
            message: "Likes obtenidos correctamente",
            total: likes.length,
        }
    }

    // Método que crea un nuevo like
    createLike = async (data: CreateLikeData) => {
        if(!data) return { error: "No se proporcionaron datos para crear el like" };
        // Se verifica si el usuario ya ha dado like al bookmark
        const existingLike = await prisma.like.findFirst({
            where: {user_id: data.user_id, bookmark_id: data.bookmark_id}
        });
        if(existingLike) return { error: "El usuario ya ha dado like a este bookmark" };
        // Si no existe, se crea el like
        const newLike = await prisma.like.create({
            data: data,
            select: selectAllWithoutTimestamps(prisma.like)
        });
        if(!newLike) return { error: "No se pudo crear el like" };
        return {
            message: "Like creado correctamente",
            like: newLike
        }
    }

    // Método que elimina un like
    deleteLike = async (likeId: number) => {
        if(!likeId) return { error: "No se proporcionó el ID del like" };
        // Se verifica si existe el like
        const existingLike = await prisma.like.findFirst({
            where: { id: likeId }
        });
        if(!existingLike) return { error: "No existe un like con ese ID" };
        // Si existe, se elimina el like
        const deletedLike = await prisma.like.delete({
            where: { id: likeId },
            select: selectAllWithoutTimestamps(prisma.like)
        });
        if(!deletedLike) return { error: "No se pudo eliminar el like" };
        return {
            message: "Like eliminado correctamente",
            like: deletedLike
        }
    }
}