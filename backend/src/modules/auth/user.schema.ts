import {z} from "zod";
import type { CreateUserData } from "../../interfaces/user.interface.ts";

// Defino el esquema de validación para la creación de un usuario
const SchemaUserCreate = z.object({
    clerkId: z.string().min(1),
    name_user: z.string().min(1),
    email_user: z.string().email(),
    password_user: z.string().min(6),
    phone_user: z.string().optional(),
    avatar_url: z.string().url().optional(),
});

// Defino la función que valida los datos de creación de un usuario
export function validateUserCreate(data: CreateUserData){
    if(!data) throw new Error("No data provided for user creation");
    return SchemaUserCreate.safeParse(data);
}