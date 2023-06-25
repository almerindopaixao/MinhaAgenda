import { Router } from 'express';
import { HomeController } from '../controllers/homeController.js';
import { authMidleware } from '../middlewares/authMiddleware.js';

const homeRoute = Router();
const homeController = new HomeController()

homeRoute.get('/', authMidleware, homeController.index)

export { homeRoute }