const user = require("../controllers/user.controller");
module.exports = app => {
    app.patch("/createBooking/:user_id", user.createBooking);
}