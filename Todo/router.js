import { Router } from 'express';
import controller from './controller.js';

const router = new Router();

router.get('/TodoItems', controller.getAll);
router.get('/TodoItems/:id', controller.getById);
router.put('/TodoItems/:id', controller.updateTodo);
router.delete('/TodoItems/:id', controller.removeTodo);
router.post('/TodoItems', controller.addTodo);

export default router;