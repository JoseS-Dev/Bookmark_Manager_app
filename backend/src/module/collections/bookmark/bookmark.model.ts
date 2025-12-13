import { prisma } from "../../../../config/prisma.client.ts";
import type { BookmarkDataCreate, BookmarkDataUpdate } from "../../../interfaces/collections/bookmark/bookmark.interface.ts";
import { selectAllWithoutTimestamps } from "../../../core/utils/function.utils.ts";

// Modelo que interactua con la tabla de bookmarks en la base de datos
export class ModelBookmark {
    // Método para obtener todos los bookmarks de una colección
    getBookmarksByCollectionId = async (collectionId: number) => {
        if(!collectionId) return { error: "No se proporcionó un ID de colección" };
        // Se verifica si existe la colección
        const existingCollection = await prisma.collection.findUnique({
            where: {id: collectionId}
        });
        if(!existingCollection) return { error: "Colección no encontrada" };
        // Si existe, se obtienen los bookmarks de la colección
        const bookmarks = await prisma.bookmark.findMany({
            where: { collection_id: collectionId },
            select: {
                ...selectAllWithoutTimestamps(prisma.bookmark),
                bookmark_tag: {
                    select: {
                        tag: true
                    }
                }
            }
        });
        if(!bookmarks || bookmarks.length === 0){
            return {
                message: "No se encontraron bookmarks para esta colección",
            }
        }
        return {
            message: `Se encontraron ${bookmarks.length} bookmarks`,
            bookmarks: bookmarks
        }
    }

    // Método para obtener un bookmark por su ID
    getBookmarkById = async (bookmarkId: number) => {
        if(!bookmarkId) return { error: "No se proporcionó un ID de bookmark" };
        // Se verifica si existe el bookmark
        const bookmark = await prisma.bookmark.findUnique({
            where: { id: bookmarkId },
            select: selectAllWithoutTimestamps(prisma.bookmark)
        });
        if(!bookmark) return { error: "Bookmark no encontrado" };
        return {
            message: "Bookmark encontrado exitosamente",
            bookmark: bookmark
        }
    }

    // Método para obtener todos los bookmarks favoritos de una colección
    getFavoriteBookmarksByCollectionId = async (collectionId: number) => {
        if(!collectionId) return { error: "No se proporcionó un ID de colección" };
        // Se verifica si existe la colección
        const existingCollection = await prisma.collection.findUnique({
            where: {id: collectionId}
        });
        if(!existingCollection) return { error: "Colección no encontrada" };
        // Si existe, se obtienen los bookmarks favoritos de la colección
        const bookmarks = await prisma.bookmark.findMany({
            where: { collection_id: collectionId, is_favorite: true },
            select: {
                ...selectAllWithoutTimestamps(prisma.bookmark),
                bookmark_tag: {
                    select: {
                        tag: true
                    }
                }
            }
        });
        if(!bookmarks || bookmarks.length === 0){
            return {
                message: "No se encontraron bookmarks favoritos para esta colección",
            }
        }
        return {
            message: `Se encontraron ${bookmarks.length} bookmarks favoritos`,
            bookmarks: bookmarks
        }
    }

    // Método para obtener todos los bookmarks archivados de una colección
    getArchivedBookmarksByCollectionId = async (collectionId: number) => {
        if(!collectionId) return { error: "No se proporcionó un ID de colección" };
        // Se verifica si existe la colección
        const existingCollection = await prisma.collection.findUnique({
            where: {id: collectionId}
        });
        if(!existingCollection) return { error: "Colección no encontrada" };
        // Si existe, se obtienen los bookmarks archivados de la colección
        const bookmarks = await prisma.bookmark.findMany({
            where: { collection_id: collectionId, is_archived: true },
            select: {
                ...selectAllWithoutTimestamps(prisma.bookmark),
                bookmark_tag: {
                    select: {
                        tag: true
                    }
                }
            }
        });
        if(!bookmarks || bookmarks.length === 0){
            return {
                message: "No se encontraron bookmarks archivados para esta colección",
            }
        }
        return {
            message: `Se encontraron ${bookmarks.length} bookmarks archivados`,
            bookmarks: bookmarks
        }
    }

