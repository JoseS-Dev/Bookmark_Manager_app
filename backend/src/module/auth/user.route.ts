import {Router} from 'express';
import { UserController } from './user.controller.ts';
import { ModelUser } from './user.model.ts';
import { uploadUserImage } from '../../api/middlewares/multer.middleware.ts';
import { verifyToken } from '../../api/middlewares/auth.middleware.ts';

const router: Router = Router();
const controllerUser = new UserController(new ModelUser());

// Rutas relacionadas con los usuarios
// Ruta para registrar un nuevo usuario
router.post('/register', controllerUser.createUser);
// Ruta para loguear un usuario (Opcional porque utilizo Clerk)
router.post('/login', controllerUser.loginUser);
// Ruta para deslogear un usuario (Opcional porque utilizo Clerk)
router.post('/logout/:userId', verifyToken, controllerUser.logoutUser);
// Ruta para obtener los datos de un usuario por su ID
router.get('/user/:userId', controllerUser.getUserById);
// Ruta para verificar si el usuario esta autenticado
router.get('/verify-auth/:userId', verifyToken, controllerUser.verifyUserAuth);
// Ruta para actualizar los datos de un usuario por su ID
router.patch('/update/:userId',uploadUserImage, controllerUser.updateUser);
// Ruta para eliminar un usuario por su ID
router.delete('/delete/:userId', controllerUser.deleteUser);
// Ruta para obtener las estadísticas de un usuario por su ID
router.get('/statistics/:userId', controllerUser.getUserStatistics);
// Ruta para crear estadísticas iniciales para un nuevo usuario
router.post('/statistics/:userId', controllerUser.createUserStadistics);
// Ruta para actualizar las estadísticas de un usuario
router.patch('/statistics/:userId', controllerUser.updateUserStadistics);

export const UserRoute = router;