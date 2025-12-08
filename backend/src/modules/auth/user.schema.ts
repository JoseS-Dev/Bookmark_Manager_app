import {z} from "zod";
import type { CreateUserData, UpdateUserData } from "../../interfaces/user.interface.ts";
// Defino el esquema de validación para los datos de un usuario
const userSchema = z.object({
    clerkId: z.string().optional(),
    name_user: z.string().min(2),
    email_user: z.string().email(),
    password_user: z.string().min(6),
})

// Defino ele squema de validación  de datos a la hora de actualizar un usuario
const userSchemaUpdate = z.object({
    name_user: z.string().min(2).optional(),
    email_user: z.string().email().optional(),
    username_user: z.string().min(2).optional(),
    password_user: z.string().min(6).optional(),
    phone_user: z.string().optional(),
    avatar_url: z.string().url().optional(),
    bio: z.string().max(160).optional(),
});

// Función que valida los datos del usuario a la hora de ser registrado
export function validateUserData(data: CreateUserData){
    if(!data) throw new Error("No data provided");
    return userSchema.safeParse(data);
}

// Función que valida los datos del usuario a la hora de ser actualizados
export function validateUserUpdateData(data: Partial<UpdateUserData>){
    if(!data) throw new Error("No data provided");
    return userSchemaUpdate.partial().safeParse(data);
}