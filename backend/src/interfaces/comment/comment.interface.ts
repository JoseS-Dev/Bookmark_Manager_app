// Defino la interfaz para los datos de los comentarios 
export interface CommentData {
    id: number;
    bookmar_id: number;
    user_id: number;
    content_comment: string;
    created_at: Date;
    updated_at: Date;
}

// Defino la interfaz para los datos necesarios para crear un comentario
export interface CreateCommentData {
    bookmark_id: number;
    user_id: number;
    content_comment: string;
}

// Defino la interfaz para los datos necesarios para actualizar un comentario
export interface UpdateCommentData {
    content_comment?: string;
}