import dotenv from 'dotenv';
dotenv.config();

// Configuraciones generales de la aplicación
export const SETTINGS_CONFIG = {
    PORT: process.env.PORT || 3000,
    PATH: process.env.PATH || '/api/v1',
}