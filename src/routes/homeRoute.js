import { Router } from 'express';
import { HomeController } from '../controllers/homeController.js';
import { AgendaService } from '../services/agendaService.js';
import { authMidleware } from '../middlewares/authMiddleware.js';

const homeRoute = Router();
const agendaService = new AgendaService();
const homeController = new HomeController(agendaService);

homeRoute.get('/', authMidleware, homeController.index.bind(homeController));

export { homeRoute }