    // Método para crear un nuevo bookmark
    createBookmark = async (data: BookmarkDataCreate) => {
        if(!data) return { error: "No se proporcionaron datos para el bookmark" };
        const { collection_id, tags, ...rest} = data;
        // Se verifica si existe la colección
        const existingCollection = await prisma.collection.findUnique({
            where: {id: collection_id}
        });
        if(!existingCollection) return { error: "Colección no encontrada" };
        // S existe, se procede a crear el bookmark
        const newBookmark = await prisma.$transaction(async (tsx) => {
            // Primero se crea el bookmark
            const createdBookmark = await tsx.bookmark.create({
                data: {
                    ...rest,
                    collection_id: collection_id
                },
            });
            // Ahora se crea la relación con las etiquetas si es que se proporcionaron
            if(tags && tags.length > 0){
                const bookmarkTagData = tags.map((tagId) => ({
                    bookmark_id: createdBookmark.id,
                    tag_id: tagId
                }));
                console.log(bookmarkTagData);
                const tagsRelational = await tsx.bookmark_tag.createMany({
                    data: bookmarkTagData
                });
                return {
                    message: "Bookmark creado exitosamente",
                    bookmark: {
                        bookmark: createdBookmark,
                        tags: tagsRelational
                    }
                }
            }
            return {
                message: "Bookmark creado exitosamente",
                bookmark: {
                    bookmark: createdBookmark
                }
            }
        });
        if(!newBookmark) return { error: "Error al crear el bookmark" };
        return {
            message: newBookmark.message,
            bookmark: newBookmark.bookmark
        }
    }

    // Método para actualizar un bookmark por su ID
    updateBookmark = async (bookmarkId: number, data: Partial<BookmarkDataUpdate>) => {
        if(!bookmarkId || !data) return { error: "ID de bookmark o datos no proporcionados" };
        const { tags, ...rest } = data;
        // Se verifica si existe el bookmark
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { id: bookmarkId }
        });
        if(!existingBookmark) return { error: "Bookmark no encontrado" };
        // Si existe, se procede a actualizar el bookmark
        const updatedBookmark = await prisma.$transaction(async (tsx) => {
            // Primero se actualiza el bookmark
            const bookmark = await tsx.bookmark.update({
                where: { id: bookmarkId },
                data: {
                    ...rest,
                    updated_at: new Date()
                }
            });
            // Ahora se actualizan las etiquetas si es que se proporcionaron
            if(tags){
                // Primero se eliminan las etiquetas actuales
                await tsx.bookmark_tag.deleteMany({
                    where: { bookmark_id: bookmarkId }
                });
                // Luego se crean las nuevas etiquetas
                const bookmarkTagData = tags.map((tagId) => ({
                    bookmark_id: bookmarkId,
                    tag_id: tagId
                }));
                await tsx.bookmark_tag.createMany({
                    data: bookmarkTagData
                });
            }
            return {
                message: "Bookmark actualizado exitosamente",
                bookmark: {
                    bookmark: bookmark,
                    tags: tags || []
                }
            }
        })
        if(!updatedBookmark) return { error: "Error al actualizar el bookmark" };
        return {
            message: updatedBookmark.message,
            bookmark: updatedBookmark.bookmark
        }
    }

    // Método para eliminar un bookmark por su ID
    deleteBookmark = async (bookmarkId: number) => {
        if(!bookmarkId) return { error: "No se proporcionó un ID de bookmark" };
        // Se verifica si existe el bookmark
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { id: bookmarkId }
        });
        if(!existingBookmark) return { error: "Bookmark no encontrado" };
        // Si existe, se procede a eliminar el bookmark
        const deletedBookmark = await prisma.bookmark.delete({
            where: { id: bookmarkId }
        });
        if(!deletedBookmark) return { error: "Error al eliminar el bookmark" };
        return {
            message: "Bookmark eliminado exitosamente"
        }
    }

    // Método para cambiar el estado de favorito de un bookmark
    toggleFavoriteStatus = async (bookmarkId: number, isFavorite: boolean) => {
        if(!bookmarkId) return { error: "No se proporcionó un ID de bookmark" };
        if(isFavorite === undefined) return { error: "No se proporcionó el estado de favorito" };
        // Se verifica si existe el bookmark
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { id: bookmarkId }
        });
        if(!existingBookmark) return { error: "Bookmark no encontrado" };
        // Si existe, se procede a actualizar el estado de favorito
        const updatedBookmark = await prisma.bookmark.update({
            where: { id: bookmarkId },
            data: { is_favorite: isFavorite }
        });
        if(!updatedBookmark) return { error: "Error al actualizar el estado de favorito" };
        return {
            message: `Bookmark ${isFavorite ? 'marcado' : 'desmarcado'} como favorito exitosamente`,
            bookmark: updatedBookmark
        }
    }

    // Método para cambiar el estado de archivado de un bookmark
    toggleArchivedStatus = async (bookmarkId: number, isArchived: boolean) => {
        if(!bookmarkId) return { error: "No se proporcionó un ID de bookmark" };
        if(isArchived === undefined) return { error: "No se proporcionó el estado de archivado" };
        // Se verifica si existe el bookmark
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { id: bookmarkId }
        });
        if(!existingBookmark) return { error: "Bookmark no encontrado" };
        // Si existe, se procede a actualizar el estado de archivado
        const updatedBookmark = await prisma.bookmark.update({
            where: { id: bookmarkId },
            data: { is_archived: isArchived }
        });
        if(!updatedBookmark) return { error: "Error al actualizar el estado de archivado" };
        return {
            message: `Bookmark ${isArchived ? 'archivado' : 'desarchivado'} exitosamente`,
            bookmark: updatedBookmark
        }
    }
}