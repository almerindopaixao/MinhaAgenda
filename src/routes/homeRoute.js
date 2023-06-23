import { Router } from 'express';
import { HomeController } from '../controllers/homeController.js';

const homeRoute = Router();
const homeController = new HomeController()

homeRoute.get('/', homeController.index)

export { homeRoute }