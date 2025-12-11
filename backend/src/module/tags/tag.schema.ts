import {z} from 'zod';
import type { CreateTagData, UpdateTagData } from '../../interfaces/tags/tag.interface.ts';

// Defino el esquema de validación para la creación de una etiqueta
const createTagSchema = z.object({
    name_tag: z.string().min(1).max(100),
    icon_tag: z.string().min(1).max(100).optional()
});

// Defino el esquema de validación para la actualización de una etiqueta
const updateTagSchema = z.object({
    name_tag: z.string().min(1).max(100).optional(),
    icon_tag: z.string().min(1).max(100).optional()
});

// Función para validar los datos de creación de una etiqueta
export function validateTagData(data: CreateTagData){
    if(!data) throw new Error("No se proporcionaron datos para la creación de la etiqueta");
    return createTagSchema.safeParse(data);
}

// Función para validar los datos de actualización de una etiqueta
export function validateUpdateTagData(data: Partial<UpdateTagData>){
    if(!data) throw new Error("No se proporcionaron datos para la actualización de la etiqueta");
    return updateTagSchema.safeParse(data);
}