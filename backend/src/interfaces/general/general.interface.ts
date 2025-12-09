// Defino la interfaz para Request para el multer
import type { Request } from "express";

export interface MulterRequest extends Request {
    file: any;
}