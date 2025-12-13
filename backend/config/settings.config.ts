import dotenv from "dotenv";

dotenv.config();

// Variables de configuración para el sistema
export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || '/api/v1',
    JWT_SECRET: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
}