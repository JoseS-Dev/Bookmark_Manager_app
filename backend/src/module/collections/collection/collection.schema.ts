import {z} from 'zod';
import type { CollectionDataCreate, CollectionDataUpdate } from '../../../interfaces/collections/collection/collection.interface.ts';

// Defino el esquema de validación para crear una colección
const collectionSchema = z.object({
    user_id: z.number().int().positive(),
    name_collection: z.string().min(2).max(100),
    description_collection: z.string().max(500).optional(),
    slug_collection: z.string().min(2).max(100),
    coverImage_url: z.string().url().optional(),
});

// Defino el esquema de validación para actualizar una colección
const collectionUpdateSchema = z.object({
    name_collection: z.string().min(2).max(100).optional(),
    description_collection: z.string().max(500).optional(),
    slug_collection: z.string().min(2).max(100).optional(),
    coverImage_url: z.string().url().optional(),
})

// Función para validar los datos al crear una colección
export function validateCollectionData(data: CollectionDataCreate){
    if(!data) throw new Error('No data provided for collection creation');
    return collectionSchema.safeParse(data);
}

// Función para validar los datos al actualizar una colección
export function validateCollectionUpdateData(data: Partial<CollectionDataUpdate>){
    if(!data) throw new Error('No data provided for collection update');
    return collectionUpdateSchema.partial().safeParse(data);
}