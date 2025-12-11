import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';
import { acceptedDocuments, acceptedImage, acceptedVideo } from '../../core/utils/utils.collection.ts';
import { RequestHandler } from 'express';
// Función para las configuraciones de Multer
export function configureMulter(directory: string): Multer{
    // Se verifica si existe el directorio
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory, {recursive: true});
    }
    // Configuración del almacenamiento
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    return multer({
        storage: storage,
        limits: {fileSize: 12 * 1024 * 1024}, // Limite de 12MB
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if(!acceptedImage.includes(ext) && !acceptedVideo.includes(ext) && 
            !acceptedDocuments.includes(ext)){
                return cb(new Error('Solo se permiten archivos de imagen, video o documento'));
            }
            cb(null, true);
        }
    });
}

const uploadUser = path.resolve('uploads/users');
const uploadCollection = path.resolve('uploads/collections');
const uploadBookmark = path.resolve('uploads/bookmarks');
export const uploadUserImage: RequestHandler = configureMulter(uploadUser).single('avatar_url');
export const uploadCollectionImage: RequestHandler = configureMulter(uploadCollection).single('coverImage_url');
export const uploadBookmarkImage: RequestHandler = configureMulter(uploadBookmark).single('image_url');

