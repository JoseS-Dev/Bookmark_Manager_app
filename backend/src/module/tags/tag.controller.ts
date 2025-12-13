import type {Request, Response} from 'express';
import { ModelTag } from './tag.model.ts';
import { validateTagData, validateUpdateTagData } from './tag.schema.ts';

// Controlador que maneja las solicitudes relacionadas con las etiquetas
export class TagController {
    private modelTag: ModelTag;

    constructor(modelTag: ModelTag) {
        this.modelTag = modelTag;
    }

    // Controlador para obtener todas las etiquetas
    getAllTags = async (req: Request, res: Response) => {
        try{
            const result = await this.modelTag.getAllTags();
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                tags: result.tags
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para crear una nueva etiqueta
    createTag = async (req: Request, res: Response) => {
        const validation = validateTagData(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos para crear la etiqueta",
                    details: validation.error
                });
            }
            const result = await this.modelTag.createTag(validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(201).json({
                message: result.message,
                tag: result.tag
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para actualizar una etiqueta por su ID
    updateTag = async (req: Request, res: Response) => {
        const { tagId } = req.params;
        const validation = validateUpdateTagData(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos para actualizar la etiqueta",
                    details: validation.error
                });
            }
            const result = await this.modelTag.updateTag(Number(tagId), validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                tag: result.tag
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para eliminar una etiqueta por su ID
    deleteTag = async (req: Request, res: Response) => {
        const { tagId } = req.params;
        try{
            const result = await this.modelTag.deleteTag(Number(tagId));
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