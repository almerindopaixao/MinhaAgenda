import { Router } from 'express';
import { LoginController } from '../controllers/loginController.js';

const loginRoute = Router();
const loginController = new LoginController()

loginRoute.get('/', loginController.index)

export { loginRoute }