// Defino la interfaz de los datos del bookmark
export interface BookmarkData{
    id: number;
    collection_id: number;
    title_bookmark: string;
    description_bookmark?: string;
    url_bookmark: string;
    image_url: string;
    author_bookmark?: string;
    published_at: Date;
    is_favorite: boolean;
    is_archived: boolean;
    created_at?: Date;
    updated_at?: Date;
}

// Defino la interfaz para la creación de un nuevo bookmark
export interface BookmarkDataCreate{
    collection_id: number;
    title_bookmark: string;
    description_bookmark?: string;
    url_bookmark: string;
    image_url: string;
    author_bookmark?: string;
    published_at: Date;
    tags?: number[];
}

// Defino la intefaz para la actualización de un bookmark
export interface BookmarkDataUpdate{
    title_bookmark?: string;
    description_bookmark?: string;
    url_bookmark?: string;
    image_url?: string;
    author_bookmark?: string;
    published_at?: Date;
    tags?: number[];
}