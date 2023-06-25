export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    getLogin(req, res) {
        if (req.session.user) return res.redirect('/');
        res.render('login');
    }

    async postLogin(req, res) {
        try {
            const [user, errors] = await this.authService.login(req.body);
    
            if (errors.length) {
                console.log(errors);
                return;
            }
    
            req.session.user = user;
            req.session.save(function () {
                return res.redirect('back');
            });
            
        } catch (e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }

    getLogout(req, res) {
        req.session.destroy();
        res.redirect('/auth/login');
    }

    getRegister(req, res) {
        if (req.session.user) return res.redirect('/')
        res.render('cadastro');
    }

    async postRegister(req, res) {
        try {
            const [user, errors] = await this.authService.registered(req.body);
    
            if (errors.length) {
                console.log(errors);
                return;
            }
    
            req.session.user = user;
            req.session.save(function () {
                return res.redirect('/');
            });
            
        } catch (e) {
            console.error(e);
            return res.render('500', { error: e });
        }
    }
}