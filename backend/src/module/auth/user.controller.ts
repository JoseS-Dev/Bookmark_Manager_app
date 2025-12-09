import type {Request, Response} from 'express';
import {ModelUser} from './user.model.ts';
import { validateUserData, validateUserUpdateData } from './user.schema.ts';

// Controlador que maneja las solicitudes relacionadas con los usuarios
export class UserController {
    private modelUser: ModelUser;

    constructor(modelUser: ModelUser) {
        this.modelUser = modelUser;
    }

    // Controlador para registrar un nuevo usuario
    createUser = async (req: Request, res: Response) => {
        const validation = validateUserData(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelUser.createUser(validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(201).json({
                message: result.message,
                user: result.user
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para loguear un usuario (Opcional porque utilizo Clerk)
    loginUser = async (req: Request, res: Response) => {
        const {email_user, password_user} = req.body;
        try{
            const result = await this.modelUser.LoginUser(email_user, password_user);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para deslogear un usuario (Opcional porque utilizo Clerk)
    logoutUser = async (req: Request, res: Response) => {
        const {userId} = req.params;
        try{
            const result = await this.modelUser.LogoutUser(Number(userId));
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para obtener los datos de un usuario por su ID
    getUserById = async (req: Request, res: Response) => {
        const {userId} = req.params;
        try{
            const result = await this.modelUser.getUserById(Number(userId));
            if(result.error) return res.status(404).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                user: result.user
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para actualizar los datos de un usuario
    updateUser = async (req: Request, res: Response) => {
        const {userId} = req.params;
        const validation = validateUserUpdateData(req.body);
        try{
            if(!validation.success){
                return res.status(400).json({
                    error: "Datos inválidos",
                    details: validation.error
                });
            }
            const result = await this.modelUser.updateUser(Number(userId), validation.data);
            if(result.error) return res.status(400).json({error: result.error});
            return res.status(200).json({
                message: result.message,
                user: result.user
            });
        }
        catch(error){
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    // Controlador para eliminar un usuario por su ID
    deleteUser = async (req: Request, res: Response) => {
        const {userId} = req.params;
        try{
            const result = await this.modelUser.deleteUser(Number(userId));
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