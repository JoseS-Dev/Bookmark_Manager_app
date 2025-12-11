import {Router} from 'express';
import { ModelLike } from './like.model.ts';
import { ControllerLike } from './like.controller.ts';

const router: Router = Router();
const controllerLike = new ControllerLike(new ModelLike());

// Rutas para manejar los likes
// Ruta para obtener los likes de un bookmark
router.get('/bookmark/:bookmarkId/likes', controllerLike.getLikesByBookmarkId);
// Ruta para crear un nuevo like
router.post('/likes', controllerLike.createLike);
// Ruta para eliminar un like
router.delete('/likes/:likeId', controllerLike.deleteLike);

export const LikeRoutes = router;