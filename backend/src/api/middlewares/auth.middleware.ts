import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SETTINGS } from '../../../config/settings.config.ts';
import type { UserData } from '../../interfaces/auth/user.interface.ts';
import type { AuthenticatedUser } from '../../interfaces/general/general.interface.ts';


// Función que asigna el token al usuario autenticado
export function authToken(user: Partial<UserData>) {
    if(!user) throw new Error("No se proporcionaron datos de usuario para generar el token");
    try{
        const token = jwt.sign(
            {id: user.id, email_user: user.email_user, username_user: user.username_user},
            process.env.JWT_SECRET || SETTINGS.JWT_SECRET,
            {expiresIn: '2h'}
        )
        return token;
    } catch (error) {
        throw new Error("Error al generar el token");
    }
}

// Función middleware para verificar el token en las solicitudes protegidas
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token de autenticación no proporcionado" });
    }
    const token = authHeader.split(' ')[1];
    try{
        if(!token) return res.status(401).json({ error: "Token de autenticación no proporcionado" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET || SETTINGS.JWT_SECRET) as AuthenticatedUser;
        req.user = {
            id: decoded.id,
            email_user: decoded.email_user,
            username_user: decoded.username_user
        };
        next();
    }
    catch(error){
        return res.status(401).json({ error: "Token de autenticación inválido o expirado" });
    }
}