import {Router} from 'express';
import { CollectionController } from './collection.controller.ts';
import { ModelCollection } from './collection.model.ts';

const router: Router = Router();
const controllerCollection = new CollectionController(new ModelCollection());

// Rutas relacionadas con las colecciones
// Ruta para obtener todas las colecciones de un usuario
router.get('/user/:userId', controllerCollection.getCollectionsByUserId);
// Ruta para obtener todas las colecciones públicas de un usuario
router.get('/public/user/:userId', controllerCollection.getPublicCollectionsByUserId);
// Ruta para obtener todas las colecciones privadas de un usuario
router.get('/private/user/:userId', controllerCollection.getPrivateCollectionsByUserId);
// Ruta para obtener una colección por su slug
router.get('/slug/:slug', controllerCollection.getCollectionBySlug);
// Ruta para crear una nueva colección
router.post('/create', controllerCollection.createCollection);
// Ruta para actualizar una colección por su ID
router.patch('/update/:collectionId', controllerCollection.updateCollection);
// Ruta para eliminar una colección por su ID
router.delete('/delete/:collectionId', controllerCollection.deleteCollection);

export const CollectionRoute = router;