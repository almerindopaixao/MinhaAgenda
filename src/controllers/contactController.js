export class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }

    getContact(req, res) {
        const { agendaId } = req.params;

        res.render('contact', {
            contact: {
                agendaId,
            }
        });
    }

    async postContact(req, res) {
        try {
            const { agendaId } = req.params;

            const data = {
                ...req.body,
                agendaId
            }

            const [,errors] = await this.contactService.register(data);

            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }

            return res.redirect(`/agenda/${agendaId}`);
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async getEditarContact(req, res) {
        try {
            const contactId = req.params.id;
            if (!contactId) return res.render('404');
    
            const contact = await this.contactService.findById(contactId);
            if (!contact) return res.render('404');

            res.render('contact', { contact });
        } catch (err) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async postEditarContact(req, res) {
        try {
            const { id: contactId, agendaId } = req.params;
            if (!contactId) return res.render('404'); 
    
            const [, errors] = await this.contactService
                .findByIdAndUpdate(contactId, req.body);
    
            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }
    
            return res.redirect(`/agenda/${agendaId}`);
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async getDeletarContact(req, res) {
        try {
            const { id: contactId, agendaId } = req.params;
            if (!contactId) return res.render('404'); 
    
            const [, errors] = await this.contactService
                .findByIdAndDelete(contactId);
    
            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }
    
            return res.redirect(`/agenda/${agendaId}`);
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }
}