import type {Request, Response} from 'express';
import { ModelLike } from './like.model.ts';
import { validateDataLike } from './like.schema.ts';

// Controlador que maneja las solicitudes relacionadas con los likes
export class ControllerLike {
    private modelLike: ModelLike;

    constructor(modelLike: ModelLike) {
        this.modelLike = modelLike;
    }

    // Controlador para obtener los likes de un bookmark
    getLikesByBookmarkId = async (req: Request, res: Response) => {
        const {bookmarkId} = req.params;
        try{
            const result = await this.modelLike.getLikesByBookmarkId(Number(bookmarkId));
            if(result.error) return res.status(404).json({ error: result.error });
            return res.status(200).json({
                message: result.message,
                total: result.total
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error del servidor" });
        }
    }

    // Controlador para crear un nuevo like
    createLike = async (req: Request, res: Response) => {
        const validation = validateDataLike(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelLike.createLike(validation.data);
            if(result.error) return res.status(400).json({ error: result.error });
            return res.status(201).json({
                message: result.message,
                like: result.like
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error del servidor" });
        }
    }

    // Controlador para eliminar un like
    deleteLike = async (req: Request, res: Response) => {
        const {likeId} = req.params;
        try{
            const result = await this.modelLike.deleteLike(Number(likeId));
            if(result.error) return res.status(404).json({ error: result.error });
            return res.status(200).json({ message: result.message });
        }
        catch(error){
            return res.status(500).json({ error: "Error del servidor" });
        }
    }
}