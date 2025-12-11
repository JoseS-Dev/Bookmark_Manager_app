// Defino la interfaz para los datos de una etiqueta
export interface TagData{
    id: number;
    name_tag: string;
    icon_tag?: string;
    created_at: Date;
    updated_at: Date;
}

// Defino la interfaz a la hora de crear una nueva etiqueta
export interface CreateTagData{
    name_tag: string;
    icon_tag?: string;
}

// Defino la interfaz a la hora de actualizar una etiqueta
export interface UpdateTagData{
    name_tag?: string;
    icon_tag?: string;
}