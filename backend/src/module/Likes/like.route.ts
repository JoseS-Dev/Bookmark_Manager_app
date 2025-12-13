import {Router} from 'express';
import { ModelLike } from './like.model.ts';
import { ControllerLike } from './like.controller.ts';
import { verifyToken } from '../../api/middlewares/auth.middleware.ts';

const router: Router = Router();
const controllerLike = new ControllerLike(new ModelLike());

// Rutas para manejar los likes
// Ruta para obtener los likes de un bookmark
router.get('/bookmark/:bookmarkId/all', controllerLike.getLikesByBookmarkId);
// Ruta para crear un nuevo like
router.post('/create',verifyToken, controllerLike.createLike);
// Ruta para eliminar un like
router.delete('/delete/:likeId', verifyToken, controllerLike.deleteLike);

export const LikeRoutes = router;