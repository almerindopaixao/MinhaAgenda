export class AgendaController {
    constructor(agendaService) {
        this.agendaService = agendaService;
    }

    getAgenda(_, res) {
        res.render('agenda', {
            agenda: {}
        });
    }

    async getAgendaContacts(req, res) {
        try {
            const agendaId = req.params.id;
            if (!agendaId) return res.render('404');
    
            const a = await this.agendaService.findAllContactByAgendaId(agendaId);
            console.log('agenda contatos', a);

            res.render('agenda-contatos', { 
                agenda: { title: 't', description: 't', id: 1, contatos: [] }
            });
        } catch (e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async postAgenda(req, res) {
        try {
            const data = {
                ...req.body,
                userId: req.session.user.id
            }

            const [,errors] = await this.agendaService.register(data);

            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }

            return res.redirect('/');
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async getEditarAgenda(req, res) {
        try {
            const agendaId = req.params.id;
            if (!agendaId) return res.render('404');
    
            const agenda = await this.agendaService.findById(agendaId);
            if (!agenda) return res.render('404');

            res.render('agenda', { agenda });
        } catch (err) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async postEditarAgenda(req, res) {
        try {
            const agendaId = req.params.id;
            if (!agendaId) return res.render('404'); 
    
            const [, errors] = await this.agendaService
                .findByIdAndUpdate(agendaId, req.body);
    
            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }
    
            return res.redirect('/');
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    async getDeletarAgenda(req, res) {
        try {
            const agendaId = req.params.id;
            if (!agendaId) return res.render('404'); 
    
            const [, errors] = await this.agendaService
                .findByIdAndDelete(agendaId);
    
            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }
    
            return res.redirect('/');
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }
}