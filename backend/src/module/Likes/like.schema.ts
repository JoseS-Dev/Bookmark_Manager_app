import {z} from 'zod';
import type { CreateLikeData } from '../../interfaces/Like/like.interface.ts';

// Defino el esquema de validación para la creación de un like a boorkmark
const createLikeSchema = z.object({
    user_id: z.number().int().positive(),
    bookmark_id: z.number().int().positive()
});

// Función para validar los datos de creación de un like a bookmark
export function validateDataLike(data: CreateLikeData){
    if(!data) throw new Error("No se proporcionaron datos para la creación del like");
    return createLikeSchema.safeParse(data);
}