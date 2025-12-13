import {z} from 'zod';
import type { BookmarkDataCreate, BookmarkDataUpdate } from '../../../interfaces/collections/bookmark/bookmark.interface.ts';

// Defino el esquema de validación para crear un bookmark
const bookmarkSchema = z.object({
    collection_id: z.number().int().positive(),
    title_bookmark: z.string().min(1).max(200),
    description_bookmark: z.string().max(500).optional(),
    url_bookmark: z.string().url().max(500),
    image_url: z.string().url().max(500),
    author_bookmark: z.string().max(100).optional(),
    published_at: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }).transform((date) => new Date(date)),
    tags: z.array(z.number()).optional()
});

// Defino el esquema de validación para actualizar un bookmark
const bookmarkUpdateSchema = z.object({
    title_bookmark: z.string().min(1).max(200).optional(),
    description_bookmark: z.string().max(500).optional(),
    url_bookmark: z.string().url().max(500).optional(),
    image_url: z.string().url().max(500).optional(),
    author_bookmark: z.string().max(100).optional(),
    published_at: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }).transform((date) => new Date(date)).optional(),
    tags: z.array(z.number()).optional()
});

// Función para validar los datos al crear un bookmark
export function validateBookmarkData(data: BookmarkDataCreate){
    if(!data) throw new Error('No data provided for bookmark creation');
    return bookmarkSchema.safeParse(data);
}

// Función para validar los datos al actualizar un bookmark
export function validateBookmarkUpdateData(data: Partial<BookmarkDataUpdate>){
    if(!data) throw new Error('No data provided for bookmark update');
    return bookmarkUpdateSchema.partial().safeParse(data);
}