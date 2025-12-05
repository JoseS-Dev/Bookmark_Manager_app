import express, {json} from 'express';
import cors from 'cors';
import { SETTINGS_CONFIG } from './config/settings.config.js';


const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(json());

// Rutas

// Inicialización del servidor
app.listen(SETTINGS_CONFIG.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${SETTINGS_CONFIG.PORT}`)
})