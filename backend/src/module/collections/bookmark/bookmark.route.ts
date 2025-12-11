import { Router } from "express";
import { BookmarkController } from "./bookmark.controller.ts";
import { ModelBookmark } from "./bookmark.model.ts";
import { uploadBookmarkImage } from "../../../api/middlewares/multer.middleware.ts";

const router: Router = Router();
const controllerBookmark = new BookmarkController(new ModelBookmark());

// Rutas para las operaciones relacionadas con los bookmarks
// Ruta para obtener todos los bookmarks de una colección
router.get('/collection/:collectionId/all', controllerBookmark.getBookmarksByCollectionId);
// Ruta para obtener un bookmark por su ID
router.get('/:bookmarkId', controllerBookmark.getBookmarkById);
// Ruta para obtener todos los bookmarks favoritos de una colección
router.get('/collection/:collectionId/favorites', controllerBookmark.getFavoriteBookmarksByCollectionId);
// Ruta para obtener todos los bookmarks archivados de una colección
router.get('/collection/:collectionId/archived', controllerBookmark.getArchivedBookmarksByCollectionId);
// Ruta para crear un nuevo bookmark en una colección
router.post('/create',uploadBookmarkImage, controllerBookmark.createBookmark);
// Ruta para actualizar un bookmark por su ID
router.patch('/update/:bookmarkId',uploadBookmarkImage, controllerBookmark.updateBookmark);
// Ruta para cambiar el estado de favorito de un bookmark por su ID
router.patch('/toggle-favorite/:bookmarkId', controllerBookmark.toggleFavoriteBookmark);
// Ruta para cambiar el estado de archivado de un bookmark por su ID
router.patch('/toggle-archived/:bookmarkId', controllerBookmark.toggleArchivedBookmark);
// Ruta para eliminar un bookmark por su ID
router.delete('/delete/:bookmarkId', controllerBookmark.deleteBookmark);

export const BookmarkRoute = router;