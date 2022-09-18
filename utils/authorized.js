const authorized = (req, res, next) => {
    !req.session.logged_in ? res.redirect('/signin'): next()
};

module.exports = authorized;