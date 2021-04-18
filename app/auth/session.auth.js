module.exports = (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.redirect(process.env.FRONTEND_HOST);
        }
    }
