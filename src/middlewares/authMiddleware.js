export const authMidleware = (req, res, next) => {   
    if (!req.session.user) {
        req.session.save(() => res.redirect('/auth/login'));
        return;
    }

    res.locals.user = req.session.user;
    next();
}
