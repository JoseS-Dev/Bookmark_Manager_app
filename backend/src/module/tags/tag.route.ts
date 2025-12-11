import { Router } from "express";
import { TagController } from "./tag.controller.ts";
import { ModelTag } from "./tag.model.ts";

const router: Router = Router();
const controllerTag = new TagController(new ModelTag());

// Rutas para las operaciones relacionadas con las etiquetas
// Ruta para obtener todas las etiquetas
router.get('/all', controllerTag.getAllTags);
// Ruta para crear una nueva etiqueta
router.post('/create', controllerTag.createTag);
// Ruta para actualizar una etiqueta por su ID
router.put('/update/:tagId', controllerTag.updateTag);
// Ruta para eliminar una etiqueta por su ID
router.delete('/delete/:tagId', controllerTag.deleteTag);

export const TagRoute = router;