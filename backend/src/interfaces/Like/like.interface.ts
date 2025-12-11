// Defino la interfaz para los datos de un like
export interface LikeData{
    id: number;
    user_id: number;
    bookmark_id: number;
    created_at: Date;
    updated_at: Date;
}

// Defino la interfaz para la creación de un like
export interface CreateLikeData{
    user_id: number;
    bookmark_id: number;
}