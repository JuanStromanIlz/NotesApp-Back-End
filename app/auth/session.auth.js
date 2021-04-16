module.exports = (req, res, next) => {
        if(req.isAuthenticated()) {
            console.log("entre")
        } else {
            console.log('/login');
        }
    }
