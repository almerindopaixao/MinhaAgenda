import { Router } from 'express';
import { AgendaController } from '../controllers/agendaController.js';
import { AgendaService } from '../services/agendaService.js';
import { authMidleware } from '../middlewares/authMiddleware.js';

const agendaRoute = Router();

// Injeção de dependências
const agendaService = new AgendaService();
const agendaController = new AgendaController(agendaService);

agendaRoute.get('/', authMidleware, agendaController.getAgenda);
agendaRoute.get(
    '/:id', 
    authMidleware, 
    agendaController.getAgendaContacts.bind(agendaController)
);
agendaRoute.post(
    '/', 
    authMidleware, 
    agendaController.postAgenda.bind(agendaController)
);
agendaRoute.get(
    '/editar/:id', 
    authMidleware, 
    agendaController.getEditarAgenda.bind(agendaController)
);
agendaRoute.post(
    '/editar/:id', 
    authMidleware, 
    agendaController.postEditarAgenda.bind(agendaController)
);
agendaRoute.get(
    '/deletar/:id', 
    authMidleware, 
    agendaController.getDeletarAgenda.bind(agendaController)
);

export { agendaRoute }