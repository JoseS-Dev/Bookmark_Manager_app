import {express} from 'express';
import {Multer} from 'multer';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        email_user: string;
        username_user: string;
      }
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}