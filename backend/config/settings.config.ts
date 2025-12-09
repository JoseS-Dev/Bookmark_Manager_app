import dotenv from "dotenv";

dotenv.config();

// Variables de configuración para el sistema
export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || '/api/v1'
}