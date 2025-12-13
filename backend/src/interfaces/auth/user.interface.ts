// Defino la interfaz de los datos del usuario
export interface UserData{
    id: number;
    clerkId?: string;
    name_user: string;
    email_user: string;
    password_user: string;
    username_user: string;
    phone_user?: string;
    avatar_url?: string;
    bio?: string;
    created_at?: Date;
    updated_at?: Date;
}

// Defino la interfaz para la creación de un nuevo usuario
export interface UserDataCreate{
    clerkId?: string;
    name_user: string;
    email_user: string;
    username_user: string;
    password_user: string;
}

// Defino la interfaz para la actualización de un usuario
export interface UserDataUpdate{
    name_user?: string;
    email_user?: string;
    username_user?: string;
    password_user?: string;
    phone_user?: string;
    avatar_url?: string;
    bio?: string;
}

// Defino la interfaz de estadisticas de usuarios
export interface UserStadistics{
    total_bookmarks: number;
    total_collections: number;
    total_likes_given: number;
    total_comments_made: number;
}
