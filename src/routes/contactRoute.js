import { Router } from 'express';
// import { ContactController } from '../controllers/contactController.js';
// import { ContactService } from '../services/contactService.js';
// import { authMidleware } from '../middlewares/authMiddleware.js';

const contactRoute = Router();
// const contectService = new ContactService();
// const contactController = new ContactController(contectService);

// contactRoute.get('/', authMidleware, contactController.index);

export { contactRoute }