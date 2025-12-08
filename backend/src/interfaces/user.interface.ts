// Defino la interfaz de datos del usuario
export interface UserData {
    id: number;
    clerkId: string;
    email_user: string;
    name_user: string;
    password_user: string;
    username_user: string;
    phone_user?: string;
    avatar_url?: string;
    created_at: Date;
    updated_at: Date;
}

// Defino la interfaz para la creación de un nuevo usuario
export interface CreateUserData{
    clerkId?: string;
    name_user: string;
    email_user: string;
    username_user: string;
    password_user: string;
}

// Defino la interfaz para la actualización de un usuario
export interface UpdateUserData{
    name_user?: string;
    email_user?: string;
    username_user?: string;
    password_user?: string;
    phone_user?: string;
    avatar_url?: string;
    bio?: string;
}