import { ModelCollection } from "./collection.model.ts";
import type { Request, Response } from "express";
import { validateCollectionData, validateCollectionUpdateData } from "./collection.schema.ts";

// Controlador que maneja las solicitudes relacionadas con las colecciones
export class CollectionController {
    private modelCollection: ModelCollection;

    constructor(modelCollection: ModelCollection) {
        this.modelCollection = modelCollection;
    }

    // Controlador para obtener todas las colecciones de un usuario
    getCollectionsByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try{
            const result = await this.modelCollection.getCollectionsByUserId(Number(userId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                collections: result.collections
            });
        } 
        catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Controlador para obtener todas las colecciones públicas de un usuario
    getPublicCollectionsByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try{
            const result = await this.modelCollection.getPublicCollectionsByUserId(Number(userId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                collections: result.collections
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para obtener todas las colecciones privadas de un usuario
    getPrivateCollectionsByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try{
            const result = await this.modelCollection.getPrivateCollectionsByUserId(Number(userId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                collections: result.collections
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para obtener una colección por su slug
    getCollectionBySlug = async (req: Request, res: Response) => {
        const { slug } = req.params;
        try{
            const result = await this.modelCollection.getCollectionBySlug(String(slug));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                collection: result.collection
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Método para crear una nueva colección
    createCollection = async (req: Request, res: Response) => {
        if(!req.file) return res.status(404).json({error: "Imagen de portada no proporcionada"});
        const collectionData = {
            ...req.body,
            user_id: req.user?.id,
            coverImage_url: req.file.path
        }
        const validation = validateCollectionData(collectionData);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelCollection.createCollection(validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(201).json({
                message: result.message,
                collection: result.collection
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para actualizar una colección por su ID
    updateCollection = async (req: Request, res: Response) => {
        const { collectionId } = req.params;
        const validation = validateCollectionUpdateData(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelCollection.updateCollection(Number(collectionId), validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                collection: result.collection
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para eliminar una colección por su ID
    deleteCollection = async (req: Request, res: Response) => {
        const { collectionId } = req.params;
        try{
            const result = await this.modelCollection.deleteCollection(Number(collectionId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Método para cambiar el estado de visibilidad de una colección
    toggleCollectionsVisibilty = async (req: Request, res: Response) => {
        const { collectionId } = req.params;
        const { is_public } = req.body;
        try{
            const result = await this.modelCollection.toggleCollectionsVisibilty(Number(collectionId), Boolean(is_public));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }
}