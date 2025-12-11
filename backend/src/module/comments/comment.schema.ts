import {z} from 'zod';
import type { CreateCommentData, UpdateCommentData } from '../../interfaces/comment/comment.interface.ts';

// Defino el esquema de validación para los comentarios a bookmarks
const commentSchema = z.object({
    bookmark_id: z.number().int().positive(),
    user_id: z.number().int().positive(),
    content_comment: z.string().min(1).max(500)
});

// Defino el esquema de validación para la actualización de comentarios
const updateCommentSchema = z.object({
    content_comment: z.string().min(1).max(500).optional()
});

// Función que valdia los datos antes de crear un comentario
export function validateDataComment(data: CreateCommentData){
    if(!data) throw new Error("No se proporcionaron datos para validar");
    return commentSchema.safeParse(data);
}

// Función para actualizar el contenido de un comentario
export function validateDataUpdateComment(data: UpdateCommentData){
    if(!data) throw new Error("No se proporcionaron datos para validar");
    return updateCommentSchema.safeParse(data);
}