// Defino la interfaz de los datos de la colección
export interface CollectionData{
    id: number;
    user_id: number;
    name_collection: string;
    description_collection?: string;
    slug_collection: string;
    coverImage_url?: string;
    created_at?: Date;
    updated_at?: Date;
}

// Defino la interfaz para la creación de una nueva colección
export interface CollectionDataCreate{
    user_id: number;
    name_collection: string;
    description_collection?: string;
    slug_collection: string;
    coverImage_url?: string;
}

// Defino la interfaz para la actualización de una colección
export interface CollectionDataUpdate{
    name_collection?: string;
    description_collection?: string;
    slug_collection?: string;
    coverImage_url?: string;
}