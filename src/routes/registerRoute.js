import { Router } from 'express';
import { RegisterController } from '../controllers/registerController.js';

const registerRoute = Router();
const registerController = new RegisterController()

registerRoute.get('/', registerController.index)

export { registerRoute }