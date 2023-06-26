export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getEditarUser(_, res) {
        res.render('usuario');
    }

    async postEditarUser(req, res) {
        try {
            const userId = req.session.user.id;
            if (!userId) return res.render('404'); 
    
            const [user, errors] = await this.userService
                .findByIdAndUpdate(userId, req.body);
    
            if (errors.length) {
                console.log(errors);
                return res.redirect('back');
            }
    
            req.session.user = user;
            req.session.save(() => res.redirect('/'));
        } catch(e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }
}