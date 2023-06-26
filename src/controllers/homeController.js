export class HomeController {
    constructor(agendaService) {
        this.agendaService = agendaService;
    }

    async index(req, res) {
        const userId = req.session.user.id;
        const agendas = await this.agendaService
            .findAllWithContactsCountByUserId(userId);
        res.render('home', { agendas });
    }
}