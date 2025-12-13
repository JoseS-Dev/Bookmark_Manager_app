import express, {json} from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {SETTINGS} from './config/settings.config.ts'
import { ApiRoutes } from './src/api/routes/api.routes.ts';
import { registerRoutes } from './src/core/utils/function.utils.ts';

// Defino el servidor de express
const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Rutas

app.get('/', (req: Request, res: Response) => {
    res.send('Hola boorkmark manager backend!');
})
 // Ruta de sanidad
// Health check para Render
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy' });
});

// Manjo global de errores
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Rutas de la API
registerRoutes(ApiRoutes, app);

// Escuchamos el servidor
app.listen(SETTINGS.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${SETTINGS.PORT}`);
    console.log(`Entorno: ${SETTINGS.NODE_ENV}`);
})