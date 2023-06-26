import { Router } from 'express';
import { AgendaController } from '../controllers/agendaController.js';
import { AgendaService } from '../services/agendaService.js';

import { ContactController } from '../controllers/contactController.js';
import { ContactService } from '../services/contactService.js';

import { authMidleware } from '../middlewares/authMiddleware.js';


const agendaRoute = Router();

// Injeção de dependências agendas
const agendaService = new AgendaService();
const agendaController = new AgendaController(agendaService);

// Injeção de dependências contatos
const contectService = new ContactService();
const contactController = new ContactController(contectService);


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

// Contatos como subrotas de agendas
agendaRoute.get(
    '/:agendaId/contato', 
    authMidleware, 
    contactController.getContact
);
agendaRoute.post(
    '/:agendaId/contato', 
    authMidleware, 
    contactController.postContact.bind(contactController)
);

agendaRoute.get(
    '/:agendaId/contato/editar/:id', 
    authMidleware, 
    contactController.getEditarContact.bind(contactController)
);

agendaRoute.post(
    '/:agendaId/contato/editar/:id', 
    authMidleware, 
    contactController.postEditarContact.bind(contactController)
);

agendaRoute.get(
    '/:agendaId/contato/deletar/:id', 
    authMidleware, 
    contactController.getDeletarContact.bind(contactController)
);


export { agendaRoute }