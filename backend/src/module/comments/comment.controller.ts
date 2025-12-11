import type {Request, Response} from 'express';
import { ModelComment } from './comment.model.ts';
import { validateDataComment, validateDataUpdateComment } from './comment.schema.ts';

// Controlador que maneja las solicitudes relacionadas con los comentarios
export class CommentController {
    private modelComment: ModelComment;

    constructor(modelComment: ModelComment) {
        this.modelComment = modelComment;
    }

    // Controlador para obtener todos los comentarios de un bookmark
    getCommentsByBookmarkId = async (req: Request, res: Response) => {
        const { bookmarkId } = req.params;
        try{
            const result = await this.modelComment.getCommentsByBookmarkId(Number(bookmarkId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                comments: result.comments
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Controlador para obtener todos los comentarios de un usuario en distintos bookmarks
    getCommentsByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try{
            const result = await this.modelComment.getCommentsByUserId(Number(userId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                comments: result.comments
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Controlador para obtener un comentario por su ID
    getCommentById = async (req: Request, res: Response) => {
        const { commentId } = req.params;
        try{
            const result = await this.modelComment.getCommentById(Number(commentId));   
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                comment: result.comment
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Controlador para crear un nuevo comentario
    createComment = async (req: Request, res: Response) => {
        const validation = validateDataComment(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos para crear un comentario",
                    details: validation.error
                });
            }
            const result = await this.modelComment.createComment(validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(201).json({
                message: result.message,
                comment: result.comment
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Controlador para actualizar un comentario por su ID
    updateComment = async (req: Request, res: Response) => {
        const { commentId } = req.params;
        const validation = validateDataUpdateComment(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos para actualizar el comentario",
                    details: validation.error
                });
            }
            const result = await this.modelComment.updateComment(Number(commentId), validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                comment: result.comment
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Controlador para eliminar un comentario por su ID
    deleteComment = async (req: Request, res: Response) => {
        const { commentId } = req.params;
        try{
            const result = await this.modelComment.deleteComment(Number(commentId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message
            });
        }
        catch(error){
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}