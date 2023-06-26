import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { UserService } from '../services/userService.js';

import { authMidleware } from '../middlewares/authMiddleware.js';

const userRoute = Router();

// Injeção de dependências
const userService = new UserService();
const userController = new UserController(userService);

userRoute.get('/editar', authMidleware, userController.getEditarUser.bind(userController));

userRoute.post('/editar', authMidleware, userController.postEditarUser.bind(userController));

export { userRoute };
