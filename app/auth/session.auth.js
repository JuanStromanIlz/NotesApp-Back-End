module.exports = (req, res, next) => {
        if(req.isAuthenticated()) {
            next()
        } else {
            res.redirect(`${process.env.FRONTEND_HOST}`);
        }
    }
