export class HomeController {
    constructor(agendaService) {
        this.agendaService = agendaService;
    }

    async index(req, res) {
        try {
            const userId = req.session.user.id;
            const agendas = await this.agendaService
                .findAllWithContactsCountByUserId(userId);
    
            res.render('home', { agendas });
        } catch (e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }
}