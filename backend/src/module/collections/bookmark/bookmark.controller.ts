import type {Request, Response} from 'express';
import { ModelBookmark } from './bookmark.model.ts';
import { validateBookmarkData, validateBookmarkUpdateData } from './bookmark.schema.ts';

// Controlador que maneja las solicitudes relacionadas con los bookmarks
export class BookmarkController {
    private modelBookmark: ModelBookmark;

    constructor(modelBookmark: ModelBookmark) {
        this.modelBookmark = modelBookmark;
    }

    // Controlador para obtener todos los bookmarks de una colección
    getBookmarksByCollectionId = async (req: Request, res: Response) => {
        const { collectionId } = req.params;
        try{
            const result = await this.modelBookmark.getBookmarksByCollectionId(Number(collectionId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmarks: result.bookmarks
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para obtener un bookmark por su ID
    getBookmarkById = async (req: Request, res: Response) => {
        const { bookmarkId } = req.params;
        try{
            const result = await this.modelBookmark.getBookmarkById(Number(bookmarkId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmark: result.bookmark
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para obtener todos los bookmarks favoritos de una colección
    getFavoriteBookmarksByCollectionId = async (req: Request, res: Response) => {
        const { collectionId } = req.params;
        try{
            const result = await this.modelBookmark.getFavoriteBookmarksByCollectionId(Number(collectionId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmarks: result.bookmarks
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para obtener todos los bookmarks archivados de una colección
    getArchivedBookmarksByCollectionId = async (req: Request, res: Response) => {
        const { collectionId } = req.params;
        try{
            const result = await this.modelBookmark.getArchivedBookmarksByCollectionId(Number(collectionId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmarks: result.bookmarks
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para crear un nuevo bookmark
    createBookmark = async (req: Request, res: Response) => {
        if(!req.file) return res.status(400).json({error: "No se proporcionó una imagen para el bookmark"});
        const BookmarkData = {
            ...req.body,
            image_bookmark: req.file.path
        };
        const validation = validateBookmarkData(BookmarkData);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelBookmark.createBookmark(validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(201).json({
                message: result.message,
                bookmark: result.bookmark
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para actualizar un bookmark por su ID
    updateBookmark = async (req: Request, res: Response) => {
        if(!req.file) return res.status(400).json({error: "No se proporcionó una imagen para el bookmark"});
        const BookmarkData = {
            ...req.body,
            image_bookmark: req.body.image_bookmark ? req.file.path : undefined
        };
        const validation = validateBookmarkUpdateData(BookmarkData);
        const { bookmarkId } = req.params;
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelBookmark.updateBookmark(Number(bookmarkId), validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmark: result.bookmark
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para eliminar un bookmark por su ID
    deleteBookmark = async (req: Request, res: Response) => {
        const { bookmarkId } = req.params;
        try{
            const result = await this.modelBookmark.deleteBookmark(Number(bookmarkId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para cambiar el estado de favorito de un bookmark
    toggleFavoriteBookmark = async (req: Request, res: Response) => {
        const { bookmarkId } = req.params;
        const { is_favorite } = req.body;
        try{
            const result = await this.modelBookmark.toggleFavoriteStatus(Number(bookmarkId), is_favorite);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmark: result.bookmark
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para cambiar el estado de archivado de un bookmark
    toggleArchivedBookmark = async (req: Request, res: Response) => {
        const { bookmarkId } = req.params;
        const { is_archived } = req.body;
        try{
            const result = await this.modelBookmark.toggleArchivedStatus(Number(bookmarkId), is_archived);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                bookmark: result.bookmark
            });
        }
        
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }
}