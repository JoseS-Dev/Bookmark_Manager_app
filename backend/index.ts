import express, {json} from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {SETTINGS} from './config/settings.config.ts'

// Defino el servidor de express
const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Rutas

app.get('/', (req: Request, res: Response) => {
    res.send('Hola boorkmark manager backend!');
})

// Escuchamos el servidor
app.listen(SETTINGS.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${SETTINGS.PORT}`);
})