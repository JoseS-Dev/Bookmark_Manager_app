import { prisma } from "../../../../config/prisma.client.ts";
import type { CollectionDataCreate, CollectionDataUpdate } from "../../../interfaces/collections/collection/collection.interface.ts";
import { selectAllWithoutTimestamps } from "../../../core/utils/function.utils.ts";

// Modelo que interactua con la tabla de collections en la base de datos
export class ModelCollection {
    // Método para obtener todas las colecciones de un usuario
    getCollectionsByUserId = async (userId: number) => {
        if(!userId) return { error: "No se proporcionó un ID de usuario" };
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return { error: "Usuario no encontrado" };
        // Si existe, se obtienen las colecciones del usuario
        const collections = await prisma.collection.findMany({
            where: { user_id: userId },
            select: selectAllWithoutTimestamps(prisma.collection)
        });
        if(!collections || collections.length === 0){
            return {
                message: "No se encontraron colecciones para este usuario",
            }
        }
        return {
            message: `Se encontraron ${collections.length} colecciones`,
            collections: collections
        }
    }

    // Método para obtener todas las colecciones publicas de un usuario
    getPublicCollectionsByUserId = async (userId: number) => {
        if(!userId) return { error: "No se proporcionó un ID de usuario" };
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return { error: "Usuario no encontrado" };
        // Si existe, se obtienen las colecciones publicas del usuario
        const collections = await prisma.collection.findMany({
            where: { user_id: userId, is_public: true },
            select: selectAllWithoutTimestamps(prisma.collection)
        });
        if(!collections || collections.length === 0){
            return {error: "No se encontraron colecciones públicas para este usuario"};
        }
        return {
            message: `Se encontraron ${collections.length} colecciones públicas`,
            collections: collections
        }
    }

    // Método para obtener todas las colecciones privadas de un usuario
    getPrivateCollectionsByUserId = async (userId: number) => {
        if(!userId) return { error: "No se proporcionó un ID de usuario" };
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: {id: userId}
        });
        if(!existingUser) return { error: "Usuario no encontrado" };
        // Si existe, se obtienen las colecciones privadas del usuario
        const collections = await prisma.collection.findMany({
            where: { user_id: userId, is_public: false },
            select: selectAllWithoutTimestamps(prisma.collection)
        });
        if(!collections || collections.length === 0){
            return {error: "No se encontraron colecciones privadas para este usuario"};
        }
        return {
            message: `Se encontraron ${collections.length} colecciones privadas`,
            collections: collections
        }
    }

    // Método para obtener una colección or su slug
    getCollectionBySlug = async (slug_collection: string) => {
        if(!slug_collection) return { error: "No se proporcionó un slug de colección" };
        // Se obtiene la colección por su slug
        const collection = await prisma.collection.findUnique({
            where: { slug_collection: slug_collection },
            select: selectAllWithoutTimestamps(prisma.collection)
        });
        if(!collection) return { error: "Colección no encontrada" };
        return {
            message: "Colección encontrada",
            collection: collection
        }
    }

    // Método para crear una nueva colección
    createCollection = async (data: CollectionDataCreate) => {
        if(!data) return { error: "Los datos no fueron proporcionados" };
        const { user_id, ...rest } = data;
        // Se verifica si existe el usuario
        const existingUser = await prisma.users.findUnique({
            where: { id: user_id }
        });
        if(!existingUser) return { error: "Usuario no encontrado" };
        // Si existe, se procede a crear la colección a dicho usuario
        const newCollection = await prisma.collection.create({
            data: data,
            select: selectAllWithoutTimestamps(prisma.collection)
        });
        if(!newCollection) return { error: "Error al crear la colección" };
        return {
            collection: newCollection,
            message: "Colección creada exitosamente"
        }
    }

    // Método para actualizar una colección por su ID
    updateCollection = async (collectionId: number, data: Partial<CollectionDataUpdate>) => {
        if(!collectionId || !data) return { error: "ID de colección o datos no proporcionados" };
        // Se verifica si existe la colección
        const existingCollection = await prisma.collection.findUnique({
            where: { id: collectionId }
        });
        if(!existingCollection) return { error: "Colección no encontrada" };
        // Si existe, se procede a actualizar la colección
        const updatedCollection = await prisma.collection.update({
            where: { id: collectionId },
            data: {
                ...data,
                updated_at: new Date()
            },
            select: selectAllWithoutTimestamps(prisma.collection)
        });
        if(!updatedCollection) return { error: "Error al actualizar la colección" };
        return {
            message: "Colección actualizada exitosamente",
            collection: updatedCollection
        }
    }

    // Método para eliminar una colección por su ID
    deleteCollection = async (collectionId: number) => {
        if(!collectionId) return { error: "No se proporcionó un ID de colección" };
        // Se verifica si existe la colección
        const existingCollection = await prisma.collection.findUnique({
            where: { id: collectionId }
        });
        if(!existingCollection) return { error: "Colección no encontrada" };
        // Si existe, se procede a eliminar la colección
        const deletedCollection = await prisma.collection.delete({
            where: { id: collectionId }
        });
        if(!deletedCollection) return { error: "Error al eliminar la colección" };
        return {
            message: "Colección eliminada exitosamente"
        }
    }
}