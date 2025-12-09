import {z} from 'zod';
import type { UserDataCreate, UserDataUpdate } from '../../interfaces/auth/user.interface.ts';

// Defino el esquema de validación para crear un usuario
const userSchema = z.object({
    clerkId: z.string().optional(),
    name_user: z.string().min(2).max(100),
    email_user: z.string().email().max(100),
    password_user: z.string().min(6).max(100),
    username_user: z.string().min(2).max(50)
});

// Defino el esquema de validación para actualizar un usuario
const userUpdateSchema = z.object({
    name_user: z.string().min(2).max(100).optional(),
    email_user: z.string().email().max(100).optional(),
    username_user: z.string().min(2).max(50).optional(),
    password_user: z.string().min(6).max(100).optional(),
    phone_user: z.string().min(7).max(15).optional(),
    avatar_url: z.string().url().optional(),
    bio: z.string().max(500).optional()
});

// Función para validar los datos al crear un usuario
export function validateUserData(data: UserDataCreate){
    if(!data) throw new Error('No data provided for user creation');
    return userSchema.safeParse(data);
}

// Función para validar los datos al actualizar un usuario
export function validateUserUpdateData(data: Partial<UserDataUpdate>){
    if(!data) throw new Error('No data provided for user update');
    return userUpdateSchema.partial().safeParse(data);
}