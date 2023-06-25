import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { AuthService } from '../services/authService.js';

const authRoute = Router();

// Injeção de dependências
const authService = new AuthService();
const authController = new AuthController(authService);

authRoute.get('/login', authController.getLogin);
authRoute.get('/logout', authController.getLogout);
authRoute.post('/login', authController.postLogin.bind(authController));

authRoute.get('/cadastro', authController.getRegister);
authRoute.post('/cadastro', authController.postRegister.bind(authController));


export { authRoute }