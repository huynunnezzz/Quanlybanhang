const checkLogin = (req, res, next) => {
    const account = req.session.account;
    if (req.session.account && req.session.password) {
        return res.redirect('/admin/dashboard',{account});
    }
    next();
}

const checkAdmin = (req, res, next) => {
    if (!req.session.account || !req.session.password) {
        return res.redirect('/admin/login');
    }
    next();
}

module.exports = {
    checkLogin,
    checkAdmin
}