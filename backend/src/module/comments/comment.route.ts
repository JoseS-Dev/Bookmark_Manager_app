import {Router} from 'express';
import { CommentController } from './comment.controller.ts';
import { ModelComment } from './comment.model.ts';

const router: Router = Router();
const controllerComment = new CommentController(new ModelComment());

// Rutas para manejar los comentarios
// Ruta para obtener todos los comentarios de un bookmark
router.get('/bookmark/:bookmarkId', controllerComment.getCommentsByBookmarkId);
// Ruta para obtener todos los comentarios de un usuario en distintos bookmarks
router.get('/user/:userId',  controllerComment.getCommentsByUserId);
// Ruta para obtener un comentario por su ID
router.get('/:commentId', controllerComment.getCommentById);
// Ruta para crear un nuevo comentario
router.post('/create', controllerComment.createComment);
// Ruta para actualizar un comentario por su ID
router.put('/update/:commentId', controllerComment.updateComment);
// Ruta para eliminar un comentario por su ID
router.delete('/delete/:commentId', controllerComment.deleteComment);

export const CommentRoutes = router;