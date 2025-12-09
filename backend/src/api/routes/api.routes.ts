import {Router} from 'express';
import { UserRoute } from '../../module/auth/user.route.ts';
import { CollectionRoute } from '../../module/collections/collection/collection.route.ts';
import { SETTINGS } from '../../../config/settings.config.ts';

const router: Router = Router();

// Lista de rutas de la API
export const ApiRoutes = {
    user: router.use(`${SETTINGS.BASE_URL}/auth`, UserRoute),
    collections: {
        collection: router.use(`${SETTINGS.BASE_URL}/collections`, CollectionRoute)
    }
}