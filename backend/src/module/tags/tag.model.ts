import { prisma } from "../../../config/prisma.client.ts";
import type { CreateTagData, UpdateTagData } from "../../interfaces/tags/tag.interface.ts";
import { selectAllWithoutTimestamps } from "../../core/utils/function.utils.ts";

// Modelo que maneja las operaciones relacionadas con la tabla tag de la base de datos
export class ModelTag {
    // Método para obtener todas las etiquetas
    getAllTags = async () => {
        const tags = await prisma.tag.findMany({
            select: selectAllWithoutTimestamps(prisma.tag)
        });
        if(!tags || tags.length === 0){
            return { error: "No se encontraron etiquetas", tags: [] };
        }
        return {
            message: "Etiquetas obtenidas correctamente",
            tags: tags
        }
    }

    // Método para crear una nueva etiqueta
    createTag = async (data: CreateTagData) => {
        if(!data) return { error: "No se proporcionaron datos para crear la etiqueta" };
        const {name_tag, icon_tag} = data;
        // Se verifica si existe una etiqueta con el mismo nombre
        const existingTag = await prisma.tag.findUnique({
            where: { name_tag: name_tag }
        });
        if(existingTag) return { error: "Ya existe una etiqueta con ese nombre" };
        // Si no existe, se crea la nueva etiqueta
        const newTag = await prisma.tag.create({
            data: data,
            select: selectAllWithoutTimestamps(prisma.tag)
        });
        if(!newTag) return { error: "No se pudo crear la etiqueta" };
        return {
            message: "Etiqueta creada correctamente",
            tag: newTag
        }
    }

    // Método para actualizar una etiqueta por su ID
    updateTag = async (tagId: number, data: Partial<UpdateTagData>) => {
        if(!data) return { error: "No se proporcionaron datos para actualizar la etiqueta" };
        // Se verifica si existe la etiqueta a actualizar
        const existingTag = await prisma.tag.findUnique({
            where: { id: tagId }
        });
        if(!existingTag) return { error: "No existe una etiqueta con ese ID" };
        // Si existe, se actualiza la etiqueta
        const updatedTag = await prisma.tag.update({
            where: { id: tagId },
            data: data,
            select: selectAllWithoutTimestamps(prisma.tag)
        });
        if(!updatedTag) return { error: "No se pudo actualizar la etiqueta" };
        return {
            message: "Etiqueta actualizada correctamente",
            tag: updatedTag
        }
    }

    // Método para eliminar una etiqueta por su ID
    deleteTag = async (tagId: number) => {
        // Se verifica si existe la etiqueta a eliminar
        const existingTag = await prisma.tag.findUnique({
            where: { id: tagId }
        });
        if(!existingTag) return { error: "No existe una etiqueta con ese ID" };
        // Si existe, se elimina la etiqueta
        const deletedTag = await prisma.tag.delete({
            where: { id: tagId }
        });
        if(!deletedTag) return { error: "No se pudo eliminar la etiqueta" };
        return {
            message: "Etiqueta eliminada correctamente"
        }
    }
}